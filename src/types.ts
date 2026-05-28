export enum ComponentCategory {
  CPU = "CPU (Processador)",
  GPU = "GPU (Placa de Vídeo)",
  RAM = "Memória RAM",
  STORAGE = "Armazenamento (SSD)",
  MOTHERBOARD = "Placa-Mãe",
  PSU = "Fonte de Alimentação",
  COOLER = "Cooler (Refrigeração)",
  CASE = "Gabinete / Chassi"
}

export type HardwareComponent = {
  id: string;
  name: string;
  brand: string;
  category: ComponentCategory;
  price: number;
  specs: string;
  image?: string;
  isCustomizable?: boolean;
};

export type PresetSetup = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  badge: "Ultimate" | "Powerhouse" | "Overkill" | "Streamer";
  specs: {
    [key in keyof typeof ComponentCategory]?: string;
  };
  highlights: string[];
  fpsBenchmark: {
    game: string;
    fps: number;
    resolution: string;
  }[];
};

export type UserPreferences = {
  budget: number;
  resolution: "1080p" | "1440p (2K)" | "2160p (4K)";
  primaryTarget: "competitivo" | "aaa" | "stream" | "vr_trabalho";
  visualStyle: "minimal" | "rgb" | "stealth";
};

export type AISetupRecommendation = {
  title: string;
  summary: string;
  cpu: string;
  cpuCooler: string;
  gpu: string;
  ram: string;
  storage: string;
  motherboard: string;
  powerSupply: string;
  caseChoice: string;
  estimatedPriceBRL: number;
  pros: string[];
  benchmarks: {
    game: string;
    setting: string;
    estimatedFps: number;
  }[];
};
