import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider,
  signInWithPopup,
  sendSignInLinkToEmail, 
  isSignInWithEmailLink, 
  signInWithEmailLink, 
  signOut as firebaseSignOut, 
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  getDocs, 
  deleteDoc,
  serverTimestamp,
  getDocFromServer,
  onSnapshot
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
}

// Test connection on boot
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn("Please check your Firebase configuration or connection.");
    }
  }
}
testConnection();

export interface AllowlistItem {
  email: string;
  authorized: boolean;
  role: 'viewer' | 'admin';
  scope?: 'global' | 'specific';
  allowedItems?: string[]; // IDs of specific articles/resources
  allowedSections?: string[]; // e.g. ['case-studies', 'publications', 'archives']
  addedBy: string;
  addedAt: any;
}

export interface SecurityLocks {
  lockedSections: string[];
  lockedItems: string[];
  unlockedItems: string[];
  updatedBy?: string;
  updatedAt?: any;
}

export interface TargetResource {
  id: string;
  section: string;
  title: string;
}

export interface AccessCheckResult {
  allowed: boolean;
  reason: 'public' | 'admin' | 'global_clearance' | 'item_clearance' | 'section_clearance' | 'auth_required' | 'item_forbidden';
  allowedItems?: string[];
  userScope?: 'global' | 'specific';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  isAuthorized: boolean;
  currentUserEntry: AllowlistItem | null;
  allowlist: AllowlistItem[];
  
  // Granular locks
  lockedSections: string[];
  lockedItems: string[];
  unlockedItems: string[];
  toggleSectionLock: (sectionId: string) => Promise<void>;
  toggleItemLock: (itemId: string, defaultSectionId?: string) => Promise<void>;
  setItemLockState: (itemId: string, state: 'locked' | 'unlocked' | 'default') => Promise<void>;
  isItemLocked: (itemId: string, sectionId: string) => boolean;
  isSectionLocked: (sectionId: string) => boolean;
  canAccessItem: (itemId: string, sectionId: string) => AccessCheckResult;

  // Identity & Permissions
  checkAllowlistStatus: (email: string) => Promise<{ 
    authorized: boolean; 
    role: 'viewer' | 'admin' | null;
    scope?: 'global' | 'specific';
    allowedItems?: string[];
    allowedSections?: string[];
  }>;
  signInWithGoogle: () => Promise<User>;
  sendMagicLink: (email: string) => Promise<void>;
  completeSignIn: () => Promise<void>;
  signOut: () => Promise<void>;
  addToAllowlist: (
    email: string, 
    role: 'viewer' | 'admin', 
    scope?: 'global' | 'specific',
    allowedItems?: string[],
    allowedSections?: string[]
  ) => Promise<void>;
  updateAllowlistEntry: (
    email: string,
    updates: Partial<AllowlistItem>
  ) => Promise<void>;
  removeFromAllowlist: (email: string) => Promise<void>;
  fetchAllowlist: () => Promise<void>;

