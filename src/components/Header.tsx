import { Cpu, Terminal, ShieldAlert, Award } from "lucide-react";

type HeaderProps = {
  onScrollToBuilder: () => void;
  onScrollToPresets: () => void;
  onScrollToHardware: () => void;
  onScrollToContact: () => void;
};

export default function Header({ 
  onScrollToBuilder, 
  onScrollToPresets, 
  onScrollToHardware, 
  onScrollToContact 
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#050505]/90 backdrop-blur-md">
      <div id="nav-container" className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo and Brand */}
        <div id="brand" className="flex items-center gap-2.5">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-sm bg-orange-500 font-black text-black text-lg italic shadow-md shadow-orange-500/10">
            N
            <div className="absolute -right-0.5 -bottom-0.5 h-2 w-2 rounded-full border border-[#050505] bg-emerald-400 animate-pulse" />
          </div>
          <div>
            <span className="font-sans text-xl font-bold tracking-tighter text-white uppercase italic leading-none block">
              NEXUS<span className="text-orange-500">RIGS</span>
            </span>
            <p className="font-sans text-[8px] font-black tracking-[0.3em] text-white/30 uppercase leading-none mt-1">
              FORGED IN PERFORMANCE
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav id="desktop-nav" className="hidden items-center gap-8 text-xs uppercase tracking-[0.2em] font-medium md:flex">
          <button 
            onClick={onScrollToBuilder}
            className="text-white/60 hover:text-orange-500 transition-colors cursor-pointer"
          >
            Configurador IA
          </button>
          <button 
            onClick={onScrollToPresets}
            className="text-white/60 hover:text-orange-500 transition-colors cursor-pointer"
          >
            Máquinas Prontas
          </button>
          <button 
            onClick={onScrollToHardware}
            className="text-white/60 hover:text-orange-500 transition-colors cursor-pointer"
          >
            Hardware de Ponta
          </button>
          <a
            href="https://wa.me/5511999999999"
            target="_blank"
            rel="noreferrer noopener"
            className="text-white/60 hover:text-orange-500 transition-colors"
          >
            Suporte Técnico
          </a>
        </nav>

        {/* Action Button */}
        <div id="action-wrapper" className="flex items-center gap-4">
          <div className="hidden items-center gap-1.5 rounded-sm border border-emerald-500/20 bg-emerald-500/5 px-2.5 py-1 font-mono text-[9px] font-bold tracking-wider text-emerald-400 uppercase sm:flex">
            <span className="h-1 w-1 rounded-full bg-emerald-400 animate-pulse" />
            ONLINE
          </div>
          <button 
            onClick={onScrollToContact}
            className="px-5 py-2 border border-orange-500 text-orange-500 text-[10px] uppercase tracking-widest font-black hover:bg-orange-500 hover:text-black transition-colors rounded-none cursor-pointer active:scale-95 duration-200"
          >
            Solicitar Orçamento
          </button>
        </div>

      </div>
    </header>
  );
}
