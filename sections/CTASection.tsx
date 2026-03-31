import Button from "@/ui/Button";
import AnimatedReveal from "@/components/AnimatedReveal";

export default function CTASection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <AnimatedReveal>
        <div className="glass rounded-[2rem] bg-gradient-to-r from-accent/20 to-gold/10 p-10 text-center">
          <h2 className="section-title">Siap meningkatkan konten dan bisnis Anda?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/75">
            Bangun sistem AI yang terlihat premium, bekerja otomatis, dan membantu Anda closing lebih banyak klien.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href="#contact">Hubungi Saya</Button>
            <Button href="#home" variant="outline">
              Mulai Sekarang
            </Button>
          </div>
        </div>
      </AnimatedReveal>
    </section>
  );
}
