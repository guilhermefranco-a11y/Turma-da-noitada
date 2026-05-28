import { ShieldCheck, Snowflake, Cpu, Zap, Star } from "lucide-react";
import gpuImg from "../assets/images/gpu_graphics_card_1780006233282.png";

export default function HardwareGrid() {
  const highlightParts = [
    {
      title: "Placas de Última Geração (NVIDIA Ada Lovelace)",
      desc: "Placas gráficas GeForce RTX Série 40 equipadas com núcleos Tensor de 4ª geração, DLSS 3 Ray Reconstruction e Ray Tracing nativo ultra fotorrealista.",
      icon: Zap,
      status: "Disponível em Estoque",
      tag: "FLAGSHIP GPU"
    },
    {
      title: "Processadores Dominantes (Intel Core & AMD Ryzen)",
      desc: "Trabalhamos exclusivamente com as CPUs líderes de mercado, incluindo soquetes AMD AM5 com memória 3D V-Cache e Intel LGA1700 Hybrid Architecture.",
      icon: Cpu,
      status: "Lançamento Recente",
      tag: "COMPUTAÇÃO BRUTA"
    },
    {
      title: "Sistemas Térmicos Selados (Water Cooling Customizado)",
      desc: "Refris de alto desempenho e loops customizados sob medida. Bombas de alta vazão, dissipadores de cobre puro e fans magnéticos silenciosos.",
      icon: Snowflake,
      status: "Otimizados e Testados",
      tag: "FRIEZA SOBERANA"
    },
    {
      title: "Armazenamentos Extremos PCIe Gen 5.0",
      desc: "Velocidades estonteantes de gravação e leitura superiores a 12.000 MB/s. Carregue sistemas operacionais e fases pesadas em menos de 3 segundos.",
      icon: ShieldCheck,
      status: "Armazenamento Premium",
      tag: "SPEED MONSTER"
    }
  ];

  return (
    <div id="hardware-grid-section" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 bg-[#050505] border-t border-white/5">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-8 items-center">
        
        {/* Left Side: Editorial Typography & Showcase card with GPU Image */}
        <div className="lg:col-span-6 space-y-6">
          <span className="font-mono text-xs font-bold tracking-[0.3em] text-orange-500 uppercase">
            Curated Hardware Catalog
          </span>
          <h2 className="font-sans text-3xl font-black italic uppercase tracking-tighter text-white sm:text-4xl">
            SOMENTE COMPONENTES DE{" "}
            <span className="bg-gradient-to-r from-orange-500 to-red-650 bg-clip-text text-transparent">
              GRIFE TECNOLÓGICA
            </span>
          </h2>
          <p className="font-sans text-white/55 text-xs sm:text-sm leading-relaxed max-w-xl">
            A estabilidade de um sistema gamer é determinada pelo seu elo mais fraco. Na NEXUS RIGS, evitamos componentes de procedência genérica. Cada placa-mãe, fonte e RAM de nossa linha pertence às marcas líderes do cenário entusiasta internacional.
          </p>

          <div className="relative overflow-hidden rounded-none border border-white/10 bg-white/[0.02] p-2 shadow-2xl group max-w-lg">
            <div className="absolute inset-0 rounded-none bg-gradient-to-tr from-orange-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
            <img 
              src={gpuImg}
              alt="Placa de Vídeo Premium com Detalhes Metálicos de Fusão RGB"
              referrerPolicy="no-referrer"
              className="w-full h-48 sm:h-64 object-cover rounded-none transition-all duration-700 group-hover:scale-[1.02]"
            />
            
            {/* Overlay indicators on the GPU Card visual */}
            <div className="absolute left-4 top-4 rounded-none bg-[#050505]/95 p-2.5 px-3 border border-orange-500/20 backdrop-blur-md">
              <span className="block font-mono text-[8px] font-bold text-orange-500 uppercase tracking-widest leading-none mb-1">Destaque da Loja</span>
              <span className="font-sans text-xs font-extrabold text-white">NVIDIA GeForce RTX 4099 Overkill Series</span>
            </div>

            <div className="p-4 px-3.5 flex items-center justify-between">
              <div>
                <span className="font-sans text-xs font-bold text-white block">Estabilização Elétrica Garantida</span>
                <span className="font-sans text-[10px] text-white/40 block mt-0.5">Sabor e robustez para renderizar por horas consecutivas sem flutuações.</span>
              </div>
              <div className="flex text-orange-500 text-xs shrink-0 items-center gap-0.5">
                <Star className="h-3 w-3 fill-orange-500 text-orange-500" />
                <Star className="h-3 w-3 fill-orange-500 text-orange-500" />
                <Star className="h-3 w-3 fill-orange-500 text-orange-500" />
                <Star className="h-3 w-3 fill-orange-500 text-orange-500" />
                <Star className="h-3 w-3 fill-orange-500 text-orange-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Features/Highlights listing */}
        <div className="lg:col-span-6 grid gap-6 sm:grid-cols-2">
          {highlightParts.map((part, index) => {
            const IconComponent = part.icon;
            return (
              <div 
                key={index} 
                className="p-5 rounded-none border border-white/10 bg-white/[0.01] hover:border-orange-500/20 hover:bg-white/[0.02] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="h-8 w-8 rounded-none bg-orange-500/10 flex items-center justify-center text-orange-500 mb-4 border border-orange-500/20">
                    <IconComponent className="h-4 w-4" />
                  </div>
                  
                  <span className="font-mono text-[9px] font-bold text-orange-400 uppercase tracking-widest block mb-1">
                    {part.tag}
                  </span>
                  <h3 className="font-sans text-xs font-black uppercase text-white leading-snug">
                    {part.title}
                  </h3>
                  <p className="font-sans text-[11px] text-white/50 mt-2 leading-relaxed">
                    {part.desc}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="font-sans text-[10px] text-orange-500 font-black uppercase tracking-wider">
                    {part.status}
                  </span>
                  <span className="font-sans text-[10px] text-white/30 font-bold">100% Homologado</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
