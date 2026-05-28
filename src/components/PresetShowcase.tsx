import { PresetSetup } from "../types";
import { Check, Flame, ChevronRight, Activity, Cpu, Monitor, Zap } from "lucide-react";

type PresetShowcaseProps = {
  onSelectPreset: (specsText: string, budget: number) => void;
};

const PRESET_MACHINES: PresetSetup[] = [
  {
    id: "esports-phantom",
    name: "The Esports Phantom",
    tagline: "O Devorador de Quadros Competitivos",
    description: "Projetado sob medida para atingir o benchmark ideal em taxas de atualização elevadas (144Hz a 360Hz) em shooters competitivos e jogos de ação rápida.",
    price: 4790,
    badge: "Powerhouse",
    specs: {
      CPU: "AMD Ryzen 5 5600 (6 Cores, 12 Threads, 4.4GHz Turbo)",
      GPU: "NVIDIA GeForce RTX 4060 8GB GDDR6 (DLSS 3)",
      RAM: "16GB (2x 8GB) DDR4 Kingston Fury Beast 3200MHz",
      STORAGE: "SSD 1TB M.2 Kingston NV2 NVMe PCIe 4.0",
      MOTHERBOARD: "MSI A520M-A Pro Socket AM4 Ultra Durable",
      PSU: "Corsair CV550, 550W 80 Plus Bronze",
      COOLER: "Deepcool AG400 Air Cooler de Alta Pressão",
      CASE: "Gabinete Montech Air 100 Lite Matte Black (3 Fans)"
    },
    highlights: [
      "Taxa de FPS superior a 240hz nos títulos competitivos modernos",
      "Arquitetura Ada Lovelace com suporte a Ray Reconstruction",
      "Refrigeração dedicada a ar mantendo o processamento frio sob alto estresa"
    ],
    fpsBenchmark: [
      { game: "Valorant", fps: 280, resolution: "1080p Comp" },
      { game: "Counter Strike 2", fps: 220, resolution: "1080p Comp" },
      { game: "League of Legends", fps: 310, resolution: "1080p Max" }
    ]
  },
  {
    id: "streamer-aurora",
    name: "The Neo-Streamer Aurora",
    tagline: "Multitarefa & Estética Sem Limites",
    description: "O computador oficial para gamers criadores. Transmita suas gameplays em 1080p/60 FPS no Youtube ou Twitch sem perder quadros enquanto roda os títulos mais recentes no Ultra.",
    price: 8950,
    badge: "Streamer",
    specs: {
      CPU: "Intel Core i5-14400F (10 Cores, 16 Threads, 4.7GHz Turbo)",
      GPU: "NVIDIA GeForce RTX 4070 Super 12GB GDDR6X",
      RAM: "32GB (2x 16GB) DDR5 Corsair Vengeance 5200MHz",
      STORAGE: "SSD 1TB Kingston KC3000 NVMe (Leitura 7000MB/s)",
      MOTHERBOARD: "ASUS Prime B760M-A Wi-Fi DDR5",
      PSU: "XPG Core Reactor II 750W 80 Plus Gold Modular",
      COOLER: "Water Cooler Rise Mode Aura RGB 240mm Liquid",
      CASE: "Gabinete Gamer Aquário Lian Li O11 Mini White"
    },
    highlights: [
      "Codificador NVENC de última geração focado em streams leves",
      "Memórias DDR5 de alta frequência acelerando loadings de jogos",
      "Water Cooler com bomba de cerâmica de altíssima longevidade estética"
    ],
    fpsBenchmark: [
      { game: "Cyberpunk 2077", fps: 95, resolution: "1440p High RT" },
      { game: "Call of Duty: Warzone", fps: 145, resolution: "1440p Esports" },
      { game: "Forza Horizon 5", fps: 120, resolution: "1440p Ultra" }
    ]
  },
  {
    id: "titan-genesis",
    name: "The Titan Genesis 4K",
    tagline: "O Deus do Desempenho Extremo",
    description: "O que existe de mais sublime no mundo do hardware gamer moderno. Destinado a entusiastas e profissionais que aceitam apenas a mais pura perfeição visual em resolução 4K.",
    price: 17500,
    badge: "Overkill",
    specs: {
      CPU: "AMD Ryzen 7 7800X3D (O Rei absoluto dos jogos com 3D V-Cache)",
      GPU: "NVIDIA GeForce RTX 4080 Super 16GB GDDR6X",
      RAM: "32GB (2x 16GB) DDR5 G.Skill Trident Z5 RGB 6000MHz CL30",
      STORAGE: "SSD 2TB Kingston KC3000 PCIe 4.0 (Leitura 7000MB/s)",
      MOTHERBOARD: "MSI MAG B650 Tomahawk Wi-Fi AM5",
      PSU: "Corsair RM850x Shift, 850W, 80 Plus Gold Modular",
      COOLER: "Water Cooler Lian Li Galahad II Trinity SL-INF 360mm",
      CASE: "Gabinete Aquário Montech King 95 Pro ARGB White"
    },
    highlights: [
      "Processador Ryzen X3D dominante com cache L3 gigante de 96MB",
      "GPU de 16GB de VRAM ideal para texturas Ultra em 4K nativo e IA local",
      "Chassi Premium dupla-câmara panorâmico com 6 fans de alta pressão de ar"
    ],
    fpsBenchmark: [
      { game: "Grand Theft Auto V", fps: 140, resolution: "2160p (4K) Ultra" },
      { game: "Cyberpunk 2077", fps: 75, resolution: "2160p (4K) RT Ultra" },
      { game: "Alan Wake 2", fps: 65, resolution: "2160p Path Traced" }
    ]
  }
];

