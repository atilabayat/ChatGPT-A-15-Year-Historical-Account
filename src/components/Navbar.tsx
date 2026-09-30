import React from 'react';
import { Share2, Sun, Moon, Type, BookOpen } from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  onToggleTheme: () => void;
  fontScale: 'standard' | 'compact' | 'relaxed';
  onChangeFontScale: (scale: 'standard' | 'compact' | 'relaxed') => void;
  onOpenShare: () => void;
  onOpenGlossary: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  onToggleTheme,
  fontScale,
  onChangeFontScale,
  onOpenShare,
  onOpenGlossary,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-stone-900/90 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
        
        {/* Zone 1: Single Text Element Brand Wordmark */}
        <a 
          href="#top" 
          className="text-sm sm:text-base font-serif font-medium tracking-tight text-stone-900 dark:text-stone-100 hover:text-stone-600 dark:hover:text-stone-300 transition-colors whitespace-nowrap"
        >
          ChatGPT Infrastructure Retrospective
        </a>

        {/* Zone 2: Clean Text Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-stone-600 dark:text-stone-400">
          <a href="#hardware" className="hover:text-stone-950 dark:hover:text-stone-100 transition-colors">Silicon Substrate</a>
          <a href="#frameworks" className="hover:text-stone-950 dark:hover:text-stone-100 transition-colors">Frameworks</a>
          <a href="#architecture" className="hover:text-stone-950 dark:hover:text-stone-100 transition-colors">Pre-LN Topology</a>
          <a href="#scaling" className="hover:text-stone-950 dark:hover:text-stone-100 transition-colors">Scaling Laws</a>
          <a href="#parallelism" className="hover:text-stone-950 dark:hover:text-stone-100 transition-colors">3D Parallelism</a>
          <a href="#alignment" className="hover:text-stone-950 dark:hover:text-stone-100 transition-colors">RLHF Alignment</a>
          <button 
            onClick={onOpenGlossary}
            className="hover:text-stone-950 dark:hover:text-stone-100 transition-colors cursor-pointer text-stone-700 dark:text-stone-300"
          >
            Glossary
          </button>
          <a href="#calculator" className="hover:text-stone-950 dark:hover:text-stone-100 transition-colors font-semibold text-stone-900 dark:text-stone-200">Hardware Estimator</a>
        </nav>

        {/* Zone 3: Actions & Controls */}
        <div className="flex items-center gap-2">
          {/* Glossary quick button */}
          <button
            onClick={onOpenGlossary}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-stone-700 dark:text-stone-300 bg-stone-100/70 hover:bg-stone-200/80 dark:bg-stone-800 dark:hover:bg-stone-700 border border-stone-200 dark:border-stone-700/60 rounded-md transition-colors"
            title="Open technical glossary"
          >
            <BookOpen className="w-3.5 h-3.5 text-stone-500" />
            <span className="hidden sm:inline">Glossary</span>
          </button>

          {/* Font Density Selector */}
          <div className="hidden sm:flex items-center border border-stone-200 dark:border-stone-800 rounded-md p-0.5 text-xs text-stone-500">
            <button
              onClick={() => onChangeFontScale('compact')}
              title="Compact reading size"
              className={`px-1.5 py-0.5 rounded text-[11px] font-mono transition-colors ${
                fontScale === 'compact' ? 'bg-stone-200 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-semibold' : 'hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              A-
            </button>
            <button
              onClick={() => onChangeFontScale('standard')}
              title="Standard reading size"
              className={`px-1.5 py-0.5 rounded text-[11px] font-mono transition-colors ${
                fontScale === 'standard' ? 'bg-stone-200 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-semibold' : 'hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              A
            </button>
            <button
              onClick={() => onChangeFontScale('relaxed')}
              title="Relaxed reading size"
              className={`px-1.5 py-0.5 rounded text-[11px] font-mono transition-colors ${
                fontScale === 'relaxed' ? 'bg-stone-200 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-semibold' : 'hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              A+
            </button>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-1.5 text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 rounded-md border border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
            title={darkMode ? "Switch to light theme" : "Switch to dark theme"}
            aria-label="Toggle visual theme"
          >
            {darkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>

          {/* Primary Action: Share & Cite */}
          <button
            onClick={onOpenShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-stone-900 dark:bg-stone-100 dark:text-stone-900 rounded-md hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors whitespace-nowrap shadow-xs"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share & Cite</span>
          </button>
        </div>
      </div>
    </header>
  );
};
