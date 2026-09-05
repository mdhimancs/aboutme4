import React, { useState, useMemo } from 'react';
import { useAuth, AllowlistItem } from '../context/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Mail, 
  ShieldAlert, 
  CheckCircle, 
  Loader2, 
  Lock, 
  Unlock,
  UserPlus, 
  Trash2, 
  LogOut,
  ShieldCheck,
  UserCheck,
  Search,
  SlidersHorizontal,
  FileText,
  Edit3,
  AlertCircle,
  ArrowRight,
  Sparkles,
  Layers,
  KeyRound
} from 'lucide-react';
import { 
  getAllLockableResources, 
  getResourceById, 
  LOCKABLE_SECTIONS, 
  LockableItem, 
  SectionLockId 
} from '../data/lockableResources';

export const GateModal: React.FC = () => {
  const { 
    gateModalOpen, 
    setGateModalOpen, 
    user, 
    isAdmin, 
    isAuthorized, 
    currentUserEntry,
    signInWithGoogle,
    sendMagicLink, 
    signOut,
    allowlist,
    addToAllowlist,
    updateAllowlistEntry,
    removeFromAllowlist,
    targetResource,
    setTargetResource,
    lockedSections,
    lockedItems,
    unlockedItems,
    toggleSectionLock,
    toggleItemLock,
    setItemLockState,
    isItemLocked
  } = useAuth();

  // Inputs for Authentication
  const [emailInput, setEmailInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Admin Tab selection
  const [adminTab, setAdminTab] = useState<'status' | 'allowlist' | 'locks'>('status');

  // New allowlist user form
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<'viewer' | 'admin'>('viewer');
  const [newScope, setNewScope] = useState<'global' | 'specific'>('global');
  const [selectedArticleId, setSelectedArticleId] = useState<string>('');
  const [resourceSearch, setResourceSearch] = useState('');

  // Edit user modal / drawer state
  const [editingUser, setEditingUser] = useState<AllowlistItem | null>(null);
  const [editScope, setEditScope] = useState<'global' | 'specific'>('global');
  const [editArticleId, setEditArticleId] = useState<string>('');

  // Locks manager search & filters
  const [locksFilterSection, setLocksFilterSection] = useState<string>('all');
  const [locksSearchQuery, setLocksSearchQuery] = useState<string>('');

  const allResources = useMemo(() => getAllLockableResources(), []);

  // Filtered resources for selecting a single article
  const selectableResources = useMemo(() => {
    if (!resourceSearch.trim()) return allResources.slice(0, 30);
    const q = resourceSearch.toLowerCase();
    return allResources.filter(r => 
      r.title.toLowerCase().includes(q) || 
      r.category.toLowerCase().includes(q) ||
      r.section.toLowerCase().includes(q)
    ).slice(0, 30);
  }, [allResources, resourceSearch]);

  // Filtered resources for Locks Manager tab
  const displayLockResources = useMemo(() => {
    return allResources.filter(r => {
      const matchesSection = locksFilterSection === 'all' || r.section === locksFilterSection;
      const matchesSearch = !locksSearchQuery.trim() || 
        r.title.toLowerCase().includes(locksSearchQuery.toLowerCase()) ||
        r.category.toLowerCase().includes(locksSearchQuery.toLowerCase());
      return matchesSection && matchesSearch;
    });
  }, [allResources, locksFilterSection, locksSearchQuery]);

  if (!gateModalOpen) return null;

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setError('');
    try {
      await signInWithGoogle();
    } catch (err: any) {
      setError(err.message || 'Firebase Authentication failed. Please try again.');
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleSendLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    
    setLoading(true);
    setError('');
    try {
      await sendMagicLink(emailInput.trim());
      setSuccess(true);
      setEmailInput('');
    } catch (err: any) {
      setError(err.message || 'Failed to send login link. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.trim()) return;

    if (newScope === 'specific' && !selectedArticleId) {
      setError('Please select a specific article or resource to grant access to.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const allowedItems = newScope === 'specific' && selectedArticleId ? [selectedArticleId] : [];
      await addToAllowlist(newEmail.trim(), newRole, newScope, allowedItems, []);
      setNewEmail('');
      setSelectedArticleId('');
      setNewScope('global');
    } catch (err: any) {
      setError('Failed to add credentials to allowlist.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveEditUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    if (editScope === 'specific' && !editArticleId) {
      setError('Please select a specific article or resource.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const allowedItems = editScope === 'specific' && editArticleId ? [editArticleId] : [];
      await updateAllowlistEntry(editingUser.email, {
        scope: editScope,
        allowedItems
      });
      setEditingUser(null);
    } catch (err: any) {
      setError('Failed to update user permissions.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveEmail = async (email: string) => {
    if (!window.confirm(`Are you sure you want to revoke access for ${email}?`)) return;
    try {
      await removeFromAllowlist(email);
    } catch (err) {
      alert('Failed to revoke access.');
    }
  };

  // Close modal and reset target resource
  const handleClose = () => {
    setGateModalOpen(false);
    setTargetResource(null);
  };

  // Check if current user is restricted to a single item and trying to view another
  const isItemForbiddenForCurrentUser = currentUserEntry?.scope === 'specific' && targetResource && 
    !currentUserEntry.allowedItems?.includes(targetResource.id);

  const grantedItemTitle = currentUserEntry?.allowedItems?.[0] 
    ? (getResourceById(currentUserEntry.allowedItems[0])?.title || currentUserEntry.allowedItems[0])
    : null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 backdrop-blur-md bg-black/70 overflow-y-auto">
        {/* Modal Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ type: 'spring', duration: 0.35 }}
          className="relative w-full max-w-2xl overflow-hidden rounded-2xl border bg-zinc-950 border-white/10 shadow-2xl flex flex-col my-auto"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-zinc-900/60">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <Lock className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-xs font-bold tracking-tight text-white uppercase block">
                  {isAdmin ? 'Security Access & Lock Management Console' : 'Protected Asset Clearance'}
                </span>
                <span className="text-[10px] text-zinc-400 font-mono">
                  Zero-Trust Granular RBAC • Firebase Auth
                </span>
              </div>
            </div>
            <button 
              onClick={handleClose}
              className="p-1.5 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Target Resource Banner (If intercepted by clicking a locked item) */}
          {targetResource && (
            <div className="px-5 py-2.5 bg-blue-500/10 border-b border-blue-500/20 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 min-w-0">
                <KeyRound className="w-4 h-4 text-blue-400 shrink-0" />
                <div className="truncate">
                  <span className="text-[10px] font-bold text-blue-300 uppercase tracking-wider block">
                    Target Resource Requested
                  </span>
                  <span className="font-semibold text-white truncate block">
                    {targetResource.title}
                  </span>
                </div>
              </div>
              <span className="shrink-0 px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                {targetResource.section}
              </span>
            </div>
          )}

          {/* Admin Navigation Tabs */}
          {isAdmin && (
            <div className="flex border-b border-white/10 bg-zinc-900/40 text-xs">
              <button
                onClick={() => setAdminTab('status')}
                className={`flex-1 py-2.5 px-3 font-bold uppercase tracking-wider transition-colors border-b-2 flex items-center justify-center gap-1.5 ${
                  adminTab === 'status' 
                    ? 'border-emerald-500 text-emerald-400 bg-emerald-500/5' 
                    : 'border-transparent text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>My Profile</span>
              </button>
              <button
                onClick={() => setAdminTab('locks')}
                className={`flex-1 py-2.5 px-3 font-bold uppercase tracking-wider transition-colors border-b-2 flex items-center justify-center gap-1.5 ${
                  adminTab === 'locks' 
                    ? 'border-blue-500 text-blue-400 bg-blue-500/5' 
                    : 'border-transparent text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Granular Locks</span>
              </button>
              <button
                onClick={() => setAdminTab('allowlist')}
                className={`flex-1 py-2.5 px-3 font-bold uppercase tracking-wider transition-colors border-b-2 flex items-center justify-center gap-1.5 ${
                  adminTab === 'allowlist' 
                    ? 'border-purple-500 text-purple-400 bg-purple-500/5' 
                    : 'border-transparent text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Allowlist & Grants ({allowlist.length})</span>
              </button>
            </div>
          )}

          {/* Modal Main Content Body */}
          <div className="p-5 sm:p-6 overflow-y-auto max-h-[72vh]">
            
            {/* TAB 1: GRANULAR LOCKS MANAGER (Admin Only) */}
            {isAdmin && adminTab === 'locks' ? (
              <div className="space-y-5">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-blue-400" />
                    <span>Section & Resource Access Controls</span>
                  </h4>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    Lock or unlock entire sections independently, or toggle access for any specific article or blueprint.
                  </p>
                </div>

                {/* Section Level Locks */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                    Primary Sections (Lockable Separately)
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {LOCKABLE_SECTIONS.map((sec) => {
                      const isLocked = lockedSections.includes(sec.id);
                      return (
                        <div 
                          key={sec.id}
                          className={`p-3 rounded-xl border flex flex-col justify-between transition-all ${
                            isLocked 
                              ? 'bg-amber-500/10 border-amber-500/30 text-amber-200' 
                              : 'bg-white/[0.02] border-white/10 text-white'
                          }`}
                        >
                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-xs">{sec.name}</span>
                              <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold uppercase ${
                                isLocked ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-400'
                              }`}>
                                {isLocked ? 'Locked' : 'Unlocked'}
                              </span>
                            </div>
                            <p className="text-[10px] text-zinc-400 line-clamp-2 leading-tight">
                              {sec.description}
                            </p>
                          </div>
                          
                          <button
                            onClick={() => toggleSectionLock(sec.id)}
                            className={`mt-3 w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                              isLocked 
                                ? 'bg-emerald-600 hover:bg-emerald-500 text-white' 
                                : 'bg-amber-600 hover:bg-amber-500 text-white'
                            }`}
                          >
                            {isLocked ? <Unlock className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                            <span>{isLocked ? 'Unlock Section' : 'Lock Section'}</span>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Per-Item Granular Locking Controls */}
                <div className="space-y-3 pt-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                      Individual Articles & Resources ({allResources.length} Assets)
                    </span>
                    
                    <div className="flex items-center gap-2">
                      <select
                        value={locksFilterSection}
                        onChange={(e) => setLocksFilterSection(e.target.value)}
                        className="rounded-lg bg-zinc-900 border border-white/10 px-2 py-1 text-[11px] text-white focus:border-blue-500 focus:outline-none"
                      >
                        <option value="all">All Sections</option>
                        <option value="case-studies">Case Studies</option>
                        <option value="publications">Publications</option>
                        <option value="archives">Archives</option>
                      </select>

                      <div className="relative">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-zinc-500" />
                        <input
                          type="text"
                          placeholder="Search articles..."
                          value={locksSearchQuery}
                          onChange={(e) => setLocksSearchQuery(e.target.value)}
                          className="rounded-lg bg-white/[0.03] border border-white/10 pl-7 pr-2.5 py-1 text-[11px] text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none w-36 sm:w-44"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
                    {displayLockResources.map((item) => {
                      const locked = isItemLocked(item.id, item.section);
                      const isExplicitLocked = lockedItems.includes(item.id);
                      const isExplicitUnlocked = unlockedItems.includes(item.id);
                      const sectionLocked = lockedSections.includes(item.section);

                      return (
                        <div 
                          key={item.id}
                          className="flex items-center justify-between p-2.5 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors gap-3"
                        >
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-semibold text-white truncate block">
                                {item.title}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-[9px] font-mono text-zinc-400 capitalize">
                                {item.section} • {item.category}
                              </span>
                              {isExplicitLocked && (
                                <span className="text-[8px] font-mono text-amber-400 bg-amber-500/10 px-1 py-0.2 rounded border border-amber-500/20">
                                  Explicitly Locked
                                </span>
                              )}
                              {isExplicitUnlocked && (
                                <span className="text-[8px] font-mono text-emerald-400 bg-emerald-500/10 px-1 py-0.2 rounded border border-emerald-500/20">
                                  Explicitly Unlocked
                                </span>
                              )}
                              {!isExplicitLocked && !isExplicitUnlocked && (
                                <span className="text-[8px] font-mono text-zinc-500">
                                  Inherits section ({sectionLocked ? 'Locked' : 'Unlocked'})
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              onClick={() => toggleItemLock(item.id, item.section)}
                              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-colors cursor-pointer ${
                                locked 
                                  ? 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30' 
                                  : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30'
                              }`}
                            >
                              {locked ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                              <span>{locked ? 'Locked' : 'Unlocked'}</span>
                            </button>

                            {(isExplicitLocked || isExplicitUnlocked) && (
                              <button
                                onClick={() => setItemLockState(item.id, 'default')}
                                className="px-2 py-1 rounded-lg text-[9px] text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10"
                                title="Reset to inherit section status"
                              >
                                Reset
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : null}

            {/* TAB 2: ALLOWLIST & GRANTS MANAGER (Admin Only) */}
            {isAdmin && adminTab === 'allowlist' ? (
              <div className="space-y-5">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <UserPlus className="w-3.5 h-3.5 text-purple-400" />
                    <span>Authorize Viewer & Resource Access Clearance</span>
                  </h4>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    Grant complete portfolio clearance OR restrict access to one particular specific article.
                  </p>
                </div>

                {error && (
                  <div className="p-2.5 rounded-xl border border-red-500/20 bg-red-500/10 text-xs text-red-300 flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 shrink-0 text-red-400" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Provision New User Form */}
                <form onSubmit={handleAddUser} className="space-y-3 p-3.5 rounded-xl border border-white/10 bg-white/[0.02]">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="email"
                      required
                      placeholder="reviewer@organization.com"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      className="flex-1 rounded-xl bg-zinc-900 border border-white/10 px-3 py-2 text-xs text-white placeholder-zinc-500 focus:border-purple-500 focus:outline-none"
                    />
                    <select
                      value={newRole}
                      onChange={(e: any) => setNewRole(e.target.value)}
                      className="rounded-xl bg-zinc-900 border border-white/10 px-3 py-2 text-xs text-white focus:border-purple-500 focus:outline-none"
                    >
                      <option value="viewer">Viewer Role</option>
                      <option value="admin">Admin Role</option>
                    </select>
                  </div>

                  {/* Scope Selector */}
                  <div className="space-y-2 pt-1">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                      Clearance Scope
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <label 
                        className={`p-2.5 rounded-xl border cursor-pointer flex items-center gap-2.5 transition-all ${
                          newScope === 'global' 
                            ? 'bg-purple-500/10 border-purple-500/30 text-white' 
                            : 'bg-zinc-900/60 border-white/5 text-zinc-400 hover:text-zinc-200'
                        }`}
                      >
                        <input 
                          type="radio" 
                          name="scope" 
                          value="global" 
                          checked={newScope === 'global'}
                          onChange={() => setNewScope('global')}
                          className="accent-purple-500"
                        />
                        <div>
                          <span className="text-xs font-bold block text-white">Full Clearance</span>
                          <span className="text-[10px] text-zinc-400">All locked case studies, papers & archives</span>
                        </div>
                      </label>

                      <label 
                        className={`p-2.5 rounded-xl border cursor-pointer flex items-center gap-2.5 transition-all ${
                          newScope === 'specific' 
                            ? 'bg-purple-500/10 border-purple-500/30 text-white' 
                            : 'bg-zinc-900/60 border-white/5 text-zinc-400 hover:text-zinc-200'
                        }`}
                      >
                        <input 
                          type="radio" 
                          name="scope" 
                          value="specific" 
                          checked={newScope === 'specific'}
                          onChange={() => setNewScope('specific')}
                          className="accent-purple-500"
                        />
                        <div>
                          <span className="text-xs font-bold block text-white">Single Specific Article</span>
                          <span className="text-[10px] text-zinc-400">Permit access to ONLY one exact asset</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* If Single Specific Article chosen: Picker dropdown */}
                  {newScope === 'specific' && (
                    <div className="space-y-1.5 p-3 rounded-xl border border-purple-500/20 bg-purple-500/5">
                      <span className="text-[10px] font-bold text-purple-300 uppercase tracking-wider block">
                        Select Allowed Article / Resource
                      </span>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
                        <input
                          type="text"
                          placeholder="Filter articles (e.g. IAM, GenAI, FAIR, 8-K)..."
                          value={resourceSearch}
                          onChange={(e) => setResourceSearch(e.target.value)}
                          className="w-full rounded-lg bg-zinc-900 border border-white/10 pl-8 pr-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:border-purple-500 focus:outline-none"
                        />
                      </div>

                      <select
                        size={5}
                        value={selectedArticleId}
                        onChange={(e) => setSelectedArticleId(e.target.value)}
                        className="w-full rounded-lg bg-zinc-900 border border-white/10 p-1.5 text-xs text-white focus:border-purple-500 focus:outline-none overflow-y-auto"
                      >
                        {selectableResources.map((item) => (
                          <option key={item.id} value={item.id} className="p-1.5 rounded hover:bg-purple-600/30">
                            [{item.section.toUpperCase()}] {item.title}
                          </option>
                        ))}
                      </select>

                      {selectedArticleId && (
                        <div className="text-[11px] text-emerald-300 flex items-center gap-1.5 pt-1">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                          <span>
                            Selected: <strong>{getResourceById(selectedArticleId)?.title || selectedArticleId}</strong>
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs py-2.5 transition-colors cursor-pointer disabled:opacity-60"
                  >
                    {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <UserPlus className="w-3.5 h-3.5" />}
                    <span>{newScope === 'specific' ? 'Provision Single-Article Clearance' : 'Grant Full Access'}</span>
                  </button>
                </form>

                {/* Edit Existing User Drawer Modal */}
                {editingUser && (
                  <form onSubmit={handleSaveEditUser} className="p-4 rounded-xl border border-blue-500/30 bg-blue-500/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">
                        Edit Access for: <span className="text-blue-300">{editingUser.email}</span>
                      </span>
                      <button 
                        type="button" 
                        onClick={() => setEditingUser(null)} 
                        className="text-zinc-400 hover:text-white text-xs"
                      >
                        Cancel
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <label className="flex items-center gap-2 p-2 rounded bg-zinc-900/80 border border-white/10 cursor-pointer">
                        <input 
                          type="radio" 
                          name="editScope" 
                          value="global" 
                          checked={editScope === 'global'} 
                          onChange={() => setEditScope('global')}
                          className="accent-blue-500" 
                        />
                        <span>Full Clearance</span>
                      </label>
                      <label className="flex items-center gap-2 p-2 rounded bg-zinc-900/80 border border-white/10 cursor-pointer">
                        <input 
                          type="radio" 
                          name="editScope" 
                          value="specific" 
                          checked={editScope === 'specific'} 
                          onChange={() => setEditScope('specific')}
                          className="accent-blue-500" 
                        />
                        <span>Single Article</span>
                      </label>
                    </div>

                    {editScope === 'specific' && (
                      <select
                        value={editArticleId}
                        onChange={(e) => setEditArticleId(e.target.value)}
                        className="w-full rounded-lg bg-zinc-900 border border-white/10 p-2 text-xs text-white"
                      >
                        <option value="">-- Choose Granted Article --</option>
                        {allResources.map((item) => (
                          <option key={item.id} value={item.id}>
                            [{item.section.toUpperCase()}] {item.title}
                          </option>
                        ))}
                      </select>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg"
                    >
                      Update Clearance
                    </button>
                  </form>
                )}

                {/* Allowlist Registry */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                      Active Authorized Personnel Registry
                    </span>
                    <span className="text-[9px] font-mono text-zinc-500">{allowlist.length} Credentials</span>
                  </div>

                  <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
                    {allowlist.length === 0 ? (
                      <p className="text-center text-[11px] text-zinc-500 py-4">
                        No custom records yet. Super-admin is authorized by default.
                      </p>
                    ) : (
                      allowlist.map((item) => {
                        const isSpecific = item.scope === 'specific';
                        const firstItem = item.allowedItems?.[0];
                        const res = firstItem ? getResourceById(firstItem) : null;

                        return (
                          <div 
                            key={item.email}
                            className="flex items-center justify-between p-2.5 rounded-xl border border-white/5 bg-white/[0.02] gap-2"
                          >
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <p className="text-xs font-semibold text-white truncate">{item.email}</p>
                                <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-zinc-800 text-zinc-300 capitalize">
                                  {item.role}
                                </span>
                              </div>
                              <div className="mt-0.5 flex items-center gap-1.5">
                                {isSpecific ? (
                                  <span className="text-[9px] text-purple-300 bg-purple-500/10 border border-purple-500/20 px-1.5 py-0.5 rounded truncate max-w-xs">
                                    Single Article: {res ? res.title : (firstItem || 'None assigned')}
                                  </span>
                                ) : (
                                  <span className="text-[9px] text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded">
                                    Full Portfolio Clearance
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                onClick={() => {
                                  setEditingUser(item);
                                  setEditScope(item.scope || 'global');
                                  setEditArticleId(item.allowedItems?.[0] || '');
                                }}
                                className="p-1.5 rounded-lg hover:bg-blue-500/10 text-zinc-400 hover:text-blue-400 transition-colors"
                                title="Edit clearance"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleRemoveEmail(item.email)}
                                className="p-1.5 rounded-lg hover:bg-red-500/10 text-zinc-400 hover:text-red-400 transition-colors"
                                title="Revoke access"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            ) : null}

            {/* TAB 3 / DEFAULT: STATUS & AUTHENTICATION PANEL */}
            {(!isAdmin || adminTab === 'status') ? (
              <div className="space-y-5">
                {user ? (
                  /* Authenticated User Status */
                  <div className="space-y-5">
                    {/* User Identity Banner */}
                    <div className="flex items-center gap-3 p-3.5 rounded-xl border border-white/10 bg-white/[0.02]">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                        {isAdmin ? <ShieldCheck className="w-5 h-5" /> : <UserCheck className="w-5 h-5" />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white truncate">{user.email}</span>
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold uppercase">
                            Verified
                          </span>
                        </div>
                        <span className="text-[11px] text-zinc-400 block truncate">
                          {isAdmin ? 'Super Administrator Access' : 'Enterprise Verified Personnel'}
                        </span>
                      </div>
                    </div>

                    {/* Single-Article Restriction Notice if applicable */}
                    {isItemForbiddenForCurrentUser ? (
                      <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 text-left space-y-2.5">
                        <div className="flex items-center gap-2 text-amber-300 font-bold text-xs">
                          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                          <span>Clearance Restricted to Single Asset</span>
                        </div>
                        <p className="text-xs text-amber-200/90 leading-relaxed">
                          Your authenticated profile is granted clearance specifically for:
                          <strong className="block text-white mt-1">
                            "{grantedItemTitle}"
                          </strong>
                          Access to <strong>"{targetResource?.title}"</strong> requires separate administrative authorization.
                        </p>
                      </div>
                    ) : (
                      <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-left space-y-2">
                        <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>
                            {currentUserEntry?.scope === 'specific' ? 'Single-Resource Clearance Active' : 'Full Clearance Active'}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-300 leading-relaxed">
                          {currentUserEntry?.scope === 'specific' ? (
                            <>
                              You are authorized to view: <strong>"{grantedItemTitle}"</strong>.
                            </>
                          ) : (
                            'Your credentials have been validated with full clearance to view protected case studies, publications, and archive dossiers.'
                          )}
                        </p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-2.5 pt-2">
                      <button
                        onClick={handleClose}
                        className="flex-1 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-2.5 transition-colors cursor-pointer"
                      >
                        Proceed to Content
                      </button>
                      <button
                        onClick={signOut}
                        className="flex items-center gap-1.5 rounded-xl border border-white/10 hover:bg-white/5 text-zinc-300 hover:text-white font-bold text-xs px-3.5 py-2.5 transition-all cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Unauthenticated Login Portal */
                  <div className="space-y-4">
                    <div className="space-y-1 text-center sm:text-left">
                      <h4 className="text-sm font-bold text-white tracking-tight">Executive Identity Verification</h4>
                      <p className="text-[11px] text-zinc-400 leading-relaxed">
                        Case Studies, Publications, and Archive items are secured by Firebase Authentication with granular single-article or full clearance allowlisting.
                      </p>
                    </div>

                    {error && (
                      <div className="flex gap-2 p-3 rounded-xl border border-red-500/20 bg-red-500/10 text-[11px] text-red-300">
                        <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
                        <span>{error}</span>
                      </div>
                    )}

                    {/* Primary Option: Google Authentication via Firebase */}
                    <button
                      type="button"
                      onClick={handleGoogleSignIn}
                      disabled={googleLoading}
                      className="w-full flex items-center justify-center gap-2.5 rounded-xl bg-white hover:bg-zinc-100 text-zinc-900 font-bold text-xs py-2.5 px-4 transition-all shadow-md cursor-pointer disabled:opacity-60"
                    >
                      {googleLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin text-zinc-700" />
                      ) : (
                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                          <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                          />
                          <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                          />
                        </svg>
                      )}
                      <span>Continue with Google</span>
                    </button>

                    <div className="relative flex items-center justify-center my-2">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/10" />
                      </div>
                      <span className="relative px-3 bg-zinc-950 text-[10px] uppercase font-mono text-zinc-500">
                        Or authenticate with email
                      </span>
                    </div>

                    {success ? (
                      <div className="space-y-4 p-4 rounded-xl border border-emerald-500/15 bg-emerald-500/5 text-center">
                        <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto" />
                        <div className="space-y-1">
                          <h5 className="text-xs font-bold text-white uppercase tracking-wider">Secure Access Link Dispatched</h5>
                          <p className="text-[11px] text-zinc-300 leading-normal">
                            We've sent a sign-in link to your email. Click it to authenticate your session.
                          </p>
                        </div>
                        <button
                          onClick={() => setSuccess(false)}
                          className="text-xs font-bold text-emerald-400 hover:underline cursor-pointer"
                        >
                          Send another link
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleSendLink} className="space-y-2.5">
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                          <input
                            type="email"
                            required
                            placeholder="executive@company.com"
                            value={emailInput}
                            onChange={(e) => setEmailInput(e.target.value)}
                            className="w-full rounded-xl bg-white/[0.03] border border-white/10 pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none transition-all"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-2.5 transition-colors cursor-pointer disabled:opacity-60"
                        >
                          {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Lock className="w-3.5 h-3.5" />}
                          <span>Request Verification Link</span>
                        </button>
                      </form>
                    )}
                  </div>
                )}
              </div>
            ) : null}

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
