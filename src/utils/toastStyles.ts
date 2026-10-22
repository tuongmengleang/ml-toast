import { ToastType, ToastStyleConfig } from '../types/toast';

export const TOAST_STYLES: Record<ToastType, ToastStyleConfig> = {
  comment: {
    // Pale sky blue gradient with tactile bevel & bright blue stroke
    iconWrapperBg: 'linear-gradient(180deg, #dceaff 0%, #bdd7fd 100%)',
    iconWrapperBorder: 'rgba(147, 197, 253, 0.8)',
    iconWrapperShadow: 'inset 0 2px 2px rgba(255, 255, 255, 0.95), inset 0 -2px 2px rgba(37, 99, 235, 0.18), 0 3px 6px -1px rgba(37, 99, 235, 0.12)',
    iconColor: '#2563eb',
    defaultTitle: 'New comment',
    defaultMessage: 'Ava: “Love this shot!”',
    sound: 'bubble',
  },
  reminder: {
    // Soft peach-orange gradient with tactile bevel & coral orange stroke
    iconWrapperBg: 'linear-gradient(180deg, #ffe7d3 0%, #ffd0b0 100%)',
    iconWrapperBorder: 'rgba(253, 186, 116, 0.8)',
    iconWrapperShadow: 'inset 0 2px 2px rgba(255, 255, 255, 0.95), inset 0 -2px 2px rgba(234, 88, 12, 0.18), 0 3px 6px -1px rgba(234, 88, 12, 0.12)',
    iconColor: '#ea580c',
    defaultTitle: 'Reminder',
    defaultMessage: 'Standup in 15 min',
    sound: 'reminder',
  },
  build: {
    // Soft lavender-purple gradient with tactile bevel & vivid purple stroke
    iconWrapperBg: 'linear-gradient(180deg, #f2e3ff 0%, #dfc3fc 100%)',
    iconWrapperBorder: 'rgba(216, 180, 254, 0.8)',
    iconWrapperShadow: 'inset 0 2px 2px rgba(255, 255, 255, 0.95), inset 0 -2px 2px rgba(147, 51, 234, 0.18), 0 3px 6px -1px rgba(147, 51, 234, 0.12)',
    iconColor: '#9333ea',
    defaultTitle: 'Build Complete',
    defaultMessage: 'v1.4.3 deployed',
    sound: 'build',
  },
  mention: {
    // Soft golden-yellow gradient with tactile bevel & warm amber stroke
    iconWrapperBg: 'linear-gradient(180deg, #fef1c9 0%, #fde08b 100%)',
    iconWrapperBorder: 'rgba(252, 211, 77, 0.8)',
    iconWrapperShadow: 'inset 0 2px 2px rgba(255, 255, 255, 0.95), inset 0 -2px 2px rgba(217, 119, 6, 0.18), 0 3px 6px -1px rgba(217, 119, 6, 0.12)',
    iconColor: '#d97706',
    defaultTitle: 'Mention',
    defaultMessage: '@you in #design',
    sound: 'mention',
  },
  success: {
    // Soft mint emerald gradient with tactile bevel & vibrant green stroke
    iconWrapperBg: 'linear-gradient(180deg, #dcfce7 0%, #bbf7d0 100%)',
    iconWrapperBorder: 'rgba(134, 239, 172, 0.85)',
    iconWrapperShadow: 'inset 0 2px 2px rgba(255, 255, 255, 0.95), inset 0 -2px 2px rgba(22, 163, 74, 0.2), 0 3px 6px -1px rgba(22, 163, 74, 0.14)',
    iconColor: '#16a34a',
    defaultTitle: 'Success',
    defaultMessage: 'Changes published to production',
    sound: 'success',
  },
  danger: {
    // Soft blush-rose gradient with tactile bevel & vibrant ruby-crimson stroke
    iconWrapperBg: 'linear-gradient(180deg, #ffe4e6 0%, #fecdd3 100%)',
    iconWrapperBorder: 'rgba(253, 164, 175, 0.85)',
    iconWrapperShadow: 'inset 0 2px 2px rgba(255, 255, 255, 0.95), inset 0 -2px 2px rgba(225, 29, 72, 0.2), 0 3px 6px -1px rgba(225, 29, 72, 0.14)',
    iconColor: '#e11d48',
    defaultTitle: 'Connection Failed',
    defaultMessage: 'Unable to reach payment gateway',
    sound: 'danger',
  },
  error: {
    // Compatible alias with danger
    iconWrapperBg: 'linear-gradient(180deg, #ffe4e6 0%, #fecdd3 100%)',
    iconWrapperBorder: 'rgba(253, 164, 175, 0.85)',
    iconWrapperShadow: 'inset 0 2px 2px rgba(255, 255, 255, 0.95), inset 0 -2px 2px rgba(225, 29, 72, 0.2), 0 3px 6px -1px rgba(225, 29, 72, 0.14)',
    iconColor: '#e11d48',
    defaultTitle: 'Error',
    defaultMessage: 'An unexpected issue occurred',
    sound: 'danger',
  },
  warning: {
    // Soft creamy amber-marigold gradient with tactile bevel & warm amber stroke
    iconWrapperBg: 'linear-gradient(180deg, #fef3c7 0%, #fde68a 100%)',
    iconWrapperBorder: 'rgba(252, 211, 77, 0.85)',
    iconWrapperShadow: 'inset 0 2px 2px rgba(255, 255, 255, 0.95), inset 0 -2px 2px rgba(217, 119, 6, 0.2), 0 3px 6px -1px rgba(217, 119, 6, 0.14)',
    iconColor: '#d97706',
    defaultTitle: 'Storage Limit Warning',
    defaultMessage: 'Account is at 92% cloud capacity',
    sound: 'warning',
  },
  info: {
    // Soft crystalline ice-blue gradient with tactile bevel & clear azure stroke
    iconWrapperBg: 'linear-gradient(180deg, #e0f2fe 0%, #bae6fd 100%)',
    iconWrapperBorder: 'rgba(125, 211, 252, 0.85)',
    iconWrapperShadow: 'inset 0 2px 2px rgba(255, 255, 255, 0.95), inset 0 -2px 2px rgba(2, 132, 199, 0.2), 0 3px 6px -1px rgba(2, 132, 199, 0.14)',
    iconColor: '#0284c7',
    defaultTitle: 'System Update',
    defaultMessage: 'New version v1.4.4 ready to install',
    sound: 'info',
  },
  custom: {
    iconWrapperBg: 'linear-gradient(180deg, #f1f5f9 0%, #e2e8f0 100%)',
    iconWrapperBorder: 'rgba(203, 213, 225, 0.8)',
    iconWrapperShadow: 'inset 0 2px 2px rgba(255, 255, 255, 0.95), inset 0 -2px 2px rgba(100, 116, 139, 0.18), 0 3px 6px -1px rgba(100, 116, 139, 0.12)',
    iconColor: '#475569',
    defaultTitle: 'Notification',
    defaultMessage: 'You have a new update',
    sound: 'bubble',
  },
};
