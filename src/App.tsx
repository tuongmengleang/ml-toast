/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ToastProvider, useToast } from './context/ToastContext';
import { DesignComparison } from './components/DesignComparison';
import { InteractivePlayground } from './components/InteractivePlayground';
import { CodeSnippetViewer } from './components/CodeSnippetViewer';
import {
  Sun,
  Moon,
  Sparkles,
  Play,
  Github,
  BellRing,
  Layers,
  Code2,
} from 'lucide-react';

function AppContent() {
  const { triggerDesignPreset } = useToast();
  const [isDark, setIsDark] = useState(false);
  const [activeSection, setActiveSection] = useState<'comparison' | 'playground' | 'code'>('comparison');

  // Toggle dark mode class on html
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Initial welcome notification on mount to showcase the tactile sound and spring motion
  useEffect(() => {
    const timer = setTimeout(() => {
      triggerDesignPreset('comment');
    }, 600);
    return () => clearTimeout(timer);
  }, [triggerDesignPreset]);

  return (
    <div className="min-h-screen bg-[#f3f5f8] dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-sm">
              <BellRing size={16} />
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0">
              Pill Toast
            </span>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
            <button
              onClick={() => setActiveSection('comparison')}
              className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 ${
                activeSection === 'comparison' ? 'text-blue-600 dark:text-blue-400 font-semibold' : ''
              }`}
            >
              Design Match
            </button>
            <button
              onClick={() => setActiveSection('playground')}
              className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 ${
                activeSection === 'playground' ? 'text-blue-600 dark:text-blue-400 font-semibold' : ''
              }`}
            >
              Interactive Playground
            </button>
            <button
              onClick={() => setActiveSection('code')}
              className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 ${
                activeSection === 'code' ? 'text-blue-600 dark:text-blue-400 font-semibold' : ''
              }`}
            >
              Code & Specs
            </button>
          </nav>

          {/* Zone 3: 1 Primary Action + Theme Toggle */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => triggerDesignPreset('all-system')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:text-emerald-300 dark:hover:bg-emerald-900/60 rounded-full transition-all border border-emerald-200 dark:border-emerald-800 whitespace-nowrap shrink-0"
            >
              <Sparkles size={11} />
              <span>4 New Types</span>
            </button>

            <button
              onClick={() => triggerDesignPreset('all-eight')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 rounded-full transition-all shadow-sm active:scale-95 whitespace-nowrap shrink-0"
            >
              <Play size={11} fill="currentColor" />
              <span>Trigger All 8</span>
            </button>

            <button
              onClick={() => setIsDark(!isDark)}
              aria-label="Toggle dark mode"
              className="p-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {isDark ? <Sun size={17} /> : <Moon size={17} />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
        {/* Hero Section */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800">
            <Sparkles size={13} />
            Pixel-Perfect Recreation
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white text-balance">
            Tactile Pill Toast Notifications
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed text-balance">
            Crafted following the fluid Apple iOS design system with soft 3D pebble icon wells,
            spring physics, gesture dismissal, and synthesized audio feedback.
          </p>

          {/* Tab Pill Switcher for Content Area */}
          <div className="inline-flex items-center p-1.5 bg-slate-200/70 dark:bg-slate-800/80 rounded-2xl gap-1 mt-4">
            <button
              onClick={() => setActiveSection('comparison')}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
                activeSection === 'comparison'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Layers size={14} />
              1:1 Design Match
            </button>
            <button
              onClick={() => setActiveSection('playground')}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
                activeSection === 'playground'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Play size={14} />
              Interactive Playground
            </button>
            <button
              onClick={() => setActiveSection('code')}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
                activeSection === 'code'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Code2 size={14} />
              Code & Specs
            </button>
          </div>
        </div>

        {/* Dynamic Section Display */}
        {activeSection === 'comparison' && (
          <div className="space-y-8">
            <DesignComparison />
            <InteractivePlayground />
          </div>
        )}

        {activeSection === 'playground' && (
          <div className="space-y-8">
            <InteractivePlayground />
            <DesignComparison />
          </div>
        )}

        {activeSection === 'code' && (
          <div className="space-y-8">
            <CodeSnippetViewer />
            <DesignComparison />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-200/80 dark:border-slate-800 py-8 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>Built with React 19, Motion, and Tailwind CSS. Faithful to user design specification.</p>
          <div className="flex items-center gap-4">
            <span>Fluid Spring Physics</span>
            <span aria-hidden="true">·</span>
            <span>Web Audio Feedback</span>
            <span aria-hidden="true">·</span>
            <span>Touch Gestures</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}