  // Resource-aware Gating
  gateItem: (
    itemOrRole: string, 
    sectionOrGrant?: string | (() => void), 
    titleOrGrant?: string, 
    onGrant?: () => void
  ) => void;
  gateModalOpen: boolean;
  setGateModalOpen: (open: boolean) => void;
  targetResource: TargetResource | null;
  setTargetResource: (res: TargetResource | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [currentUserEntry, setCurrentUserEntry] = useState<AllowlistItem | null>(null);
  const [allowlist, setAllowlist] = useState<AllowlistItem[]>([]);
  const [gateModalOpen, setGateModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);
  const [targetResource, setTargetResource] = useState<TargetResource | null>(null);

  // Granular locks state: by default, archives and publications are locked; case studies can also be locked individually or entirely
  const [lockedSections, setLockedSections] = useState<string[]>(['archives', 'publications']);
  const [lockedItems, setLockedItems] = useState<string[]>([]);
  const [unlockedItems, setUnlockedItems] = useState<string[]>([]);

  // Helper to determine if email is super admin
  const isSuperAdminEmail = (email: string | null | undefined) => {
    return email?.toLowerCase() === 'munish.world@gmail.com';
  };

  // Helper to normalize section aliases
  const normalizeSectionId = (sec: string): string => {
    if (!sec) return '';
    const s = sec.toLowerCase().trim();
    if (s === 'archive' || s === 'archives') return 'archives';
    if (s === 'publication' || s === 'publications' || s === 'blog') return 'publications';
    if (s === 'case-study' || s === 'case-studies' || s === 'projects') return 'case-studies';
    return s;
  };

  // Sync locks from Firestore in real-time
  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, 'security_settings', 'locks'),
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          if (Array.isArray(data.lockedSections)) {
            setLockedSections(data.lockedSections);
          } else {
            setLockedSections(['archives', 'publications']);
          }
          if (Array.isArray(data.lockedItems)) {
            setLockedItems(data.lockedItems);
          }
          if (Array.isArray(data.unlockedItems)) {
            setUnlockedItems(data.unlockedItems);
          }
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, 'security_settings/locks');
      }
    );
    return () => unsub();
  }, []);

  // Determine if a specific item is locked
  const isItemLocked = useCallback((itemId: string, sectionId: string): boolean => {
    if (lockedItems.includes(itemId)) return true;
    if (unlockedItems.includes(itemId)) return false;
    const targetNorm = normalizeSectionId(sectionId);
    return lockedSections.some(s => normalizeSectionId(s) === targetNorm);
  }, [lockedItems, unlockedItems, lockedSections]);

  // Determine if an entire section is locked
  const isSectionLocked = useCallback((sectionId: string): boolean => {
    const targetNorm = normalizeSectionId(sectionId);
    return lockedSections.some(s => normalizeSectionId(s) === targetNorm);
  }, [lockedSections]);

  // Evaluate whether the current user can access a specific item
  const canAccessItem = useCallback((itemId: string, sectionId: string): AccessCheckResult => {
    const locked = isItemLocked(itemId, sectionId);
    if (!locked) {
      return { allowed: true, reason: 'public' };
    }

    if (!user) {
      return { allowed: false, reason: 'auth_required' };
    }

    if (isAdmin || isSuperAdminEmail(user.email)) {
      return { allowed: true, reason: 'admin' };
    }

    if (!isAuthorized) {
      return { allowed: false, reason: 'auth_required' };
    }

    // User is authorized - check scope
    if (currentUserEntry?.scope === 'specific') {
      const allowedItems = currentUserEntry.allowedItems || [];
      const allowedSections = currentUserEntry.allowedSections || [];

      if (allowedItems.includes(itemId)) {
        return { 
          allowed: true, 
          reason: 'item_clearance', 
          allowedItems, 
          userScope: 'specific' 
        };
      }
      if (allowedSections.includes(sectionId)) {
        return { 
          allowed: true, 
          reason: 'section_clearance', 
          allowedItems, 
          userScope: 'specific' 
        };
      }
      return { 
        allowed: false, 
        reason: 'item_forbidden', 
        allowedItems, 
        userScope: 'specific' 
      };
    }

    // Default global clearance
    return { 
      allowed: true, 
      reason: 'global_clearance', 
      userScope: 'global' 
    };
  }, [isItemLocked, user, isAdmin, isAuthorized, currentUserEntry]);

  // Toggle lock on an entire section
  const toggleSectionLock = async (sectionId: string) => {
    if (!isAdmin) return;
    const norm = normalizeSectionId(sectionId);
    const isCurrentlyLocked = lockedSections.some(s => normalizeSectionId(s) === norm);
    const updated = isCurrentlyLocked
      ? lockedSections.filter(s => normalizeSectionId(s) !== norm)
      : [...lockedSections.filter(s => normalizeSectionId(s) !== norm), norm];
    setLockedSections(updated);

    try {
      await setDoc(doc(db, 'security_settings', 'locks'), {
        lockedSections: updated,
        lockedItems,
        unlockedItems,
        updatedBy: user?.email || 'admin',
        updatedAt: serverTimestamp()
      }, { merge: true });
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'security_settings/locks');
    }
  };

  // Toggle lock on a single specific item
  const toggleItemLock = async (itemId: string, defaultSectionId: string = 'case-studies') => {
    if (!isAdmin) return;
    const currentlyLocked = isItemLocked(itemId, defaultSectionId);
    
    let newLocked = [...lockedItems];
    let newUnlocked = [...unlockedItems];

    if (currentlyLocked) {
      // Unlock item
      newLocked = newLocked.filter(id => id !== itemId);
      if (lockedSections.includes(defaultSectionId) && !newUnlocked.includes(itemId)) {
        newUnlocked.push(itemId);
      }
    } else {
      // Lock item
      newUnlocked = newUnlocked.filter(id => id !== itemId);
      if (!newLocked.includes(itemId)) {
        newLocked.push(itemId);
      }
    }

    setLockedItems(newLocked);
    setUnlockedItems(newUnlocked);

    try {
      await setDoc(doc(db, 'security_settings', 'locks'), {
        lockedSections,
        lockedItems: newLocked,
        unlockedItems: newUnlocked,
        updatedBy: user?.email || 'admin',
        updatedAt: serverTimestamp()
      }, { merge: true });
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'security_settings/locks');
    }
  };

  // Explicitly set item lock state ('locked', 'unlocked', or 'default' to inherit)
  const setItemLockState = async (itemId: string, state: 'locked' | 'unlocked' | 'default') => {
    if (!isAdmin) return;
    let newLocked = lockedItems.filter(id => id !== itemId);
    let newUnlocked = unlockedItems.filter(id => id !== itemId);

    if (state === 'locked') {
      newLocked.push(itemId);
    } else if (state === 'unlocked') {
      newUnlocked.push(itemId);
    }

    setLockedItems(newLocked);
    setUnlockedItems(newUnlocked);

    try {
      await setDoc(doc(db, 'security_settings', 'locks'), {
        lockedSections,
        lockedItems: newLocked,
        unlockedItems: newUnlocked,
        updatedBy: user?.email || 'admin',
        updatedAt: serverTimestamp()
      }, { merge: true });
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'security_settings/locks');
    }
  };

  // Check allowlist in Firestore
  const checkAllowlistStatus = async (email: string): Promise<{ 
    authorized: boolean; 
    role: 'viewer' | 'admin' | null;
    scope?: 'global' | 'specific';
    allowedItems?: string[];
    allowedSections?: string[];
  }> => {
    if (isSuperAdminEmail(email)) {
      return { 
        authorized: true, 
        role: 'admin', 
        scope: 'global',
        allowedItems: [],
        allowedSections: []
      };
    }

    try {
      const docRef = doc(db, 'allowlist', email.toLowerCase().trim());
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        return { 
          authorized: data.authorized === true, 
          role: data.role || 'viewer',
          scope: data.scope || 'global',
          allowedItems: Array.isArray(data.allowedItems) ? data.allowedItems : [],
          allowedSections: Array.isArray(data.allowedSections) ? data.allowedSections : []
        };
      }
    } catch (e) {
      handleFirestoreError(e, OperationType.GET, `allowlist/${email}`);
    }
    return { authorized: false, role: null };
  };

  // Fetch complete allowlist (Admins only)
  const fetchAllowlist = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'allowlist'));
      const list: AllowlistItem[] = [];
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        list.push({
          email: docSnap.id,
          authorized: data.authorized === true,
          role: data.role || 'viewer',
          scope: data.scope || 'global',
          allowedItems: Array.isArray(data.allowedItems) ? data.allowedItems : [],
          allowedSections: Array.isArray(data.allowedSections) ? data.allowedSections : [],
          addedBy: data.addedBy || '',
          addedAt: data.addedAt
        });
      });
      setAllowlist(list);
    } catch (e) {
      handleFirestoreError(e, OperationType.LIST, 'allowlist');
    }
  };

  // Add email to allowlist with optional single-article or multi-resource clearance
  const addToAllowlist = async (
    email: string, 
    role: 'viewer' | 'admin', 
    scope: 'global' | 'specific' = 'global',
    allowedItems: string[] = [],
    allowedSections: string[] = []
  ) => {
    const targetEmail = email.toLowerCase().trim();
    try {
      const docRef = doc(db, 'allowlist', targetEmail);
      await setDoc(docRef, {
        authorized: true,
        role: role,
        scope: scope,
        allowedItems: allowedItems,
        allowedSections: allowedSections,
        addedBy: user?.email || 'admin',
        addedAt: serverTimestamp()
      });
      await fetchAllowlist();
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, `allowlist/${targetEmail}`);
      throw e;
    }
  };

  // Update existing allowlist entry (e.g. modify granted articles)
  const updateAllowlistEntry = async (email: string, updates: Partial<AllowlistItem>) => {
    const targetEmail = email.toLowerCase().trim();
    try {
      const docRef = doc(db, 'allowlist', targetEmail);
      await setDoc(docRef, {
        ...updates,
        addedBy: user?.email || 'admin',
        addedAt: serverTimestamp()
      }, { merge: true });
      await fetchAllowlist();
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, `allowlist/${targetEmail}`);
      throw e;
    }
  };

  // Remove email from allowlist
  const removeFromAllowlist = async (email: string) => {
    const targetEmail = email.toLowerCase().trim();
    try {
      const docRef = doc(db, 'allowlist', targetEmail);
      await deleteDoc(docRef);
      await fetchAllowlist();
    } catch (e) {
      handleFirestoreError(e, OperationType.DELETE, `allowlist/${targetEmail}`);
      throw e;
    }
  };

  // Sign in with Google (Firebase Auth Provider)
  const signInWithGoogle = async (): Promise<User> => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    try {
      const result = await signInWithPopup(auth, provider);
      const currentUser = result.user;
      if (currentUser && currentUser.email) {
        const access = await checkAllowlistStatus(currentUser.email);
        if (!access.authorized && !isSuperAdminEmail(currentUser.email)) {
          await firebaseSignOut(auth);
          throw new Error(`Access Denied: ${currentUser.email} is not authorized. Please request access from the administrator.`);
        }
      }
      return currentUser;
    } catch (e: any) {
      console.error("Error signing in with Google:", e);
      throw e;
    }
  };

  // Send Magic Link
  const sendMagicLink = async (email: string) => {
    const actionCodeSettings = {
      url: window.location.origin + window.location.pathname,
      handleCodeInApp: true,
    };
    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem('emailForSignIn', email);
    } catch (e) {
      console.error("Error sending sign-in link:", e);
      throw e;
    }
  };

  // Complete sign-in from email link
  const completeSignIn = async () => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem('emailForSignIn');
      if (!email) {
        email = window.prompt('Please enter your email for confirmation:');
      }
      if (email) {
        try {
          await signInWithEmailLink(auth, email, window.location.href);
          window.localStorage.removeItem('emailForSignIn');
          window.history.replaceState({}, document.title, window.location.pathname);
          
          const access = await checkAllowlistStatus(email);
          if (!access.authorized) {
            await firebaseSignOut(auth);
            alert("Access Denied: Your email is not on the invite-only allowlist.");
          }
        } catch (e) {
          console.error("Error signing in with email link:", e);
          alert("Sign-in link is invalid or expired.");
        }
      }
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setIsAdmin(false);
      setIsAuthorized(false);
      setCurrentUserEntry(null);
    } catch (e) {
      console.error("Error signing out:", e);
    }
  };

  // Intercept action if gated (supports both legacy role signature and granular resource signature)
  const gateItem = (
    itemOrRole: string, 
    sectionOrGrant?: string | (() => void), 
    titleOrGrant?: string, 
    onGrant?: () => void
  ) => {
    // Legacy support: gateItem('viewer' | 'admin', onGrant)
    if (typeof sectionOrGrant === 'function') {
      const requiredRole = itemOrRole as 'viewer' | 'admin';
      const grantFn = sectionOrGrant;
      if (requiredRole === 'admin' && isAdmin) {
        grantFn();
      } else if (requiredRole === 'viewer' && isAuthorized) {
        grantFn();
      } else {
        setTargetResource(null);
        setPendingAction(() => grantFn);
        setGateModalOpen(true);
      }
      return;
    }

    // Granular resource check: gateItem(itemId, sectionId, itemTitle, onGrant)
    const itemId = itemOrRole;
    const sectionId = (typeof sectionOrGrant === 'string' ? sectionOrGrant : '') || 'case-studies';
    const itemTitle = titleOrGrant || itemId;
    const grantFn = onGrant;

    const access = canAccessItem(itemId, sectionId);
    if (access.allowed) {
      if (grantFn) grantFn();
    } else {
      setTargetResource({ id: itemId, section: sectionId, title: itemTitle });
      if (grantFn) {
        setPendingAction(() => grantFn);
      } else {
        setPendingAction(null);
      }
      setGateModalOpen(true);
    }
  };

  // Listen to auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser && currentUser.email) {
        const access = await checkAllowlistStatus(currentUser.email);
        setIsAuthorized(access.authorized);
        const isUserAdmin = access.role === 'admin' || isSuperAdminEmail(currentUser.email);
        setIsAdmin(isUserAdmin);

        setCurrentUserEntry({
          email: currentUser.email,
          authorized: access.authorized,
          role: access.role || 'viewer',
          scope: access.scope || 'global',
          allowedItems: access.allowedItems || [],
          allowedSections: access.allowedSections || [],
          addedBy: '',
          addedAt: null
        });

        if (isUserAdmin) {
          fetchAllowlist();
          // Ensure requested publications and archives locks are persisted in Firestore
          try {
            const locksDocRef = doc(db, 'security_settings', 'locks');
            getDoc(locksDocRef).then((snap) => {
              if (!snap.exists()) {
                setDoc(locksDocRef, {
                  lockedSections: ['archives', 'publications'],
                  lockedItems: [],
                  unlockedItems: [],
                  updatedBy: currentUser.email,
                  updatedAt: serverTimestamp()
                }).catch(() => {});
              } else {
                const existingData = snap.data();
                const existingSections: string[] = Array.isArray(existingData?.lockedSections) ? existingData.lockedSections : [];
                if (!existingSections.includes('publications')) {
                  setDoc(locksDocRef, {
                    lockedSections: [...existingSections, 'publications'],
                    updatedBy: currentUser.email,
                    updatedAt: serverTimestamp()
                  }, { merge: true }).catch(() => {});
                }
              }
            }).catch(() => {});
          } catch (e) {
            // Ignore background sync errors
          }
        }
        
        // If they had a pending action, execute it upon successful auth if granted
        if (access.authorized && pendingAction) {
          pendingAction();
          setPendingAction(null);
          setGateModalOpen(false);
        }
      } else {
        setIsAdmin(false);
        setIsAuthorized(false);
        setCurrentUserEntry(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [pendingAction]);

  // Try parsing landing login link
  useEffect(() => {
    completeSignIn();
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      isAdmin,
      isAuthorized,
      currentUserEntry,
      allowlist,
      lockedSections,
      lockedItems,
      unlockedItems,
      toggleSectionLock,
      toggleItemLock,
      setItemLockState,
      isItemLocked,
      isSectionLocked,
      canAccessItem,
      checkAllowlistStatus,
      signInWithGoogle,
      sendMagicLink,
      completeSignIn,
      signOut,
      addToAllowlist,
      updateAllowlistEntry,
      removeFromAllowlist,
      fetchAllowlist,
      gateItem,
      gateModalOpen,
      setGateModalOpen,
      targetResource,
      setTargetResource
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

