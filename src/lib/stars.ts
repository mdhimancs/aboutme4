import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  increment, 
  onSnapshot,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './firebase';

export interface PageStats {
  pageId: string;
  stars: number;
  lastUpdated: any;
}

export const incrementStars = async (pageId: string) => {
  const docRef = doc(db, 'page_stats', pageId);
  try {
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      await setDoc(docRef, {
        pageId,
        stars: 1,
        lastUpdated: serverTimestamp()
      });
    } else {
      await updateDoc(docRef, {
        stars: increment(1),
        lastUpdated: serverTimestamp()
      });
    }
  } catch (error) {
    console.error('Error incrementing stars:', error);
  }
};

export const subscribeToStars = (pageId: string, callback: (stars: number) => void) => {
  const docRef = doc(db, 'page_stats', pageId);
  return onSnapshot(docRef, (doc) => {
    if (doc.exists()) {
      callback(doc.data().stars || 0);
    } else {
      callback(0);
    }
  });
};
