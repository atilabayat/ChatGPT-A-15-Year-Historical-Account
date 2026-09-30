import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  X, 
  Search, 
  BookOpen, 
  ArrowRight, 
  FileText, 
  Layers, 
  Check, 
  Copy,
  ExternalLink
} from 'lucide-react';
import { GLOSSARY_TERMS, GlossaryEntry } from '../data/glossary';

interface GlossaryModalProps {
  isOpen: boolean;
  activeTermId: string | null;
  onClose: () => void;
  onSelectTerm: (termId: string) => void;
}

export const GlossaryModal: React.FC<GlossaryModalProps> = ({
  isOpen,
  activeTermId,
  onClose,
  onSelectTerm,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedTerm, setCopiedTerm] = useState(false);
  const detailRef = useRef<HTMLDivElement>(null);

  // Default to first term if activeTermId not found
  const allTermsList = useMemo(() => Object.values(GLOSSARY_TERMS), []);
  
  const currentTerm: GlossaryEntry = useMemo(() => {
    if (activeTermId && GLOSSARY_TERMS[activeTermId]) {
      return GLOSSARY_TERMS[activeTermId];
    }
    return allTermsList[0];
  }, [activeTermId, allTermsList]);

  // Categories list
  const categories = useMemo(() => {
    const set = new Set<string>();
    allTermsList.forEach(t => set.add(t.category));
    return ['all', ...Array.from(set)];
  }, [allTermsList]);

  // Filtered terms list for the navigation pane
  const filteredTerms = useMemo(() => {
    return allTermsList.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesSearch = 
        item.term.toLowerCase().includes(q) ||
        (item.acronym && item.acronym.toLowerCase().includes(q)) ||
        item.shortDef.toLowerCase().includes(q) ||
        item.fullDef.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [allTermsList, selectedCategory, searchQuery]);

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Scroll detail pane to top on term switch
  useEffect(() => {
    if (detailRef.current) {
      detailRef.current.scrollTop = 0;
    }
  }, [currentTerm.id]);

  if (!isOpen) return null;

  const handleCopyTerm = () => {
    const textToCopy = `${currentTerm.term}${currentTerm.acronym ? ` (${currentTerm.acronym})` : ''}\n\n${currentTerm.shortDef}\n\n${currentTerm.fullDef}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedTerm(true);
    setTimeout(() => setCopiedTerm(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-4xl h-[88vh] max-h-[760px] bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl shadow-2xl flex flex-col overflow-hidden text-stone-900 dark:text-stone-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-5 py-3.5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between gap-4 bg-stone-50/70 dark:bg-stone-900/70 shrink-0">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-4 h-4 text-stone-700 dark:text-stone-300" />
            <h2 className="font-serif text-base sm:text-lg font-medium text-stone-900 dark:text-stone-100">
              Technical Systems Glossary
            </h2>
            <span className="hidden sm:inline-block text-xs font-mono text-stone-400">
              · {allTermsList.length} Core Concepts
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-block text-[11px] font-mono text-stone-400">
              Press Esc to close
            </span>
            <button
              onClick={onClose}
              className="p-1 rounded-md text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              aria-label="Close glossary"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Split Navigation & Detail Panel */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-0">
          
          {/* Left Navigation Pane (Search & Term List) */}
          <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-stone-200 dark:border-stone-800 flex flex-col bg-stone-50/50 dark:bg-stone-950/40 shrink-0 h-48 md:h-auto">
            
            {/* Search Input */}
            <div className="p-3 border-b border-stone-200 dark:border-stone-800">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search terms, acronyms..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-md text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:border-stone-400 dark:focus:border-stone-600"
                />
              </div>

              {/* Category Pills/Filter */}
              <div className="flex items-center gap-1 overflow-x-auto no-scrollbar mt-2 pt-1 text-[11px]">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-2 py-0.5 rounded transition-colors whitespace-nowrap ${
                    selectedCategory === 'all'
                      ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-medium'
                      : 'text-stone-500 hover:text-stone-900 dark:hover:text-stone-200'
                  }`}
                >
                  All
                </button>
                {categories.filter(c => c !== 'all').map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-2 py-0.5 rounded transition-colors whitespace-nowrap ${
                      selectedCategory === cat
                        ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-medium'
                        : 'text-stone-500 hover:text-stone-900 dark:hover:text-stone-200'
                    }`}
                  >
                    {cat.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Terms List Scrollable */}
            <div className="flex-1 overflow-y-auto divide-y divide-stone-100 dark:divide-stone-900">
              {filteredTerms.length === 0 ? (
                <div className="p-4 text-center text-xs text-stone-400 font-mono">
                  No matching terms found.
                </div>
              ) : (
                filteredTerms.map((item) => {
                  const isSelected = item.id === currentTerm.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => onSelectTerm(item.id)}
                      className={`w-full text-left p-3 transition-colors flex flex-col gap-0.5 ${
                        isSelected 
                          ? 'bg-white dark:bg-stone-900 border-l-3 border-stone-900 dark:border-stone-100 shadow-xs' 
                          : 'hover:bg-stone-100/60 dark:hover:bg-stone-900/40 text-stone-600 dark:text-stone-400'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-medium ${isSelected ? 'text-stone-950 dark:text-stone-50 font-semibold' : 'text-stone-800 dark:text-stone-200'}`}>
                          {item.term}
                        </span>
                        {item.acronym && (
                          <span className="text-[10px] font-mono px-1 py-0.2 bg-stone-200/60 dark:bg-stone-800 text-stone-700 dark:text-stone-300 rounded">
                            {item.acronym}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-stone-400 dark:text-stone-500 line-clamp-1">
                        {item.shortDef}
                      </span>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Right Detail Pane */}
          <div 
            ref={detailRef}
            className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6"
          >
            {/* Header: Term Title, Category & Action */}
            <div className="pb-4 border-b border-stone-200 dark:border-stone-800 flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="text-xs font-mono text-stone-400 mb-1 uppercase tracking-wider">
                  {currentTerm.category}
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-medium text-stone-900 dark:text-stone-100">
                  {currentTerm.term}
                </h3>
                {currentTerm.acronym && (
                  <span className="inline-block mt-1 font-mono text-xs text-stone-500 bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded">
                    Commonly: {currentTerm.acronym}
                  </span>
                )}
              </div>

              <button
                onClick={handleCopyTerm}
                className="px-2.5 py-1.5 text-xs font-medium text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 border border-stone-200 dark:border-stone-800 rounded-md hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors inline-flex items-center gap-1.5"
                title="Copy definition to clipboard"
              >
                {copiedTerm ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedTerm ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Short Executive Summary */}
            <div className="p-3.5 bg-stone-50 dark:bg-stone-950/70 border border-stone-200 dark:border-stone-800/80 rounded-lg">
              <span className="text-xs font-semibold text-stone-700 dark:text-stone-300 block mb-1">
                Executive Definition:
              </span>
              <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed font-sans">
                {currentTerm.shortDef}
              </p>
            </div>

            {/* In-Depth Technical Mechanism */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider font-semibold text-stone-500 mb-2">
                Technical Mechanism & Mathematical Formulation
              </h4>
              <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed space-y-2 whitespace-pre-line">
                {currentTerm.fullDef}
              </p>
            </div>

            {/* Engineering Impact on ChatGPT */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider font-semibold text-stone-500 mb-2">
                Significance in ChatGPT Genesis
              </h4>
              <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed p-3 bg-stone-50 dark:bg-stone-950/50 border border-stone-200/80 dark:border-stone-800 rounded-lg">
                {currentTerm.engineeringImpact}
              </p>
            </div>

            {/* Foundational Literature Reference */}
            {currentTerm.keyPaper && (
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider font-semibold text-stone-500 mb-2">
                  Foundational Publication
                </h4>
                <div className="p-3 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg text-xs flex items-start gap-2.5">
                  <FileText className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-stone-800 dark:text-stone-200">
                      "{currentTerm.keyPaper.title}"
                    </div>
                    <div className="text-[11px] text-stone-500 mt-0.5 font-mono">
                      {currentTerm.keyPaper.authors} ({currentTerm.keyPaper.year})
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Related Terms Cross-Linking */}
            {currentTerm.relatedTerms && currentTerm.relatedTerms.length > 0 && (
              <div className="pt-3 border-t border-stone-200 dark:border-stone-800">
                <span className="text-xs font-medium text-stone-500 block mb-2">
                  Related Concepts in this Monograph:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentTerm.relatedTerms.map((relId) => {
                    const rel = GLOSSARY_TERMS[relId];
                    if (!rel) return null;
                    return (
                      <button
                        key={relId}
                        onClick={() => onSelectTerm(relId)}
                        className="px-2.5 py-1 text-xs font-medium text-stone-700 dark:text-stone-300 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 border border-stone-200 dark:border-stone-700 rounded-md transition-colors inline-flex items-center gap-1"
                      >
                        <span>{rel.acronym || rel.term}</span>
                        <ArrowRight className="w-3 h-3 text-stone-400" />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-5 py-2.5 border-t border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/70 flex items-center justify-between text-[11px] text-stone-400 shrink-0">
          <span>Click on any highlighted term throughout the text to reopen its definition.</span>
          <button
            onClick={onClose}
            className="text-stone-600 dark:text-stone-300 hover:underline font-medium"
          >
            Close Glossary
          </button>
        </div>

      </div>
    </div>
  );
};
