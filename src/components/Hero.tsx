import { Zap, ShieldCheck, Cpu, Flame, ChevronRight } from "lucide-react";
import heroImg from "../assets/images/hero_gaming_pc_1780006213748.png";

type HeroProps = {
  onScrollToBuilder: () => void;
};

export default function Hero({ onScrollToBuilder }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#050505] pt-20 pb-16 md:pt-28 md:pb-24 border-b border-white/5">
      
      {/* Abstract Background Glow Elements in Sophisticated Orange */}
      <div className="absolute top-1/4 -left-36 h-96 w-96 rounded-full bg-orange-600/10 blur-[130px] pointer-events-none" />
      <div className="absolute -top-12 -right-36 h-96 w-96 rounded-full bg-red-650/5 blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* Hero Text Context Left */}
          <div className="space-y-6 lg:col-span-6">
            
            {/* Tagline Badge */}
            <div className="flex items-center gap-3">
              <span className="h-[1px] w-12 bg-orange-500"></span>
              <span className="text-orange-500 uppercase tracking-[0.4em] text-xs font-bold font-sans">
                Performance Sem Limites
              </span>
            </div>
            
            {/* Main Headline */}
            <h1 className="font-sans text-4xl font-black italic uppercase leading-none tracking-tighter text-white sm:text-5xl md:text-6xl lg:text-7xl">
              DOMINE COM SEU<br />
              <span className="bg-gradient-to-r from-orange-500 to-red-650 bg-clip-text text-transparent">
                SETUP ULTRA
              </span>
            </h1>
            
            {/* Context paragraph Description */}
            <p className="max-w-xl font-sans text-sm md:text-base text-white/50 leading-relaxed">
              Modelagem refinada de fluxo e refrigeração para quem não aceita menos de 240FPS estáveis. Setups customizados com engenharia de hardware termicamente selada para vencer desafios.
            </p>

            {/* Hardware Stats Grid aligned from design theme template */}
            <div className="grid grid-cols-3 gap-3 max-w-lg">
              <div className="p-4 bg-white/[0.02] border border-white/10 backdrop-blur-sm rounded-none">
                <div className="text-orange-500 text-[10px] font-bold uppercase mb-1">Processador</div>
                <div className="text-sm font-bold text-white">Ryzen 7 7800X3D</div>
                <div className="text-[8px] text-white/45 uppercase tracking-wider mt-0.5">3D V-Cache Ready</div>
              </div>
              <div className="p-4 bg-white/[0.02] border border-white/10 backdrop-blur-sm rounded-none">
                <div className="text-orange-500 text-[10px] font-bold uppercase mb-1">Gráficos</div>
                <div className="text-sm font-bold text-white">GeForce RTX 4090</div>
                <div className="text-[8px] text-white/45 uppercase tracking-wider mt-0.5">Lovelace Architecture</div>
              </div>
              <div className="p-4 bg-white/[0.02] border border-white/10 backdrop-blur-sm rounded-none">
                <div className="text-orange-500 text-[10px] font-bold uppercase mb-1">Resfriamento</div>
                <div className="text-sm font-bold text-white">Hydro Ice Loop</div>
                <div className="text-[8px] text-white/45 uppercase tracking-wider mt-0.5">Dual Chamber Temp</div>
              </div>
            </div>

            {/* Call to Actions in Sophisticated Matte style */}
            <div className="flex flex-col gap-3.5 sm:flex-row pt-2">
              <button
                onClick={onScrollToBuilder}
                className="inline-flex h-12 items-center justify-center gap-2 bg-orange-500 px-8 font-sans font-black uppercase text-xs italic tracking-widest text-[#050505] hover:bg-orange-400 active:scale-98 transition-all rounded-none cursor-pointer"
              >
                Configurar Setup IA
                <ChevronRight className="h-4 w-4" />
              </button>
              <button
                onClick={onScrollToBuilder}
                className="inline-flex h-12 items-center justify-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-8 font-sans font-bold uppercase text-xs tracking-widest text-white hover:bg-white/10 active:scale-98 transition-all rounded-none cursor-pointer"
              >
                Ver Máquinas Prontas
              </button>
            </div>

            {/* Quality Seals */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-4 border-t border-white/5">
              <div className="flex items-center gap-1.5 font-sans text-xs text-white/40">
                <ShieldCheck className="h-4 w-4 text-orange-500" />
                Garantia Vitalícia Premium
              </div>
              <div className="flex items-center gap-1.5 font-sans text-xs text-white/40">
                <Cpu className="h-4 w-4 text-orange-500" />
                Peças 100% Homologadas
              </div>
              <div className="flex items-center gap-1.5 font-sans text-xs text-white/40">
                <Zap className="h-4 w-4 text-orange-500" />
                Montagem Especializada Certificada
              </div>
            </div>

          </div>

          {/* Banner Graphic Right */}
          <div className="relative lg:col-span-6">
            
            {/* Visual Orange Gradient Frame Outline */}
            <div className="absolute inset-0 rounded-none bg-gradient-to-tr from-orange-500/20 via-transparent to-red-650/20 opacity-50 blur-xl filter" />
            
            <div className="relative overflow-hidden rounded-none border border-white/10 bg-white/[0.02] p-2 shadow-2xl">
              <img
                src={heroImg}
                alt="Chassi Gamer Personalizado de Alto Desempenho com Refrigeração Líquida Customizada"
                referrerPolicy="no-referrer"
                className="w-full h-auto rounded-none object-cover grayscale contrast-110 hover:grayscale-0 transition-all duration-700"
              />
              
              {/* Floating Stat Card Over Image */}
              <div className="absolute right-4 bottom-4 flex items-center gap-3 rounded-none border border-white/10 bg-[#050505]/90 p-3 shadow-xl backdrop-blur-md max-w-xs">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-none bg-orange-500/10 text-orange-500">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <span className="block font-sans text-[9px] font-bold text-white/40 uppercase tracking-widest leading-none mb-1">STRESS TEST BENCH</span>
                  <span className="font-sans text-xs font-black text-white">48h Pico de TDP</span>
                  <span className="block font-sans text-[9px] text-[#050505] bg-orange-500 px-1 py-0.5 rounded-sm mt-1 font-bold w-fit">99.8% Estabilidade</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
