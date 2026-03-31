import AnimatedReveal from "@/components/AnimatedReveal";
import Button from "@/ui/Button";

const services = [
  {
    title: "🎬 AutoClip AI",
    description: "Ubah video panjang menjadi short-form konten yang siap menarik views, leads, dan engagement.",
    benefit: "Produksi konten naik drastis tanpa menambah jam kerja."
  },
  {
    title: "🤖 Website AI Generator",
    description: "Website yang bisa menghasilkan konten otomatis agar brand Anda selalu aktif dan terlihat premium.",
    benefit: "Traffic konsisten dengan tampilan profesional yang membangun trust."
  },
  {
    title: "⚙️ Automasi AI (n8n)",
    description: "Automasi end-to-end untuk marketing, follow-up, dan operasional bisnis.",
    benefit: "Proses lebih cepat, tim lebih fokus pada penjualan dan strategi."
  }
];

export default function ServicesSection() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-6 py-24">
      <AnimatedReveal>
        <h2 className="section-title">Penawaran Jasa Premium</h2>
        <p className="mt-4 max-w-2xl text-white/70">
          Solusi AI berbasis hasil nyata: lebih banyak konten, proses lebih efisien, dan sistem bisnis yang siap scale.
        </p>
      </AnimatedReveal>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {services.map((service, idx) => (
          <AnimatedReveal key={service.title} delay={idx * 0.1}>
            <article className="glass h-full rounded-3xl p-6 shadow-xl transition hover:-translate-y-1 hover:border-gold/50">
              <h3 className="text-xl font-semibold">{service.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-white/75">{service.description}</p>
              <p className="mt-3 text-sm text-gold">{service.benefit}</p>
              <div className="mt-8">
                <Button href="#contact">Pesan Sekarang</Button>
              </div>
            </article>
          </AnimatedReveal>
        ))}
      </div>
    </section>
  );
}
