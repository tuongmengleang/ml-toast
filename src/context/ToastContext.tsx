import React, { createContext, useContext, useState, useCallback, useMemo, ReactNode } from 'react';
import {
  ToastItem,
  ToastOptions,
  ToastPosition,
  ToastStackMode,
  ToastType,
} from '../types/toast';
import { ToastContainer } from '../components/ToastContainer';
import { playToastSound, SoundEffectType } from '../utils/sound';
import { TOAST_STYLES } from '../utils/toastStyles';

interface ToastContextValue {
  toasts: ToastItem[];
  showToast: (options: ToastOptions | string) => string;
  dismissToast: (id: string) => void;
  clearAll: () => void;
  position: ToastPosition;
  setPosition: (pos: ToastPosition) => void;
  stackMode: ToastStackMode;
  setStackMode: (mode: ToastStackMode) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  triggerDesignPreset: (type: ToastType | 'all' | 'all-system' | 'all-eight') => void;
  toast: {
    (options: ToastOptions | string): string;
    comment: (title?: string, message?: string, opts?: Partial<ToastOptions>) => string;
    reminder: (title?: string, message?: string, opts?: Partial<ToastOptions>) => string;
    build: (title?: string, message?: string, opts?: Partial<ToastOptions>) => string;
    mention: (title?: string, message?: string, opts?: Partial<ToastOptions>) => string;
    success: (title?: string, message?: string, opts?: Partial<ToastOptions>) => string;
    danger: (title?: string, message?: string, opts?: Partial<ToastOptions>) => string;
    error: (title?: string, message?: string, opts?: Partial<ToastOptions>) => string;
    warning: (title?: string, message?: string, opts?: Partial<ToastOptions>) => string;
    info: (title?: string, message?: string, opts?: Partial<ToastOptions>) => string;
    dismiss: (id: string) => void;
    clearAll: () => void;
  };
}

