import React, { useState } from 'react';
import { Layers, Calendar, Filter } from 'lucide-react';

interface TimelineEvent {
  year: string;
  category: 'frameworks' | 'architecture' | 'scaling' | 'silicon';
  title: string;
  summary: string;
  milestone: string;
}

export const TimelineSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'frameworks' | 'architecture' | 'scaling' | 'silicon'>('all');

  const events: TimelineEvent[] = [
    {
      year: '2007 - 2012',
      category: 'frameworks',
      title: 'Dynamic Graph Foundations (Torch Lua & CUDA)',
      summary: 'Collobert et al. develop Torch in Lua with an imperative computational graph. AlexNet (2012) demonstrates GPU compute viability, kicking off the deep learning era.',
      milestone: 'Transition from CPU linear algebra to parallel GPU BLAS kernels'
    },
    {
      year: '2014 - 2015',
      category: 'architecture',
      title: 'Attention Mechanism & Adam Optimization',
      summary: 'Bahdanau and Luong introduce neural attention for sequence translation, discarding static fixed-length LSTM hidden states. Kingma & Ba publish the Adam optimizer.',
      milestone: 'Attention scores dynamic alignment; Adam standardizes adaptive momentum'
    },
    {
      year: '2017',
      category: 'architecture',
      title: 'The Transformer (Attention Is All You Need)',
      summary: 'Vaswani et al. replace recurrence entirely with multi-head self-attention. Sequential step-by-step dependency is eliminated, allowing full parallel sequence batching on GPUs.',
      milestone: 'Parallel forward pass enables scaling beyond 512 context tokens'
    },
    {
      year: '2017 - 2018',
      category: 'silicon',
      title: 'Volta V100 & Tensor Cores',
      summary: 'NVIDIA introduces Volta architecture with dedicated 1st Gen Tensor Cores and NVLink 2.0 (300 GB/s), delivering FP16 matrix compute acceleration.',
      milestone: 'Mixed precision training becomes standard in deep learning'
    },
    {
      year: '2018 - 2019',
      category: 'architecture',
      title: 'GPT-1 & GPT-2: Pre-LN Topology & Zero-Shot',
      summary: 'OpenAI migrates from Post-LN to Pre-LN in GPT-2 (1.5B), moving LayerNorm inside the residual branch to resolve vanishing gradients in deeper networks.',
      milestone: 'Unblocked identity residual highway enables 48+ layer depth'
    },
    {
      year: '2020',
      category: 'scaling',
      title: 'Kaplan Scaling Laws & GPT-3 (175B)',
      summary: 'Kaplan et al. establish empirical power-law relationships between compute, dataset size, and parameter counts, driving the decision to train GPT-3 (175B parameters).',
      milestone: 'Demonstrates in-context few-shot learning as an emergent property'
    },
    {
      year: '2020',
      category: 'silicon',
      title: 'Ampere A100 & InfiniBand Supercomputing Fabric',
      summary: 'NVIDIA launches the A100 (80GB HBM2e, 2.0 TB/s bandwidth, 3rd Gen Tensor Cores, TF32 format). Microsoft constructs the Azure OpenAI supercomputer linking thousands of GPUs via 200 Gbps HDR InfiniBand.',
      milestone: 'Eliminates memory bottleneck for 100B+ parameter models'
    },
    {
      year: '2021',
      category: 'frameworks',
      title: 'OpenAI Standardizes on PyTorch & DeepSpeed ZeRO',
      summary: 'OpenAI migrates internal training workloads to PyTorch. Microsoft releases DeepSpeed ZeRO, partitioning optimizer states and gradients across distributed GPU memory.',
      milestone: 'Imperative define-by-run execution eliminates static graph friction'
    },
    {
      year: '2022',
      category: 'scaling',
      title: 'Chinchilla Re-evaluation (DeepMind)',
      summary: 'Hoffmann et al. demonstrate that GPT-3 was significantly under-trained. Compute-optimal training requires scaling tokens and parameters equally (20 tokens per parameter).',
      milestone: 'Proves high-quality dataset volume is as critical as model size'
    },
    {
      year: '2022',
      category: 'frameworks',
      title: 'FlashAttention & OpenAI Triton Compiler',
      summary: 'Dao et al. release FlashAttention, tiling softmax computation directly inside 192KB on-chip SRAM to bypass slow HBM memory bandwidth. Philippe Tillet releases OpenAI Triton.',
      milestone: 'IO-aware exact attention gives 2x-4x wall-clock training speedup'
    },
    {
      year: '2022',
      category: 'scaling',
      title: 'InstructGPT & 3-Stage RLHF Alignment',
      summary: 'Ouyang et al. combine Supervised Fine-Tuning, Reward Modeling, and PPO with KL divergence penalties to align raw language models with human intent.',
      milestone: '1.3B InstructGPT outperforms 175B base model in human preference'
    },
    {
      year: 'Nov 2022',
      category: 'frameworks',
      title: 'Orca Continuous Dynamic Batching & ChatGPT Launch',
      summary: 'Microsoft and academic partners introduce Orca continuous batching, eliminating head-of-line padding during auto-regressive decoding, unlocking commercial serving economics.',
      milestone: 'ChatGPT launched to public, reaching 100M users in two months'
    }
  ];

  const filteredEvents = activeFilter === 'all' 
    ? events 
    : events.filter(e => e.category === activeFilter);

  return (
    <section id="timeline" className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-stone-200 dark:border-stone-800">
        <div>
          <span className="text-xs font-mono text-stone-500 uppercase tracking-widest">
            HISTORICAL CHRONOLOGY
          </span>
          <h2 className="font-serif text-xl sm:text-2xl font-medium text-stone-900 dark:text-stone-100 mt-0.5">
            The 15-Year Convergence (2007 – 2022)
          </h2>
          <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 max-w-2xl">
            Tracing how four independent engineering disciplines converged to make ChatGPT computationally and commercially feasible.
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-1 bg-stone-100 dark:bg-stone-800/80 p-1 rounded-lg text-xs">
          {[
            { id: 'all', label: 'All Disciplines' },
            { id: 'silicon', label: 'Silicon Fabric' },
            { id: 'frameworks', label: 'Compilers & Frameworks' },
            { id: 'architecture', label: 'Neural Topology' },
            { id: 'scaling', label: 'Scaling & Alignment' }
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id as any)}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                activeFilter === f.id
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-stone-100'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEvents.map((event, idx) => (
          <div 
            key={idx}
            className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg p-5 flex flex-col justify-between hover:border-stone-300 dark:hover:border-stone-700 transition-colors shadow-xs"
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-mono text-stone-500 font-semibold">{event.year}</span>
                <span className="text-[11px] font-mono capitalize text-stone-400">
                  {event.category}
                </span>
              </div>
              <h3 className="font-serif text-sm font-medium text-stone-900 dark:text-stone-100 mb-2 leading-snug">
                {event.title}
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed mb-4">
                {event.summary}
              </p>
            </div>

            <div className="pt-3 border-t border-stone-100 dark:border-stone-800 text-[11px] text-stone-500">
              <span className="font-medium text-stone-700 dark:text-stone-300">Engineering Impact: </span>
              {event.milestone}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
