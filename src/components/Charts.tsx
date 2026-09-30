import React, { useState } from 'react';

// ==========================================
// Chart 1: Hardware Specs (V100 vs A100 vs H100)
// ==========================================
export const HardwareChart: React.FC = () => {
  const [activeMetric, setActiveMetric] = useState<'both' | 'compute' | 'bandwidth'>('both');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const data = [
    { name: 'Tesla V100 (2017)', arch: 'Volta (12nm)', compute: 125, bandwidth: 0.90, desc: 'Early Transformer training, 32GB HBM2, 300 GB/s NVLink 2' },
    { name: 'Ampere A100 (2020)', arch: 'Ampere (7nm)', compute: 312, bandwidth: 2.03, desc: 'Primary ChatGPT infrastructure, 80GB HBM2e, 600 GB/s NVLink 3, TF32 Tensor Cores' },
    { name: 'Hopper H100 (2022)', arch: 'Hopper (4nm)', compute: 989, bandwidth: 3.35, desc: 'Transformer Engine with FP8 precision, 80GB HBM3, 900 GB/s NVLink 4' }
  ];

  const maxCompute = 1000;
  const maxBandwidth = 3.5;

  return (
    <div className="bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 rounded-xl p-5">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-3 border-b border-stone-200 dark:border-stone-800">
        <div>
          <h4 className="font-serif text-sm font-medium text-stone-900 dark:text-stone-100">
            Silicon Compute & Memory Bandwidth Trajectory
          </h4>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
            Volta V100 through Hopper H100 microarchitectures (FP16/TF32 Tensor TFLOPs vs HBM Bandwidth)
          </p>
        </div>
        <div className="flex items-center gap-1 bg-stone-200/70 dark:bg-stone-800 p-0.5 rounded-lg text-xs">
          <button
            onClick={() => setActiveMetric('both')}
            className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
              activeMetric === 'both' ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs' : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            Combined
          </button>
          <button
            onClick={() => setActiveMetric('compute')}
            className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
              activeMetric === 'compute' ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs' : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            Compute Only
          </button>
          <button
            onClick={() => setActiveMetric('bandwidth')}
            className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
              activeMetric === 'bandwidth' ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs' : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            Bandwidth Only
          </button>
        </div>
      </div>

      <div className="space-y-5">
        {data.map((item, idx) => {
          const computePct = (item.compute / maxCompute) * 100;
          const bandwidthPct = (item.bandwidth / maxBandwidth) * 100;
          const isHovered = hoveredIndex === idx;

          return (
            <div 
              key={item.name} 
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`p-3 rounded-lg border transition-all ${
                isHovered 
                  ? 'bg-white dark:bg-stone-800/90 border-stone-300 dark:border-stone-700 shadow-xs' 
                  : 'bg-transparent border-transparent'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between text-xs mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-stone-900 dark:text-stone-100">{item.name}</span>
                  <span className="text-[11px] font-mono text-stone-400">{item.arch}</span>
                </div>
                <div className="flex items-center gap-4 font-mono text-[11px]">
                  {(activeMetric === 'both' || activeMetric === 'compute') && (
                    <span className="text-stone-700 dark:text-stone-300">
                      <strong className="font-semibold text-stone-900 dark:text-stone-100">{item.compute}</strong> TFLOPs
                    </span>
                  )}
                  {(activeMetric === 'both' || activeMetric === 'bandwidth') && (
                    <span className="text-slate-600 dark:text-slate-400">
                      <strong className="font-semibold text-stone-900 dark:text-stone-100">{item.bandwidth}</strong> TB/s
                    </span>
                  )}
                </div>
              </div>

              {/* Progress bars */}
              <div className="space-y-1.5">
                {(activeMetric === 'both' || activeMetric === 'compute') && (
                  <div className="w-full bg-stone-200 dark:bg-stone-800 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-stone-700 dark:bg-stone-300 h-full rounded-full transition-all duration-500"
                      style={{ width: `${computePct}%` }}
                    />
                  </div>
                )}
                {(activeMetric === 'both' || activeMetric === 'bandwidth') && (
                  <div className="w-full bg-stone-200 dark:bg-stone-800 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-slate-500 dark:bg-slate-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${bandwidthPct}%` }}
                    />
                  </div>
                )}
              </div>

              {isHovered && (
                <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-2.5 pt-2 border-t border-stone-100 dark:border-stone-800">
                  {item.desc}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-3 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-[11px] text-stone-500 dark:text-stone-400">
        <div className="flex items-center gap-4">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-stone-700 dark:bg-stone-300" />
            Compute TFLOPs
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-slate-500 dark:bg-slate-400" />
            HBM Bandwidth (TB/s)
          </span>
        </div>
        <span className="font-mono text-[10px]">A100: 2.25x Bandwidth Jump vs V100</span>
      </div>
    </div>
  );
};


// ==========================================
// Chart 2: Kaplan vs Chinchilla Scaling
// ==========================================
export const ScalingChart: React.FC = () => {
  const [selectedBudget, setSelectedBudget] = useState<number>(0);

  const budgets = [
    {
      label: 'GPT-3 Budget (10²³ FLOPs)',
      params: '175 Billion Parameters',
      kaplanTokens: 300,
      chinchillaTokens: 3500,
      finding: 'GPT-3 was trained on 300B tokens (1.7 tokens/param). Chinchilla proved it was under-trained by a factor of 11.6x.'
    },
    {
      label: 'Intermediate Scale (10²⁴ FLOPs)',
      params: '280 Billion Parameters',
      kaplanTokens: 800,
      chinchillaTokens: 9200,
      finding: 'Kaplan allocated 85% of budget growth to parameters; Chinchilla proves tokens and parameters should scale in 1:1 proportion.'
    },
    {
      label: 'Frontier Scale (10²⁵ FLOPs)',
      params: '500+ Billion Parameters',
      kaplanTokens: 2100,
      chinchillaTokens: 24000,
      finding: 'Modern post-2022 models (LLaMA, Mistral, GPT-4) follow Chinchilla or beyond, training on 15T+ tokens for smaller param footprints.'
    }
  ];

  const current = budgets[selectedBudget];
  const maxTokens = 24000;

  return (
    <div className="bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 rounded-xl p-5">
      <div className="mb-4 pb-3 border-b border-stone-200 dark:border-stone-800">
        <h4 className="font-serif text-sm font-medium text-stone-900 dark:text-stone-100">
          Compute-Optimal Allocation: Kaplan (2020) vs Chinchilla (2022)
        </h4>
        <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
          Dataset token volume requirement (in Billions) across training compute budgets
        </p>
      </div>

      {/* Segmented Budget Selector */}
      <div className="grid grid-cols-3 gap-1 bg-stone-200/70 dark:bg-stone-800 p-1 rounded-lg mb-5 text-xs">
        {budgets.map((b, idx) => (
          <button
            key={b.label}
            onClick={() => setSelectedBudget(idx)}
            className={`py-1.5 px-2 rounded text-center transition-all truncate text-[11px] font-medium ${
              selectedBudget === idx 
                ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs' 
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            {idx === 0 ? 'GPT-3 Budget' : idx === 1 ? '10²⁴ FLOPs' : 'Frontier 10²⁵'}
          </button>
        ))}
      </div>

      {/* Comparison Bars */}
      <div className="space-y-4 mb-5">
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="font-medium text-stone-700 dark:text-stone-300">Kaplan et al. (OpenAI 2020)</span>
            <span className="font-mono text-stone-600 dark:text-stone-400">{current.kaplanTokens} Billion Tokens</span>
          </div>
          <div className="w-full bg-stone-200 dark:bg-stone-800 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-amber-600 dark:bg-amber-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.max(6, (current.kaplanTokens / maxTokens) * 100)}%` }}
            />
          </div>
          <span className="text-[10px] text-stone-400 mt-0.5 block font-mono">Tokens-to-parameter ratio: ~1.7:1</span>
        </div>

        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="font-medium text-stone-700 dark:text-stone-300">Chinchilla / Hoffmann et al. (DeepMind 2022)</span>
            <span className="font-mono font-semibold text-stone-900 dark:text-stone-100">{current.chinchillaTokens.toLocaleString()} Billion Tokens</span>
          </div>
          <div className="w-full bg-stone-200 dark:bg-stone-800 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-stone-900 dark:bg-stone-100 h-full rounded-full transition-all duration-500"
              style={{ width: `${(current.chinchillaTokens / maxTokens) * 100}%` }}
            />
          </div>
          <span className="text-[10px] text-stone-400 mt-0.5 block font-mono">Compute-optimal ratio: ~20:1</span>
        </div>
      </div>

      <div className="p-3 bg-stone-100/80 dark:bg-stone-800/60 rounded-lg text-xs border border-stone-200 dark:border-stone-700/60">
        <span className="font-semibold text-stone-800 dark:text-stone-200">Historical Architectural Insight: </span>
        <span className="text-stone-600 dark:text-stone-400">{current.finding}</span>
      </div>
    </div>
  );
};


// ==========================================
// Chart 3: ZeRO Memory Stages
// ==========================================
export const ZeroMemoryChart: React.FC = () => {
  const [hoveredStage, setHoveredStage] = useState<number | null>(null);

  const stages = [
    {
      name: 'Baseline DP',
      totalBytes: 16,
      sharding: 'None (Weights, Gradients, AdamW duplicated on every GPU)',
      weights: 2,
      gradients: 2,
      optimizer: 12,
      vram175B: '2,800 GB VRAM needed per GPU (Impossible)'
    },
    {
      name: 'ZeRO Stage 1',
      totalBytes: 6.25,
      sharding: 'Partitions AdamW Optimizer States across DP ranks',
      weights: 2,
      gradients: 2,
      optimizer: 2.25,
      vram175B: '1,093 GB VRAM per GPU (4x reduction in optimizer overhead)'
    },
    {
      name: 'ZeRO Stage 2',
      totalBytes: 4.25,
      sharding: 'Partitions Optimizer States + Gradients across DP ranks',
      weights: 2,
      gradients: 0.25,
      optimizer: 2.0,
      vram175B: '743 GB VRAM per GPU (Enables training on 8-GPU nodes)'
    },
    {
      name: 'ZeRO Stage 3',
      totalBytes: 2.15,
      sharding: 'Partitions Weights + Gradients + Optimizer across all cluster GPUs',
      weights: 0.15,
      gradients: 0.1,
      optimizer: 1.9,
      vram175B: 'Fits on commodity 80GB A100 nodes via communication streaming'
    }
  ];

  return (
    <div className="bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 rounded-xl p-5">
      <div className="mb-4 pb-3 border-b border-stone-200 dark:border-stone-800">
        <h4 className="font-serif text-sm font-medium text-stone-900 dark:text-stone-100">
          DeepSpeed ZeRO Memory Footprint Reduction
        </h4>
        <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
          Bytes of VRAM consumed per model parameter during mixed-precision AdamW training
        </p>
      </div>

      <div className="space-y-3.5 mb-5">
        {stages.map((stage, idx) => {
          const isHovered = hoveredStage === idx;
          const barWidth = (stage.totalBytes / 16) * 100;

          return (
            <div 
              key={stage.name}
              onMouseEnter={() => setHoveredStage(idx)}
              onMouseLeave={() => setHoveredStage(null)}
              className={`p-2.5 rounded-lg border transition-colors cursor-default ${
                isHovered 
                  ? 'bg-white dark:bg-stone-800 border-stone-300 dark:border-stone-700' 
                  : 'bg-transparent border-transparent'
              }`}
            >
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="font-medium text-stone-900 dark:text-stone-100">{stage.name}</span>
                <span className="font-mono text-stone-700 dark:text-stone-300 font-semibold">
                  {stage.totalBytes} Bytes / param
                </span>
              </div>

              {/* Segmented Bar */}
              <div className="w-full bg-stone-200 dark:bg-stone-800 rounded-md h-3 overflow-hidden flex">
                <div 
                  className="bg-stone-800 dark:bg-stone-200 transition-all duration-300"
                  style={{ width: `${(stage.weights / 16) * 100}%` }}
                  title={`Weights: ${stage.weights}B`}
                />
                <div 
                  className="bg-stone-600 dark:bg-stone-400 transition-all duration-300"
                  style={{ width: `${(stage.gradients / 16) * 100}%` }}
                  title={`Gradients: ${stage.gradients}B`}
                />
                <div 
                  className="bg-amber-600/80 dark:bg-amber-500/80 transition-all duration-300"
                  style={{ width: `${(stage.optimizer / 16) * 100}%` }}
                  title={`Optimizer: ${stage.optimizer}B`}
                />
              </div>

              {isHovered && (
                <div className="mt-2 pt-2 border-t border-stone-100 dark:border-stone-800 text-[11px] text-stone-500 dark:text-stone-400">
                  <p><strong>Mechanism:</strong> {stage.sharding}</p>
                  <p className="font-mono text-stone-700 dark:text-stone-300 mt-0.5">{stage.vram175B}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="pt-3 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-[11px] text-stone-500">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-xs bg-stone-800 dark:bg-stone-200" />
            Weights (2B)
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-xs bg-stone-600 dark:bg-stone-400" />
            Gradients (2B)
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-xs bg-amber-600/80 dark:bg-amber-500/80" />
            AdamW States (12B)
          </span>
        </div>
        <span className="font-mono text-[10px]">8x Overall VRAM Reduction</span>
      </div>
    </div>
  );
};


// ==========================================
// Chart 4: RLHF Radar Preference Scores
// ==========================================
export const RlhfRadarChart: React.FC = () => {
  const [activeModel, setActiveModel] = useState<'both' | 'base' | 'instruct'>('both');

  const dimensions = [
    { label: 'Instruction Following', base: 35, instruct: 92, angle: 0 },
    { label: 'Factuality & Realism', base: 45, instruct: 85, angle: 72 },
    { label: 'Toxicity Reduction', base: 30, instruct: 88, angle: 144 },
    { label: 'Format Adherence', base: 40, instruct: 95, angle: 216 },
    { label: 'Coherence', base: 75, instruct: 90, angle: 288 }
  ];

  const size = 260;
  const center = size / 2;
  const radius = 95;

  const getCoordinates = (value: number, angleDegrees: number) => {
    const angleRad = (angleDegrees - 90) * (Math.PI / 180);
    const r = (value / 100) * radius;
    return {
      x: center + r * Math.cos(angleRad),
      y: center + r * Math.sin(angleRad)
    };
  };

  const basePoints = dimensions
    .map(d => {
      const { x, y } = getCoordinates(d.base, d.angle);
      return `${x},${y}`;
    })
    .join(' ');

  const instructPoints = dimensions
    .map(d => {
      const { x, y } = getCoordinates(d.instruct, d.angle);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 rounded-xl p-5">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-200 dark:border-stone-800">
        <div>
          <h4 className="font-serif text-sm font-medium text-stone-900 dark:text-stone-100">
            Human Evaluator Alignment Dimensions
          </h4>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
            InstructGPT RLHF vs Unaligned Base GPT-3 (Ouyang et al., 2022)
          </p>
        </div>
        <div className="flex items-center gap-1 bg-stone-200/70 dark:bg-stone-800 p-0.5 rounded-lg text-xs">
          <button
            onClick={() => setActiveModel('both')}
            className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
              activeModel === 'both' ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs' : 'text-stone-600 dark:text-stone-400'
            }`}
          >
            Overlay
          </button>
          <button
            onClick={() => setActiveModel('instruct')}
            className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
              activeModel === 'instruct' ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs' : 'text-stone-600 dark:text-stone-400'
            }`}
          >
            InstructGPT
          </button>
        </div>
      </div>

      <div className="flex justify-center items-center py-2">
        <svg width={size} height={size} className="overflow-visible">
          {/* Radar background webs */}
          {[0.25, 0.5, 0.75, 1.0].map((level, i) => (
            <polygon
              key={i}
              points={dimensions
                .map(d => {
                  const { x, y } = getCoordinates(level * 100, d.angle);
                  return `${x},${y}`;
                })
                .join(' ')}
              fill="none"
              stroke="currentColor"
              strokeDasharray={i < 3 ? "2,2" : undefined}
              className="text-stone-300 dark:text-stone-700"
              strokeWidth="0.75"
            />
          ))}

          {/* Radial axis lines */}
          {dimensions.map((d, i) => {
            const { x, y } = getCoordinates(100, d.angle);
            return (
              <line
                key={i}
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                stroke="currentColor"
                className="text-stone-300 dark:text-stone-700"
                strokeWidth="0.75"
              />
            );
          })}

          {/* Base Model polygon */}
          {(activeModel === 'both' || activeModel === 'base') && (
            <polygon
              points={basePoints}
              fill="rgba(239, 68, 68, 0.15)"
              stroke="#dc2626"
              strokeWidth="1.5"
            />
          )}

          {/* InstructGPT polygon */}
          {(activeModel === 'both' || activeModel === 'instruct') && (
            <polygon
              points={instructPoints}
              fill="rgba(16, 185, 129, 0.2)"
              stroke="#059669"
              strokeWidth="2"
            />
          )}

          {/* Dimension Labels */}
          {dimensions.map((d, i) => {
            const labelCoord = getCoordinates(118, d.angle);
            let textAnchor: "middle" | "start" | "end" = "middle";
            if (d.angle > 20 && d.angle < 160) textAnchor = "start";
            if (d.angle > 200 && d.angle < 340) textAnchor = "end";

            return (
              <text
                key={i}
                x={labelCoord.x}
                y={labelCoord.y}
                textAnchor={textAnchor}
                className="text-[9px] font-sans fill-stone-600 dark:fill-stone-400 font-medium"
              >
                {d.label}
              </text>
            );
          })}
        </svg>
      </div>

      <div className="mt-3 pt-3 border-t border-stone-200 dark:border-stone-800 flex items-center justify-around text-xs">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
          <span className="text-stone-600 dark:text-stone-400">Base GPT-3 (175B)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
          <span className="font-semibold text-stone-900 dark:text-stone-100">InstructGPT (175B RLHF)</span>
        </div>
      </div>
    </div>
  );
};


// ==========================================
// Chart 5: Serving Continuous Batching
// ==========================================
export const ServingChart: React.FC = () => {
  const loads = [
    { users: 1, staticTps: 15, orcaTps: 18 },
    { users: 10, staticTps: 24, orcaTps: 125 },
    { users: 50, staticTps: 29, orcaTps: 390 },
    { users: 100, staticTps: 32, orcaTps: 740 },
    { users: 200, staticTps: 34, orcaTps: 1180 }
  ];

  return (
    <div className="bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 rounded-xl p-5">
      <div className="mb-4 pb-3 border-b border-stone-200 dark:border-stone-800">
        <h4 className="font-serif text-sm font-medium text-stone-900 dark:text-stone-100">
          Serving Throughput: Static Batching vs Orca Continuous Batching
        </h4>
        <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
          Generated output tokens per second across concurrent client queries
        </p>
      </div>

      <div className="space-y-3 mb-5">
        {loads.map((item) => {
          const staticPct = (item.staticTps / 1200) * 100;
          const orcaPct = (item.orcaTps / 1200) * 100;

          return (
            <div key={item.users} className="text-xs">
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium text-stone-800 dark:text-stone-200">{item.users} Concurrent {item.users === 1 ? 'User' : 'Users'}</span>
                <span className="font-mono text-[11px] text-stone-500">
                  Orca: <strong className="text-emerald-700 dark:text-emerald-400 font-bold">{item.orcaTps}</strong> tok/s · Static: {item.staticTps} tok/s
                </span>
              </div>
              <div className="space-y-1">
                {/* Orca dynamic */}
                <div className="w-full bg-stone-200 dark:bg-stone-800 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-emerald-600 dark:bg-emerald-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.max(2, orcaPct)}%` }}
                  />
                </div>
                {/* Static */}
                <div className="w-full bg-stone-200 dark:bg-stone-800 rounded-full h-1 overflow-hidden opacity-60">
                  <div 
                    className="bg-red-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.max(2, staticPct)}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-3 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-[11px] text-stone-500">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
            Orca Iteration-Level Batching
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 opacity-70" />
            Static Batching (Head-of-Line Block)
          </span>
        </div>
        <span className="font-mono text-[10px]">Up to 34x Throughput Multiplier</span>
      </div>
    </div>
  );
};