const ToastContext = createContext<ToastContextValue | null>(null);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [position, setPosition] = useState<ToastPosition>('top-center');
  const [stackMode, setStackMode] = useState<ToastStackMode>('list');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => {
      const item = prev.find((t) => t.id === id);
      if (item?.onDismiss) {
        item.onDismiss(id);
      }
      return prev.filter((t) => t.id !== id);
    });
  }, []);

  const clearAll = useCallback(() => {
    setToasts([]);
  }, []);

  const showToast = useCallback(
    (options: ToastOptions | string): string => {
      const id = 'toast_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now();
      const opts: ToastOptions = typeof options === 'string' ? { title: options } : options;
      const type: ToastType = opts.type || 'comment';
      const styleConfig = TOAST_STYLES[type] || TOAST_STYLES.custom;

      const newItem: ToastItem = {
        id,
        createdAt: Date.now(),
        type,
        title: opts.title || styleConfig.defaultTitle,
        message: opts.message !== undefined ? opts.message : styleConfig.defaultMessage,
        duration: opts.duration ?? 5000,
        dismissible: opts.dismissible ?? true,
        action: opts.action,
        secondaryAction: opts.secondaryAction,
        icon: opts.icon,
        sound: opts.sound,
        onDismiss: opts.onDismiss,
      };

      if (soundEnabled && opts.sound !== false) {
        const soundType: SoundEffectType = opts.sound || styleConfig.sound || 'bubble';
        playToastSound(soundType);
      }

      setToasts((prev) => [newItem, ...prev.slice(0, 9)]); // Keep up to 10 active toasts
      return id;
    },
    [soundEnabled]
  );

  const triggerDesignPreset = useCallback(
    (type: ToastType | 'all' | 'all-system' | 'all-eight') => {
      const originalPresets = [
        {
          type: 'comment' as const,
          title: 'New comment',
          message: 'Ava: “Love this shot!”',
          sound: 'bubble' as SoundEffectType,
        },
        {
          type: 'reminder' as const,
          title: 'Reminder',
          message: 'Standup in 15 min',
          sound: 'reminder' as SoundEffectType,
        },
        {
          type: 'build' as const,
          title: 'Build Complete',
          message: 'v1.4.3 deployed',
          sound: 'build' as SoundEffectType,
        },
        {
          type: 'mention' as const,
          title: 'Mention',
          message: '@you in #design',
          sound: 'mention' as SoundEffectType,
        },
      ];

      const systemPresets = [
        {
          type: 'success' as const,
          title: 'Deployment Succeeded',
          message: 'Production environment healthy',
          sound: 'success' as SoundEffectType,
        },
        {
          type: 'danger' as const,
          title: 'Connection Lost',
          message: 'Unable to sync with remote repo',
          sound: 'danger' as SoundEffectType,
        },
        {
          type: 'warning' as const,
          title: 'Storage Limit Warning',
          message: 'Account is at 92% cloud capacity',
          sound: 'warning' as SoundEffectType,
        },
        {
          type: 'info' as const,
          title: 'System Update',
          message: 'New version v1.4.4 ready to install',
          sound: 'info' as SoundEffectType,
        },
      ];

      if (type === 'all') {
        clearAll();
        originalPresets.forEach((preset, index) => {
          setTimeout(() => {
            showToast({
              type: preset.type,
              title: preset.title,
              message: preset.message,
              sound: preset.sound,
              duration: 10000,
            });
          }, index * 120);
        });
      } else if (type === 'all-system') {
        clearAll();
        systemPresets.forEach((preset, index) => {
          setTimeout(() => {
            showToast({
              type: preset.type,
              title: preset.title,
              message: preset.message,
              sound: preset.sound,
              duration: 10000,
            });
          }, index * 120);
        });
      } else if (type === 'all-eight') {
        clearAll();
        [...originalPresets, ...systemPresets].forEach((preset, index) => {
          setTimeout(() => {
            showToast({
              type: preset.type,
              title: preset.title,
              message: preset.message,
              sound: preset.sound,
              duration: 12000,
            });
          }, index * 140);
        });
      } else {
        const styleConfig = TOAST_STYLES[type] || TOAST_STYLES.custom;
        showToast({
          type,
          title: styleConfig.defaultTitle,
          message: styleConfig.defaultMessage,
          sound: styleConfig.sound,
        });
      }
    },
    [clearAll, showToast]
  );

  const toastMethods = useMemo(() => {
    const fn = (options: ToastOptions | string) => showToast(options);

    fn.comment = (title?: string, message?: string, opts?: Partial<ToastOptions>) =>
      showToast({
        type: 'comment',
        title: title || TOAST_STYLES.comment.defaultTitle,
        message: message !== undefined ? message : TOAST_STYLES.comment.defaultMessage,
        ...opts,
      });

    fn.reminder = (title?: string, message?: string, opts?: Partial<ToastOptions>) =>
      showToast({
        type: 'reminder',
        title: title || TOAST_STYLES.reminder.defaultTitle,
        message: message !== undefined ? message : TOAST_STYLES.reminder.defaultMessage,
        ...opts,
      });

    fn.build = (title?: string, message?: string, opts?: Partial<ToastOptions>) =>
      showToast({
        type: 'build',
        title: title || TOAST_STYLES.build.defaultTitle,
        message: message !== undefined ? message : TOAST_STYLES.build.defaultMessage,
        ...opts,
      });

    fn.mention = (title?: string, message?: string, opts?: Partial<ToastOptions>) =>
      showToast({
        type: 'mention',
        title: title || TOAST_STYLES.mention.defaultTitle,
        message: message !== undefined ? message : TOAST_STYLES.mention.defaultMessage,
        ...opts,
      });

    fn.success = (title?: string, message?: string, opts?: Partial<ToastOptions>) =>
      showToast({
        type: 'success',
        title: title || TOAST_STYLES.success.defaultTitle,
        message: message !== undefined ? message : TOAST_STYLES.success.defaultMessage,
        ...opts,
      });

    fn.danger = (title?: string, message?: string, opts?: Partial<ToastOptions>) =>
      showToast({
        type: 'danger',
        title: title || TOAST_STYLES.danger.defaultTitle,
        message: message !== undefined ? message : TOAST_STYLES.danger.defaultMessage,
        ...opts,
      });

    fn.error = (title?: string, message?: string, opts?: Partial<ToastOptions>) =>
      showToast({
        type: 'danger',
        title: title || TOAST_STYLES.danger.defaultTitle,
        message: message !== undefined ? message : TOAST_STYLES.danger.defaultMessage,
        ...opts,
      });

    fn.warning = (title?: string, message?: string, opts?: Partial<ToastOptions>) =>
      showToast({
        type: 'warning',
        title: title || TOAST_STYLES.warning.defaultTitle,
        message: message !== undefined ? message : TOAST_STYLES.warning.defaultMessage,
        ...opts,
      });

    fn.info = (title?: string, message?: string, opts?: Partial<ToastOptions>) =>
      showToast({
        type: 'info',
        title: title || TOAST_STYLES.info.defaultTitle,
        message: message !== undefined ? message : TOAST_STYLES.info.defaultMessage,
        ...opts,
      });

    fn.dismiss = dismissToast;
    fn.clearAll = clearAll;

    return fn;
  }, [showToast, dismissToast, clearAll]);

  const value = useMemo(
    () => ({
      toasts,
      showToast,
      dismissToast,
      clearAll,
      position,
      setPosition,
      stackMode,
      setStackMode,
      soundEnabled,
      setSoundEnabled,
      triggerDesignPreset,
      toast: toastMethods,
    }),
    [
      toasts,
      showToast,
      dismissToast,
      clearAll,
      position,
      stackMode,
      soundEnabled,
      triggerDesignPreset,
      toastMethods,
    ]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer
        toasts={toasts}
        onDismiss={dismissToast}
        position={position}
        stackMode={stackMode}
      />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
