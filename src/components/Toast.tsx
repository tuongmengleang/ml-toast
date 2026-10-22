import React, { useEffect, useState, useRef } from 'react';
import { motion, PanInfo } from 'motion/react';
import { ToastItem } from '../types/toast';
import { TOAST_STYLES } from '../utils/toastStyles';
import { ToastIcon } from './ToastIcons';
import { X } from 'lucide-react';

interface ToastProps {
  toast: ToastItem;
  onDismiss: (id: string) => void;
  isStacked?: boolean;
  index?: number;
  total?: number;
  isExpanded?: boolean;
}

export const Toast: React.FC<ToastProps> = ({
  toast,
  onDismiss,
  isStacked = false,
  index = 0,
  total = 1,
  isExpanded = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(100);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const remainingTimeRef = useRef<number>(toast.duration ?? 5000);

  const styleConfig = TOAST_STYLES[toast.type] || TOAST_STYLES.custom;
  const autoDismiss = toast.duration !== 0 && (toast.duration ?? 5000) > 0;
  const duration = toast.duration ?? 5000;

  // Handle countdown & auto-dismiss with pause on hover
  useEffect(() => {
    if (!autoDismiss) return;

    if (isHovered) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    startTimeRef.current = Date.now();
    const interval = 50;

    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const newRemaining = Math.max(0, remainingTimeRef.current - elapsed);
      setProgress((newRemaining / duration) * 100);

      if (newRemaining <= 0) {
        if (timerRef.current) clearInterval(timerRef.current);
        onDismiss(toast.id);
      }
    }, interval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      const elapsed = Date.now() - startTimeRef.current;
      remainingTimeRef.current = Math.max(0, remainingTimeRef.current - elapsed);
    };
  }, [isHovered, autoDismiss, duration, onDismiss, toast.id]);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    // Dismiss if dragged past 80px in either direction or flicked with velocity
    if (Math.abs(info.offset.x) > 80 || Math.abs(info.velocity.x) > 400) {
      onDismiss(toast.id);
    }
  };

  // Stacked animation calculation (Sonner / iOS stack physics)
  // When stacked: top items scale down and peek slightly from behind
  const reverseIndex = (total - 1) - index;
  const isTopItem = reverseIndex === 0;

  const stackVariants = {
    stacked: {
      scale: isTopItem ? 1 : Math.max(0.85, 1 - reverseIndex * 0.05),
      y: isTopItem ? 0 : -reverseIndex * 12,
      opacity: reverseIndex > 3 ? 0 : 1 - reverseIndex * 0.15,
      zIndex: total - reverseIndex,
    },
    expanded: {
      scale: 1,
      y: 0,
      opacity: 1,
      zIndex: total - index,
    },
    list: {
      scale: 1,
      y: 0,
      opacity: 1,
      zIndex: total - index,
    },
  };

  const currentMode = !isStacked ? 'list' : isExpanded ? 'expanded' : 'stacked';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -24, scale: 0.94 }}
      animate={stackVariants[currentMode]}
      exit={{ opacity: 0, scale: 0.9, y: -16, transition: { duration: 0.2 } }}
      transition={{
        type: 'spring',
        stiffness: 450,
        damping: 32,
        mass: 0.8,
      }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.65}
      onDragEnd={handleDragEnd}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative w-full select-none cursor-grab active:cursor-grabbing touch-none"
    >
      {/* Main Pill Toast Card */}
      <div
        className={`relative flex items-center gap-3.5 px-3 py-2.5 sm:px-3.5 sm:py-3 w-full rounded-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-white/90 dark:border-slate-800/80 transition-shadow duration-200 ${
          isHovered
            ? 'shadow-[0_16px_36px_-6px_rgba(15,23,42,0.12),0_6px_16px_-3px_rgba(15,23,42,0.06),0_0_0_1px_rgba(0,0,0,0.04)] dark:shadow-[0_20px_40px_-6px_rgba(0,0,0,0.65)]'
            : 'shadow-[0_10px_28px_-4px_rgba(15,23,42,0.08),0_4px_10px_-2px_rgba(15,23,42,0.04),0_0_0_1px_rgba(0,0,0,0.03)] dark:shadow-[0_14px_30px_-4px_rgba(0,0,0,0.55)]'
        }`}
      >
        {/* Tactile Pebble 3D Icon Container */}
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 relative transition-transform duration-200 group-hover:scale-[1.03]"
          style={{
            background: styleConfig.iconWrapperBg,
            border: `1.5px solid ${styleConfig.iconWrapperBorder}`,
            boxShadow: styleConfig.iconWrapperShadow,
          }}
        >
          {toast.icon ? (
            <div style={{ color: styleConfig.iconColor }}>{toast.icon}</div>
          ) : (
            <ToastIcon
              type={toast.type}
              size={22}
              className="transition-transform duration-200"
              style={{ color: styleConfig.iconColor }}
            />
          )}
        </div>

        {/* Text Content */}
        <div className="flex-1 min-w-0 pr-1 flex flex-col justify-center">
          <div className="text-[15.5px] font-semibold text-slate-800 dark:text-slate-100 tracking-[-0.015em] leading-tight truncate">
            {toast.title}
          </div>
          {toast.message && (
            <div className="text-[14px] text-slate-500 dark:text-slate-400 font-normal leading-snug mt-0.5 truncate">
              {toast.message}
            </div>
          )}
        </div>

        {/* Action Button (if present) */}
        {toast.action && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              toast.action?.onClick(e);
            }}
            className="shrink-0 px-3 py-1.5 text-xs font-semibold rounded-full bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition-all duration-150 mr-1"
          >
            {toast.action.label}
          </button>
        )}

        {/* Close Button on Hover or if explicitly dismissible */}
        {(toast.dismissible !== false) && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDismiss(toast.id);
            }}
            aria-label="Dismiss notification"
            className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 opacity-0 group-hover:opacity-100 transition-all duration-150 active:scale-90"
          >
            <X size={14} strokeWidth={2.4} />
          </button>
        )}

        {/* Auto-dismiss subtle progress line indicator */}
        {autoDismiss && progress < 100 && (
          <div className="absolute bottom-0 left-8 right-8 h-[2px] rounded-full overflow-hidden bg-transparent pointer-events-none">
            <div
              className="h-full bg-slate-200 dark:bg-slate-700 transition-all duration-75 ease-linear opacity-40 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};
