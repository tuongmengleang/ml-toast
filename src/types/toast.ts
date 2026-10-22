import { ReactNode } from 'react';
import { SoundEffectType } from '../utils/sound';

export type ToastType = 
  | 'comment' 
  | 'reminder' 
  | 'build' 
  | 'mention' 
  | 'success' 
  | 'danger' 
  | 'error' 
  | 'warning' 
  | 'info' 
  | 'custom';

export type ToastPosition = 
  | 'top-center' 
  | 'top-right' 
  | 'top-left' 
  | 'bottom-center' 
  | 'bottom-right' 
  | 'bottom-left';

export type ToastStackMode = 'list' | 'stacked';

export interface ToastAction {
  label: string;
  onClick: (e: React.MouseEvent) => void;
  variant?: 'primary' | 'secondary' | 'subtle';
}

export interface ToastOptions {
  title: string;
  message?: string;
  type?: ToastType;
  duration?: number; // In ms. If 0 or Infinity, does not auto-dismiss
  dismissible?: boolean;
  action?: ToastAction;
  secondaryAction?: ToastAction;
  icon?: ReactNode;
  sound?: SoundEffectType | false;
  onDismiss?: (id: string) => void;
}

export interface ToastItem extends ToastOptions {
  id: string;
  createdAt: number;
  type: ToastType;
}

export interface ToastStyleConfig {
  iconWrapperBg: string;
  iconWrapperBorder: string;
  iconWrapperShadow: string;
  iconColor: string;
  defaultTitle: string;
  defaultMessage: string;
  sound: SoundEffectType;
}
