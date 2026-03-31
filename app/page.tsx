import Navbar from "@/components/Navbar";
import CTASection from "@/sections/CTASection";
import ContactSection from "@/sections/ContactSection";
import HeroSection from "@/sections/HeroSection";
import PortfolioSection from "@/sections/PortfolioSection";
import ServicesSection from "@/sections/ServicesSection";
import TestimonialsSection from "@/sections/TestimonialsSection";
import ValueSection from "@/sections/ValueSection";

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <ValueSection />
      <PortfolioSection />
      <TestimonialsSection />
      <CTASection />
      <ContactSection />
    </main>
  );
}
