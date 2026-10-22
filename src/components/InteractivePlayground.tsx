import React, { useState } from 'react';
import { useToast } from '../context/ToastContext';
import { ToastPosition, ToastStackMode, ToastType } from '../types/toast';
import {
  Play,
  Volume2,
  VolumeX,
  Layers,
  ListFilter,
  Sparkles,
  Sliders,
  Send,
  Workflow,
  PlusCircle,
  Trash2,
  CheckCircle2,
  AlertOctagon,
  AlertTriangle,
  Info,
} from 'lucide-react';
import { ToastIcon } from './ToastIcons';

export const InteractivePlayground: React.FC = () => {
  const {
    toast,
    toasts,
    clearAll,
    position,
    setPosition,
    stackMode,
    setStackMode,
    soundEnabled,
    setSoundEnabled,
    triggerDesignPreset,
  } = useToast();

  // Custom Toast Builder form states
  const [customTitle, setCustomTitle] = useState('Payment Processed');
  const [customMessage, setCustomMessage] = useState('Invoice #INV-2026-08 sent to client');
  const [customType, setCustomType] = useState<ToastType>('success');
  const [customDuration, setCustomDuration] = useState<number>(5000);
  const [includeAction, setIncludeAction] = useState<boolean>(true);
  const [actionLabel, setActionLabel] = useState<string>('View Receipt');
  const [isSimulatingWorkflow, setIsSimulatingWorkflow] = useState(false);

  // Trigger custom toast
  const handleFireCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle.trim()) return;

    toast({
      type: customType,
      title: customTitle,
      message: customMessage || undefined,
      duration: customDuration,
      action: includeAction && actionLabel
        ? {
            label: actionLabel,
            onClick: () => {
              toast.info('Action Triggered', `Handled ${actionLabel}`);
            },
          }
        : undefined,
    });
  };

  // Run realistic multi-step workflow simulation showcasing all types
  const handleRunWorkflow = () => {
    if (isSimulatingWorkflow) return;
    setIsSimulatingWorkflow(true);
    clearAll();

    // Step 1: Info (Starting)
    toast.info('System Update', 'Initializing database migration v2.4', { duration: 4500 });

    // Step 2: Warning (High load)
    setTimeout(() => {
      toast.warning('Storage Limit Warning', 'Account is at 92% cloud capacity', { duration: 5000 });
    }, 1200);

    // Step 3: Danger (Failure handled)
    setTimeout(() => {
      toast.danger('Connection Failed', 'Primary payment gateway timeout — switched to replica', {
        duration: 6500,
        action: {
          label: 'Retry',
          onClick: () => toast.success('Retried', 'Re-connected to replica successfully'),
        },
      });
    }, 2500);

    // Step 4: Success (Resolved)
    setTimeout(() => {
      toast.success('Deployment Succeeded', 'All services healthy and responsive', {
        duration: 7000,
        action: {
          label: 'View Logs',
          onClick: () => toast.comment('DevOps Lead', 'Alex: "Production cluster looks green!"'),
        },
      });
      setIsSimulatingWorkflow(false);
    }, 4000);
  };

  return (
    <div className="space-y-6">
      {/* Quick Launchpad & Design Preset Triggers */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Notification Triggers & Types
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Launch original design cards or the newly added Success, Danger, Warning, and Info notifications.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => triggerDesignPreset('all')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 shadow-sm transition-all active:scale-95"
            >
              <Play size={12} fill="currentColor" />
              Original 4 (Design Match)
            </button>

            <button
              onClick={() => triggerDesignPreset('all-system')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all active:scale-95"
            >
              <Sparkles size={12} />
              Trigger 4 New Types
            </button>

            <button
              onClick={() => triggerDesignPreset('all-eight')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all active:scale-95"
            >
              Trigger All 8
            </button>

            {toasts.length > 0 && (
              <button
                onClick={clearAll}
                className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              >
                <Trash2 size={13} />
                Clear ({toasts.length})
              </button>
            )}
          </div>
        </div>

        {/* 1. Original 4 Design Reference Cards */}
        <div className="mt-6">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
            Original Mockup Presets (Click to fire)
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {/* Comment Preset */}
            <button
              onClick={() => triggerDesignPreset('comment')}
              className="group text-left p-3.5 rounded-2xl border border-slate-200/90 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 bg-slate-50/50 hover:bg-blue-50/30 dark:bg-slate-800/40 dark:hover:bg-slate-800/70 transition-all flex items-center gap-3 active:scale-[0.98]"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                style={{
                  background: 'linear-gradient(180deg, #dceaff 0%, #bdd7fd 100%)',
                  border: '1.5px solid rgba(147, 197, 253, 0.8)',
                  boxShadow: 'inset 0 1.5px 2px white, 0 2px 4px rgba(37,99,235,0.1)',
                  color: '#2563eb',
                }}
              >
                <ToastIcon type="comment" size={18} />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  New comment
                </div>
                <div className="text-xs text-slate-500 truncate">Ava: “Love this shot!”</div>
              </div>
            </button>

            {/* Reminder Preset */}
            <button
              onClick={() => triggerDesignPreset('reminder')}
              className="group text-left p-3.5 rounded-2xl border border-slate-200/90 dark:border-slate-800 hover:border-orange-300 dark:hover:border-orange-700 bg-slate-50/50 hover:bg-orange-50/30 dark:bg-slate-800/40 dark:hover:bg-slate-800/70 transition-all flex items-center gap-3 active:scale-[0.98]"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                style={{
                  background: 'linear-gradient(180deg, #ffe7d3 0%, #ffd0b0 100%)',
                  border: '1.5px solid rgba(253, 186, 116, 0.8)',
                  boxShadow: 'inset 0 1.5px 2px white, 0 2px 4px rgba(234,88,12,0.1)',
                  color: '#ea580c',
                }}
              >
                <ToastIcon type="reminder" size={18} />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                  Reminder
                </div>
                <div className="text-xs text-slate-500 truncate">Standup in 15 min</div>
              </div>
            </button>

            {/* Build Complete Preset */}
            <button
              onClick={() => triggerDesignPreset('build')}
              className="group text-left p-3.5 rounded-2xl border border-slate-200/90 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-700 bg-slate-50/50 hover:bg-purple-50/30 dark:bg-slate-800/40 dark:hover:bg-slate-800/70 transition-all flex items-center gap-3 active:scale-[0.98]"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                style={{
                  background: 'linear-gradient(180deg, #f2e3ff 0%, #dfc3fc 100%)',
                  border: '1.5px solid rgba(216, 180, 254, 0.8)',
                  boxShadow: 'inset 0 1.5px 2px white, 0 2px 4px rgba(147,51,234,0.1)',
                  color: '#9333ea',
                }}
              >
                <ToastIcon type="build" size={18} />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  Build Complete
                </div>
                <div className="text-xs text-slate-500 truncate">v1.4.3 deployed</div>
              </div>
            </button>

            {/* Mention Preset */}
            <button
              onClick={() => triggerDesignPreset('mention')}
              className="group text-left p-3.5 rounded-2xl border border-slate-200/90 dark:border-slate-800 hover:border-amber-300 dark:hover:border-amber-700 bg-slate-50/50 hover:bg-amber-50/30 dark:bg-slate-800/40 dark:hover:bg-slate-800/70 transition-all flex items-center gap-3 active:scale-[0.98]"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                style={{
                  background: 'linear-gradient(180deg, #fef1c9 0%, #fde08b 100%)',
                  border: '1.5px solid rgba(252, 211, 77, 0.8)',
                  boxShadow: 'inset 0 1.5px 2px white, 0 2px 4px rgba(217,119,6,0.1)',
                  color: '#d97706',
                }}
              >
                <ToastIcon type="mention" size={18} />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  Mention
                </div>
                <div className="text-xs text-slate-500 truncate">@you in #design</div>
              </div>
            </button>
          </div>
        </div>

        {/* 2. New 4 Toast Types: Success, Danger, Warning, Info */}
        <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              <Sparkles size={13} />
              Newly Added Toast Types (Success, Danger, Warning, Info)
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {/* Success */}
            <button
              onClick={() => toast.success()}
              className="group text-left p-3.5 rounded-2xl border border-emerald-200/80 dark:border-emerald-900/60 hover:border-emerald-400 dark:hover:border-emerald-600 bg-emerald-50/30 hover:bg-emerald-50/70 dark:bg-emerald-950/20 dark:hover:bg-emerald-950/40 transition-all flex items-center gap-3 active:scale-[0.98]"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                style={{
                  background: 'linear-gradient(180deg, #dcfce7 0%, #bbf7d0 100%)',
                  border: '1.5px solid rgba(134, 239, 172, 0.85)',
                  boxShadow: 'inset 0 1.5px 2px white, 0 2px 4px rgba(22,163,74,0.15)',
                  color: '#16a34a',
                }}
              >
                <ToastIcon type="success" size={18} />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  Success
                </div>
                <div className="text-xs text-slate-500 truncate">Changes published</div>
              </div>
            </button>

            {/* Danger */}
            <button
              onClick={() => toast.danger()}
              className="group text-left p-3.5 rounded-2xl border border-rose-200/80 dark:border-rose-900/60 hover:border-rose-400 dark:hover:border-rose-600 bg-rose-50/30 hover:bg-rose-50/70 dark:bg-rose-950/20 dark:hover:bg-rose-950/40 transition-all flex items-center gap-3 active:scale-[0.98]"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                style={{
                  background: 'linear-gradient(180deg, #ffe4e6 0%, #fecdd3 100%)',
                  border: '1.5px solid rgba(253, 164, 175, 0.85)',
                  boxShadow: 'inset 0 1.5px 2px white, 0 2px 4px rgba(225,29,72,0.15)',
                  color: '#e11d48',
                }}
              >
                <ToastIcon type="danger" size={18} />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                  Danger
                </div>
                <div className="text-xs text-slate-500 truncate">Connection failed</div>
              </div>
            </button>

            {/* Warning */}
            <button
              onClick={() => toast.warning()}
              className="group text-left p-3.5 rounded-2xl border border-amber-200/80 dark:border-amber-900/60 hover:border-amber-400 dark:hover:border-amber-600 bg-amber-50/30 hover:bg-amber-50/70 dark:bg-amber-950/20 dark:hover:bg-amber-950/40 transition-all flex items-center gap-3 active:scale-[0.98]"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                style={{
                  background: 'linear-gradient(180deg, #fef3c7 0%, #fde68a 100%)',
                  border: '1.5px solid rgba(252, 211, 77, 0.85)',
                  boxShadow: 'inset 0 1.5px 2px white, 0 2px 4px rgba(217,119,6,0.15)',
                  color: '#d97706',
                }}
              >
                <ToastIcon type="warning" size={18} />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  Warning
                </div>
                <div className="text-xs text-slate-500 truncate">Storage limit warning</div>
              </div>
            </button>

            {/* Info */}
            <button
              onClick={() => toast.info()}
              className="group text-left p-3.5 rounded-2xl border border-sky-200/80 dark:border-sky-900/60 hover:border-sky-400 dark:hover:border-sky-600 bg-sky-50/30 hover:bg-sky-50/70 dark:bg-sky-950/20 dark:hover:bg-sky-950/40 transition-all flex items-center gap-3 active:scale-[0.98]"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                style={{
                  background: 'linear-gradient(180deg, #e0f2fe 0%, #bae6fd 100%)',
                  border: '1.5px solid rgba(125, 211, 252, 0.85)',
                  boxShadow: 'inset 0 1.5px 2px white, 0 2px 4px rgba(2,132,199,0.15)',
                  color: '#0284c7',
                }}
              >
                <ToastIcon type="info" size={18} />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                  Info
                </div>
                <div className="text-xs text-slate-500 truncate">System update ready</div>
              </div>
            </button>
          </div>
        </div>

        {/* Workflow Simulation Trigger */}
        <div className="mt-5 pt-5 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Sparkles size={14} className="text-blue-500" />
            <span>Interactive multi-state simulation with sound & action callbacks</span>
          </div>

          <button
            onClick={handleRunWorkflow}
            disabled={isSimulatingWorkflow}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-violet-50 text-violet-700 hover:bg-violet-100 dark:bg-violet-950/50 dark:text-violet-300 transition-all disabled:opacity-50"
          >
            <Workflow size={13} />
            {isSimulatingWorkflow ? 'Simulating Workflow...' : 'Simulate Realistic Production Workflow'}
          </button>
        </div>
      </div>

      {/* Settings & Custom Builder Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Behavior & Display Settings */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <Sliders size={18} className="text-slate-700 dark:text-slate-300" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Container Settings
            </h3>
          </div>

          {/* Stacking Physics Mode */}
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2 block">
              Layout / Stacking Mode
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setStackMode('list')}
                className={`flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium rounded-xl border transition-all ${
                  stackMode === 'list'
                    ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300'
                }`}
              >
                <ListFilter size={14} />
                List (As In Design)
              </button>
              <button
                type="button"
                onClick={() => setStackMode('stacked')}
                className={`flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium rounded-xl border transition-all ${
                  stackMode === 'stacked'
                    ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300'
                }`}
              >
                <Layers size={14} />
                Stacked Cards
              </button>
            </div>
            <p className="text-[11px] text-slate-400 mt-1.5">
              {stackMode === 'list'
                ? 'Vertical list matches the exact screenshot arrangement.'
                : 'Pills dynamically stack behind the frontmost card and expand on hover.'}
            </p>
          </div>

          {/* Screen Position */}
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2 block">
              Screen Anchor Position
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(
                [
                  { id: 'top-center', label: 'Top Center (iOS)' },
                  { id: 'top-right', label: 'Top Right (Desktop)' },
                  { id: 'bottom-center', label: 'Bottom Center' },
                  { id: 'bottom-right', label: 'Bottom Right' },
                ] as const
              ).map((pos) => (
                <button
                  key={pos.id}
                  type="button"
                  onClick={() => setPosition(pos.id as ToastPosition)}
                  className={`px-3 py-2 text-xs font-medium rounded-xl border transition-all text-center ${
                    position === pos.id
                      ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300'
                  }`}
                >
                  {pos.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sound Synthesizer Toggle */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                Tactile Audio Feedback
              </div>
              <div className="text-[11px] text-slate-400">
                Synthesized Web Audio clicks, chimes & alerts
              </div>
            </div>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-2 rounded-xl transition-all ${
                soundEnabled
                  ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400'
                  : 'bg-slate-100 text-slate-400 dark:bg-slate-800'
              }`}
              title={soundEnabled ? 'Sound is Enabled' : 'Sound is Muted'}
            >
              {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>
          </div>
        </div>

        {/* Custom Toast Builder */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <PlusCircle size={18} className="text-slate-700 dark:text-slate-300" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Custom Toast Creator
            </h3>
          </div>

          <form onSubmit={handleFireCustom} className="mt-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">
                  Title
                </label>
                <input
                  type="text"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  placeholder="e.g. Action completed"
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">
                  Message / Subtitle
                </label>
                <input
                  type="text"
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="e.g. Details about the action"
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">
                  Toast Type
                </label>
                <select
                  value={customType}
                  onChange={(e) => setCustomType(e.target.value as ToastType)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="success">Success (Emerald Check)</option>
                  <option value="danger">Danger (Rose Cross)</option>
                  <option value="warning">Warning (Amber Caution)</option>
                  <option value="info">Info (Sky Information)</option>
                  <option value="comment">Comment (Sky Blue Chat)</option>
                  <option value="reminder">Reminder (Peach Alarm Clock)</option>
                  <option value="build">Build Complete (Violet Cog)</option>
                  <option value="mention">Mention (Honey Amber Bell)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">
                  Duration (Countdown)
                </label>
                <select
                  value={customDuration}
                  onChange={(e) => setCustomDuration(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={3000}>3 seconds</option>
                  <option value={5000}>5 seconds (Standard)</option>
                  <option value={8000}>8 seconds</option>
                  <option value={0}>Persistent (Manual Dismiss Only)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">
                  Action Button
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="includeAction"
                    checked={includeAction}
                    onChange={(e) => setIncludeAction(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                  />
                  <input
                    type="text"
                    disabled={!includeAction}
                    value={actionLabel}
                    onChange={(e) => setActionLabel(e.target.value)}
                    placeholder="Label"
                    className="flex-1 px-3 py-1.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white disabled:opacity-40"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all active:scale-95"
              >
                <Send size={13} />
                Send Custom Toast
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
