import React, { useState } from 'react';
import { Copy, Check, Terminal, Code2, BookOpen } from 'lucide-react';

export const CodeSnippetViewer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'usage' | 'toast' | 'provider' | 'css'>('usage');
  const [copied, setCopied] = useState(false);

  const snippets = {
    usage: `import { useToast } from './context/ToastContext';

export function MyComponent() {
  const { toast } = useToast();

  return (
    <div className="flex flex-wrap gap-2">
      {/* 1. Newly Added Status Types */}
      <button onClick={() => toast.success('Changes Saved', 'All files synchronized')}>
        Success
      </button>

      <button onClick={() => toast.danger('Connection Lost', 'Payment gateway timed out')}>
        Danger
      </button>

      <button onClick={() => toast.warning('Storage Warning', 'Capacity reached 92%')}>
        Warning
      </button>

      <button onClick={() => toast.info('System Update', 'Restart to apply v1.4.4')}>
        Info
      </button>

      {/* 2. Original Design Mockup Presets */}
      <button onClick={() => toast.comment('New comment', 'Ava: “Love this shot!”')}>
        Comment
      </button>

      <button onClick={() => toast.reminder('Reminder', 'Standup in 15 min')}>
        Reminder
      </button>

      <button onClick={() => toast.build('Build Complete', 'v1.4.3 deployed')}>
        Build
      </button>

      <button onClick={() => toast.mention('Mention', '@you in #design')}>
        Mention
      </button>

      {/* 3. With Interactive Action */}
      <button onClick={() => toast.danger('Build Failed', 'Check error console', {
        action: { label: 'Retry', onClick: () => toast.success('Retrying build...') }
      })}>
        With Action
      </button>
    </div>
  );
}`,
    toast: `// Toast.tsx - Tactile Pill Component with Pebble Icon Well
import React from 'react';
import { motion, PanInfo } from 'motion/react';
import { ToastIcon } from './ToastIcons';
import { TOAST_STYLES } from '../utils/toastStyles';

export const Toast = ({ toast, onDismiss }) => {
  const style = TOAST_STYLES[toast.type];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(_, info) => Math.abs(info.offset.x) > 80 && onDismiss(toast.id)}
      className="relative flex items-center gap-3.5 px-3.5 py-3 w-full rounded-full bg-white/95 backdrop-blur-xl border border-white/90 shadow-[0_10px_28px_-4px_rgba(15,23,42,0.08),0_4px_10px_-2px_rgba(15,23,42,0.04)]"
    >
      {/* 3D Tactile Pebble Well */}
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
        style={{
          background: style.iconWrapperBg,
          border: \`1.5px solid \${style.iconWrapperBorder}\`,
          boxShadow: style.iconWrapperShadow,
          color: style.iconColor,
        }}
      >
        <ToastIcon type={toast.type} size={22} />
      </div>

      {/* Typography Stack */}
      <div className="flex-1 min-w-0">
        <div className="text-[15.5px] font-semibold text-slate-800 leading-tight truncate">
          {toast.title}
        </div>
        <div className="text-[14px] text-slate-500 font-normal leading-snug mt-0.5 truncate">
          {toast.message}
        </div>
      </div>
    </motion.div>
  );
};`,
    provider: `// ToastContext.tsx - Root Provider & Imperative Dispatcher
import { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((opts) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [{ id, ...opts }, ...prev]);
    if (opts.duration !== 0) {
      setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), opts.duration || 5000);
    }
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, toasts }}>
      {children}
      <ToastContainer toasts={toasts} />
    </ToastContext.Provider>
  );
};`,
    css: `/* Tailwind CSS Tokens for Tactile Pill Toasts */
.toast-pill-shadow {
  box-shadow: 
    0 12px 32px -4px rgba(15, 23, 42, 0.08),
    0 4px 12px -2px rgba(15, 23, 42, 0.04),
    0 0 0 1px rgba(255, 255, 255, 0.8) inset,
    0 0 0 1px rgba(0, 0, 0, 0.03);
}`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(snippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 text-slate-200 shadow-xl overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Terminal size={18} className="text-blue-400" />
          <h2 className="text-lg font-bold text-white">Integration & Code Snippets</h2>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 p-1 bg-slate-800 rounded-xl">
            <button
              onClick={() => setActiveTab('usage')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                activeTab === 'usage' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen size={13} className="inline mr-1" />
              Usage
            </button>
            <button
              onClick={() => setActiveTab('toast')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                activeTab === 'toast' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Code2 size={13} className="inline mr-1" />
              Toast.tsx
            </button>
            <button
              onClick={() => setActiveTab('provider')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                activeTab === 'provider' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Provider
            </button>
            <button
              onClick={() => setActiveTab('css')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                activeTab === 'css' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              CSS
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all active:scale-95 border border-slate-700"
          >
            {copied ? (
              <>
                <Check size={13} className="text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy size={13} />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>
      </div>

      <pre className="mt-5 p-4 rounded-2xl bg-slate-950 font-mono text-xs sm:text-sm text-slate-300 overflow-x-auto leading-relaxed border border-slate-800/80">
        <code>{snippets[activeTab]}</code>
      </pre>
    </div>
  );
};
