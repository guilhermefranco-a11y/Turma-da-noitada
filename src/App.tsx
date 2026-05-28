import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import AISetupBuilder from "./components/AISetupBuilder";
import PresetShowcase from "./components/PresetShowcase";
import HardwareGrid from "./components/HardwareGrid";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";

export default function App() {
  const [selectedSpecs, setSelectedSpecs] = useState<string>("");
  const [selectedBudget, setSelectedBudget] = useState<number>(6500);

  // Smooth scroll handler function
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Callback helper when user configures setup or picks presets
  const handleSpecificationsLoaded = (specsText: string, budget: number) => {
    setSelectedSpecs(specsText);
    setSelectedBudget(budget);
    
    // Auto-scroll nicely down to Contact Form after small confirmation tick
    setTimeout(() => {
      scrollToSection("contact-form-section");
    }, 450);
  };

  return (
    <div id="landing-root" className="min-h-screen bg-[#050505] font-sans text-white selection:bg-orange-500/30 selection:text-orange-200">
      
      {/* Dynamic Header Nav */}
      <Header 
        onScrollToBuilder={() => scrollToSection("ai-builder-section")}
        onScrollToPresets={() => scrollToSection("preset-showcase-section")}
        onScrollToHardware={() => scrollToSection("hardware-grid-section")}
        onScrollToContact={() => scrollToSection("contact-form-section")}
      />

      {/* Main Home Hero */}
      <Hero onScrollToBuilder={() => scrollToSection("ai-builder-section")} />

      {/* Section 1: AI Custom Recommendation System */}
      <div id="ai-builder-section" className="bg-[#050505]">
        <AISetupBuilder onSetupCreated={handleSpecificationsLoaded} />
      </div>

      {/* Section 2: Preset signatures showcase */}
      <div id="preset-showcase-section" className="bg-[#050505]">
        <PresetShowcase onSelectPreset={handleSpecificationsLoaded} />
      </div>

      {/* Section 3: Flagship individual curated systems catalog */}
      <div id="hardware-grid-section" className="bg-[#050505]">
        <HardwareGrid />
      </div>

      {/* Section 4: Contact/Sales Quotation capture */}
      <div id="contact-form-section" className="bg-[#050505]">
        <ContactForm 
          selectedSpecs={selectedSpecs} 
          selectedBudget={selectedBudget} 
        />
      </div>

      {/* Main professional Tech footer */}
      <Footer />

    </div>
  );
}
