import { Cpu, Terminal, ShieldAlert } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#050505] py-12 border-t border-white/5">
      <div id="footer-container" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center sm:text-left">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 pb-8 border-b border-white/5">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center justify-center sm:justify-start gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-none bg-orange-500 text-black font-black">
                <Cpu className="h-4 w-4" />
              </div>
              <span className="font-sans text-base font-black tracking-widest text-white uppercase italic">
                NEXUS<span className="text-orange-500">RIGS</span>
              </span>
            </div>
            <p className="font-sans text-[11px] text-white/40 leading-relaxed">
              Projetamos, montamos e testamos computadores gamer sob medida de alto desempenho com engenharia de hardware meticulosa.
            </p>
          </div>

          {/* Quick links Col */}
          <div className="font-sans">
            <h4 className="text-[10px] font-black text-white uppercase tracking-wider mb-3">Links Úteis</h4>
            <ul className="space-y-2 text-[11px] text-white/50">
              <li className="hover:text-orange-400 transition-colors cursor-pointer">Configurador Online IA</li>
              <li className="hover:text-orange-400 transition-colors cursor-pointer">Série Assinatura Pronta</li>
              <li className="hover:text-orange-400 transition-colors cursor-pointer">Política de Garantia</li>
              <li className="hover:text-orange-400 transition-colors cursor-pointer">Suporte Técnico Especializado</li>
            </ul>
          </div>

          {/* Core hardware Col */}
          <div className="font-sans">
            <h4 className="text-[10px] font-black text-white uppercase tracking-wider mb-3">Marcas Credenciadas</h4>
            <ul className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-[10px] text-white/40 font-medium">
              <li>ASUS ROG</li>
              <li>Gigabyte Aorus</li>
              <li>NVIDIA GeForce</li>
              <li>Kingston Fury</li>
              <li>AMD Ryzen</li>
              <li>Corsair Premium</li>
            </ul>
          </div>

          {/* Security stamp Col */}
          <div className="space-y-4 font-sans text-left">
            <h4 className="text-[10px] font-black text-white uppercase tracking-wider mb-3 text-center sm:text-left">Segurança & Certificação</h4>
            <div className="flex items-center gap-2 rounded-none border border-white/10 bg-white/[0.01] p-2.5 justify-center sm:justify-start">
              <ShieldAlert className="h-4 w-4 text-orange-500 shrink-0" />
              <div className="text-left font-mono">
                <span className="block text-[8px] font-bold text-white/30 uppercase leading-none mb-1">Criptografia Ativa</span>
                <span className="text-[10px] font-bold text-white/70">Conexão Segura SSL</span>
              </div>
            </div>
          </div>

        </div>

        {/* Closing details */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-sans text-[10px] text-white/40 space-y-1">
            <p>© {year} NEXUS RIGS - COMPUTADORES GAMER S.A. Todos os direitos reservados.</p>
            <p>CNPJ: 00.322.981/0001-99 | Av. Brigadeiro Faria Lima, 3477 - Itaim Bibi - São Paulo, SP</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 text-[10px] text-white/30 font-mono font-bold">
            <span>PIX (10% OFF)</span>
            <span>Cartão 12x s/ Juros</span>
            <span>Boleto Bancário</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
