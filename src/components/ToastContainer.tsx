import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { ToastItem, ToastPosition, ToastStackMode } from '../types/toast';
import { Toast } from './Toast';

interface ToastContainerProps {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
  position?: ToastPosition;
  stackMode?: ToastStackMode;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  onDismiss,
  position = 'top-center',
  stackMode = 'list',
}) => {
  const [isStackHovered, setIsStackHovered] = useState(false);

  // Position classes
  const getPositionClasses = (pos: ToastPosition) => {
    switch (pos) {
      case 'top-center':
        return 'top-6 left-1/2 -translate-x-1/2 items-center';
      case 'top-right':
        return 'top-6 right-6 items-end';
      case 'top-left':
        return 'top-6 left-6 items-start';
      case 'bottom-center':
        return 'bottom-6 left-1/2 -translate-x-1/2 items-center';
      case 'bottom-right':
        return 'bottom-6 right-6 items-end';
      case 'bottom-left':
        return 'bottom-6 left-6 items-start';
      default:
        return 'top-6 left-1/2 -translate-x-1/2 items-center';
    }
  };

  if (toasts.length === 0) return null;

  const isStacked = stackMode === 'stacked';

  return (
    <div
      className={`fixed z-50 flex flex-col pointer-events-none w-full max-w-[420px] px-4 transition-all duration-300 ${getPositionClasses(
        position
      )}`}
      onMouseEnter={() => setIsStackHovered(true)}
      onMouseLeave={() => setIsStackHovered(false)}
    >
      <div
        className={`pointer-events-auto w-full flex flex-col ${
          isStacked && !isStackHovered ? 'relative' : 'gap-3'
        }`}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {toasts.map((toast, index) => (
            <div
              key={toast.id}
              className={isStacked && !isStackHovered && index > 0 ? 'absolute inset-0' : 'w-full'}
            >
              <Toast
                toast={toast}
                onDismiss={onDismiss}
                isStacked={isStacked}
                index={index}
                total={toasts.length}
                isExpanded={isStackHovered}
              />
            </div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
