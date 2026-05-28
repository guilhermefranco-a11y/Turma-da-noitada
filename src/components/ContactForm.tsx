import React, { useState, useEffect } from "react";
import { Mail, Phone, User, Send, CheckCircle2, DollarSign, ListCollapse, MessageSquare, History } from "lucide-react";

type ContactFormProps = {
  selectedSpecs: string;
  selectedBudget: number;
};

type Submission = {
  id: string;
  name: string;
  phone: string;
  budget: number;
  specs: string;
  notes: string;
  date: string;
};

export default function ContactForm({ selectedSpecs, selectedBudget }: ContactFormProps) {
  // Input fields state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    budget: selectedBudget || 6500,
    specs: selectedSpecs || "",
    notes: ""
  });

  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [success, setSuccess] = useState(false);

  // Sync props when user creates/selects setup
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      specs: selectedSpecs || prev.specs,
      budget: selectedBudget || prev.budget
    }));
  }, [selectedSpecs, selectedBudget]);

  // Load submissions from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("nexus_rigs_submissions");
    if (saved) {
      try {
        setSubmissions(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    const newSubmission: Submission = {
      id: crypto.randomUUID(),
      name: formData.name,
      phone: formData.phone,
      budget: formData.budget,
      specs: formData.specs,
      notes: formData.notes,
      date: new Date().toLocaleDateString("pt-BR", { hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newSubmission, ...submissions];
    setSubmissions(updated);
    localStorage.setItem("nexus_rigs_submissions", JSON.stringify(updated));

    setSuccess(true);
    setFormData({
      name: "",
      email: "",
      phone: "",
      budget: 6500,
      specs: "",
      notes: ""
    });

    // Reset success message after some seconds
    setTimeout(() => {
      setSuccess(false);
    }, 6000);
  };

  const cleanHistory = () => {
    setSubmissions([]);
    localStorage.removeItem("nexus_rigs_submissions");
  };

  return (
    <div id="contact-form-section" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 bg-[#050505] border-t border-white/5">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-8 items-start">
        
        {/* Left Side: Contact Form Area */}
        <div className="lg:col-span-7 rounded-none border border-white/10 bg-white/[0.02] p-6 md:p-8 backdrop-blur-sm relative">
          <div className="absolute top-0 right-0 h-[2px] w-24 bg-orange-500" />
          
          <div className="mb-8">
            <span className="font-mono text-[9px] font-bold tracking-[0.3em] text-orange-500 uppercase">
              Sales Consultation
            </span>
            <h2 className="mt-2 font-sans text-2xl font-black italic uppercase tracking-tighter text-white sm:text-3xl">
              FALE COM NOSSO CONSULTOR TÉCNICO
            </h2>
            <p className="mt-3 font-sans text-xs text-white/50 leading-relaxed">
              Submeta o seu setup criado na inteligência artificial ou solicite uma avaliação exclusiva. Nossa equipe especializada responderá via WhatsApp em menos de 15 minutos!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Full Name */}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-white/60 mb-1.5 font-sans">Seu Nome *</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3.5 h-4 w-4 text-orange-500" />
                  <input
                    type="text"
                    required
                    placeholder="Ex: Guilherme Franco"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full h-11 pl-10 pr-4 rounded-none border border-white/10 bg-[#050505]/80 font-sans text-xs text-white focus:border-orange-500 underline-none focus:outline-none"
                  />
                </div>
              </div>

              {/* WhatApp Phone */}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-white/60 mb-1.5 font-sans">Celular / WhatsApp *</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-3.5 h-4 w-4 text-orange-500" />
                  <input
                    type="tel"
                    required
                    placeholder="Ex: (11) 99999-9999"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full h-11 pl-10 pr-4 rounded-none border border-white/10 bg-[#050505]/80 font-sans text-xs text-white focus:border-orange-500 underline-none focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {/* Email Address */}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-white/60 mb-1.5 font-sans">E-mail de Contato</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-orange-500" />
                  <input
                    type="email"
                    placeholder="Ex: seu-nome@exemplo.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full h-11 pl-10 pr-4 rounded-none border border-white/10 bg-[#050505]/80 font-sans text-xs text-white focus:border-orange-500 underline-none focus:outline-none"
                  />
                </div>
              </div>

              {/* Budget Confirmation */}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-white/60 mb-1.5 font-sans">Orçamento Máximo Autorizado (BRL)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3.5 top-3.5 h-4 w-4 text-orange-500" />
                  <input
                    type="number"
                    placeholder="Ex: 8500"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: parseInt(e.target.value) || 0 })}
                    className="w-full h-11 pl-10 pr-4 rounded-none border border-white/10 bg-[#050505]/80 font-sans text-xs text-white focus:border-orange-500 underline-none focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Custom specification (auto-populated by AI builder or Presets selection) */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-[10px] font-black uppercase tracking-wider text-white/60 font-sans flex items-center gap-1">
                  <ListCollapse className="h-3.5 w-3.5 text-orange-500" />
                  Especificações do Setup Desejado
                </label>
                <span className="text-[9px] text-[#050505] bg-orange-500 px-1 py-0.5 font-mono font-bold uppercase tracking-wider">Autopreenchido pelo Simulador</span>
              </div>
              <textarea
                rows={4}
                placeholder="Copie as especificações da IA acima ou digite as peças desejadas aqui..."
                value={formData.specs}
                onChange={(e) => setFormData({ ...formData, specs: e.target.value })}
                className="w-full p-4 rounded-none border border-white/10 bg-[#050505]/80 font-mono text-[11px] text-white/80 focus:border-orange-500 focus:outline-none leading-relaxed"
              />
            </div>

            {/* Special Instructions or Custom Requests */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-white/60 mb-1.5 font-sans flex items-center gap-1">
                <MessageSquare className="h-3.5 w-3.5 text-orange-500" />
                Notas Especiais / Observações e Jogos Favoritos
              </label>
              <textarea
                rows={2}
                placeholder="Gostaria de trocar o gabinete por outro modelo? Algum jogo específico que deseja priorizar?"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full p-4 rounded-none border border-white/10 bg-[#050505]/80 font-sans text-xs text-white/70 focus:border-orange-500 focus:outline-none leading-relaxed"
              />
            </div>

            {/* Success message popup inside card */}
            {success && (
              <div className="rounded-none border border-emerald-500/10 bg-emerald-500/5 p-4 flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-sans text-xs font-bold text-emerald-400">Solicitação de Consulta Gravada!</span>
                  <p className="font-sans text-[10px] text-white/50 mt-0.5">
                    Seu interesse foi registrado com sucesso em nosso sistema de cotação de setups. Enviamos uma cópia para seu histórico local e nossa central de atendimento integrada está agilizando seu contato técnico!
                  </p>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full h-12 inline-flex items-center justify-center gap-2 rounded-none bg-orange-500 hover:bg-orange-400 transition-all font-sans text-xs font-black uppercase tracking-widest italic text-black cursor-pointer shadow-lg shadow-orange-500/10"
            >
              <Send className="h-3.5 w-3.5" />
              Enviar Solicitação de Orçamento
            </button>

          </form>
        </div>

        {/* Right Side: Submitted specifications local history */}
        <div className="lg:col-span-5 rounded-none border border-white/10 bg-white/[0.01] p-6 md:p-8 backdrop-blur-sm">
          <div className="flex items-center justify-between gap-4 mb-6">
            <h3 className="flex items-center gap-2 font-sans text-xs font-black uppercase tracking-widest text-white">
              <History className="h-4.5 w-4.5 text-orange-500" />
              Cotações Recentes ({submissions.length})
            </h3>
            {submissions.length > 0 && (
              <button 
                onClick={cleanHistory}
                className="font-mono text-[9px] font-bold text-red-500 underline uppercase cursor-pointer hover:text-red-400"
              >
                Limpar
              </button>
            )}
          </div>

          {submissions.length === 0 ? (
            <div className="text-center py-10 rounded-none border border-dashed border-white/10 bg-[#050505]/40 p-4">
              <History className="h-8 w-8 text-white/10 mx-auto mb-3" />
              <span className="block font-sans text-xs text-white/50 font-bold uppercase tracking-wider">Sem Histórico de Envio</span>
              <p className="font-sans text-[10px] text-white/30 leading-normal mt-1 max-w-xs mx-auto">
                Suas propostas ou configurações gravadas localmente nesta sessão serão listadas aqui para controle rápido de pós-venda.
              </p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[440px] overflow-y-auto pr-1">
              {submissions.map((sub) => (
                <div key={sub.id} className="p-3.5 rounded-none border border-white/10 bg-[#050505]/60 font-sans">
                  <div className="flex items-center justify-between text-[10px] mb-2 font-mono">
                    <span className="text-orange-500 font-bold">{sub.date}</span>
                    <span className="text-white font-black">R$ {sub.budget.toLocaleString("pt-BR")}</span>
                  </div>
                  <span className="block text-xs font-bold text-white mb-1.5">{sub.name}</span>
                  
                  {sub.specs && (
                    <div className="mt-2 text-[9px] font-mono text-white/40 max-h-20 overflow-y-auto border-l border-orange-500/30 pl-2 whitespace-pre-line leading-relaxed">
                      {sub.specs.slice(0, 160)}...
                    </div>
                  )}

                  {sub.notes && (
                    <div className="mt-2 bg-[#050505]/80 border border-white/5 p-2 rounded-none text-[10px] text-white/50 italic">
                      <span className="font-bold font-sans not-italic block text-[8px] text-white/30 uppercase">Obs:</span>
                      "{sub.notes}"
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
