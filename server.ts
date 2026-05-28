import express from "express";
import path from "path";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Helper function to lazy-initialize physical Gemini Client
function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.includes("MY_")) {
    throw new Error("GEMINI_API_KEY is not configured or contains placeholder. Please set a valid key in the Settings > Secrets panel.");
  }
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      }
    }
  });
}

// Fallback high-quality presets for custom builder is key in case API is disconnected or user is testing offline.
const getFailsafeBuilderData = (budget: number, resolution: string, target: string, style: string) => {
  const isUltraBudget = budget < 4000;
  const isMidRange = budget >= 4000 && budget < 8000;

  if (isUltraBudget) {
    return {
      title: "Gamer Starter Force (Econômico Sob Medida)",
      summary: `Setup otimizado focado no custo-benefício rigoroso para entrar nos esports e jogos AAA leves em roda fluida, adaptado para estilo ${style}.`,
      cpu: "AMD Ryzen 5 5600GT (6 cores, 12 threads com vídeo integrado de alta qualidade)",
      cpuCooler: "AMD Wraith Stealth Cooler Silencioso",
      gpu: "Vídeo Integrado Radeon Vega 7 (Foco em Esports competitivo)",
      ram: "16GB DDR4 (2x 8GB) Kingston Fury Beast 3200MHz",
      storage: "SSD 512GB Kingston NV2 M.2 NVMe PCIe 4.0",
      motherboard: "Placa-Mãe ASUS Prime B450M-A II",
      powerSupply: "Fonte Corsair CV550, 550W, 80 Plus Bronze",
      caseChoice: style === "rgb" 
        ? "Gabinete Gamer Pichau APUS RGB Preto lateral de vidro" 
        : style === "stealth" 
        ? "Gabinete Minimalista Montech Air 100 Lite stealth black"
        : "Gabinete Clean Lian Li Lancool 205M White",
      estimatedPriceBRL: 2950,
      pros: [
        "Capacidade de upgrade imediato para placas dedicada como RTX 4060",
        "Dual Channel nativo garantindo máxima transferência de dados no processamento",
        "Preço extremamente competitivo sem comprometer peças estruturais de fonte e placa-mãe de marca confiável"
      ],
      benchmarks: [
        { game: "Counter Strike 2", setting: "1080p Competitivo (Low/Med)", estimatedFps: 135 },
        { game: "League of Legends", setting: "1080p Ultra-Preset", estimatedFps: 180 },
        { game: "Valorant", setting: "1080p Competitivo", estimatedFps: 165 },
        { game: "GTA V", setting: "1080p Performance", estimatedFps: 70 }
      ]
    };
  } else if (isMidRange) {
    return {
      title: "Dominator Streamer & AAA Elite Pro",
      summary: `Projetado para desempenho avassalador em múltiplos displays, permitindo jogar títulos modernos no ultra em ${resolution} e realizar streams em tempo real com codificação avançada.`,
      cpu: "Intel Core i5-13400F (10 cores, 16 threads, Turbo Boost até 4.6GHz)",
      cpuCooler: "Water Cooler Rise Mode Aura RGB 240mm",
      gpu: "NVIDIA GeForce RTX 4060 Ti 8GB GDDR6 (com suporte a DLSS 3 e Ray Tracing)",
      ram: "32GB (2x 16GB) Corsair Vengeance LPX 3200MHz DDR4",
      storage: "SSD 1TB ADATA Legend 800 NVMe M.2 (Velocidade de leitura até 3500MB/s)",
      motherboard: "Placa-Mãe Gigabyte B760M DS3H",
      powerSupply: "Fonte MSI Mag A650BN, 650W, 80 Plus Bronze",
      caseChoice: style === "rgb"
        ? "Gabinete Gamer Redragon Superion com Fans RGB sincronizadas"
        : style === "stealth"
        ? "Gabinete Corsair 4000D Airflow Preto Sóbrio"
        : "Gabinete NZXT H5 Flow Matte White",
      estimatedPriceBRL: 5900,
      pros: [
        "Ray Tracing e DLSS 3 gerando o dobro de FPS nos jogos suportados",
        "Quantidade estelar de 32GB de RAM para multitarefa intensa e renderização de vídeo sem travamentos",
        "Refrigeração líquida com Water Cooler garantindo máxima longevidade térmica para CPU"
      ],
      benchmarks: [
        { game: "Cyberpunk 2077", setting: `${resolution} Alto + DLSS Frame Gen`, estimatedFps: 85 },
        { game: "Call of Duty: Warzone", setting: `${resolution} Otimizado Esports`, estimatedFps: 120 },
        { game: "GTA VI Ready Prep", setting: `${resolution} Médio Estimado`, estimatedFps: 60 },
        { game: "Marvel's Spider-Man 2", setting: `${resolution} Ultra preset com Ray Tracing`, estimatedFps: 80 }
      ]
    };
  } else {
    // Ultimate high end budget >= 8000
    return {
      title: "Ultimate Prestige Hyperion PC (Hi-End Overkill)",
      summary: `O ápice tecnológico atual. Desenvolvido para quebrar qualquer gargalo no mercado gamer, projetado para renderizar em ${resolution} no Ultra absoluto sem pestanejar e durar mais de 5 anos no topo.`,
      cpu: "AMD Ryzen 7 7800X3D (O melhor processador de jogos do mundo com tecnologia 3D V-Cache)",
      cpuCooler: "Water Cooler Lian Li Galahad II Trinity SL-INF 360mm",
      gpu: "NVIDIA GeForce RTX 4070 Ti Super 16GB GDDR6X (Mais VRAM para texturas pesadíssimas em 4K e trabalho profissional)",
      ram: "32GB DDR5 (2x 16GB) G.Skill Trident Z5 RGB 6000MHz CL30 (Baixa latência)",
      storage: "SSD 2TB Kingston KC3000 PCIe 4.0 NVMe (Leitura absurda de 7000MB/s)",
      motherboard: "Placa-Mãe MSI MAG B650 Tomahawk Wi-Fi DDR5",
      powerSupply: "Fonte XPG Core Reactor II 850W, 80 Plus Gold, Modular",
      caseChoice: style === "rgb" ? "Gabinete Aquário Lian Li O11 Dynamic EVO com Fans Uni-Fans" : style === "stealth" ? "Fractal Design North Charcoal com detalhes em Madeira real" : "Gabinete Phanteks NV5 Premium White Glass",
      estimatedPriceBRL: 11800,
      pros: [
        "Processador consagrado com melhor 1% Low FPS reduzindo micro-travamentos a absoluto zero",
        "Memória RAM DDR5 ultra-rápida e SSD topo de linha garantindo inicializações e carregamentos de segundos",
        "Fonte modular com certificação Gold garantindo estabilidade energética perfeita sob alto estresse"
      ],
      benchmarks: [
        { game: "Cyberpunk 2077", setting: "4K Resolução Máxima + Ray Tracing Ultra + DLSS", estimatedFps: 90 },
        { game: "Resident Evil 4 Remake", setting: "4K Nativo Max Settings", estimatedFps: 105 },
        { game: "Counter Strike 2", setting: "1440p Otimizado Comp (Max FPS)", estimatedFps: 420 },
        { game: "Flight Simulator 2024", setting: "4K Ultra-Preset com Nuvens Volumétricas", estimatedFps: 85 }
      ]
    };
  }
};

