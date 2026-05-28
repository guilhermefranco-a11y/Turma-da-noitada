import React, { useState, useEffect } from "react";
import { 
  Cpu, 
  Layers, 
  Gamepad2, 
  Tv, 
  Zap, 
  Sparkles, 
  CheckCircle,
  TrendingUp, 
  RotateCw, 
  Gauge, 
  ChevronRight,
  ClipboardCheck,
  Flame,
  MousePointerClick
} from "lucide-react";
import { AISetupRecommendation, UserPreferences } from "../types";

type AISetupBuilderProps = {
  onSetupCreated: (specsText: string, budget: number) => void;
};

// Loading messages sequence to provide premium gamified feedback
const LOADING_MESSAGES = [
  "Iniciando Módulo de Hardware Avançado...",
  "Analisando orçamentos e otimização de custo-benefício...",
  "Buscando compatibilidade térmica de sockets (LGA1700 / AM5)...",
  "Calculando gargalo (bottleneck) entre CPU e GPU...",
  "Estudando potência recomendada da fonte para pico de TDP...",
  "Simulando taxas de quadros (FPS) para jogos AAA e competitivos...",
  "Finalizando build personalizada impecável..."
];

export default function AISetupBuilder({ onSetupCreated }: AISetupBuilderProps) {
  // Local preferences state
  const [preferences, setPreferences] = useState<UserPreferences>({
    budget: 6500,
    resolution: "1080p",
    primaryTarget: "competitivo",
    visualStyle: "rgb"
  });

  const [loading, setLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState(LOADING_MESSAGES[0]);
  const [recommendation, setRecommendation] = useState<AISetupRecommendation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [specsCopied, setSpecsCopied] = useState(false);

  // Rotate custom loading messages elegantly on interval
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      let idx = 0;
      interval = setInterval(() => {
        idx = (idx + 1) % LOADING_MESSAGES.length;
        setLoadingText(LOADING_MESSAGES[idx]);
        setLoadingProgress((prev) => Math.min(prev + 14, 99));
      }, 900);
    } else {
      setLoadingProgress(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleCreateSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setLoadingProgress(5);
    setRecommendation(null);
    setSpecsCopied(false);

    try {
      const response = await fetch("/api/gemini/suggest-setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(preferences)
      });

      const result = await response.json();
      if (result.success && result.data) {
        setRecommendation(result.data);
        setLoadingProgress(100);
      } else {
        throw new Error(result.error || "Ocorreu um erro ao comunicar-se com o assistente.");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Não foi possível conectar com o servidor.");
    } finally {
      // Small timeout to let user admire 100% load
      setTimeout(() => {
        setLoading(false);
      }, 200);
    }
  };

  const copySpecsToClipboard = () => {
    if (!recommendation) return;
    const text = `
🛒 NEXUS RIGS - ORÇAMENTO RECOMENDADO IA:
Setup: ${recommendation.title}
Orçamento Sugerido: R$ ${recommendation.estimatedPriceBRL.toLocaleString("pt-BR")} BRL

Peças Selecionadas:
- Processador (CPU): ${recommendation.cpu}
- Refrigeração (Cooler): ${recommendation.cpuCooler}
- Placa de Vídeo (GPU): ${recommendation.gpu}
- Memória RAM: ${recommendation.ram}
- SSD/HD: ${recommendation.storage}
- Placa-Mãe: ${recommendation.motherboard}
- Fonte (PSU): ${recommendation.powerSupply}
- Gabinete/Chassi: ${recommendation.caseChoice}

Pontos Positivos:
${recommendation.pros.map(p => `* ${p}`).join("\n")}
`;

    navigator.clipboard.writeText(text);
    setSpecsCopied(true);
    setTimeout(() => setSpecsCopied(false), 3000);

    // Pass value up to scroll form automatically and pre-fill details!
    onSetupCreated(text, recommendation.estimatedPriceBRL);
  };

  return (
    <div id="ai-builder-section" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 bg-[#050505]">
      
      {/* Container header and description */}
      <div className="mb-12 text-center">
        <span className="font-mono text-xs font-bold tracking-[0.3em] text-orange-500 uppercase">
          Simulador Inteligente OS
        </span>
        <h2 className="mt-2 font-sans text-3xl font-black italic uppercase tracking-tighter text-white sm:text-4xl">
          MONTE COM ENGENHARIA DE{" "}
          <span className="bg-gradient-to-r from-orange-500 to-red-650 bg-clip-text text-transparent">
            INTELIGÊNCIA ARTIFICIAL
          </span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl font-sans text-white/50 text-xs sm:text-sm leading-relaxed">
          Nossa rede analítica calcula conformidade térmica de soquetes, analisa redundância de energia, calcula gargalos de hardware em tempo real e desenha o equilíbrio definitivo de silício.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-12 items-start">
        
        {/* Preference Calibration Form Column */}
        <form 
          onSubmit={handleCreateSetup} 
          className="lg:col-span-5 rounded-none border border-white/10 bg-white/[0.02] p-6 md:p-8 backdrop-blur-sm relative overflow-hidden"
        >
          {/* Subtle design element */}
          <div className="absolute top-0 right-0 h-[2px] w-32 bg-gradient-to-r from-transparent to-orange-500" />
          
          <h3 className="flex items-center gap-2 font-sans text-xs font-black uppercase tracking-widest text-white mb-6">
            <Sparkles className="h-5 w-5 text-orange-500" />
            Parâmetros de Calibragem
          </h3>

          {/* BUDGET RANGE SLIDER */}
          <div className="mb-8 select-none">
            <div className="flex justify-between items-center mb-2.5">
              <label className="font-sans text-xs font-bold uppercase tracking-wider text-white/70">
                Orçamento Máximo Almejado
              </label>
              <span className="font-sans text-base font-black text-orange-500">
                R$ {preferences.budget.toLocaleString("pt-BR")}
              </span>
            </div>
            
            <input 
              type="range"
              min="3000"
              max="25000"
              step="500"
              value={preferences.budget}
              onChange={(e) => setPreferences({ ...preferences, budget: parseInt(e.target.value) })}
              className="w-full h-1.5 bg-[#050505] rounded-none appearance-none cursor-pointer accent-orange-500 border border-white/5"
            />
            
            <div className="flex justify-between font-mono text-[9px] text-white/40 mt-1.5 font-semibold">
              <span>R$ 3.000 (Esports)</span>
              <span>R$ 10.000 (Elite)</span>
              <span>R$ 25.000+ (Extreme)</span>
            </div>
          </div>

          {/* RESOLUTION SELECT GROUP */}
          <div className="mb-6">
            <label className="block font-sans text-xs font-bold uppercase tracking-wider text-white/70 mb-2">
              Resolução de Jogo Desejada
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {(["1080p", "1440p (2K)", "2160p (4K)"] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setPreferences({ ...preferences, resolution: r })}
                  className={`flex flex-col items-center justify-center p-3.5 rounded-none border font-sans font-black text-[10px] uppercase tracking-wider transition-all duration-200 ${
                    preferences.resolution === r
                      ? "border-orange-500/50 bg-orange-500/10 text-orange-400"
                      : "border-white/10 bg-[#050505]/40 text-white/40 hover:text-white hover:border-white/20"
                  } cursor-pointer`}
                >
                  <Tv className="h-4 w-4 mb-1.5 opacity-85" />
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* GAMING TARGET SELECT */}
          <div className="mb-6">
            <label className="block font-sans text-xs font-bold uppercase tracking-wider text-white/70 mb-2">
              Foco do Sistema / Tipo de Jogos
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { id: "competitivo", title: "Max Esports FPS", desc: "CS2, League, Valorant" },
                { id: "aaa", title: " AAA Ultra Settings", desc: "Cyberpunk, GTA, Overkill" },
                { id: "stream", title: "Streaming & Rec", desc: "Gravação e Stream s/ Lag" },
                { id: "vr_trabalho", title: "Multitarefa & Dev", desc: "Edição 3D e renderização" }
              ].map((target) => (
                <button
                  key={target.id}
                  type="button"
                  onClick={() => setPreferences({ ...preferences, primaryTarget: target.id as any })}
                  className={`flex flex-col items-start p-3 rounded-none border text-left transition-all duration-200 ${
                    preferences.primaryTarget === target.id
                      ? "border-orange-500/50 bg-orange-500/10 text-orange-400"
                      : "border-white/10 bg-[#050505]/40 text-white/40 hover:text-white hover:border-white/20"
                  } cursor-pointer`}
                >
                  <Gamepad2 className="h-4 w-4 mb-1.5 opacity-80" />
                  <span className="font-sans text-[10px] font-black uppercase tracking-wider block">{target.title}</span>
                  <span className="font-sans text-[9px] text-white/40 leading-tight mt-0.5">{target.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* VISUAL CASE STYLE CARD */}
          <div className="mb-8">
            <label className="block font-sans text-xs font-bold uppercase tracking-wider text-white/70 mb-2.5">
              Estilo Estético do Setup
            </label>
            <div className="space-y-2">
              {[
                { id: "rgb", title: "Neon Forge RGB Showcase", desc: "Fluxo intenso com fans digitais de desempenho térmico extremo." },
                { id: "minimal", title: "Carbon White Elegance", desc: "Gabinete branco tático, linhas lisas e visual limpo limiar." },
                { id: "stealth", title: "Stealth Blackout Workstation", desc: "Furtivo e silencioso de alumínio escovado acústico premium." }
              ].map((style) => (
                <label
                  key={style.id}
                  onClick={() => setPreferences({ ...preferences, visualStyle: style.id as any })}
                  className={`flex items-start gap-3 p-3 rounded-none border cursor-pointer select-none transition-all duration-200 ${
                    preferences.visualStyle === style.id
                      ? "border-orange-500/50 bg-orange-500/10 text-orange-400"
                      : "border-white/10 bg-[#050505]/40 text-white/40 hover:text-white"
                  }`}
                >
                  <input
                    type="radio"
                    name="visualStyle"
                    checked={preferences.visualStyle === style.id}
                    onChange={() => {}} // Controlled manually
                    className="mt-0.5 accent-orange-500"
                  />
                  <div className="text-left -mt-0.5">
                    <span className="font-sans text-[11px] font-black uppercase tracking-wider block leading-snug">{style.title}</span>
                    <span className="font-sans text-[9px] text-white/40 block leading-tight mt-0.5">{style.desc}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* AI TRIGGER ACTION BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full h-12 inline-flex items-center justify-center gap-2 rounded-none bg-orange-500 font-sans text-xs font-black uppercase italic tracking-widest text-[#050505] shadow-lg shadow-orange-500/5 cursor-pointer hover:bg-orange-400 transition-all duration-200 active:scale-95 ${
              loading ? "opacity-90 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <>
                <RotateCw className="h-4 w-4 animate-spin" />
                Delineando Silício...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Criar Setup Recomendado c/ IA
              </>
            )}
          </button>
        </form>

        {/* AI Results Output Column */}
        <div id="ai-results-pane" className="lg:col-span-7 select-none">
          
          {/* STATE A: BEFORE SELECTION */}
          {!loading && !recommendation && !error && (
            <div className="flex flex-col items-center justify-center text-center p-10 md:p-16 rounded-none border border-dashed border-white/10 bg-white/[0.01] min-h-[460px]">
              <div className="h-14 w-14 rounded-none bg-orange-500/5 border border-white/10 flex items-center justify-center text-orange-500 mb-6 font-bold">
                <Gauge className="h-7 w-7 animate-pulse" />
              </div>
              <span className="inline-block px-2.5 py-0.5 rounded-none bg-white/5 border border-white/10 text-white/50 text-[9px] font-mono font-bold tracking-widest uppercase mb-1">Aguardando Parâmetros</span>
              <h4 className="font-sans text-base font-black uppercase text-white tracking-widest">Pronto para Calibração</h4>
              <p className="max-w-xs text-white/40 font-sans text-xs mt-2 leading-relaxed">
                Ajuste os parâmetros térmicos e financeiros à esquerda. Clique em "Criar Setup" para disparar a IA de cálculo de hardware.
              </p>
            </div>
          )}

          {/* STATE B: LOADING STATUS */}
          {loading && (
            <div className="flex flex-col items-center justify-center text-center p-10 md:p-16 rounded-none border border-white/10 bg-white/[0.01] min-h-[460px]">
              
              <div className="relative mb-8">
                {/* Custom circle progress */}
                <div className="h-20 w-20 rounded-none border border-white/10 flex items-center justify-center bg-[#050505]">
                  <Cpu className="h-8 w-8 text-orange-500 animate-spin" />
                </div>
                <div className="absolute -inset-1 rounded-none border-t border-orange-500 animate-pulse" />
              </div>

              {/* Progress Bar */}
              <div className="w-full max-w-sm h-1 bg-[#050505] border border-white/5 rounded-none overflow-hidden mb-4">
                <div 
                  className="h-full bg-gradient-to-r from-orange-500 to-red-650 transition-all duration-300"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>

              <span className="text-[9px] font-mono text-orange-500 font-bold uppercase tracking-widest">{loadingProgress}% Concluído</span>
              <h5 className="font-sans text-xs font-bold uppercase tracking-wider text-white mt-2 transition-all">
                {loadingText}
              </h5>
              <p className="text-[8px] font-mono text-orange-400/50 mt-4 max-w-xs leading-normal">
                Sincronizando estimativas de silício e TDP com os benchmarks de topo do mercado internacional.
              </p>
            </div>
          )}

          {/* STATE C: EXCELLENT RECOMMENDATION RETRIEVED */}
          {!loading && recommendation && (
            <div className="rounded-none border border-white/10 bg-white/[0.02] p-6 md:p-8 hover:border-orange-500/20 transition-all duration-300 relative">
              
              {/* Decorative top corner accent */}
              <div className="absolute top-0 right-0 h-[2px] w-48 bg-gradient-to-l from-orange-500/20 to-orange-500" />
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b border-white/10">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-none bg-orange-500/10 border border-orange-500/25 px-2.5 py-0.5 font-sans text-[9px] font-black text-orange-400 uppercase tracking-widest">
                    <Flame className="h-3 w-3" /> Setup Exclusivo IA
                  </span>
                  <h3 className="font-sans text-xl font-black text-white mt-2.5">
                    {recommendation.title}
                  </h3>
                </div>
                
                <div className="text-left sm:text-right">
                  <span className="block font-sans text-[8px] font-black text-white/40 uppercase tracking-widest leading-none mb-1">Cotação Estimada</span>
                  <span className="font-sans text-2xl font-black text-orange-500 block leading-tight">
                    R$ {recommendation.estimatedPriceBRL.toLocaleString("pt-BR")}
                  </span>
                  <span className="block font-sans text-[9px] text-white/30 font-semibold uppercase tracking-wider">Custo do hardware final</span>
                </div>
              </div>

              {/* Explanatory summary text */}
              <p className="font-sans text-xs text-white/70 leading-relaxed mb-6 italic bg-[#050505]/40 p-4 border border-white/5 rounded-none">
                "{recommendation.summary}"
              </p>

              {/* GRID OF COMPONENT SPECIFICATIONS */}
              <div className="grid gap-3 sm:grid-cols-2 mb-8">
                
                {/* CPU */}
                <div className="flex items-start gap-2.5 p-2.5 px-3 rounded-none bg-[#050505]/60 border border-white/10 hover:border-white/20 transition-all">
                  <div className="h-7 w-7 rounded-none bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 shrink-0 mt-0.5 font-bold">
                    <Cpu className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block font-sans text-[8px] font-bold uppercase text-white/40 tracking-widest">Processador (CPU)</span>
                    <span className="font-sans text-xs font-bold text-white leading-tight block mt-0.5">{recommendation.cpu}</span>
                  </div>
                </div>

                {/* Graphics Card */}
                <div className="flex items-start gap-2.5 p-2.5 px-3 rounded-none bg-[#050505]/60 border border-white/10 hover:border-white/20 transition-all">
                  <div className="h-7 w-7 rounded-none bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 shrink-0 mt-0.5 font-bold">
                    <Zap className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block font-sans text-[8px] font-bold uppercase text-white/40 tracking-widest">Placa de Vídeo (GPU)</span>
                    <span className="font-sans text-xs font-bold text-white leading-tight block mt-0.5">{recommendation.gpu}</span>
                  </div>
                </div>

                {/* Ram */}
                <div className="flex items-start gap-2.5 p-2.5 px-3 rounded-none bg-[#050505]/60 border border-white/10 hover:border-white/20 transition-all">
                  <div className="h-7 w-7 rounded-none bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 shrink-0 mt-0.5 font-bold">
                    <Layers className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block font-sans text-[8px] font-bold uppercase text-white/40 tracking-widest">Memória RAM</span>
                    <span className="font-sans text-xs font-bold text-white leading-tight block mt-0.5">{recommendation.ram}</span>
                  </div>
                </div>

                {/* Storage */}
                <div className="flex items-start gap-2.5 p-2.5 px-3 rounded-none bg-[#050505]/60 border border-white/10 hover:border-white/20 transition-all">
                  <div className="h-7 w-7 rounded-none bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 shrink-0 mt-0.5 font-bold">
                    <TrendingUp className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block font-sans text-[8px] font-bold uppercase text-white/40 tracking-widest">Armazenamento</span>
                    <span className="font-sans text-xs font-bold text-white leading-tight block mt-0.5">{recommendation.storage}</span>
                  </div>
                </div>

                {/* Motherboard */}
                <div className="flex items-start gap-2.5 p-2.5 px-3 rounded-none bg-[#050505]/60 border border-white/10 hover:border-white/20 transition-all">
                  <div className="h-7 w-7 rounded-none bg-white/5 border border-white/10 flex items-center justify-center text-white/60 shrink-0 mt-0.5 font-bold">
                    <Cpu className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block font-sans text-[8px] font-bold uppercase text-white/40 tracking-widest">Placa-Mãe Base</span>
                    <span className="font-sans text-xs font-bold text-white/80 leading-tight block mt-0.5">{recommendation.motherboard}</span>
                  </div>
                </div>

                {/* CPU Cooling System */}
                <div className="flex items-start gap-2.5 p-2.5 px-3 rounded-none bg-[#050505]/60 border border-white/10 hover:border-white/20 transition-all">
                  <div className="h-7 w-7 rounded-none bg-white/5 border border-white/10 flex items-center justify-center text-white/60 shrink-0 mt-0.5 font-bold">
                    <Gauge className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block font-sans text-[8px] font-bold uppercase text-white/40 tracking-widest">Arrefecimento</span>
                    <span className="font-sans text-xs font-bold text-white/80 leading-tight block mt-0.5">{recommendation.cpuCooler}</span>
                  </div>
                </div>

                {/* Power supply */}
                <div className="flex items-start gap-2.5 p-2.5 px-3 rounded-none bg-[#050505]/60 border border-white/10 hover:border-white/20 transition-all">
                  <div className="h-7 w-7 rounded-none bg-white/5 border border-white/10 flex items-center justify-center text-white/60 shrink-0 mt-0.5 font-bold">
                    <Zap className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block font-sans text-[8px] font-bold uppercase text-white/40 tracking-widest">Fonte de Alimentação</span>
                    <span className="font-sans text-xs font-bold text-white/80 leading-tight block mt-0.5">{recommendation.powerSupply}</span>
                  </div>
                </div>

                {/* Case */}
                <div className="flex items-start gap-2.5 p-2.5 px-3 rounded-none bg-[#050505]/60 border border-white/10 hover:border-white/20 transition-all">
                  <div className="h-7 w-7 rounded-none bg-white/5 border border-white/10 flex items-center justify-center text-white/60 shrink-0 mt-0.5 font-bold">
                    <Layers className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block font-sans text-[8px] font-bold uppercase text-white/40 tracking-widest">Chassi / Gabinete</span>
                    <span className="font-sans text-xs font-bold text-white/80 leading-tight block mt-0.5">{recommendation.caseChoice}</span>
                  </div>
                </div>

              </div>

              {/* ESTIMATED GAME BENCHMARKS PANEL */}
              <div className="mb-8 bg-[#050505]/90 border border-white/5 rounded-none p-4 md:p-5">
                <span className="block font-mono text-[9px] font-bold text-orange-500 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  <Gauge className="h-3.5 w-3.5" /> MÉTRICAS DE TAXA DE ATUALIZAÇÃO (FPS ESTIMADO)
                </span>
                
                <div className="grid gap-3.5 sm:grid-cols-2">
                  {recommendation.benchmarks.map((bench, idx) => {
                    // Normalize standard bar fills up to 300 max fps representation
                    const barFill = Math.min((bench.estimatedFps / 300) * 100, 100);
                    return (
                      <div key={idx} className="bg-white/[0.01] p-3 rounded-none border border-white/10">
                        <div className="flex justify-between text-xs font-sans font-bold text-white mb-0.5">
                           <span>{bench.game}</span>
                          <span className="text-orange-500 font-black">{bench.estimatedFps} FPS</span>
                        </div>
                        <div className="flex justify-between font-sans text-[10px] text-white/30 mb-2.5 uppercase tracking-wider">
                          <span>{bench.setting}</span>
                        </div>
                        {/* Custom indicator bar */}
                        <div className="w-full h-1 bg-[#050505] rounded-none overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-orange-500 to-red-650"
                            style={{ width: `${barFill}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* PEAK PERFORMANCE BENEFITS (PROS) */}
              <div className="mb-8">
                <span className="block font-sans text-[8px] font-bold text-white/40 uppercase tracking-widest mb-3">Vantagens deste Engenho</span>
                <ul className="space-y-2">
                  {recommendation.pros.map((pro, index) => (
                    <li key={index} className="flex items-start gap-2 text-xs font-sans text-white/60">
                      <CheckCircle className="h-4 w-4 text-orange-500 shrink-0 mt-0.5" />
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ACTION: INQUIRE OR DESIGN DIRECT TRIGGER */}
              <div className="flex flex-col sm:flex-row gap-3.5 justify-end">
                <button
                  type="button"
                  onClick={copySpecsToClipboard}
                  className={`inline-flex h-12 items-center justify-center gap-2 rounded-none border border-orange-500/30 bg-orange-500/10 hover:bg-orange-500/20 px-6 font-sans text-xs font-bold transition-all text-orange-450 uppercase tracking-widest cursor-pointer ${
                    specsCopied ? "bg-emerald-500/15 border-emerald-500/20 text-emerald-450" : ""
                  }`}
                >
                  {specsCopied ? (
                    <>
                      <ClipboardCheck className="h-4 w-4" />
                      COPIADO & APLICADO NO FORMULÁRIO!
                    </>
                  ) : (
                    <>
                      <MousePointerClick className="h-4 w-4" />
                      APLICAR NO ENVIAR PROPOSTA
                    </>
                  )}
                </button>
                <a
                  href={`https://wa.me/5511999999999?text=Ol%C3%A1%21+Montei+um+computador+gamer+IA+na+Nexus+Rigs%3A+${encodeURIComponent(recommendation.title)}+no+or%C3%A7amento+de+${recommendation.estimatedPriceBRL}+BRL.+Gostaria+de+avaliar+a+montagem+f%C3%ADsica%21`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-none bg-orange-500 text-black hover:bg-orange-400 px-6 font-sans text-xs font-black uppercase tracking-widest cursor-pointer shadow-lg active:scale-98"
                >
                  COMPRAR VIA WHATSAPP
                  <ChevronRight className="h-4 w-4" />
                </a>
              </div>

            </div>
          )}

          {/* STATE D: API ENGINE ERROR */}
          {!loading && error && (
            <div className="flex flex-col items-center justify-center text-center p-10 md:p-16 rounded-none border border-rose-950/20 bg-rose-950/5 min-h-[460px]">
              <div className="h-14 w-14 rounded-none bg-rose-500/10 flex items-center justify-center text-rose-400 mb-6 border border-rose-500/20">
                <Flame className="h-7 w-7 text-rose-400 animate-pulse" />
              </div>
              <span className="inline-block px-2.5 py-0.5 rounded-none bg-rose-900/15 text-rose-400 text-[10px] font-bold tracking-widest uppercase mb-1">Calibração Interrompida</span>
              <h4 className="font-sans text-lg font-bold text-white">Falha na Comunicação</h4>
              <p className="max-w-xs text-slate-500 font-sans text-xs mt-2 leading-relaxed">
                {error}
              </p>
              <button
                onClick={handleCreateSetup}
                className="mt-6 inline-flex h-9 items-center justify-center gap-2 rounded-none bg-slate-900 border border-slate-800 text-slate-200 hover:text-white px-5 font-sans text-xs font-semibold cursor-pointer"
              >
                Tentar Novamente
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
