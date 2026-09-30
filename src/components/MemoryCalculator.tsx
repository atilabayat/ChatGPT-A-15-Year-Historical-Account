import React, { useState } from 'react';
import { Cpu, Server, Database, Layers, ArrowRight, Info } from 'lucide-react';

export const MemoryCalculator: React.FC = () => {
  const [params, setParams] = useState<number>(175);
  const [precision, setPrecision] = useState<number>(16); // bits
  const [mode, setMode] = useState<'inference' | 'training'>('inference');
  const [contextLength, setContextLength] = useState<number>(4096);
  const [batchSize, setBatchSize] = useState<number>(8);
  const [selectedGpu, setSelectedGpu] = useState<'a100' | 'h100' | 'b200' | 'l40s'>('a100');

  // GPU specs: usable VRAM in GB
  const gpus = {
    a100: { name: 'NVIDIA A100 (80GB)', usableVram: 72, costRatio: '1x' },
    h100: { name: 'NVIDIA H100 (80GB)', usableVram: 74, costRatio: '2.5x' },
    b200: { name: 'NVIDIA B200 (192GB)', usableVram: 180, costRatio: '3.8x' },
    l40s: { name: 'NVIDIA L40S (48GB)', usableVram: 44, costRatio: '0.6x' }
  };

  // Preset models
  const presets = [
    { label: 'InstructGPT 1.3B', val: 1.3 },
    { label: 'LLaMA 7B', val: 7 },
    { label: 'LLaMA 13B', val: 13 },
    { label: 'LLaMA-2 70B', val: 70 },
    { label: 'GPT-3 / ChatGPT (175B)', val: 175 }
  ];

  // Mathematical calculations:
  // 1. Static weights: params * (bits / 8) GB
  const bytesPerParam = precision / 8;
  const staticWeightGB = params * bytesPerParam;

  // 2. KV Cache for inference:
  // Standard transformer formula: 2 * num_layers * hidden_size * num_heads * bytes_per_element * seq_len * batch_size
  // Heuristic based on parameter scale: ~0.0000008 GB per token-layer-param
  // Simplified formula: 2 * 2 * n_layers * d_model * seq_len * batch
  // For 175B (96 layers, d_model=12288): 2 * 2 * 96 * 12288 * 2 bytes * seq * batch
  const kvCacheGB = mode === 'inference' 
    ? (2 * 2 * 96 * 12288 * 2 * contextLength * batchSize) / (1024 * 1024 * 1024) * (params / 175)
    : 0;

  // 3. Activation & runtime buffer overhead:
  const activationGB = mode === 'inference' 
    ? Math.max(2, staticWeightGB * 0.12)
    : params * 2; // Forward activations in training

  // 4. Optimizer & Gradient memory for Training (AdamW):
  // AdamW:
  // - Gradients: 2 bytes/param (FP16/BF16)
  // - Master FP32 weights: 4 bytes/param
  // - Momentum buffer: 4 bytes/param (FP32)
  // - Variance buffer: 4 bytes/param (FP32)
  // Total optimizer = 12 bytes/param. Total training state = 16 bytes/param.
  const gradientGB = mode === 'training' ? params * 2 : 0;
  const optimizerGB = mode === 'training' ? params * 12 : 0;

  // Total required VRAM:
  const totalVramGB = mode === 'inference'
    ? staticWeightGB + kvCacheGB + activationGB
    : staticWeightGB + gradientGB + optimizerGB + activationGB;

  // Hardware count:
  const currentGpuUsable = gpus[selectedGpu].usableVram;
  const gpusNeeded = Math.max(1, Math.ceil(totalVramGB / currentGpuUsable));
  const nodesNeeded = Math.ceil(gpusNeeded / 8);

  return (
    <div id="calculator" className="bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 rounded-xl p-6 sm:p-8">
      <div className="mb-6 pb-4 border-b border-stone-200 dark:border-stone-800">
        <div className="flex items-center gap-2 text-xs font-mono text-stone-500 mb-1">
          <Cpu className="w-3.5 h-3.5" />
          <span>INTERACTIVE HARDWARE SIZING</span>
        </div>
        <h3 className="font-serif text-lg sm:text-xl font-medium text-stone-900 dark:text-stone-100">
          LLM Memory Footprint & Hardware Sizing Estimator
        </h3>
        <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 max-w-3xl">
          Real-time VRAM requirement simulator calculating static weight footprints, multi-tenant KV caches, AdamW 16-byte optimizer states, and minimum cluster node topology.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-5 bg-white dark:bg-stone-900 p-5 rounded-lg border border-stone-200 dark:border-stone-800 shadow-xs">
          
          {/* Mode Selector */}
          <div>
            <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-2">
              Execution Regime
            </label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-stone-100 dark:bg-stone-800 rounded-md">
              <button
                onClick={() => setMode('inference')}
                className={`py-1.5 px-3 text-xs font-medium rounded transition-colors ${
                  mode === 'inference'
                    ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                }`}
              >
                Inference Serving
              </button>
              <button
                onClick={() => setMode('training')}
                className={`py-1.5 px-3 text-xs font-medium rounded transition-colors ${
                  mode === 'training'
                    ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                }`}
              >
                Full AdamW Training
              </button>
            </div>
          </div>

          {/* Model Scale Slider & Presets */}
          <div>
            <div className="flex justify-between items-center text-xs mb-1.5">
              <label className="font-medium text-stone-700 dark:text-stone-300">
                Model Parameters
              </label>
              <span className="font-mono font-semibold text-stone-900 dark:text-stone-100">
                {params} Billion
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="175"
              step="1"
              value={params}
              onChange={(e) => setParams(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-stone-200 dark:bg-stone-700 rounded-lg appearance-none cursor-pointer accent-stone-800 dark:accent-stone-200"
            />
            {/* Quick Presets */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {presets.map((p) => (
                <button
                  key={p.val}
                  onClick={() => setParams(p.val)}
                  className={`text-[10px] px-2 py-0.5 rounded border transition-colors ${
                    params === p.val
                      ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 border-stone-900 dark:border-stone-100 font-medium'
                      : 'bg-stone-50 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:border-stone-400'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Precision Format */}
          <div>
            <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1.5">
              Numerical Precision
            </label>
            <select
              value={precision}
              onChange={(e) => setPrecision(parseInt(e.target.value))}
              className="w-full px-3 py-2 text-xs font-mono bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-md text-stone-800 dark:text-stone-200 focus:outline-none"
            >
              <option value="16">FP16 / BF16 (16-bit · 2.0 Bytes / param)</option>
              <option value="8">FP8 / INT8 (8-bit · 1.0 Byte / param)</option>
              <option value="4">INT4 Quantized (4-bit · 0.5 Bytes / param)</option>
            </select>
          </div>

          {/* Target GPU Hardware */}
          <div>
            <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1.5">
              Target Accelerator Silicon
            </label>
            <select
              value={selectedGpu}
              onChange={(e) => setSelectedGpu(e.target.value as any)}
              className="w-full px-3 py-2 text-xs font-sans bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-md text-stone-800 dark:text-stone-200 focus:outline-none"
            >
              <option value="a100">NVIDIA A100 (80GB HBM2e · ~72GB usable)</option>
              <option value="h100">NVIDIA H100 (80GB HBM3 · ~74GB usable)</option>
              <option value="b200">NVIDIA B200 (192GB HBM3e · ~180GB usable)</option>
              <option value="l40s">NVIDIA L40S (48GB GDDR6 · ~44GB usable)</option>
            </select>
          </div>

          {/* Inference Context & Batch Size */}
          {mode === 'inference' && (
            <div className="pt-2 border-t border-stone-100 dark:border-stone-800 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-stone-600 dark:text-stone-400 mb-1">
                    Context Window
                  </label>
                  <select
                    value={contextLength}
                    onChange={(e) => setContextLength(parseInt(e.target.value))}
                    className="w-full px-2 py-1.5 text-xs font-mono bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded text-stone-800 dark:text-stone-200"
                  >
                    <option value="2048">2,048 (GPT-3)</option>
                    <option value="4096">4,096 (ChatGPT)</option>
                    <option value="8192">8,192 (GPT-4)</option>
                    <option value="32768">32,768 (Long Context)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-stone-600 dark:text-stone-400 mb-1">
                    Concurrent Batch
                  </label>
                  <select
                    value={batchSize}
                    onChange={(e) => setBatchSize(parseInt(e.target.value))}
                    className="w-full px-2 py-1.5 text-xs font-mono bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded text-stone-800 dark:text-stone-200"
                  >
                    <option value="1">1 (Single User)</option>
                    <option value="8">8 (Standard)</option>
                    <option value="32">32 (High Density)</option>
                    <option value="64">64 (Peak Load)</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Calculations & Sizing (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Main Key Figures Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-4 rounded-lg">
              <span className="text-xs font-mono text-stone-500 uppercase tracking-wide">
                Total Required VRAM
              </span>
              <div className="text-2xl font-mono font-bold text-stone-900 dark:text-stone-100 mt-1">
                {totalVramGB.toFixed(1)} GB
              </div>
              <p className="text-[11px] text-stone-500 mt-1">
                {mode === 'inference' ? 'Model weights + dynamic KV cache buffer' : 'Weights + AdamW optimizer + activations'}
              </p>
            </div>

            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-4 rounded-lg">
              <span className="text-xs font-mono text-stone-500 uppercase tracking-wide">
                Minimum Silicon Allocation
              </span>
              <div className="text-2xl font-mono font-bold text-stone-900 dark:text-stone-100 mt-1">
                {gpusNeeded} {selectedGpu.toUpperCase()} {gpusNeeded === 1 ? 'GPU' : 'GPUs'}
              </div>
              <p className="text-[11px] text-stone-500 mt-1">
                Requires ~{nodesNeeded} {nodesNeeded === 1 ? 'Node' : 'Nodes'} (8-GPU HGX clusters)
              </p>
            </div>
          </div>

          {/* Breakdown Table */}
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg p-4">
            <h4 className="text-xs font-medium text-stone-700 dark:text-stone-300 mb-3 uppercase tracking-wider font-mono">
              Memory Allocation Breakdown
            </h4>
            
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1.5 border-b border-stone-100 dark:border-stone-800">
                <span className="text-stone-600 dark:text-stone-400">Static Model Weights ({precision}-bit)</span>
                <span className="font-mono font-medium text-stone-900 dark:text-stone-100">
                  {staticWeightGB.toFixed(1)} GB
                </span>
              </div>

              {mode === 'inference' ? (
                <>
                  <div className="flex justify-between py-1.5 border-b border-stone-100 dark:border-stone-800">
                    <span className="text-stone-600 dark:text-stone-400">
                      KV Cache ({contextLength} tokens × {batchSize} batch)
                    </span>
                    <span className="font-mono font-medium text-stone-900 dark:text-stone-100">
                      {kvCacheGB.toFixed(1)} GB
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-stone-100 dark:border-stone-800">
                    <span className="text-stone-600 dark:text-stone-400">Runtime Activation & Kernel Workspace</span>
                    <span className="font-mono font-medium text-stone-900 dark:text-stone-100">
                      {activationGB.toFixed(1)} GB
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between py-1.5 border-b border-stone-100 dark:border-stone-800">
                    <span className="text-stone-600 dark:text-stone-400">AdamW Optimizer States (12 bytes/param)</span>
                    <span className="font-mono font-medium text-amber-700 dark:text-amber-400">
                      {optimizerGB.toFixed(1)} GB
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-stone-100 dark:border-stone-800">
                    <span className="text-stone-600 dark:text-stone-400">Gradients (2 bytes/param)</span>
                    <span className="font-mono font-medium text-stone-900 dark:text-stone-100">
                      {gradientGB.toFixed(1)} GB
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-stone-100 dark:border-stone-800">
                    <span className="text-stone-600 dark:text-stone-400">Activation Checkpointing Buffer</span>
                    <span className="font-mono font-medium text-stone-900 dark:text-stone-100">
                      {activationGB.toFixed(1)} GB
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Distributed Topology Recommendation */}
            <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-start gap-2 text-xs text-stone-500">
              <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-stone-400" />
              <div>
                <strong className="text-stone-700 dark:text-stone-300">Recommended Sharding Topology: </strong>
                {mode === 'inference' ? (
                  gpusNeeded <= 8 ? (
                    <span>Tensor Parallelism (TP={gpusNeeded}) within a single 8-GPU NVLink chassis.</span>
                  ) : (
                    <span>Tensor Parallelism (TP=8) + Pipeline Parallelism (PP={Math.ceil(gpusNeeded / 8)}) across InfiniBand.</span>
                  )
                ) : (
                  <span>DeepSpeed ZeRO-3 with Tensor Parallelism (TP=8) and 1F1B Pipeline Parallelism.</span>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
