import React, { useState, useEffect } from 'react';
import { 
  Share2, 
  Cpu, 
  Layers, 
  GitBranch, 
  TrendingUp, 
  Terminal, 
  Sliders, 
  Check, 
  Copy, 
  BookOpen, 
  ExternalLink,
  Zap,
  ShieldCheck,
  Server,
  ArrowRight,
  Printer,
  FileText,
  Sun,
  Moon
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { ShareModal } from './components/ShareModal';
import { GlossaryModal } from './components/GlossaryModal';
import { Term } from './components/Term';
import { 
  HardwareChart, 
  ScalingChart, 
  ZeroMemoryChart, 
  RlhfRadarChart, 
  ServingChart 
} from './components/Charts';
import { ArchitectureComparison } from './components/ArchitectureComparison';
import { MemoryCalculator } from './components/MemoryCalculator';
import { TimelineSection } from './components/TimelineSection';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored === 'dark') return true;
      if (stored === 'light') return false;
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const [fontScale, setFontScale] = useState<'standard' | 'compact' | 'relaxed'>('standard');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareModalTab, setShareModalTab] = useState<'share' | 'foundations'>('share');
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);
  const [activeGlossaryTermId, setActiveGlossaryTermId] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleOpenShare = (tab: 'share' | 'foundations' = 'share') => {
    setShareModalTab(tab);
    setIsShareModalOpen(true);
  };

  const handleOpenGlossary = (termId?: string) => {
    setActiveGlossaryTermId(termId || 'rlhf');
    setIsGlossaryOpen(true);
  };

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
      try {
        localStorage.setItem('theme', 'dark');
      } catch (e) {
        // ignore
      }
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
      try {
        localStorage.setItem('theme', 'light');
      } catch (e) {
        // ignore
      }
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(prev => !prev);
  };

  const handleCopyQuickShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // Font scale class modifier
  const scaleClass = 
    fontScale === 'compact' ? 'text-[13px] leading-relaxed' :
    fontScale === 'relaxed' ? 'text-[15px] leading-loose' : 
    'text-sm leading-relaxed';

  return (
    <div className={`min-h-screen bg-stone-100/60 dark:bg-stone-950 text-stone-900 dark:text-stone-100 ${scaleClass} transition-colors duration-200`}>
      
      {/* Top Navigation Bar with strict 3-zone contract */}
      <Navbar
        darkMode={darkMode}
        onToggleTheme={toggleTheme}
        fontScale={fontScale}
        onChangeFontScale={setFontScale}
        onOpenShare={() => handleOpenShare('share')}
        onOpenGlossary={() => handleOpenGlossary('rlhf')}
      />

      {/* Share & Citations Modal Dialog */}
      <ShareModal 
        isOpen={isShareModalOpen} 
        onClose={() => setIsShareModalOpen(false)}
        initialTab={shareModalTab}
      />

      {/* Technical Systems Glossary Modal */}
      <GlossaryModal
        isOpen={isGlossaryOpen}
        activeTermId={activeGlossaryTermId}
        onClose={() => setIsGlossaryOpen(false)}
        onSelectTerm={(id) => setActiveGlossaryTermId(id)}
      />

      {/* Hero Header: Dignified, Balanced, Scholarly (No giant headline, no flashy neon gradients) */}
      <header id="top" className="border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/40 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          
          {/* Quiet, unboxed metadata kicker */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mb-4 font-mono">
            <span>RESEARCH MONOGRAPH</span>
            <span aria-hidden="true">·</span>
            <span>DISTRIBUTED SYSTEMS & MACHINE LEARNING</span>
            <span aria-hidden="true">·</span>
            <span>2007–2022 RETROSPECTIVE</span>
          </div>

          {/* Balanced, non-attention-grabbing headline */}
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-stone-900 dark:text-stone-100 max-w-4xl text-balance leading-snug">
            The Engineering Infrastructure Behind ChatGPT: A 15-Year Historical Account
          </h1>

          {/* Subtitle with calm editorial presence */}
          <p className="mt-3 text-base sm:text-lg text-stone-600 dark:text-stone-400 max-w-3xl leading-relaxed">
            ChatGPT was not a single breakthrough, but the engineering synthesis of a 15-year convergence across GPU interconnect fabrics, dynamic computational graphs, residual attention topology, 3D parallelism, <Term id="flashattention" onOpenGlossary={handleOpenGlossary}>FlashAttention</Term> tiling, and <Term id="rlhf" onOpenGlossary={handleOpenGlossary}>RLHF</Term> alignment mechanics.
          </p>

          {/* Clean author and publication details */}
          <div className="mt-5 pt-4 border-t border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-500 dark:text-stone-400">
            <div className="flex items-center gap-2">
              <span className="font-medium text-stone-700 dark:text-stone-300">Alpha Data Architects Systems Review</span>
              <span aria-hidden="true">·</span>
              <span>18 Min Read</span>
              <span aria-hidden="true">·</span>
              <button
                onClick={() => handleOpenShare('foundations')}
                className="text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-stone-100 hover:underline inline-flex items-center gap-1 font-medium"
                title="View BibTeX entries for all 14 cited foundational papers"
              >
                <span>Synthesis of 14 Foundational Papers</span>
                <span className="text-[10px] font-mono text-stone-400 dark:text-stone-500">(BibTeX)</span>
              </button>
            </div>

            <div className="flex items-center gap-2 no-print">
              <button
                onClick={() => handleOpenGlossary('rlhf')}
                className="inline-flex items-center gap-1 text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-stone-100 font-medium hover:underline"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Glossary</span>
              </button>
              <span aria-hidden="true">·</span>
              <button
                onClick={() => handleOpenShare('foundations')}
                className="inline-flex items-center gap-1 text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-stone-100 font-medium hover:underline"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>14 Papers BibTeX</span>
              </button>
              <span aria-hidden="true">·</span>
              <button
                onClick={() => handleOpenShare('share')}
                className="inline-flex items-center gap-1 text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-stone-100 font-medium hover:underline"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Cite or Share</span>
              </button>
              <span aria-hidden="true">·</span>
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-1 text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-stone-100 font-medium hover:underline"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / PDF</span>
              </button>
            </div>
          </div>

          {/* Key Engineering Baseline Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mt-8">
            <div className="bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg p-4">
              <div className="text-xl sm:text-2xl font-mono font-semibold text-stone-900 dark:text-stone-100 tabular-nums">
                175 Billion
              </div>
              <div className="text-xs font-medium text-stone-700 dark:text-stone-300 mt-1">
                GPT-3.5 Parameters
              </div>
              <p className="text-[11px] text-stone-500 mt-1">
                350 GB static weights at FP16 precision.
              </p>
            </div>

            <div className="bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg p-4">
              <div className="text-xl sm:text-2xl font-mono font-semibold text-stone-900 dark:text-stone-100 tabular-nums">
                2.0 TB/s
              </div>
              <div className="text-xs font-medium text-stone-700 dark:text-stone-300 mt-1">
                A100 <Term id="hbm" onOpenGlossary={handleOpenGlossary}>HBM2e</Term> Bandwidth
              </div>
              <p className="text-[11px] text-stone-500 mt-1">
                2.25x increase over V100 to conquer memory walls.
              </p>
            </div>

            <div className="bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg p-4">
              <div className="text-xl sm:text-2xl font-mono font-semibold text-stone-900 dark:text-stone-100 tabular-nums">
                85% Win Rate
              </div>
              <div className="text-xs font-medium text-stone-700 dark:text-stone-300 mt-1">
                <Term id="rlhf" onOpenGlossary={handleOpenGlossary}>RLHF</Term> Alignment Gain
              </div>
              <p className="text-[11px] text-stone-500 mt-1">
                InstructGPT 1.3B preferred over unaligned 175B.
              </p>
            </div>

            <div className="bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg p-4">
              <div className="text-xl sm:text-2xl font-mono font-semibold text-stone-900 dark:text-stone-100 tabular-nums">
                10x–34x
              </div>
              <div className="text-xs font-medium text-stone-700 dark:text-stone-300 mt-1">
                <Term id="orca" onOpenGlossary={handleOpenGlossary}>Orca</Term> Batching Speedup
              </div>
              <p className="text-[11px] text-stone-500 mt-1">
                Eliminated head-of-line padding during inference.
              </p>
            </div>
          </div>

          {/* Interactive Glossary Callout Bar */}
          <div className="mt-4 p-2.5 bg-stone-50/80 dark:bg-stone-900/60 border border-stone-200/70 dark:border-stone-800/80 rounded-lg flex flex-wrap items-center justify-between text-xs text-stone-600 dark:text-stone-400 no-print gap-2">
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-stone-500 shrink-0" />
              <span>
                Interactive Glossary enabled: Click underlined terms (e.g.{' '}
                <Term id="rlhf" onOpenGlossary={handleOpenGlossary}>RLHF</Term>,{' '}
                <Term id="pre-ln" onOpenGlossary={handleOpenGlossary}>Pre-LN</Term>,{' '}
                <Term id="flashattention" onOpenGlossary={handleOpenGlossary}>FlashAttention</Term>,{' '}
                <Term id="zero" onOpenGlossary={handleOpenGlossary}>ZeRO</Term>) for instant engineering definitions.
              </span>
            </div>
            <button
              onClick={() => handleOpenGlossary('rlhf')}
              className="text-stone-900 dark:text-stone-100 hover:underline font-medium shrink-0 ml-auto"
            >
              Open Full Index →
            </button>
          </div>

        </div>
      </header>

      {/* Main Narrative & Analysis Body */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">

        {/* 1. Historical Timeline */}
        <TimelineSection />

        {/* 2. Silicon Substrate: V100 to A100 & Cluster Fabrics */}
        <section id="hardware" className="space-y-6">
          <div className="pb-3 border-b border-stone-200 dark:border-stone-800">
            <span className="text-xs font-mono text-stone-500 uppercase tracking-widest">
              01. HARDWARE SUBSTRATE
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-medium text-stone-900 dark:text-stone-100 mt-0.5">
              Silicon Evolution: Volta V100 to Ampere A100 Supercomputers
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 space-y-4 text-stone-700 dark:text-stone-300">
              <p>
                Executing trillions of floating-point operations across 175 billion model parameters required shifting from early Volta V100 systems to TSMC 7nm Ampere A100 accelerators. The A100 introduced 3rd Generation Tensor Cores with native TensorFloat-32 (TF32) arithmetic, providing FP16 speed with FP32 dynamic range without manual mixed-precision exponent overflow tuning.
              </p>
              <p>
                Within server chassis, NVIDIA <Term id="nvlink" onOpenGlossary={handleOpenGlossary}>NVLink 3.0</Term> provided 600 GB/s bidirectional GPU-to-GPU bandwidth, enabling seamless horizontal <Term id="tensor-parallelism" onOpenGlossary={handleOpenGlossary}>Tensor Parallelism</Term>. Across compute nodes, Microsoft’s Azure OpenAI supercomputer linked thousands of GPUs through non-blocking Quantum HDR <Term id="infiniband" onOpenGlossary={handleOpenGlossary}>InfiniBand</Term> fabrics providing 8 × 200 Gbps bandwidth per host.
              </p>
              
              <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg p-4 space-y-2 text-xs">
                <div className="font-mono font-medium text-stone-900 dark:text-stone-100 mb-1">
                  Cluster Health & Resiliency Architecture
                </div>
                <p className="text-stone-600 dark:text-stone-400">
                  Hardware faults were standard at multi-thousand GPU scale: GPU ECC memory uncorrectable errors, PCIe link degradation, and <Term id="infiniband" onOpenGlossary={handleOpenGlossary}>InfiniBand</Term> flapping required continuous telemetry tools such as Microsoft’s SuperBench, which increased Mean Time Between Interruptions (MTBI) by 22.6x.
                </p>
              </div>
            </div>

            <div className="lg:col-span-6">
              <HardwareChart />
            </div>
          </div>
        </section>

        {/* 3. Software Framework Ascendency: Dynamic Graphs & PyTorch */}
        <section id="frameworks" className="space-y-6">
          <div className="pb-3 border-b border-stone-200 dark:border-stone-800">
            <span className="text-xs font-mono text-stone-500 uppercase tracking-widest">
              02. SOFTWARE COMPILER FOUNDATIONS
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-medium text-stone-900 dark:text-stone-100 mt-0.5">
              The Ascendency of Dynamic Imperative Graphs (PyTorch Migration)
            </h2>
          </div>

          <p className="text-stone-700 dark:text-stone-300 max-w-3xl">
            Early deep learning frameworks (Theano, Caffe, TensorFlow 1.x) relied on static computational graphs. Models were defined declaratively in Python, compiled into an execution graph, and evaluated. While performant for fixed-size computer vision grids, this static paradigm was deeply rigid for natural language sequences with varying lengths and dynamic attention maps.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg p-5">
              <h3 className="text-xs font-mono uppercase tracking-wider font-semibold text-rose-700 dark:text-rose-400 mb-3">
                Static Computational Graphs (Theano / Caffe / TF 1.x)
              </h3>
              <ul className="text-xs text-stone-600 dark:text-stone-400 space-y-2.5 list-disc list-inside">
                <li><strong className="text-stone-800 dark:text-stone-200">Compile-Time Lock:</strong> Computational graph constructed once before execution; dynamic branching required brittle <code className="font-mono">tf.cond</code> constructs.</li>
                <li><strong className="text-stone-800 dark:text-stone-200">Sequence Padding Waste:</strong> Varied sequence lengths forced heavy zero-padding across batches, wasting precious GPU tensor cycles.</li>
                <li><strong className="text-stone-800 dark:text-stone-200">Debugging Disconnect:</strong> Runtime bugs emerged inside compiled C++ graph runtimes detached from standard Python pdb stack traces.</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg p-5">
              <h3 className="text-xs font-mono uppercase tracking-wider font-semibold text-emerald-700 dark:text-emerald-400 mb-3">
                Dynamic Imperative Execution (PyTorch / OpenAI Standard)
              </h3>
              <ul className="text-xs text-stone-600 dark:text-stone-400 space-y-2.5 list-disc list-inside">
                <li><strong className="text-stone-800 dark:text-stone-200">Define-by-Run:</strong> Graph built dynamically on the fly during the forward pass, supporting native Python loops, dynamic recursion, and custom masks.</li>
                <li><strong className="text-stone-800 dark:text-stone-200">Memory Efficiency:</strong> Backward autodiff hooks enabled dynamic activation pruning and memory checkpointing without complex graph transformations.</li>
                <li><strong className="text-stone-800 dark:text-stone-200">OpenAI Standardization:</strong> By 2021, OpenAI standardized its entire infrastructure on PyTorch to maximize research velocity and distributed compatibility.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 4. Neural Architecture Stabilization: Pre-LN vs Post-LN */}
        <section id="architecture" className="space-y-6">
          <div className="pb-3 border-b border-stone-200 dark:border-stone-800">
            <span className="text-xs font-mono text-stone-500 uppercase tracking-widest">
              03. ARCHITECTURAL STABILIZATION
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-medium text-stone-900 dark:text-stone-100 mt-0.5">
              Conquering Vanishing Gradients: Pre-LN Residual Highways
            </h2>
          </div>

          <p className="text-stone-700 dark:text-stone-300 max-w-3xl">
            While the original 2017 Transformer introduced self-attention, its <Term id="post-ln" onOpenGlossary={handleOpenGlossary}>Post-LayerNorm (Post-LN)</Term> formulation caused severe gradient collapse when scaled beyond 20 layers. Shifting to <Term id="pre-ln" onOpenGlossary={handleOpenGlossary}>Pre-LayerNorm (Pre-LN)</Term> in GPT-2 and GPT-3 established an identity residual highway that eliminated the gradient dampening bottleneck.
          </p>

          <ArchitectureComparison />
        </section>

        {/* 5. Mathematical Scaling Laws: Kaplan vs Chinchilla */}
        <section id="scaling" className="space-y-6">
          <div className="pb-3 border-b border-stone-200 dark:border-stone-800">
            <span className="text-xs font-mono text-stone-500 uppercase tracking-widest">
              04. MATHEMATICAL OPTIMIZATION
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-medium text-stone-900 dark:text-stone-100 mt-0.5">
              Mathematical Scaling Laws: Kaplan vs Chinchilla Paradigm Shift
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 space-y-4 text-stone-700 dark:text-stone-300">
              <p>
                In 2020, OpenAI published <Term id="kaplan-scaling" onOpenGlossary={handleOpenGlossary}>Kaplan et al.</Term>, deriving power-law relationships between training compute ($C$), parameter count ($N$), and token count ($D$). Kaplan argued that model scale should grow far faster than dataset size:
              </p>
              <div className="p-3 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-md font-mono text-xs text-stone-700 dark:text-stone-300">
                Kaplan (2020): N ∝ C<sup>0.73</sup>, D ∝ C<sup>0.27</sup>
              </div>
              <p>
                This formulation led OpenAI to train the 175-billion parameter GPT-3 on only 300 billion tokens—a ratio of just 1.7 tokens per parameter.
              </p>
              <p>
                However, DeepMind’s <Term id="chinchilla" onOpenGlossary={handleOpenGlossary}>Chinchilla</Term> paper (Hoffmann et al., 2022) revealed an empirical artifact in Kaplan’s methodology (evaluating loss across variable learning rate schedules rather than cosine decay retuned per compute budget). Chinchilla proved optimal scaling requires equal proportional growth:
              </p>
              <div className="p-3 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-md font-mono text-xs text-stone-700 dark:text-stone-300">
                Chinchilla (2022): N ∝ C<sup>0.50</sup>, D ∝ C<sup>0.50</sup> (~20 tokens / param)
              </div>
              <p className="text-xs text-stone-500">
                This demonstrated that GPT-3 was vastly parameter-heavy and data-starved. A compute-optimal 175B model would have required ~3.5 Trillion tokens.
              </p>
            </div>

            <div className="lg:col-span-6">
              <ScalingChart />
            </div>
          </div>
        </section>

        {/* 6. Distributed 3D Parallelism & DeepSpeed ZeRO */}
        <section id="parallelism" className="space-y-6">
          <div className="pb-3 border-b border-stone-200 dark:border-stone-800">
            <span className="text-xs font-mono text-stone-500 uppercase tracking-widest">
              05. DISTRIBUTED ENGINEERING
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-medium text-stone-900 dark:text-stone-100 mt-0.5">
              3D Parallelism & DeepSpeed ZeRO Memory Sharding
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 space-y-4 text-stone-700 dark:text-stone-300">
              <p>
                A 175-billion parameter model requires 350 GB in FP16 weights alone. During <Term id="adamw" onOpenGlossary={handleOpenGlossary}>AdamW</Term> training, storing optimizer states (16-bit parameter, 16-bit gradient, 32-bit master weight, 32-bit momentum, 32-bit variance) consumes <strong className="text-stone-900 dark:text-stone-100 font-semibold">16 bytes per parameter</strong> (2.8 Terabytes VRAM), making single-device training impossible.
              </p>
              <p>
                To solve this, engineering teams combined 3D Parallelism:
              </p>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded">
                  <strong className="text-stone-900 dark:text-stone-100">1. <Term id="tensor-parallelism" onOpenGlossary={handleOpenGlossary}>Tensor Parallelism (Megatron-LM)</Term>:</strong> Shards matrix multiplications horizontally across GPUs within high-speed <Term id="nvlink" onOpenGlossary={handleOpenGlossary}>NVLink</Term> domains.
                </div>
                <div className="p-2.5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded">
                  <strong className="text-stone-900 dark:text-stone-100">2. <Term id="pipeline-parallelism" onOpenGlossary={handleOpenGlossary}>Pipeline Parallelism (1F1B)</Term>:</strong> Slices model layers vertically across multiple chassis, interleaving 1-Forward-1-Backward micro-batches to compress execution bubble latency.
                </div>
                <div className="p-2.5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded">
                  <strong className="text-stone-900 dark:text-stone-100">3. <Term id="zero" onOpenGlossary={handleOpenGlossary}>DeepSpeed ZeRO</Term>:</strong> Shards optimizer states (ZeRO-1), gradients (ZeRO-2), and model weights (ZeRO-3) across data-parallel ranks, reducing per-GPU memory footprint by up to 8x.
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <ZeroMemoryChart />
            </div>
          </div>
        </section>

        {/* 7. Memory Wall Solutions: Triton & FlashAttention */}
        <section id="memory-kernels" className="space-y-6">
          <div className="pb-3 border-b border-stone-200 dark:border-stone-800">
            <span className="text-xs font-mono text-stone-500 uppercase tracking-widest">
              06. COMPILERS & KERNELS
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-medium text-stone-900 dark:text-stone-100 mt-0.5">
              Overcoming the Memory Wall: OpenAI Triton & FlashAttention
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg p-5">
              <div className="flex items-center gap-2 mb-2">
                <Terminal className="w-4 h-4 text-stone-700 dark:text-stone-300" />
                <h3 className="font-serif text-sm font-medium text-stone-900 dark:text-stone-100">
                  <Term id="triton" onOpenGlossary={handleOpenGlossary}>OpenAI Triton Compiler</Term>
                </h3>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed mb-3">
                Released in 2021 by Philippe Tillet and OpenAI, <Term id="triton" onOpenGlossary={handleOpenGlossary}>Triton</Term> provided a Python-based domain-specific language and MLIR compiler. It allowed ML researchers to author fused GPU kernels matching or exceeding handcrafted CUDA performance without dealing with thread synchronization, memory coalescing, and register allocation.
              </p>
              <div className="p-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded text-[11px] font-mono text-stone-600 dark:text-stone-400">
                Python Kernel → MLIR IR Lowering → SM Shared Memory Tile Partitioning
              </div>
            </div>

            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg p-5">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-stone-700 dark:text-stone-300" />
                <h3 className="font-serif text-sm font-medium text-stone-900 dark:text-stone-100">
                  <Term id="flashattention" onOpenGlossary={handleOpenGlossary}>FlashAttention</Term> (Dao et al., 2022)
                </h3>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed mb-3">
                Under the GPU <Term id="roofline-model" onOpenGlossary={handleOpenGlossary}>Roofline Model</Term>, standard Attention is memory-bandwidth bound. Materializing the intermediate N × N attention matrix to <Term id="hbm" onOpenGlossary={handleOpenGlossary}>High Bandwidth Memory (HBM)</Term> stranded up to 90% of GPU compute. FlashAttention utilized IO-aware tiling, loading blocks into 192KB <Term id="sram" onOpenGlossary={handleOpenGlossary}>on-chip SRAM</Term> to compute online softmax without saving O(N²) activations.
              </p>
              <div className="p-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded text-[11px] font-mono text-emerald-700 dark:text-emerald-400">
                IO Complexity: O(N²) HBM Access → O(N) Tiled SRAM passes (2x-4x speedup)
              </div>
            </div>
          </div>
        </section>

        {/* 8. Micro-Optimizations: Tokenization & Decoupled AdamW */}
        <section id="micro-opt" className="space-y-6">
          <div className="pb-3 border-b border-stone-200 dark:border-stone-800">
            <span className="text-xs font-mono text-stone-500 uppercase tracking-widest">
              07. MICRO-OPTIMIZATIONS
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-medium text-stone-900 dark:text-stone-100 mt-0.5">
              Byte-Pair Encoding Tokenization & Decoupled Weight Decay (AdamW)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg p-5">
              <h3 className="font-serif text-sm font-medium text-stone-900 dark:text-stone-100 mb-2">
                <Term id="bpe" onOpenGlossary={handleOpenGlossary}>Byte-Pair Encoding (tiktoken & cl100k_base)</Term>
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed mb-3">
                Text encoding transitioned from early GPT-3's <code className="font-mono text-stone-800 dark:text-stone-200">r50k_base</code> (50,257 tokens) to ChatGPT's <code className="font-mono text-stone-800 dark:text-stone-200">cl100k_base</code> (100,000 tokens) using the high-performance Rust library <code className="font-mono text-stone-800 dark:text-stone-200">tiktoken</code>.
              </p>
              <ul className="text-xs text-stone-600 dark:text-stone-400 space-y-1.5 list-disc list-inside">
                <li>Higher compression ratio reduced prompt token counts by ~15–20% on natural language.</li>
                <li>Dramatic 30%+ compression gains on code and non-English scripts, saving <Term id="kv-cache" onOpenGlossary={handleOpenGlossary}>KV cache</Term> memory.</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg p-5">
              <h3 className="font-serif text-sm font-medium text-stone-900 dark:text-stone-100 mb-2">
                <Term id="adamw" onOpenGlossary={handleOpenGlossary}>Decoupled Weight Decay (AdamW)</Term>
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed mb-3">
                Loshchilov & Hutter (2017) demonstrated that standard L2 weight decay coupled decay terms inside adaptive moving moments ($m_t$ and $v_t$), causing larger parameters to decay less. <Term id="adamw" onOpenGlossary={handleOpenGlossary}>AdamW</Term> decouples weight regularization:
              </p>
              <div className="p-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded font-mono text-[11px] text-stone-700 dark:text-stone-300">
                θ<sub>t+1</sub> = θ<sub>t</sub> - η [ m̂<sub>t</sub> / (√v̂<sub>t</sub> + ε) + λ θ<sub>t</sub> ]
              </div>
            </div>
          </div>
        </section>

        {/* 9. RLHF Alignment: InstructGPT & PPO */}
        <section id="alignment" className="space-y-6">
          <div className="pb-3 border-b border-stone-200 dark:border-stone-800">
            <span className="text-xs font-mono text-stone-500 uppercase tracking-widest">
              08. POST-TRAINING ALIGNMENT
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-medium text-stone-900 dark:text-stone-100 mt-0.5">
              The Alignment Breakthrough: InstructGPT & 3-Stage RLHF
            </h2>
          </div>

          <p className="text-stone-700 dark:text-stone-300 max-w-3xl">
            Pre-trained base models are predictive text autocomplete engines, not conversational partners. Converting GPT-3.5 into ChatGPT required <Term id="rlhf" onOpenGlossary={handleOpenGlossary}>Reinforcement Learning from Human Feedback (RLHF)</Term>, detailed in InstructGPT (Ouyang et al., 2022).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg p-4">
              <div className="text-xs font-mono font-semibold text-stone-500 mb-1">STAGE 01</div>
              <h3 className="font-serif text-sm font-medium text-stone-900 dark:text-stone-100 mb-1">
                <Term id="sft" onOpenGlossary={handleOpenGlossary}>Supervised Fine-Tuning (SFT)</Term>
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400">
                Human contractors authored ~13,000 demonstration prompt-response pairs to teach the model conversational formatting, instruction-following syntax, and refusal patterns.
              </p>
            </div>

            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg p-4">
              <div className="text-xs font-mono font-semibold text-stone-500 mb-1">STAGE 02</div>
              <h3 className="font-serif text-sm font-medium text-stone-900 dark:text-stone-100 mb-1">
                Reward Modeling (RM)
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400">
                A 6B parameter reward model was trained on 33,000 ranked pairs using the <Term id="bradley-terry" onOpenGlossary={handleOpenGlossary}>Bradley-Terry preference loss</Term>: L_RM = -E[log σ(r_θ(x, y_w) - r_θ(x, y_l))].
              </p>
            </div>

            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg p-4">
              <div className="text-xs font-mono font-semibold text-stone-500 mb-1">STAGE 03</div>
              <h3 className="font-serif text-sm font-medium text-stone-900 dark:text-stone-100 mb-1">
                <Term id="ppo" onOpenGlossary={handleOpenGlossary}>PPO</Term> + <Term id="kl-divergence" onOpenGlossary={handleOpenGlossary}>KL Penalty</Term>
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400">
                Proximal Policy Optimization tuned the policy against the reward model. A per-token <Term id="kl-divergence" onOpenGlossary={handleOpenGlossary}>KL divergence penalty</Term> β · D_KL(π_ϕ || π_SFT) prevented policy collapse and reward hacking.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-6">
            <div className="lg:col-span-6 space-y-3 text-stone-700 dark:text-stone-300">
              <h3 className="font-serif text-base font-medium text-stone-900 dark:text-stone-100">
                Algorithmic Alignment Over Raw Parameter Scale
              </h3>
              <p className="text-xs leading-relaxed">
                InstructGPT proved that algorithmic alignment produces far greater human usability improvements than 100x parameter expansion. Human labelers preferred outputs from a 1.3B InstructGPT model over the 175B base GPT-3 model 85% of the time.
              </p>
              <div className="p-3 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-md font-mono text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-stone-500">SFT (175B) vs Base GPT-3:</span>
                  <span className="font-medium text-stone-800 dark:text-stone-200">~73% preference</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">InstructGPT (1.3B) vs Base GPT-3:</span>
                  <span className="font-semibold text-emerald-700 dark:text-emerald-400">~85% preference</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">InstructGPT (175B) vs Base GPT-3:</span>
                  <span className="font-semibold text-stone-900 dark:text-stone-100">~92% preference</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <RlhfRadarChart />
            </div>
          </div>
        </section>

        {/* 10. Commercial Serving: Orca Dynamic Batching */}
        <section id="serving" className="space-y-6">
          <div className="pb-3 border-b border-stone-200 dark:border-stone-800">
            <span className="text-xs font-mono text-stone-500 uppercase tracking-widest">
              09. INFERENCE SERVING ECONOMICS
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-medium text-stone-900 dark:text-stone-100 mt-0.5">
              Continuous Iteration-Level Dynamic Batching (Orca)
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 space-y-4 text-stone-700 dark:text-stone-300">
              <p>
                When ChatGPT reached 100 million active users in early 2023, serving economics threatened viability. Auto-regressive token generation is heavily memory-bandwidth bound (reading all model weights from HBM to compute a single token).
              </p>
              <p>
                Early inference systems used <strong className="text-stone-900 dark:text-stone-100">Static Batching</strong>: a batch of queries ran together until the longest query finished. Shorter queries sat idle, generating useless padding tokens (head-of-line blocking).
              </p>
              <p>
                The breakthrough was <Term id="orca" onOpenGlossary={handleOpenGlossary}>Continuous Dynamic Batching</Term> (Orca, Microsoft Research 2022). Orca schedules execution at the iteration level: as soon as a sequence completes (emits an EOS token), it is immediately evicted, and a newly arrived user query enters the batch without waiting, dynamically scaling <Term id="kv-cache" onOpenGlossary={handleOpenGlossary}>KV cache</Term> memory.
              </p>
            </div>

            <div className="lg:col-span-6">
              <ServingChart />
            </div>
          </div>
        </section>

        {/* 11. Interactive LLM Memory & Hardware Estimator */}
        <MemoryCalculator />

        {/* Share & Citation Callout Box */}
        <section className="bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 rounded-xl p-6 sm:p-8 no-print">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="font-serif text-lg font-medium text-stone-900 dark:text-stone-100">
                Share This Systems Retrospective
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 max-w-xl">
                Share this analysis with systems engineers, researchers, and distributed computing teams, or generate formatted citations for your paper.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={handleCopyQuickShare}
                className="px-3 py-2 text-xs font-medium text-stone-700 dark:text-stone-300 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors inline-flex items-center gap-1.5 shadow-xs"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Link Copied!' : 'Copy Direct Link'}</span>
              </button>

              <button
                onClick={() => handleOpenShare('foundations')}
                className="px-3.5 py-2 text-xs font-medium text-stone-800 dark:text-stone-200 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 border border-stone-200 dark:border-stone-700 rounded-lg transition-colors inline-flex items-center gap-1.5 shadow-xs"
              >
                <BookOpen className="w-3.5 h-3.5 text-stone-500" />
                <span>14 Papers BibTeX...</span>
              </button>

              <button
                onClick={() => handleOpenShare('share')}
                className="px-4 py-2 text-xs font-medium text-white bg-stone-900 dark:bg-stone-100 dark:text-stone-900 rounded-lg hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors inline-flex items-center gap-1.5 shadow-xs"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share & Cite...</span>
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* Archival Scholarly Footer */}
      <footer className="border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/40 py-10 px-4 sm:px-6 lg:px-8 mt-16 text-xs text-stone-500">
        <div className="max-w-5xl mx-auto space-y-4">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-xl">
              <p className="font-serif text-sm font-medium text-stone-900 dark:text-stone-100">
                The Engineering Infrastructure Behind ChatGPT: A 15-Year Historical Account
              </p>
              <p className="mt-1 text-xs text-stone-700 dark:text-stone-300 font-medium">
                Prepared by <span className="font-semibold text-stone-900 dark:text-stone-100">Alpha Data Architects AI Labs, Atila Bayat</span>.
              </p>
              <p className="mt-1 text-[11px] text-stone-500 dark:text-stone-400 leading-relaxed">
                Based on technical literature from Vaswani et al. (2017), Radford et al. (2019), Brown et al. (2020), Kaplan et al. (2020), Rajbhandari et al. (2020), Hoffmann et al. (2022), Dao et al. (2022), Ouyang et al. (2022), Yu et al. (2022), and foundational pioneers.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs no-print">
              <button 
                onClick={toggleTheme}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {darkMode ? <Sun className="w-3.5 h-3.5 text-amber-500" /> : <Moon className="w-3.5 h-3.5 text-stone-600" />}
                <span>{darkMode ? 'Light Theme' : 'Dark Theme'}</span>
              </button>
              <button 
                onClick={() => handleOpenShare('foundations')}
                className="hover:text-stone-900 dark:hover:text-stone-100 underline font-medium"
              >
                14 Papers (BibTeX)
              </button>
              <button 
                onClick={() => handleOpenShare('share')}
                className="hover:text-stone-900 dark:hover:text-stone-100 underline"
              >
                Cite Review
              </button>
              <button 
                onClick={() => window.print()}
                className="hover:text-stone-900 dark:hover:text-stone-100 underline"
              >
                Print / PDF
              </button>
              <a 
                href="#top" 
                className="hover:text-stone-900 dark:hover:text-stone-100 font-medium"
              >
                Top ↑
              </a>
            </div>
          </div>

          <div className="pt-4 border-t border-stone-100 dark:border-stone-800/80 flex flex-wrap items-center justify-between text-[11px] text-stone-400">
            <span>© {new Date().getFullYear()} Alpha Data Architects AI Labs. Distributed Machine Learning Systems Review.</span>
            <span>Current Theme: {darkMode ? 'Graphite Dark' : 'Paper Light'}</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
