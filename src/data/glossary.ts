export interface GlossaryEntry {
  id: string;
  term: string;
  acronym?: string;
  category: 'Hardware & Silicon' | 'Architecture & Topology' | 'Training & Parallelism' | 'Post-Training & Alignment' | 'Inference & Compilers';
  shortDef: string;
  fullDef: string;
  engineeringImpact: string;
  keyPaper?: {
    title: string;
    authors: string;
    year: number;
  };
  relatedTerms?: string[];
}

export const GLOSSARY_TERMS: Record<string, GlossaryEntry> = {
  'rlhf': {
    id: 'rlhf',
    term: 'Reinforcement Learning from Human Feedback',
    acronym: 'RLHF',
    category: 'Post-Training & Alignment',
    shortDef: 'A three-stage post-training methodology that aligns raw next-token language model predictors with human values, instruction compliance, and conversational helpfulness.',
    fullDef: 'Base language models trained on internet text predict the statistically most likely continuation of an input sequence, which often produces repetitive, evasive, toxic, or unhelpful answers. RLHF resolves this through a three-stage pipeline: (1) Supervised Fine-Tuning (SFT) on curated prompt-response dialogues, (2) Training a scalar Reward Model (RM) using human pairwise ranking preferences via the Bradley-Terry loss, and (3) Policy optimization using Proximal Policy Optimization (PPO) with a per-token KL divergence penalty to maximize the reward score without straying too far from the base model.',
    engineeringImpact: 'Allowed OpenAI to achieve unprecedented conversational fidelity. A 1.3-billion parameter InstructGPT model with RLHF consistently outperformed a raw 175-billion parameter GPT-3 model in human evaluator preference.',
    keyPaper: {
      title: 'Training language models to follow instructions with human feedback',
      authors: 'Ouyang et al. (OpenAI)',
      year: 2022
    },
    relatedTerms: ['ppo', 'sft', 'kl-divergence', 'bradley-terry']
  },
  'pre-ln': {
    id: 'pre-ln',
    term: 'Pre-Layer Normalization',
    acronym: 'Pre-LN',
    category: 'Architecture & Topology',
    shortDef: 'An architectural formulation where layer normalization is applied inside the sublayer branch before multi-head attention and feed-forward networks, rather than after the residual addition.',
    fullDef: 'The original 2017 Transformer used Post-LayerNorm (Post-LN), where normalization was applied after the residual addition: x_{l+1} = LayerNorm(x_l + Sublayer(x_l)). In Post-LN, backpropagated gradients must pass through the LayerNorm Jacobian at every layer, attenuating exponentially as depth increases and causing catastrophic gradient vanishing in deep models without delicate learning rate warmups. Pre-LN places LayerNorm strictly on the input to each sublayer: x_{l+1} = x_l + Sublayer(LayerNorm(x_l)). This leaves the main residual stream as a pure identity highway (x_L = x_0 + ∑ Sublayer), allowing gradients to backpropagate unaltered directly to the input embedding layer.',
    engineeringImpact: 'Crucial for training models with 48 to 96 layers (such as GPT-2 and GPT-3 175B) with high numerical stability and without requiring fragile multi-thousand step learning rate warmup schedules.',
    keyPaper: {
      title: 'Language Models are Unsupervised Multitask Learners (GPT-2)',
      authors: 'Radford et al. (OpenAI)',
      year: 2019
    },
    relatedTerms: ['post-ln', 'transformer']
  },
  'post-ln': {
    id: 'post-ln',
    term: 'Post-Layer Normalization',
    acronym: 'Post-LN',
    category: 'Architecture & Topology',
    shortDef: 'The original 2017 Transformer normalization placement where LayerNorm is applied to the output of the residual sum.',
    fullDef: 'In Post-LN, the recurrence relation is x_{l+1} = LayerNorm(x_l + Sublayer(x_l)). Because LayerNorm scales activations inversely by their standard deviation, backpropagated error gradients must multiply by the Jacobian matrix of LayerNorm at each successive depth. Across 40+ layers, this Jacobian multiplication dampens gradient magnitudes down to near-zero in early layers, requiring extremely small learning rates and fragile warmups.',
    engineeringImpact: 'Suffered severe scaling limits; superseded by Pre-LN across virtually all modern generative autoregressive LLMs (GPT-2, GPT-3, LLaMA, PaLM).',
    keyPaper: {
      title: 'Attention Is All You Need',
      authors: 'Vaswani et al. (Google Brain / Research)',
      year: 2017
    },
    relatedTerms: ['pre-ln', 'transformer']
  },
  'flashattention': {
    id: 'flashattention',
    term: 'FlashAttention',
    category: 'Inference & Compilers',
    shortDef: 'An IO-aware exact self-attention algorithm that computes attention using on-chip SRAM memory tiling, avoiding memory-bandwidth bottlenecks.',
    fullDef: 'Under the GPU Roofline Model, standard attention computation is bottlenecked not by arithmetic compute speed (FLOPs), but by High Bandwidth Memory (HBM) read/write latency. Standard implementations materialize an N × N attention matrix in slow HBM, then read it back for softmax and dropout. FlashAttention tiles the query, key, and value matrices into small blocks that fit into the fast 192KB on-chip SRAM of GPU Streaming Multiprocessors (SMs), computing an incremental online softmax without ever writing the quadratic N × N intermediate matrix to global memory.',
    engineeringImpact: 'Reduces memory access from O(N²) to O(N), yielding 2x to 4x wall-clock training speedups and enabling context windows to scale from 2k to 32k+ tokens with identical exact mathematical outputs.',
    keyPaper: {
      title: 'FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness',
      authors: 'Dao et al. (Stanford / Hazy Research)',
      year: 2022
    },
    relatedTerms: ['sram', 'hbm', 'roofline-model', 'triton']
  },
  'zero': {
    id: 'zero',
    term: 'Zero Redundancy Optimizer',
    acronym: 'ZeRO',
    category: 'Training & Parallelism',
    shortDef: 'A distributed memory optimization technique that partitions optimizer states, gradients, and model parameters across data-parallel GPUs while maintaining standard data-parallel communication.',
    fullDef: 'In traditional Data Parallelism (DP), every GPU holds an identical copy of model weights, gradients, and optimizer states. For a 175B model, standard FP16 AdamW training requires 16 bytes per parameter (2.8 Terabytes of VRAM), exceeding any single GPU. ZeRO partitions memory into three stages: Stage 1 shards the 12-byte optimizer states (4x memory reduction); Stage 2 shards optimizer states and 2-byte gradients (8x reduction); Stage 3 shards optimizer states, gradients, and the 2-byte model parameters, gathering parameters on the fly via all-gather communication during forward and backward passes.',
    engineeringImpact: 'Enabled training models with hundreds of billions of parameters without requiring massive pipeline bubbles or exotic hardware, forming the backbone of the DeepSpeed distributed stack.',
    keyPaper: {
      title: 'ZeRO: Memory Optimizations Toward Training Trillion Parameter Models',
      authors: 'Rajbhandari et al. (Microsoft Research)',
      year: 2020
    },
    relatedTerms: ['adamw', 'tensor-parallelism', 'pipeline-parallelism']
  },
  'orca': {
    id: 'orca',
    term: 'Orca Continuous Dynamic Batching',
    category: 'Inference & Compilers',
    shortDef: 'An iteration-level inference scheduling architecture that evicts finished sequences and schedules new user requests at every token generation step.',
    fullDef: 'Traditional serving engines used request-level (static) batching: a set of queries ran synchronously until the longest response completed. Shorter requests that finished early were forced to output useless padding tokens while waiting, blocking the GPU from serving incoming traffic (head-of-line blocking). Orca introduced iteration-level dynamic batching: at every single autoregressive decoding step, requests that emit an End-of-Sequence (EOS) token are immediately returned to the user, and newly arrived user requests are scheduled into the vacant batch slot without restarting the batch.',
    engineeringImpact: 'Increased serving token throughput by 10x to 34x over static batching systems, drastically reducing serving costs and making commercial deployments like ChatGPT economically sustainable at 100M+ user scale.',
    keyPaper: {
      title: 'Orca: A Distributed Serving System for Transformer-Based Generative Models',
      authors: 'Yu et al. (Microsoft Research / OSDI)',
      year: 2022
    },
    relatedTerms: ['kv-cache', 'static-batching']
  },
  'ppo': {
    id: 'ppo',
    term: 'Proximal Policy Optimization',
    acronym: 'PPO',
    category: 'Post-Training & Alignment',
    shortDef: 'An on-policy reinforcement learning algorithm that clips objective updates to prevent destructive policy divergence during training.',
    fullDef: 'PPO optimizes the language model policy to maximize output scalar scores produced by the Reward Model. It employs a clipped surrogate objective function that penalizes policy updates that move the output probability distribution too far from the previous policy state in a single step. In RLHF, PPO is typically augmented with an empirical KL penalty and a pre-training gradient loss (PPO-ptx) to preserve the base model general knowledge and prevent alignment tax.',
    engineeringImpact: 'Provided stable, scalable policy gradient updates for fine-tuning 175B language models without catastrophic gradient collapse.',
    keyPaper: {
      title: 'Proximal Policy Optimization Algorithms',
      authors: 'Schulman et al. (OpenAI)',
      year: 2017
    },
    relatedTerms: ['rlhf', 'kl-divergence', 'sft']
  },
  'sft': {
    id: 'sft',
    term: 'Supervised Fine-Tuning',
    acronym: 'SFT',
    category: 'Post-Training & Alignment',
    shortDef: 'The first stage of alignment where a base model is fine-tuned on high-quality demonstration dialogues curated by human annotators.',
    fullDef: 'Base language models lack understanding of turn-taking conversational dynamics, question-answering formats, or safety refusals. SFT fine-tunes the base model on tens of thousands of prompt-response demonstrations written according to strict guidelines. While SFT significantly improves instruction following, it struggles with distributional shift and open-ended nuances where multiple valid answers exist, motivating the subsequent Reward Model and PPO stages.',
    engineeringImpact: 'Transforms an uncontrolled text completion engine into a coherent conversational assistant prototype capable of generating candidates for reward ranking.',
    keyPaper: {
      title: 'Training language models to follow instructions with human feedback',
      authors: 'Ouyang et al. (OpenAI)',
      year: 2022
    },
    relatedTerms: ['rlhf', 'ppo']
  },
  'adamw': {
    id: 'adamw',
    term: 'Adam with Decoupled Weight Decay',
    acronym: 'AdamW',
    category: 'Training & Parallelism',
    shortDef: 'An optimizer modification that decouples L2 parameter regularization from adaptive gradient momentum updates.',
    fullDef: 'Standard Adam implemented weight decay as an L2 regularization penalty added directly to the gradient (g_t = ∇f(θ_t) + λθ_t). Because Adam normalizes gradient steps by the square root of the second moment (v_t), weights with large historical gradients experience less relative decay than weights with small gradients. Loshchilov & Hutter proved that decoupled weight decay—where the decay step is applied directly to the parameter update (θ_{t+1} = θ_t - η[m_t/(√v_t + ε) + λθ_t])—restores true scale-invariant regularization.',
    engineeringImpact: 'Became the universal default optimizer for modern transformer pre-training, preventing weights from blowing up or overfitting across hundreds of billions of training tokens.',
    keyPaper: {
      title: 'Decoupled Weight Decay Regularization',
      authors: 'Loshchilov & Hutter',
      year: 2017
    },
    relatedTerms: ['zero']
  },
  'chinchilla': {
    id: 'chinchilla',
    term: 'Chinchilla Compute-Optimal Scaling Laws',
    category: 'Training & Parallelism',
    shortDef: 'Empirical scaling laws establishing that model parameters and training dataset tokens should be scaled in equal 1:1 proportion for optimal compute efficiency.',
    fullDef: 'In 2020, Kaplan et al. concluded that compute budget increases should be invested primarily in parameter scale rather than token volume (N ∝ C^0.73, D ∝ C^0.27). In 2022, Hoffmann et al. at DeepMind discovered that Kaplan had evaluated models with fixed cosine learning rate decay schedules rather than retuning schedules to the specific token budget. When re-evaluated across 400+ runs, Chinchilla demonstrated that parameters and tokens should scale equally (N ∝ C^0.50, D ∝ C^0.50), indicating that an optimal model requires roughly 20 training tokens per parameter.',
    engineeringImpact: 'Revealed that GPT-3 (175B trained on 300B tokens, 1.7 tokens/param) was drastically undertrained. Led directly to modern dense models (e.g., LLaMA 7B trained on 2 Trillion tokens) that achieve superior quality at fraction of the serving inference footprint.',
    keyPaper: {
      title: 'Training Compute-Optimal Large Language Models',
      authors: 'Hoffmann et al. (DeepMind)',
      year: 2022
    },
    relatedTerms: ['kaplan-scaling']
  },
  'kaplan-scaling': {
    id: 'kaplan-scaling',
    term: 'Kaplan Scaling Laws',
    category: 'Training & Parallelism',
    shortDef: 'Initial empirical power-law relationships between model performance (test loss), compute budget, parameter scale, and dataset size published by OpenAI in 2020.',
    fullDef: 'Kaplan et al. established that language model cross-entropy loss follows smooth power-law relationships over multiple orders of magnitude with minimal dependence on hyper-parameters like depth vs. width. Crucially, the paper recommended scaling model parameters 3x faster than dataset size for a given compute budget increase, inspiring the architecture and pre-training scale of the 175-billion parameter GPT-3.',
    engineeringImpact: 'Provided the theoretical justification for tech labs to commit tens of millions of dollars to training 100B+ parameter models on massive GPU clusters.',
    keyPaper: {
      title: 'Scaling Laws for Neural Language Models',
      authors: 'Kaplan et al. (OpenAI)',
      year: 2020
    },
    relatedTerms: ['chinchilla']
  },
  'kv-cache': {
    id: 'kv-cache',
    term: 'Key-Value Cache',
    acronym: 'KV Cache',
    category: 'Inference & Compilers',
    shortDef: 'An inference optimization that stores previously computed Key and Value attention projection vectors in GPU VRAM to avoid redundant quadratic recalculation during autoregressive decoding.',
    fullDef: 'During autoregressive generation, a transformer predicts tokens one by one. For token t, the query vector Q_t only needs to compute attention against past keys K_{1..t} and values V_{1..t}. Without caching, all past tokens would have to be passed through all transformer layers repeatedly (O(T²) compute). By storing past K and V tensor states in GPU memory, the model only passes the single new token through the forward pass (O(1) matrix multiplies), at the cost of expanding VRAM consumption linearly with batch size and context length.',
    engineeringImpact: 'Crucial for real-time interactive generation; managing KV cache memory consumption inspired dynamic allocation systems like vLLM PagedAttention and Orca.',
    relatedTerms: ['orca', 'flashattention']
  },
  'triton': {
    id: 'triton',
    term: 'OpenAI Triton Compiler',
    category: 'Inference & Compilers',
    shortDef: 'An open-source Python-like programming language and MLIR-based optimizing compiler for writing highly efficient custom GPU kernels without CUDA.',
    fullDef: 'Writing custom high-throughput GPU kernels previously required expert C++/CUDA knowledge, manually orchestrating shared memory banking, warp shuffles, memory coalescing, and hardware thread block synchronization. Developed by Philippe Tillet and released by OpenAI in 2021, Triton allows developers to write block-level matrix kernels in Python. The compiler lowers code into MLIR intermediate representations, automatically fusing operations and scheduling memory transfers to match hardware architectures.',
    engineeringImpact: 'Democratized kernel development for modern AI research, allowing rapid experimentation with custom attention variants, fused activations, and quantized matrix multiplications.',
    keyPaper: {
      title: 'Triton: An Intermediate Language and Compiler for Tiled Neural Network Computations',
      authors: 'Tillet et al. (OpenAI)',
      year: 2021
    },
    relatedTerms: ['flashattention', 'roofline-model']
  },
  'tensor-parallelism': {
    id: 'tensor-parallelism',
    term: 'Tensor Parallelism',
    acronym: 'TP',
    category: 'Training & Parallelism',
    shortDef: 'An intra-layer model parallelism technique that shards large weight matrices across multiple GPUs within a node using high-bandwidth NVLink interconnects.',
    fullDef: 'Introduced in Megatron-LM (Shoeybi et al., 2019), Tensor Parallelism partitions matrix multiplications across GPUs along either row or column dimensions. In Multi-Head Attention, projection matrices W_Q, W_K, W_V are column-parallelized (each GPU computes a subset of attention heads without communication), followed by a row-parallel output projection W_O ending with an all-reduce collective. Because communication occurs at every single layer, TP requires ultra-fast interconnects (NVLink, 600 GB/s) and is strictly confined within single server nodes.',
    engineeringImpact: 'Allowed models whose individual layers exceed single-GPU VRAM capacity to be split seamlessly across 8-GPU chassis.',
    keyPaper: {
      title: 'Megatron-LM: Training Multi-Billion Parameter Language Models Using Model Parallelism',
      authors: 'Shoeybi et al. (NVIDIA)',
      year: 2019
    },
    relatedTerms: ['pipeline-parallelism', 'nvlink', 'zero']
  },
  'pipeline-parallelism': {
    id: 'pipeline-parallelism',
    term: 'Pipeline Parallelism',
    acronym: 'PP',
    category: 'Training & Parallelism',
    shortDef: 'An inter-layer parallelism technique that partitions consecutive groups of transformer layers across different physical nodes across an InfiniBand network.',
    fullDef: 'When a model exceeds the memory of a single 8-GPU node, Pipeline Parallelism divides the network vertically (e.g., layers 1–24 on Node 1, 25–48 on Node 2, etc.). To minimize idle device time (pipeline bubbles), algorithms like 1F1B (One-Forward-One-Backward) interleave forward and backward passes of micro-batches, so downstream nodes do not sit idle waiting for an entire batch forward pass to complete.',
    engineeringImpact: 'Allowed scaling model training across hundreds of server chassis linked via 200 Gbps InfiniBand networks.',
    relatedTerms: ['tensor-parallelism', 'infiniband', 'zero']
  },
  'nvlink': {
    id: 'nvlink',
    term: 'NVLink Interconnect',
    category: 'Hardware & Silicon',
    shortDef: 'NVIDIA high-speed wire-based interconnect protocol providing high-bandwidth, direct memory access between GPUs inside a server node.',
    fullDef: 'PCIe Gen4 delivers only ~64 GB/s bidirectional bandwidth, creating an insurmountable bottleneck for frequent intra-layer tensor parallel collective communications (all-reduce). NVLink 3.0 (on A100) provides 600 GB/s per GPU across 12 link lanes, enabling GPUs to pool memory and execute distributed matrix multiplications almost as if they were a single monolithic processor.',
    engineeringImpact: 'Made Tensor Parallelism practically viable for training 100B+ parameter models without catastrophic communication stalls.',
    relatedTerms: ['infiniband', 'tensor-parallelism']
  },
  'infiniband': {
    id: 'infiniband',
    term: 'InfiniBand (HDR 200G)',
    category: 'Hardware & Silicon',
    shortDef: 'A high-throughput, ultra-low-latency computer networking communications standard featuring non-blocking Remote Direct Memory Access (RDMA).',
    fullDef: 'Standard Ethernet exhibits latency jitter, packet loss retransmissions, and high CPU kernel overhead that destabilize distributed all-reduce operations across thousands of GPUs. InfiniBand HDR (200 Gbps) provides hardware-level Remote Direct Memory Access (GPUDirect RDMA), enabling one GPU to stream tensor states directly to another GPU memory across the data center network without involving the operating system kernel or host CPU.',
    engineeringImpact: 'The communication backbone of the Azure OpenAI supercomputer, connecting over 10,000 A100 GPUs with near-zero latency degradation.',
    relatedTerms: ['nvlink', 'pipeline-parallelism']
  },
  'bpe': {
    id: 'bpe',
    term: 'Byte-Pair Encoding',
    acronym: 'BPE',
    category: 'Inference & Compilers',
    shortDef: 'A subword tokenization algorithm that iteratively merges the most frequent byte pairs in a corpus into a fixed vocabulary table.',
    fullDef: 'Pure character-level tokenization produces impractically long sequences that exhaust transformer context windows, while word-level tokenization creates massive out-of-vocabulary (OOV) errors. BPE operates on raw UTF-8 bytes: it initializes a vocabulary with 256 individual byte tokens, then iteratively merges the most co-occurring pairs up to a target vocabulary size (e.g., 50,257 for GPT-3 r50k_base or 100,000 for ChatGPT cl100k_base). High-performance implementations like tiktoken use Rust regex engines to process gigabytes of text per minute.',
    engineeringImpact: 'Provides 100% text coverage without out-of-vocabulary errors, compressing common programming keywords and multilingual characters into single compact tokens.',
    relatedTerms: ['kv-cache']
  },
  'roofline-model': {
    id: 'roofline-model',
    term: 'Roofline Model',
    category: 'Hardware & Silicon',
    shortDef: 'A visually intuitive performance model that relates system compute peak capability to memory bandwidth limits via operational arithmetic intensity.',
    fullDef: 'The Roofline Model plots achievable performance (TFLOPs/s) against operational arithmetic intensity (FLOPs per byte transferred from memory). Operations with low arithmetic intensity (like Softmax, LayerNorm, and Activation functions) hit the diagonal "memory-bound" ceiling, where the GPU Tensor Cores spend 90% of clock cycles waiting for data to arrive from HBM. Operations with high arithmetic intensity (like large GEMM matrix multiplications) reach the flat horizontal "compute-bound" ceiling.',
    engineeringImpact: 'Guided the design of FlashAttention and OpenAI Triton by identifying intermediate memory accesses as the primary bottleneck in self-attention.',
    relatedTerms: ['flashattention', 'hbm', 'sram']
  },
  'sram': {
    id: 'sram',
    term: 'Static RAM (On-Chip Memory)',
    acronym: 'SRAM',
    category: 'Hardware & Silicon',
    shortDef: 'Ultra-fast, low-latency memory located directly on the GPU die next to the Streaming Multiprocessors.',
    fullDef: 'On an NVIDIA A100 GPU, global High Bandwidth Memory (HBM2e) offers 80GB capacity at 2.0 TB/s bandwidth with ~300 cycle latency. In contrast, on-chip SRAM (L1 cache / Shared Memory) offers 192KB per Streaming Multiprocessor (approx. 20MB total across the chip) but delivers over 19 TB/s aggregate bandwidth with near single-cycle latency. FlashAttention and fused Triton kernels exploit SRAM by loading sub-blocks of matrices once, computing multi-step reductions inside SRAM, and writing only the final result back to HBM.',
    engineeringImpact: 'Enables 10x higher bandwidth throughput for attention kernels by preventing unnecessary round trips to slow global memory.',
    relatedTerms: ['hbm', 'flashattention', 'roofline-model']
  },
  'hbm': {
    id: 'hbm',
    term: 'High Bandwidth Memory',
    acronym: 'HBM',
    category: 'Hardware & Silicon',
    shortDef: 'Stacked 3D DRAM architecture placed adjacent to the GPU silicon on a shared silicon interposer.',
    fullDef: 'Traditional GDDR memory uses flat PCB routing, limiting bus width to 384 bits. High Bandwidth Memory (HBM2 / HBM2e / HBM3) vertically stacks multiple DRAM dies connected with Through-Silicon Vias (TSVs) onto a silicon interposer right beside the GPU die. This yields a massive 4,096-bit bus, enabling the A100 to achieve 2.0 TB/s and the H100 to reach 3.35 TB/s memory bandwidth.',
    engineeringImpact: 'Overcame the historic "memory wall", allowing models with hundreds of billions of weights to be streamed to tensor calculation units during high-throughput training and inference.',
    relatedTerms: ['sram', 'roofline-model']
  },
  'kl-divergence': {
    id: 'kl-divergence',
    term: 'Kullback-Leibler Divergence Penalty',
    acronym: 'KL Penalty',
    category: 'Post-Training & Alignment',
    shortDef: 'A regularization constraint in PPO that penalizes the RL policy if its output token distribution drifts too far from the initial SFT baseline model.',
    fullDef: 'During RLHF, an unconstrained policy network will rapidly find edge cases that score high on the Reward Model while generating repetitive, nonsensical, or ungrammatical text—a phenomenon known as reward hacking or mode collapse. By subtracting a scaled KL divergence term β · D_KL(π_RL || π_SFT) from the scalar reward at every token, the optimization process is tethered to natural human distribution learned during Supervised Fine-Tuning.',
    engineeringImpact: 'Prevents policy degradation and preserves fluency and grammatical coherence during aggressive reinforcement learning updates.',
    keyPaper: {
      title: 'Training language models to follow instructions with human feedback',
      authors: 'Ouyang et al. (OpenAI)',
      year: 2022
    },
    relatedTerms: ['rlhf', 'ppo', 'sft']
  },
  'bradley-terry': {
    id: 'bradley-terry',
    term: 'Bradley-Terry Preference Model',
    category: 'Post-Training & Alignment',
    shortDef: 'A statistical model for predicting the probability that human annotators will prefer one output candidate over another given an input prompt.',
    fullDef: 'In Stage 2 of RLHF, human annotators rank multiple model completions (y_w preferred over y_l). The Reward Model r_θ(x, y) is trained by minimizing the cross-entropy loss between the human preference and the Bradley-Terry logistic model: L_RM = -E_{(x, y_w, y_l)} [log σ(r_θ(x, y_w) - r_θ(x, y_l))]. This converts qualitative human preference rankings into calibrated continuous scalar reward values.',
    engineeringImpact: 'Provides the objective mathematical scoring function that guides the subsequent PPO reinforcement learning stage.',
    relatedTerms: ['rlhf', 'ppo']
  }
};
