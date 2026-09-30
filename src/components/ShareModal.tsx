import React, { useState, useMemo } from 'react';
import { 
  Copy, 
  Check, 
  Twitter, 
  Linkedin, 
  Printer, 
  Share2, 
  X, 
  Download, 
  BookOpen, 
  FileText,
  Search,
  ExternalLink,
  Layers
} from 'lucide-react';
import { FOUNDATIONAL_PAPERS, ALL_FOUNDATIONAL_BIBTEX, FoundationalPaper } from '../data/papers';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'share' | 'foundations';
}

export const ShareModal: React.FC<ShareModalProps> = ({ 
  isOpen, 
  onClose,
  initialTab = 'share' 
}) => {
  const [activeTab, setActiveTab] = useState<'share' | 'foundations'>(initialTab);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCitation, setCopiedCitation] = useState<string | null>(null);
  const [citationFormat, setCitationFormat] = useState<'bibtex' | 'apa' | 'ieee'>('bibtex');
  
  // Foundational papers tab state
  const [paperSearchQuery, setPaperSearchQuery] = useState('');
  const [selectedPaperCategory, setSelectedPaperCategory] = useState<string>('all');
  const [copiedAllBibtex, setCopiedAllBibtex] = useState(false);
  const [copiedPaperId, setCopiedPaperId] = useState<string | null>(null);
  const [expandedPaperId, setExpandedPaperId] = useState<string | null>('vaswani2017');

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://ais-pre-ooolfs2ip3srhh7i3lexkv-190147757092.us-west2.run.app';
  const shareTitle = "The Engineering Infrastructure Behind ChatGPT: A 15-Year Historical Account";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2400);
  };

  const reviewCitations = {
    bibtex: `@article{chatgpt_infrastructure_genesis_2026,
  title   = {The Engineering Infrastructure Behind ChatGPT: A 15-Year Historical Account},
  author  = {Alpha Data Architects Systems Review},
  journal = {Distributed Machine Learning Systems Monograph},
  year    = {2026},
  url     = {${currentUrl}}
}`,
    apa: `Alpha Data Architects Systems Review. (2026). The Engineering Infrastructure Behind ChatGPT: A 15-Year Historical Account. Distributed Machine Learning Systems Monograph. Retrieved from ${currentUrl}`,
    ieee: `Alpha Data Architects Systems Review, "The Engineering Infrastructure Behind ChatGPT: A 15-Year Historical Account," Distributed Machine Learning Systems Monograph, 2026. [Online]. Available: ${currentUrl}`
  };

  const handleCopyCitation = (format: 'bibtex' | 'apa' | 'ieee') => {
    navigator.clipboard.writeText(reviewCitations[format]);
    setCopiedCitation(format);
    setTimeout(() => setCopiedCitation(null), 2400);
  };

  // Copy single paper BibTeX
  const handleCopySinglePaperBibtex = (paper: FoundationalPaper) => {
    navigator.clipboard.writeText(paper.bibtex);
    setCopiedPaperId(paper.id);
    setTimeout(() => setCopiedPaperId(null), 2400);
  };

  // Copy all 14 BibTeX entries
  const handleCopyAllBibtex = () => {
    navigator.clipboard.writeText(ALL_FOUNDATIONAL_BIBTEX);
    setCopiedAllBibtex(true);
    setTimeout(() => setCopiedAllBibtex(false), 2400);
  };

  // Download .bib file
  const handleDownloadBibFile = () => {
    const blob = new Blob([ALL_FOUNDATIONAL_BIBTEX], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'chatgpt_foundational_papers.bib';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleTwitterShare = () => {
    const text = encodeURIComponent(`${shareTitle} — In-depth analysis of GPU fabrics, Pre-LN topologies, FlashAttention, and RLHF alignment:`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(currentUrl)}`, '_blank', 'noopener,noreferrer');
  };

  const handleLinkedInShare = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`, '_blank', 'noopener,noreferrer');
  };

  const handlePrint = () => {
    window.print();
  };

  // Categories for foundational papers
  const paperCategories = [
    'all',
    'Core Architecture',
    'Scaling Laws',
    'Distributed Systems',
    'Compilers & Serving',
    'Alignment & RL',
    'Optimization'
  ];

  // Filtered papers
  const filteredPapers = useMemo(() => {
    return FOUNDATIONAL_PAPERS.filter(p => {
      const matchesCat = selectedPaperCategory === 'all' || p.category === selectedPaperCategory;
      const q = paperSearchQuery.toLowerCase().trim();
      if (!q) return matchesCat;

      const matchesSearch = 
        p.title.toLowerCase().includes(q) ||
        p.authors.toLowerCase().includes(q) ||
        p.bibKey.toLowerCase().includes(q) ||
        p.year.toString().includes(q) ||
        p.annotation.toLowerCase().includes(q);

      return matchesCat && matchesSearch;
    });
  }, [selectedPaperCategory, paperSearchQuery]);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden text-stone-900 dark:text-stone-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header & Primary Tab Switcher */}
        <div className="px-5 py-3.5 border-b border-stone-200 dark:border-stone-800 bg-stone-50/80 dark:bg-stone-900/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1 bg-stone-200/70 dark:bg-stone-800 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('share')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors inline-flex items-center gap-1.5 ${
                activeTab === 'share'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share & Monograph Citation</span>
            </button>

            <button
              onClick={() => setActiveTab('foundations')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors inline-flex items-center gap-1.5 ${
                activeTab === 'foundations'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>14 Foundational Papers (BibTeX)</span>
            </button>
          </div>

          <button 
            onClick={onClose}
            className="p-1 rounded-md text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* TAB 1: Share & Monograph Citation */}
          {activeTab === 'share' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              
              {/* Share Link Row */}
              <div>
                <label className="block text-xs font-medium text-stone-500 dark:text-stone-400 mb-1.5">
                  Direct Shareable URL
                </label>
                <div className="flex items-center gap-2">
                  <input 
                    type="text" 
                    readOnly 
                    value={currentUrl} 
                    className="w-full px-3 py-2 text-xs font-mono bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-lg text-stone-700 dark:text-stone-300 select-all focus:outline-none"
                  />
                  <button 
                    onClick={handleCopyLink}
                    className="px-3.5 py-2 text-xs font-medium text-white bg-stone-900 dark:bg-stone-100 dark:text-stone-900 rounded-lg hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors inline-flex items-center gap-1.5 shrink-0"
                  >
                    {copiedLink ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Link</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Quick Social & Action Bar */}
              <div className="grid grid-cols-3 gap-2.5">
                <button
                  onClick={handleTwitterShare}
                  className="flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-stone-700 dark:text-stone-300 bg-stone-50 dark:bg-stone-800/80 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-700/60 rounded-lg transition-colors"
                >
                  <Twitter className="w-3.5 h-3.5" />
                  <span>Post on X</span>
                </button>

                <button
                  onClick={handleLinkedInShare}
                  className="flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-stone-700 dark:text-stone-300 bg-stone-50 dark:bg-stone-800/80 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-700/60 rounded-lg transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </button>

                <button
                  onClick={handlePrint}
                  className="flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-stone-700 dark:text-stone-300 bg-stone-50 dark:bg-stone-800/80 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-700/60 rounded-lg transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Export / Print</span>
                </button>
              </div>

              {/* Academic Citation of this Monograph */}
              <div className="pt-2 border-t border-stone-200 dark:border-stone-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-stone-500 dark:text-stone-400">
                    Cite This Systems Review
                  </span>
                  <div className="flex items-center gap-1 bg-stone-100 dark:bg-stone-800 p-0.5 rounded-md">
                    {(['bibtex', 'apa', 'ieee'] as const).map((fmt) => (
                      <button
                        key={fmt}
                        onClick={() => setCitationFormat(fmt)}
                        className={`px-2 py-0.5 text-[11px] font-mono uppercase rounded transition-colors ${
                          citationFormat === fmt 
                            ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs font-semibold' 
                            : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-300'
                        }`}
                      >
                        {fmt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <pre className="p-3 text-[11px] font-mono leading-relaxed bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-lg text-stone-700 dark:text-stone-300 overflow-x-auto whitespace-pre-wrap max-h-36">
                    {reviewCitations[citationFormat]}
                  </pre>
                  <button
                    onClick={() => handleCopyCitation(citationFormat)}
                    className="absolute top-2 right-2 px-2 py-1 text-[10px] font-medium bg-white/90 dark:bg-stone-900/90 border border-stone-200 dark:border-stone-700 rounded text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors inline-flex items-center gap-1 shadow-xs"
                  >
                    {copiedCitation === citationFormat ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-500" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: 14 Foundational Papers (BibTeX Export) */}
          {activeTab === 'foundations' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              
              {/* Introduction & Global Actions */}
              <div className="bg-stone-50 dark:bg-stone-950 p-4 rounded-lg border border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="font-serif text-sm font-medium text-stone-900 dark:text-stone-100">
                    The 14 Foundational Research Papers
                  </h4>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5 max-w-md">
                    Complete ready-to-use BibTeX bibliography entries for all peer-reviewed literature synthesized in this 15-year retrospective.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleCopyAllBibtex}
                    className="px-3 py-1.5 text-xs font-medium text-white bg-stone-900 dark:bg-stone-100 dark:text-stone-900 rounded-md hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors inline-flex items-center gap-1.5 shadow-xs"
                    title="Copy all 14 BibTeX entries into clipboard"
                  >
                    {copiedAllBibtex ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>All Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy All (.bib)</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleDownloadBibFile}
                    className="px-2.5 py-1.5 text-xs font-medium text-stone-700 dark:text-stone-300 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-md hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors inline-flex items-center gap-1.5 shadow-xs"
                    title="Download chatgpt_foundational_papers.bib"
                  >
                    <Download className="w-3.5 h-3.5 text-stone-500" />
                    <span>.bib</span>
                  </button>
                </div>
              </div>

              {/* Search & Category Filter Controls */}
              <div className="space-y-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="text"
                    placeholder="Search by author, title, venue, or year (e.g. Vaswani, Chinchilla, 2022)..."
                    value={paperSearchQuery}
                    onChange={(e) => setPaperSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-md text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:border-stone-400"
                  />
                </div>

                {/* Categories */}
                <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5 text-[11px]">
                  {paperCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedPaperCategory(cat)}
                      className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap ${
                        selectedPaperCategory === cat
                          ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-medium'
                          : 'bg-stone-100/70 dark:bg-stone-800/60 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
                      }`}
                    >
                      {cat === 'all' ? 'All (14 Papers)' : cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Papers List */}
              <div className="space-y-3.5">
                {filteredPapers.map((paper, idx) => {
                  const isExpanded = expandedPaperId === paper.id;
                  const isCopied = copiedPaperId === paper.id;

                  return (
                    <div 
                      key={paper.id}
                      className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg p-4 transition-colors"
                    >
                      {/* Paper Header */}
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="font-mono text-[11px] text-stone-400">
                              [{idx + 1}]
                            </span>
                            <span className="text-[10px] font-mono px-1.5 py-0.2 bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 rounded">
                              {paper.category}
                            </span>
                            <span className="font-mono text-xs text-stone-500 font-semibold">
                              {paper.shortAuthors} ({paper.year})
                            </span>
                          </div>
                          <h5 className="font-serif text-sm font-medium text-stone-900 dark:text-stone-100 leading-snug">
                            {paper.title}
                          </h5>
                          <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                            {paper.venue}
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => handleCopySinglePaperBibtex(paper)}
                            className="px-2.5 py-1 text-xs font-medium bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 rounded border border-stone-200 dark:border-stone-700 transition-colors inline-flex items-center gap-1"
                            title="Copy BibTeX entry"
                          >
                            {isCopied ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-500" />
                                <span>Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3 text-stone-400" />
                                <span>Copy BibTeX</span>
                              </>
                            )}
                          </button>

                          <button
                            onClick={() => setExpandedPaperId(isExpanded ? null : paper.id)}
                            className="px-2 py-1 text-xs text-stone-500 hover:text-stone-900 dark:hover:text-stone-200 rounded border border-stone-200 dark:border-stone-800 transition-colors"
                          >
                            {isExpanded ? 'Hide' : 'View'}
                          </button>
                        </div>
                      </div>

                      {/* Historical Relevance Annotation */}
                      <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed mb-2.5">
                        <strong className="text-stone-800 dark:text-stone-200 font-medium">ChatGPT Role: </strong>
                        {paper.annotation}
                      </p>

                      {/* Expandable BibTeX Code Block */}
                      {isExpanded && (
                        <div className="relative mt-2">
                          <pre className="p-3 text-[11px] font-mono leading-relaxed bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-lg text-stone-700 dark:text-stone-300 overflow-x-auto whitespace-pre-wrap">
                            {paper.bibtex}
                          </pre>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-stone-200 dark:border-stone-800 bg-stone-50/80 dark:bg-stone-900/80 flex items-center justify-between text-[11px] text-stone-400 shrink-0">
          <span>14 Foundational Works · Standard BibTeX Format compatible with Overleaf & LaTeX</span>
          <button 
            onClick={onClose}
            className="text-stone-600 dark:text-stone-300 hover:underline font-medium"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
