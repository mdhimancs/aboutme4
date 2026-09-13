import React, { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { subscribeToStars } from '../lib/stars';
import { motion, AnimatePresence } from 'framer-motion';

interface StarsCounterProps {
  pageId: string;
  isLight?: boolean;
  compact?: boolean;
}

export const StarsCounter: React.FC<StarsCounterProps> = ({ pageId, isLight = false, compact = false }) => {
  const [stars, setStars] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToStars(pageId, (newStars) => {
      if (stars !== null && newStars > stars) {
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 1000);
      }
      setStars(newStars);
    });
    return () => unsubscribe();
  }, [pageId, stars]);

  if (stars === null) return null;

  if (compact) {
    return (
      <div className={`flex items-center gap-1 transition-all ${
        isLight ? 'text-zinc-500' : 'text-zinc-400'
      }`}>
        <motion.div
          animate={isAnimating ? { scale: [1, 1.4, 1] } : {}}
          transition={{ duration: 0.5 }}
        >
          <Star className={`w-2.5 h-2.5 ${stars > 0 ? 'fill-current' : ''}`} />
        </motion.div>
        <span className="text-[10px] font-bold tracking-tight">
          {stars.toLocaleString()}
        </span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border backdrop-blur-md transition-all ${
      isLight 
        ? 'bg-amber-50/90 border-amber-200 text-amber-700 shadow-sm' 
        : 'bg-amber-500/10 border-amber-500/20 text-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.15)]'
    }`}>
      <motion.div
        animate={isAnimating ? { scale: [1, 1.4, 1], rotate: [0, 20, -20, 0] } : {}}
        transition={{ duration: 0.5 }}
      >
        <Star className={`w-3.5 h-3.5 ${stars > 0 ? 'fill-current' : ''}`} />
      </motion.div>
      <AnimatePresence mode="wait">
        <motion.span
          key={stars}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          className="text-[11px] sm:text-xs font-bold tracking-tight"
        >
          {stars.toLocaleString()}
        </motion.span>
      </AnimatePresence>
      <span className="text-[9px] uppercase tracking-wider font-semibold opacity-70">Reads</span>
    </div>
  );
};
