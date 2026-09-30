import React, { useState } from 'react';
import { Play, RotateCcw, ArrowDown, ArrowUp, AlertCircle, CheckCircle2 } from 'lucide-react';

export const ArchitectureComparison: React.FC = () => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationStep, setSimulationStep] = useState(0);

  const handleSimulate = () => {
    setIsSimulating(true);
    setSimulationStep(1);
    const interval = setInterval(() => {
      setSimulationStep((prev) => {
        if (prev >= 4) {
          clearInterval(interval);
          setIsSimulating(false);
          return 4;
        }
        return prev + 1;
      });
    }, 600);
  };

  const handleReset = () => {
    setSimulationStep(0);
    setIsSimulating(false);
  };

  return (
    <div className="bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 rounded-xl p-6">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-stone-200 dark:border-stone-800">
        <div>
          <h3 className="font-serif text-base font-medium text-stone-900 dark:text-stone-100">
            Gradient Highway Topology: Post-LN vs Pre-LN
          </h3>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 max-w-2xl">
            How moving LayerNorm inside the residual branch eliminated the vanishing gradient bottleneck, enabling stable training of 96-layer GPT-3 architectures.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={simulationStep === 0 ? handleSimulate : handleReset}
            disabled={isSimulating}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-900 dark:text-stone-100 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors shadow-xs disabled:opacity-50"
          >
            {simulationStep === 0 ? (
              <>
                <Play className="w-3.5 h-3.5 text-emerald-600" />
                <span>Simulate Backprop Gradients</span>
              </>
            ) : (
              <>
                <RotateCcw className="w-3.5 h-3.5 text-stone-500" />
                <span>Reset Simulation</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Post-LN Column */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-stone-100 dark:border-stone-800">
              <span className="text-xs font-mono font-semibold text-rose-700 dark:text-rose-400">
                POST-LAYERNORM (Vaswani et al., 2017)
              </span>
              <span className="text-[10px] text-stone-400 font-mono">Original Transformer</span>
            </div>

            <div className="space-y-2.5 font-mono text-xs">
              <div className="p-2 text-center rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                Input State: x<sub>l</sub>
              </div>
              <div className="text-center text-stone-400">
                <ArrowDown className="w-3.5 h-3.5 mx-auto" />
              </div>
              <div className="p-2.5 text-center rounded border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/60 text-stone-800 dark:text-stone-200">
                Multi-Head Self-Attention Sublayer(x<sub>l</sub>)
              </div>
              <div className="text-center text-stone-400">
                <ArrowDown className="w-3.5 h-3.5 mx-auto" />
              </div>
              <div className="p-2 text-center rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                Residual Add: x<sub>l</sub> + Sublayer(x<sub>l</sub>)
              </div>
              <div className="text-center text-stone-400">
                <ArrowDown className="w-3.5 h-3.5 mx-auto" />
              </div>
              <div className={`p-2.5 text-center rounded font-semibold transition-all duration-300 ${
                simulationStep >= 2 
                  ? 'bg-rose-100 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-300 ring-2 ring-rose-400/40' 
                  : 'bg-stone-100 dark:bg-stone-800 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-400'
              }`}>
                LayerNorm(x<sub>l</sub> + Sublayer(x<sub>l</sub>))
              </div>
            </div>

            <div className="mt-4 p-3 bg-stone-50 dark:bg-stone-950 rounded-lg border border-stone-200 dark:border-stone-800 text-xs">
              <div className="flex items-start gap-1.5 text-rose-700 dark:text-rose-400 font-medium mb-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>The Gradient Bottleneck</span>
              </div>
              <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                LayerNorm sits directly on top of the residual addition. Backpropagated gradients ∇x<sub>l</sub> must multiply by the LayerNorm Jacobian ∂LN/∂x, dampening gradient magnitude exponentially across depth:
              </p>
              <div className="font-mono text-[10px] text-stone-500 mt-2 p-1.5 bg-white dark:bg-stone-900 rounded border border-stone-200 dark:border-stone-800 text-center">
                ∂L / ∂x<sub>0</sub> = ∏<sub>l=1..L</sub> J<sub>LN</sub>(l) · ∂L / ∂x<sub>L</sub> → 0
              </div>
            </div>
          </div>

          {simulationStep > 0 && (
            <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 text-xs font-mono">
              <span className="text-stone-500">Backprop Gradient Strength: </span>
              <span className="text-rose-600 font-bold">
                {simulationStep === 1 ? '100%' : simulationStep === 2 ? '42%' : simulationStep === 3 ? '11%' : '1.8% (Vanished)'}
              </span>
            </div>
          )}
        </div>

        {/* Pre-LN Column */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-stone-100 dark:border-stone-800">
              <span className="text-xs font-mono font-semibold text-emerald-700 dark:text-emerald-400">
                PRE-LAYERNORM (GPT-2, GPT-3, Modern LLMs)
              </span>
              <span className="text-[10px] text-stone-400 font-mono">Radford et al. / OpenAI Standard</span>
            </div>

            <div className="space-y-2.5 font-mono text-xs">
              <div className="p-2 text-center rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                Input State: x<sub>l</sub>
              </div>
              <div className="text-center text-stone-400">
                <ArrowDown className="w-3.5 h-3.5 mx-auto" />
              </div>
              <div className="p-2.5 text-center rounded bg-stone-100 dark:bg-stone-800/80 border border-emerald-200 dark:border-emerald-900/60 text-emerald-800 dark:text-emerald-300">
                LayerNorm(x<sub>l</sub>) applied inside branch
              </div>
              <div className="text-center text-stone-400">
                <ArrowDown className="w-3.5 h-3.5 mx-auto" />
              </div>
              <div className="p-2.5 text-center rounded border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/60 text-stone-800 dark:text-stone-200">
                Sublayer(LayerNorm(x<sub>l</sub>))
              </div>
              <div className="text-center text-stone-400">
                <ArrowDown className="w-3.5 h-3.5 mx-auto" />
              </div>
              <div className={`p-2.5 text-center rounded font-semibold transition-all duration-300 ${
                simulationStep >= 2 
                  ? 'bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 ring-2 ring-emerald-400/40' 
                  : 'bg-stone-100 dark:bg-stone-800 border border-emerald-200 dark:border-emerald-900/60 text-emerald-700 dark:text-emerald-400'
              }`}>
                x<sub>l+1</sub> = x<sub>l</sub> + Sublayer(LayerNorm(x<sub>l</sub>))
              </div>
            </div>

            <div className="mt-4 p-3 bg-stone-50 dark:bg-stone-950 rounded-lg border border-stone-200 dark:border-stone-800 text-xs">
              <div className="flex items-start gap-1.5 text-emerald-700 dark:text-emerald-400 font-medium mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>The Unobstructed Residual Highway</span>
              </div>
              <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                By isolating normalization inside the branch, an identity path exists directly from final output to early embeddings. The gradient contains an unaltered additive identity term I:
              </p>
              <div className="font-mono text-[10px] text-stone-500 mt-2 p-1.5 bg-white dark:bg-stone-900 rounded border border-stone-200 dark:border-stone-800 text-center">
                ∂L / ∂x<sub>0</sub> = ∂L / ∂x<sub>L</sub> · [ I + ∑<sub>l=1..L</sub> ∂Sublayer<sub>l</sub> / ∂x<sub>l</sub> ]
              </div>
            </div>
          </div>

          {simulationStep > 0 && (
            <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 text-xs font-mono">
              <span className="text-stone-500">Backprop Gradient Strength: </span>
              <span className="text-emerald-600 font-bold">
                {simulationStep === 1 ? '100%' : simulationStep === 2 ? '98%' : simulationStep === 3 ? '96%' : '94% (Preserved)'}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
