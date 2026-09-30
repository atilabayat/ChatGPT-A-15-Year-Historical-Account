export interface FoundationalPaper {
  id: string;
  bibKey: string;
  title: string;
  authors: string;
  shortAuthors: string;
  year: number;
  venue: string;
  category: 'Core Architecture' | 'Scaling Laws' | 'Distributed Systems' | 'Compilers & Serving' | 'Alignment & RL' | 'Optimization';
  annotation: string;
  bibtex: string;
}

export const FOUNDATIONAL_PAPERS: FoundationalPaper[] = [
  {
    id: 'vaswani2017',
    bibKey: 'vaswani2017attention',
    title: 'Attention Is All You Need',
    authors: 'Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Łukasz Kaiser, Illia Polosukhin',
    shortAuthors: 'Vaswani et al.',
    year: 2017,
    venue: 'Advances in Neural Information Processing Systems (NeurIPS 2017)',
    category: 'Core Architecture',
    annotation: 'Introduced the Transformer architecture, replacing recurrent LSTM cells with multi-head self-attention and enabling full sequence-parallel training on GPUs.',
    bibtex: `@inproceedings{vaswani2017attention,
  author    = {Ashish Vaswani and Noam Shazeer and Niki Parmar and Jakob Uszkoreit and Llion Jones and Aidan N. Gomez and \\L{}ukasz Kaiser and Illia Polosukhin},
  title     = {Attention Is All You Need},
  booktitle = {Advances in Neural Information Processing Systems (NeurIPS)},
  volume    = {30},
  pages     = {5998--6008},
  year      = {2017},
  url       = {https://arxiv.org/abs/1706.03762}
}`
  },
  {
    id: 'radford2019',
    bibKey: 'radford2019language',
    title: 'Language Models are Unsupervised Multitask Learners',
    authors: 'Alec Radford, Jeffrey Wu, Rewon Child, David Luan, Dario Amodei, Ilya Sutskever',
    shortAuthors: 'Radford et al.',
    year: 2019,
    venue: 'OpenAI Technical Report (GPT-2)',
    category: 'Core Architecture',
    annotation: 'Standardized the Pre-LayerNorm (Pre-LN) residual highway topology, eliminating the vanishing gradient barrier and demonstrating zero-shot task transfer across 1.5B parameters.',
    bibtex: `@techreport{radford2019language,
  author      = {Alec Radford and Jeffrey Wu and Rewon Child and David Luan and Dario Amodei and Ilya Sutskever},
  title       = {Language Models are Unsupervised Multitask Learners},
  institution = {OpenAI},
  year        = {2019},
  url         = {https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf}
}`
  },
  {
    id: 'brown2020',
    bibKey: 'brown2020language',
    title: 'Language Models are Few-Shot Learners',
    authors: 'Tom B. Brown, Benjamin Mann, Nick Ryder, Melanie Subbiah, Jared Kaplan, Prafulla Dhariwal, Arvind Neelakantan, Pranav Shyam, Girish Sastry, Amanda Askell, Sandhini Agarwal, Ariel Herbert-Voss, Gretchen Krueger, Tom Henighan, Rewon Child, Aditya Ramesh, Daniel M. Ziegler, Jeffrey Wu, Clemens Winter, Christopher Hesse, Mark Chen, Eric Sigler, Mateusz Litwin, Scott Gray, Benjamin Chess, Jack Clark, Christopher Berner, Sam McCandlish, Alec Radford, Ilya Sutskever, Dario Amodei',
    shortAuthors: 'Brown et al.',
    year: 2020,
    venue: 'Advances in Neural Information Processing Systems (NeurIPS 2020)',
    category: 'Core Architecture',
    annotation: 'Scaled autoregressive transformers to 175 billion parameters (GPT-3), proving in-context few-shot learning as an emergent capability without parameter updates.',
    bibtex: `@inproceedings{brown2020language,
  author    = {Tom B. Brown and Benjamin Mann and Nick Ryder and Melanie Subbiah and Jared Kaplan and Prafulla Dhariwal and Arvind Neelakantan and Pranav Shyam and Girish Sastry and Amanda Askell and others},
  title     = {Language Models are Few-Shot Learners},
  booktitle = {Advances in Neural Information Processing Systems (NeurIPS)},
  volume    = {33},
  pages     = {1877--1901},
  year      = {2020},
  url       = {https://arxiv.org/abs/2005.14165}
}`
  },
  {
    id: 'kaplan2020',
    bibKey: 'kaplan2020scaling',
    title: 'Scaling Laws for Neural Language Models',
    authors: 'Jared Kaplan, Sam McCandlish, Tom Henighan, Tom B. Brown, Benjamin Chess, Rewon Child, Scott Gray, Alec Radford, Jeffrey Wu, Dario Amodei',
    shortAuthors: 'Kaplan et al.',
    year: 2020,
    venue: 'arXiv preprint arXiv:2001.08361',
    category: 'Scaling Laws',
    annotation: 'Established empirical power laws relating compute, dataset tokens, and parameter counts, providing the economic and scientific rationale for training GPT-3.',
    bibtex: `@article{kaplan2020scaling,
  author  = {Jared Kaplan and Sam McCandlish and Tom Henighan and Tom B. Brown and Benjamin Chess and Rewon Child and Scott Gray and Alec Radford and Jeffrey Wu and Dario Amodei},
  title   = {Scaling Laws for Neural Language Models},
  journal = {arXiv preprint arXiv:2001.08361},
  year    = {2020},
  url     = {https://arxiv.org/abs/2001.08361}
}`
  },
  {
    id: 'hoffmann2022',
    bibKey: 'hoffmann2022training',
    title: 'Training Compute-Optimal Large Language Models',
    authors: 'Jordan Hoffmann, Sebastian Borgeaud, Arthur Mensch, Elena Buchatskaya, Trevor Cai, Eliza Rutherford, Diego de Las Casas, Lisa Anne Hendricks, Johannes Welbl, Aidan Clark, Tom Hennigan, Eric Noland, Katie Millican, George van den Driessche, Bogdan Damoc, Aurelia Guy, Simon Osindero, Karen Simonyan, Erich Elsen, Jack W. Rae, Oriol Vinyals, Laurent Sifre',
    shortAuthors: 'Hoffmann et al. (Chinchilla)',
    year: 2022,
    venue: 'Advances in Neural Information Processing Systems (NeurIPS 2022)',
    category: 'Scaling Laws',
    annotation: 'Refuted Kaplan scaling ratio by proving tokens and parameters should scale equally in 1:1 proportion (~20 tokens/param), proving GPT-3 was severely undertrained.',
    bibtex: `@inproceedings{hoffmann2022training,
  author    = {Jordan Hoffmann and Sebastian Borgeaud and Arthur Mensch and Elena Buchatskaya and Trevor Cai and Eliza Rutherford and Diego de Las Casas and Lisa Anne Hendricks and Johannes Welbl and Aidan Clark and others},
  title     = {Training Compute-Optimal Large Language Models},
  booktitle = {Advances in Neural Information Processing Systems (NeurIPS)},
  volume    = {35},
  pages     = {30016--30030},
  year      = {2022},
  url       = {https://arxiv.org/abs/2203.15556}
}`
  },
  {
    id: 'rajbhandari2020',
    bibKey: 'rajbhandari2020zero',
    title: 'ZeRO: Memory Optimizations Toward Training Trillion Parameter Models',
    authors: 'Samyam Rajbhandari, Jeff Rasley, Olatunji Ruwase, Yuxiong He',
    shortAuthors: 'Rajbhandari et al. (DeepSpeed)',
    year: 2020,
    venue: 'SC20: International Conference for High Performance Computing, Networking, Storage and Analysis',
    category: 'Distributed Systems',
    annotation: 'Introduced the ZeRO memory partitioning paradigm (Stages 1, 2, 3), reducing per-GPU memory requirements by 4x to 8x by eliminating data parallel redundancy.',
    bibtex: `@inproceedings{rajbhandari2020zero,
  author    = {Samyam Rajbhandari and Jeff Rasley and Olatunji Ruwase and Yuxiong He},
  title     = {{ZeRO}: Memory Optimizations Toward Training Trillion Parameter Models},
  booktitle = {SC20: International Conference for High Performance Computing, Networking, Storage and Analysis},
  pages     = {1--16},
  year      = {2020},
  publisher = {IEEE},
  doi       = {10.1109/SC41405.2020.00024}
}`
  },
  {
    id: 'shoeybi2019',
    bibKey: 'shoeybi2019megatron',
    title: 'Megatron-LM: Training Multi-Billion Parameter Language Models Using Model Parallelism',
    authors: 'Mohammad Shoeybi, Mostofa Patwary, Raul Puri, Patrick LeGresley, Jared Casper, Bryan Catanzaro',
    shortAuthors: 'Shoeybi et al.',
    year: 2019,
    venue: 'arXiv preprint arXiv:1909.08053',
    category: 'Distributed Systems',
    annotation: 'Pioneered intra-layer Tensor Parallelism (TP) for transformer multi-head attention and feed-forward blocks, leveraging ultra-high NVLink interconnect bandwidth.',
    bibtex: `@article{shoeybi2019megatron,
  author  = {Mohammad Shoeybi and Mostofa Patwary and Raul Puri and Patrick LeGresley and Jared Casper and Bryan Catanzaro},
  title   = {{Megatron-LM}: Training Multi-Billion Parameter Language Models Using Model Parallelism},
  journal = {arXiv preprint arXiv:1909.08053},
  year    = {2019},
  url     = {https://arxiv.org/abs/1909.08053}
}`
  },
  {
    id: 'dao2022',
    bibKey: 'dao2022flashattention',
    title: 'FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness',
    authors: 'Tri Dao, Daniel Y. Fu, Stefano Ermon, Atri Rudra, Christopher Ré',
    shortAuthors: 'Dao et al.',
    year: 2022,
    venue: 'Advances in Neural Information Processing Systems (NeurIPS 2022)',
    category: 'Compilers & Serving',
    annotation: 'Engineered an IO-aware exact self-attention kernel using on-chip SRAM tiling, bypassing HBM bandwidth limits to deliver 2x-4x wall-clock training speedups.',
    bibtex: `@inproceedings{dao2022flashattention,
  author    = {Tri Dao and Daniel Y. Fu and Stefano Ermon and Atri Rudra and Christopher R{\\'e}},
  title     = {{FlashAttention}: Fast and Memory-Efficient Exact Attention with {IO}-Awareness},
  booktitle = {Advances in Neural Information Processing Systems (NeurIPS)},
  volume    = {35},
  pages     = {16344--16359},
  year      = {2022},
  url       = {https://arxiv.org/abs/2205.14135}
}`
  },
  {
    id: 'tillet2021',
    bibKey: 'tillet2021triton',
    title: 'Triton: An Intermediate Language and Compiler for Tiled Neural Network Computations',
    authors: 'Philippe Tillet, H. T. Kung, David Cox',
    shortAuthors: 'Tillet et al. (OpenAI)',
    year: 2021,
    venue: 'ACM SIGPLAN International Conference on Compiler Construction (CC 2021)',
    category: 'Compilers & Serving',
    annotation: 'Developed the Python-based domain-specific language and MLIR compiler enabling automated kernel fusion and shared memory scheduling without low-level CUDA.',
    bibtex: `@inproceedings{tillet2021triton,
  author    = {Philippe Tillet and H. T. Kung and David Cox},
  title     = {Triton: An Intermediate Language and Compiler for Tiled Neural Network Computations},
  booktitle = {Proceedings of the 30th ACM SIGPLAN International Conference on Compiler Construction (CC)},
  pages     = {10--19},
  year      = {2021},
  doi       = {10.1145/3446804.3446843}
}`
  },
  {
    id: 'ouyang2022',
    bibKey: 'ouyang2022training',
    title: 'Training language models to follow instructions with human feedback',
    authors: 'Long Ouyang, Jeffrey Wu, Xu Jiang, Diogo Almeida, Carroll Wainwright, Pamela Mishkin, Chong Zhang, Sandhini Agarwal, Katarina Slama, Alex Ray, John Schulman, Jacob Hilton, Fraser Kelton, Luke Miller, Maddie Simens, Amanda Askell, Peter Welinder, Paul Christiano, Jan Leike, Ryan Lowe',
    shortAuthors: 'Ouyang et al. (InstructGPT)',
    year: 2022,
    venue: 'Advances in Neural Information Processing Systems (NeurIPS 2022)',
    category: 'Alignment & RL',
    annotation: 'Detailed the 3-stage RLHF alignment framework (SFT, Reward Model Bradley-Terry loss, and PPO with KL penalty) that converted GPT-3.5 into ChatGPT.',
    bibtex: `@inproceedings{ouyang2022training,
  author    = {Long Ouyang and Jeffrey Wu and Xu Jiang and Diogo Almeida and Carroll Wainwright and Pamela Mishkin and Chong Zhang and Sandhini Agarwal and Katarina Slama and Alex Ray and others},
  title     = {Training language models to follow instructions with human feedback},
  booktitle = {Advances in Neural Information Processing Systems (NeurIPS)},
  volume    = {35},
  pages     = {27730--27744},
  year      = {2022},
  url       = {https://arxiv.org/abs/2203.02155}
}`
  },
  {
    id: 'schulman2017',
    bibKey: 'schulman2017proximal',
    title: 'Proximal Policy Optimization Algorithms',
    authors: 'John Schulman, Filip Wolski, Prafulla Dhariwal, Alec Radford, Oleg Klimov',
    shortAuthors: 'Schulman et al.',
    year: 2017,
    venue: 'arXiv preprint arXiv:1707.06347',
    category: 'Alignment & RL',
    annotation: 'Formulated the clipped surrogate objective in policy gradients that enables stable reinforcement learning without destructive policy collapse during RLHF fine-tuning.',
    bibtex: `@article{schulman2017proximal,
  author  = {John Schulman and Filip Wolski and Prafulla Dhariwal and Alec Radford and Oleg Klimov},
  title   = {Proximal Policy Optimization Algorithms},
  journal = {arXiv preprint arXiv:1707.06347},
  year    = {2017},
  url     = {https://arxiv.org/abs/1707.06347}
}`
  },
  {
    id: 'yu2022',
    bibKey: 'yu2022orca',
    title: 'Orca: A Distributed Serving System for Transformer-Based Generative Models',
    authors: 'Gyeong-In Yu, Joo Seong Jeong, Geon-Woo Kim, Soojeong Kim, Byung-Gon Chun',
    shortAuthors: 'Yu et al.',
    year: 2022,
    venue: '16th USENIX Symposium on Operating Systems Design and Implementation (OSDI 2022)',
    category: 'Compilers & Serving',
    annotation: 'Eliminated head-of-line static padding through iteration-level continuous batching, increasing commercial LLM serving throughput by 10x to 34x.',
    bibtex: `@inproceedings{yu2022orca,
  author    = {Gyeong-In Yu and Joo Seong Jeong and Geon-Woo Kim and Soojeong Kim and Byung-Gon Chun},
  title     = {Orca: A Distributed Serving System for {Transformer-Based} Generative Models},
  booktitle = {16th USENIX Symposium on Operating Systems Design and Implementation (OSDI 22)},
  pages     = {521--538},
  year      = {2022},
  url       = {https://www.usenix.org/conference/osdi22/presentation/yu}
}`
  },
  {
    id: 'loshchilov2017',
    bibKey: 'loshchilov2017decoupled',
    title: 'Decoupled Weight Decay Regularization',
    authors: 'Ilya Loshchilov, Frank Hutter',
    shortAuthors: 'Loshchilov & Hutter',
    year: 2017,
    venue: 'International Conference on Learning Representations (ICLR 2019)',
    category: 'Optimization',
    annotation: 'Demonstrated that L2 regularization fails when coupled with adaptive momentum in Adam; introduced AdamW which became standard across all modern transformer training.',
    bibtex: `@inproceedings{loshchilov2017decoupled,
  author    = {Ilya Loshchilov and Frank Hutter},
  title     = {Decoupled Weight Decay Regularization},
  booktitle = {International Conference on Learning Representations (ICLR)},
  year      = {2019},
  url       = {https://arxiv.org/abs/1711.05101}
}`
  },
  {
    id: 'bahdanau2014',
    bibKey: 'bahdanau2014neural',
    title: 'Neural Machine Translation by Jointly Learning to Align and Translate',
    authors: 'Dzmitry Bahdanau, Kyunghyun Cho, Yoshua Bengio',
    shortAuthors: 'Bahdanau et al.',
    year: 2014,
    venue: 'International Conference on Learning Representations (ICLR 2015)',
    category: 'Core Architecture',
    annotation: 'The genesis of the attention mechanism, replacing static fixed-length bottleneck vectors with dynamically weighted alignment scores between input and target sequences.',
    bibtex: `@inproceedings{bahdanau2014neural,
  author    = {Dzmitry Bahdanau and Kyunghyun Cho and Yoshua Bengio},
  title     = {Neural Machine Translation by Jointly Learning to Align and Translate},
  booktitle = {International Conference on Learning Representations (ICLR)},
  year      = {2015},
  url       = {https://arxiv.org/abs/1409.0473}
}`
  }
];

// Helper to assemble all 14 BibTeX entries into a single master .bib string
export const ALL_FOUNDATIONAL_BIBTEX = FOUNDATIONAL_PAPERS.map(p => p.bibtex).join('\n\n');