// API routes FIRST
app.post("/api/gemini/suggest-setup", async (req, res) => {
  const { budget, resolution, primaryTarget, visualStyle } = req.body;

  if (!budget) {
    return res.status(400).json({ error: "O orçamento (budget) é obrigatório." });
  }

  try {
    const ai = getGeminiClient();

    const targetLabelMap: Record<string, string> = {
      competitivo: "Jogos competitivos (FPS, Esports de altíssimo FPS)",
      aaa: "Jogos AAA fotorrealistas de última geração nas configurações ultra",
      stream: "Streaming simultâneo no Twitch/Youtube mantendo FPS altíssimo",
      vr_trabalho: "Realidade Virtual e Computação Gráfica / Trabalho profissional 3D"
    };

    const styleLabelMap: Record<string, string> = {
      minimal: "Design clean/elegante, minimalista moderno, sem excesso de LEDs",
      rgb: "Showcase com muito RGB customizável, design agressivo e iluminado",
      stealth: "Gabinete escuro selado, silencioso, sem leds, desempenho furtivo"
    };

    const formattedTarget = targetLabelMap[primaryTarget] || primaryTarget;
    const formattedStyle = styleLabelMap[visualStyle] || visualStyle;

    const systemPromptMessage = `Você é o maior especialista de hardware gamer da nossa loja Premium de Computadores Personalizados de Alto Desempenho. 
Sua missão é gerar um setup de PC otimizado e compatível, que caiba no orçamento de R$ ${budget} Reais para o cliente e supere os requisitos abaixo.

Requisitos enviados pelo cliente:
- Orçamento Disponível: R$ ${budget} BRL
- Resolução de Monitor Almejada: ${resolution}
- Foco de uso primário: ${formattedTarget}
- Estilo Visual Desejado: ${formattedStyle}

Gere um recomendador de setup completo em formato JSON contendo compatibilidade perfeita (por exemplo, se escolher AMD Ryzen AM5, use placa-mãe AM5 DDR5 e memórias DDR5 sincronizadas. Se for Intel LGA1700, use placa-mãe compatível).
Tenha certeza de que todos os preços em reais de cada componente somem algo próximo do orçamento estipulado (por exemplo, orçamento de R$ 6000 deve render um computador de cerca de R$ 5500 a R$ 6100, economizando de forma realista).

Não inclua formatação markdown ou blocos de código adicionais além do próprio JSON.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: systemPromptMessage,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { 
              type: Type.STRING, 
              description: "Um título marcante que define a máquina (Ex: O Devorador de Quadros, Esports Pro-X, etc.)" 
            },
            summary: { 
              type: Type.STRING, 
              description: "Resumo explicativo do porquê esse setup é imbatível para o orçamento e preferências dele." 
            },
            cpu: { type: Type.STRING, description: "Processador exato recomendado" },
            cpuCooler: { type: Type.STRING, description: "Cooler ou Water cooler recomendado" },
            gpu: { type: Type.STRING, description: "Placa de vídeo recomendada ou vídeo integrado, se for de baixo orçamento" },
            ram: { type: Type.STRING, description: "Especificações de memória RAM exata recomendado" },
            storage: { type: Type.STRING, description: "SSD e velocidade de armazenamento recomendados" },
            motherboard: { type: Type.STRING, description: "Placa-mãe ideal compatível" },
            powerSupply: { type: Type.STRING, description: "Fonte de alimentação exata com watts corretos para segurança" },
            caseChoice: { type: Type.STRING, description: "Gabinete gamer que condiz com o estilo visual preferido dele" },
            estimatedPriceBRL: { 
              type: Type.INTEGER, 
              description: "O valor aproximado de custo total de balanço em reais para todas essas peças juntas" 
            },
            pros: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "Lista de 3 pontos extremamente positivos ou diferenciais desse projeto" 
            },
            benchmarks: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  game: { type: Type.STRING, description: "Nome de um jogo popular ideal para testar" },
                  setting: { type: Type.STRING, description: "Qualidade gráfica e resolução estimada sugerida" },
                  estimatedFps: { type: Type.INTEGER, description: "FPS estimado gerado de forma realista baseada nos benchmarks de testes reais de hardware" }
                },
                required: ["game", "setting", "estimatedFps"]
              },
              description: "Mais ou menos 4 estimativas de performance de jogos reais baseadas nos componentes escolhidos."
            }
          },
          required: [
            "title", 
            "summary", 
            "cpu", 
            "cpuCooler", 
            "gpu", 
            "ram", 
            "storage", 
            "motherboard", 
            "powerSupply", 
            "caseChoice", 
            "estimatedPriceBRL", 
            "pros", 
            "benchmarks"
          ]
        },
        systemInstruction: "Aja como o mestre montador de hardware de computadores gamer customizados de alto padrão. Responda em Português do Brasil com dados técnicos ultra-precisos, sem inventar componentes incompatíveis."
      }
    });

    const textOutput = response.text;
    if (!textOutput) {
      throw new Error("Resposta em branco gerada pela Inteligência Artificial.");
    }

    const recommendation = JSON.parse(textOutput.trim());
    return res.json({ success: true, isMock: false, data: recommendation });

  } catch (error: any) {
    console.warn("Gemini Engine API falhou: ", error.message);
    // Silent failover to a superb client simulation to prevent crash or server halt.
    // This maintains excellent UX and robust offline/demo capabilities.
    const mockData = getFailsafeBuilderData(
      budget,
      resolution,
      primaryTarget,
      visualStyle
    );
    return res.json({ 
      success: true, 
      isMock: true, 
      warning: "Assistente operando em modo de calibração off-line. Ative sua GEMINI_API_KEY no painel de Secrets para ativar a IA em tempo real.",
      data: mockData 
    });
  }
});

// Configure Vite or Static delivery depending on environment
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server full-stack rodando com maestria na porta ${PORT}`);
  });
}

setupServer();