export default function PresetShowcase({ onSelectPreset }: PresetShowcaseProps) {

  const handleSelectPreset = (preset: PresetSetup) => {
    const specsString = `
🛒 NEXUS RIGS - MÁQUINA SELECIONADA: ${preset.name}
Preço do Equipamento: R$ ${preset.price.toLocaleString("pt-BR")} BRL

Configuração Completa:
- CPU: ${preset.specs.CPU}
- GPU: ${preset.specs.GPU}
- RAM: ${preset.specs.RAM}
- SSD: ${preset.specs.STORAGE}
- Placa-Mãe: ${preset.specs.MOTHERBOARD}
- Fonte: ${preset.specs.PSU}
- Resfriamento: ${preset.specs.COOLER}
- Gabinete: ${preset.specs.CASE}

Vantagens:
${preset.highlights.map(h => `* ${h}`).join("\n")}
`;
    onSelectPreset(specsString, preset.price);
  };

  return (
    <div id="preset-showcase-section" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 bg-[#050505] border-t border-white/5">
      
      {/* Title */}
      <div className="mb-12 text-center md:text-left md:flex md:items-end md:justify-between">
        <div>
          <span className="font-mono text-xs font-bold tracking-[0.3em] text-orange-500 uppercase">
            Máquinas de Assinatura
          </span>
          <h2 className="mt-2 font-sans text-3xl font-black italic uppercase tracking-tighter text-white sm:text-4xl">
            SÉRIE PRONTA PARA COMBATE
          </h2>
          <p className="mt-3 max-w-xl font-sans text-white/55 text-xs sm:text-sm leading-relaxed">
            Selecione uma de nossas configurações pré-calibradas e estruturadas por nossa engenharia técnica de elite. Cada chassi é submetido a estresse físico de 48h antes do lacre.
          </p>
        </div>
        
        <div className="mt-6 md:mt-0">
          <span className="inline-flex items-center gap-1.5 rounded-none border border-orange-500/20 bg-orange-500/5 px-3 py-1 font-mono text-[9px] font-bold tracking-wider text-orange-450 uppercase">
            <Activity className="h-3 w-3 animate-pulse" /> Benchmarks Validados
          </span>
        </div>
      </div>

      {/* Preset cards grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {PRESET_MACHINES.map((preset) => (
          <div 
            key={preset.id}
            className="group flex flex-col justify-between overflow-hidden rounded-none border border-white/10 bg-white/[0.02] transition-all duration-300 hover:border-orange-500/20 hover:bg-white/[0.03]"
          >
            
            {/* Upper Info wrapper */}
            <div className="p-6 md:p-7">
              <div className="flex items-center justify-between gap-2.5 mb-4 font-sans">
                <span className={`inline-flex rounded-none px-2 py-0.5 text-[8px] font-black uppercase tracking-widest ${
                  preset.badge === "Overkill" 
                    ? "bg-red-500/10 text-red-400 border border-red-500/15" 
                    : preset.badge === "Streamer" 
                    ? "bg-orange-500/10 text-orange-400 border border-orange-500/20"
                    : "bg-orange-500/10 text-orange-400 border border-orange-500/20"
                }`}>
                  {preset.badge}
                </span>

                <span className="font-mono text-[10px] font-bold text-white/30">
                  REF-{preset.id.slice(0, 7).toUpperCase()}
                </span>
              </div>

              <h3 className="font-sans text-base font-black uppercase tracking-tight text-white group-hover:text-orange-400 transition-colors">
                {preset.name}
              </h3>
              <p className="font-sans text-xs text-orange-500/70 font-semibold uppercase tracking-wider mt-0.5">
                {preset.tagline}
              </p>
              
              <p className="font-sans text-xs text-white/50 mt-3 leading-relaxed">
                {preset.description}
              </p>

              {/* RIG SPECS LIST */}
              <div className="mt-6 space-y-3 border-t border-white/5 pt-5">
                
                <div className="flex items-start gap-2">
                  <Cpu className="h-3 w-3 text-orange-500 shrink-0 mt-1" />
                  <p className="font-sans text-xs text-white/70">
                    <span className="font-black text-white/40 uppercase tracking-widest text-[9px] mr-1">Processador:</span> {preset.specs.CPU}
                  </p>
                </div>

                <div className="flex items-start gap-2">
                  <Zap className="h-3 w-3 text-orange-500 shrink-0 mt-1" />
                  <p className="font-sans text-xs text-white/70">
                    <span className="font-black text-white/40 uppercase tracking-widest text-[9px] mr-1">Vídeo (GPU):</span> {preset.specs.GPU}
                  </p>
                </div>

                <div className="flex items-start gap-2">
                  <div className="h-3 w-3 rounded-none bg-orange-500/15 border border-orange-500/30 shrink-0 mt-1" />
                  <p className="font-sans text-xs text-white/70">
                    <span className="font-black text-white/40 uppercase tracking-widest text-[9px] mr-1">Memória & SSD:</span> {preset.specs.RAM} - {preset.specs.STORAGE}
                  </p>
                </div>

              </div>

              {/* GAME PERFORMANCE BENCHMARKS GAUGE */}
              <div className="mt-6 rounded-none bg-white/[0.01] p-3 px-4 border border-white/5">
                <span className="block font-mono text-[8px] font-black text-white/30 uppercase tracking-widest mb-2.5">
                  Benchmarks Desempenho (Taxa de Quadros)
                </span>
                
                <div className="space-y-2">
                  {preset.fpsBenchmark.map((bench, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs font-sans">
                      <span className="text-white/55">{bench.game} ({bench.resolution})</span>
                      <span className="font-mono font-bold text-orange-500">{bench.fps} FPS</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* HIGHLIGHT SECURE SEALS */}
              <div className="mt-6 space-y-2">
                {preset.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-2 text-xs font-sans text-white/40">
                    <Check className="h-3.5 w-3.5 text-orange-500 shrink-0 mt-1" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>

            </div>

            {/* Bottom Checkout Action Wrapper */}
            <div className="p-6 md:px-7 border-t border-white/5 bg-[#050505]/40">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="block text-[8px] font-mono font-bold text-white/40 uppercase tracking-wider">PIX à Vista (10% OFF)</span>
                  <p className="font-sans text-xl font-black text-white">
                    R$ {preset.price.toLocaleString("pt-BR")}
                  </p>
                </div>
                <div className="font-sans text-right">
                  <span className="block text-[8px] text-white/30 uppercase font-mono tracking-wider">Cartão s/ Juros</span>
                  <span className="font-mono text-xs text-orange-500 font-bold block">12x R$ {(Math.ceil(preset.price * 1.00 / 12)).toLocaleString("pt-BR")}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleSelectPreset(preset)}
                  className="inline-flex h-10 items-center justify-center rounded-none border border-white/10 bg-white/5 font-sans text-[10px] uppercase tracking-widest font-black text-white hover:bg-white/10 transition-all cursor-pointer"
                >
                  Selecionar Rig
                </button>
                <a
                  href={`https://wa.me/5511999999999?text=Ol%C3%A1%21+Gostaria+de+adquirir+o+computador+gamer+customizado%3A+${encodeURIComponent(preset.name)}+no+valor+de+R%24+${preset.price}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex h-10 items-center justify-center gap-1.5 rounded-none bg-orange-500 font-sans text-[10px] uppercase tracking-widest font-black text-black hover:bg-orange-400 transition-all cursor-pointer shadow-sm"
                >
                  WhatsApp
                  <ChevronRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
