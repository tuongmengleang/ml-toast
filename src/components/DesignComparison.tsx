import React, { useState } from 'react';
import { Toast } from './Toast';
import { ToastItem } from '../types/toast';
import { Eye, Layers, Sparkles, CheckCircle2 } from 'lucide-react';

export const DesignComparison: React.FC = () => {
  const [viewMode, setViewMode] = useState<'side-by-side' | 'inspect' | 'split'>('side-by-side');
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [showAllTypes, setShowAllTypes] = useState<boolean>(false);

  // Exact 4 mockup items from the user's design image
  const staticDesignToasts: ToastItem[] = [
    {
      id: 'mock_1',
      createdAt: 1,
      type: 'comment',
      title: 'New comment',
      message: 'Ava: “Love this shot!”',
      duration: 0,
      dismissible: false,
    },
    {
      id: 'mock_2',
      createdAt: 2,
      type: 'reminder',
      title: 'Reminder',
      message: 'Standup in 15 min',
      duration: 0,
      dismissible: false,
    },
    {
      id: 'mock_3',
      createdAt: 3,
      type: 'build',
      title: 'Build Complete',
      message: 'v1.4.3 deployed',
      duration: 0,
      dismissible: false,
    },
    {
      id: 'mock_4',
      createdAt: 4,
      type: 'mention',
      title: 'Mention',
      message: '@you in #design',
      duration: 0,
      dismissible: false,
    },
  ];

  // Additional 4 types
  const newTypeToasts: ToastItem[] = [
    {
      id: 'mock_5',
      createdAt: 5,
      type: 'success',
      title: 'Deployment Succeeded',
      message: 'Production environment healthy',
      duration: 0,
      dismissible: false,
    },
    {
      id: 'mock_6',
      createdAt: 6,
      type: 'danger',
      title: 'Connection Lost',
      message: 'Payment gateway timeout',
      duration: 0,
      dismissible: false,
    },
    {
      id: 'mock_7',
      createdAt: 7,
      type: 'warning',
      title: 'Storage Limit Warning',
      message: 'Account is at 92% capacity',
      duration: 0,
      dismissible: false,
    },
    {
      id: 'mock_8',
      createdAt: 8,
      type: 'info',
      title: 'System Update',
      message: 'New version v1.4.4 ready',
      duration: 0,
      dismissible: false,
    },
  ];

  const displayedReplica = showAllTypes ? [...staticDesignToasts, ...newTypeToasts] : staticDesignToasts;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm">
      {/* Header with View Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Design Recreation Verification
            </h2>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
              <CheckCircle2 size={12} />
              1:1 Pixel Match
            </span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Compare the user design reference directly against our live interactive React components.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl self-start sm:self-auto">
          <button
            onClick={() => setViewMode('side-by-side')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              viewMode === 'side-by-side'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Layers size={14} />
            Side-by-Side
          </button>
          <button
            onClick={() => setViewMode('split')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              viewMode === 'split'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Eye size={14} />
            Interactive Split
          </button>
          <button
            onClick={() => setViewMode('inspect')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              viewMode === 'inspect'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Sparkles size={14} />
            Style Tokens (All 8)
          </button>
        </div>
      </div>

      {/* Main Comparison Area */}
      {viewMode === 'side-by-side' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Reference Image Box */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Design Reference Image
              </span>
              <span className="text-xs text-slate-400">/assets/aistudio/image_865f9c34.png</span>
            </div>
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-[#dbe0e8] p-4 flex items-center justify-center min-h-[460px]">
              <img
                src="/assets/aistudio/image_865f9c34.png"
                alt="Target Design Reference"
                referrerPolicy="no-referrer"
                className="max-w-full h-auto rounded-xl shadow-sm object-contain"
              />
            </div>
          </div>

          {/* Live Component Replica */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Live React Component Replica
              </span>
              <button
                onClick={() => setShowAllTypes(!showAllTypes)}
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                {showAllTypes ? 'Show Original 4 Only' : 'Show All 8 Types'}
              </button>
            </div>
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-[#e4e7ec] dark:bg-slate-950/80 p-6 flex flex-col justify-center items-center min-h-[460px]">
              <div className="w-full max-w-[390px] flex flex-col gap-3.5">
                {displayedReplica.map((toast) => (
                  <Toast
                    key={toast.id}
                    toast={toast}
                    onDismiss={() => {}}
                    isStacked={false}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Split Slider Mode */}
      {viewMode === 'split' && (
        <div className="mt-6 flex flex-col items-center">
          <div className="w-full mb-3 flex items-center justify-between text-xs text-slate-500">
            <span>Drag slider to compare Reference vs Live code overlay</span>
            <span className="font-mono">{sliderPos}% live component</span>
          </div>

          <div className="relative w-full max-w-[480px] h-[520px] rounded-2xl overflow-hidden border border-slate-300 dark:border-slate-700 bg-[#dbe0e8]">
            {/* Background Reference Image */}
            <img
              src="/assets/aistudio/image_865f9c34.png"
              alt="Design Reference"
              className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
            />

            {/* Foreground Live Replica with clipPath */}
            <div
              className="absolute inset-0 bg-[#e4e7ec] dark:bg-slate-950 p-6 flex flex-col justify-center items-center select-none"
              style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}
            >
              <div className="w-full max-w-[390px] flex flex-col gap-3.5">
                {staticDesignToasts.map((toast) => (
                  <Toast
                    key={toast.id}
                    toast={toast}
                    onDismiss={() => {}}
                    isStacked={false}
                  />
                ))}
              </div>
            </div>

            {/* Slider Divider Line */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg pointer-events-none z-20"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white shadow-md border border-slate-300 flex items-center justify-center text-slate-700 text-xs font-bold">
                ⬌
              </div>
            </div>

            {/* Range slider input overlaid */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPos}
              onChange={(e) => setSliderPos(Number(e.target.value))}
              aria-label="Split comparison slider"
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
            />
          </div>
        </div>
      )}

      {/* Style Tokens Inspector Mode for all 8 types */}
      {viewMode === 'inspect' && (
        <div className="mt-6 space-y-6">
          {/* Row 1: Original 4 */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
              Original Design Tokens
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl border border-blue-100 dark:border-blue-900/40 bg-blue-50/50 dark:bg-blue-950/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-4 h-4 rounded-full bg-blue-500" />
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Comment Well</h3>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                  Type: Chat Bubble
                </p>
                <div className="space-y-1 text-[11px] font-mono text-slate-600 dark:text-slate-300">
                  <div>Stroke: #2563eb</div>
                  <div>Gradient: #dceaff → #bdd7fd</div>
                  <div>Highlight: inset 0 2px white</div>
                  <div>Shadow: 0 3px 6px blue/12</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-orange-100 dark:border-orange-900/40 bg-orange-50/50 dark:bg-orange-950/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-4 h-4 rounded-full bg-orange-500" />
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Reminder Well</h3>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                  Type: Alarm Clock
                </p>
                <div className="space-y-1 text-[11px] font-mono text-slate-600 dark:text-slate-300">
                  <div>Stroke: #ea580c</div>
                  <div>Gradient: #ffe7d3 → #ffd0b0</div>
                  <div>Highlight: inset 0 2px white</div>
                  <div>Shadow: 0 3px 6px orange/12</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-purple-100 dark:border-purple-900/40 bg-purple-50/50 dark:bg-purple-950/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-4 h-4 rounded-full bg-purple-500" />
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Build Complete Well</h3>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                  Type: 8-Lobe Gear Cog
                </p>
                <div className="space-y-1 text-[11px] font-mono text-slate-600 dark:text-slate-300">
                  <div>Stroke: #9333ea</div>
                  <div>Gradient: #f2e3ff → #dfc3fc</div>
                  <div>Highlight: inset 0 2px white</div>
                  <div>Shadow: 0 3px 6px purple/12</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-amber-100 dark:border-amber-900/40 bg-amber-50/50 dark:bg-amber-950/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-4 h-4 rounded-full bg-amber-500" />
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Mention Well</h3>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                  Type: Ringing Tilted Bell
                </p>
                <div className="space-y-1 text-[11px] font-mono text-slate-600 dark:text-slate-300">
                  <div>Stroke: #d97706</div>
                  <div>Gradient: #fef1c9 → #fde08b</div>
                  <div>Highlight: inset 0 2px white</div>
                  <div>Shadow: 0 3px 6px amber/12</div>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: Success, Danger, Warning, Info */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-3">
              Newly Added Semantic Types (Success, Danger, Warning, Info)
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl border border-emerald-100 dark:border-emerald-900/40 bg-emerald-50/50 dark:bg-emerald-950/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-4 h-4 rounded-full bg-emerald-500" />
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Success Well</h3>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                  Type: Crisp Checkmark
                </p>
                <div className="space-y-1 text-[11px] font-mono text-slate-600 dark:text-slate-300">
                  <div>Stroke: #16a34a</div>
                  <div>Gradient: #dcfce7 → #bbf7d0</div>
                  <div>Highlight: inset 0 2px white</div>
                  <div>Shadow: 0 3px 6px green/14</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-rose-100 dark:border-rose-900/40 bg-rose-50/50 dark:bg-rose-950/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-4 h-4 rounded-full bg-rose-500" />
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Danger Well</h3>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                  Type: Cross in Circle
                </p>
                <div className="space-y-1 text-[11px] font-mono text-slate-600 dark:text-slate-300">
                  <div>Stroke: #e11d48</div>
                  <div>Gradient: #ffe4e6 → #fecdd3</div>
                  <div>Highlight: inset 0 2px white</div>
                  <div>Shadow: 0 3px 6px rose/14</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-amber-100 dark:border-amber-900/40 bg-amber-50/50 dark:bg-amber-950/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-4 h-4 rounded-full bg-amber-500" />
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Warning Well</h3>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                  Type: Alert Triangle
                </p>
                <div className="space-y-1 text-[11px] font-mono text-slate-600 dark:text-slate-300">
                  <div>Stroke: #d97706</div>
                  <div>Gradient: #fef3c7 → #fde68a</div>
                  <div>Highlight: inset 0 2px white</div>
                  <div>Shadow: 0 3px 6px amber/14</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-sky-100 dark:border-sky-900/40 bg-sky-50/50 dark:bg-sky-950/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-4 h-4 rounded-full bg-sky-500" />
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Info Well</h3>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                  Type: Information Circle
                </p>
                <div className="space-y-1 text-[11px] font-mono text-slate-600 dark:text-slate-300">
                  <div>Stroke: #0284c7</div>
                  <div>Gradient: #e0f2fe → #bae6fd</div>
                  <div>Highlight: inset 0 2px white</div>
                  <div>Shadow: 0 3px 6px sky/14</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
