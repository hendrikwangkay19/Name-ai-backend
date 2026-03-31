import AnimatedReveal from "@/components/AnimatedReveal";

const testimonials = [
  {
    name: "Aldo, Content Creator",
    quote: "Sejak pakai AutoClip AI, views meningkat signifikan dan saya konsisten upload setiap hari."
  },
  {
    name: "Nadya, Business Coach",
    quote: "Website AI saya sekarang terlihat premium dan leads masuk lebih stabil setiap minggu."
  },
  {
    name: "Rizky, Owner E-commerce",
    quote: "Automasi n8n bantu tim saya hemat waktu operasional sampai 60%."
  }
];

export default function TestimonialsSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <AnimatedReveal>
        <h2 className="section-title">Apa Kata Klien</h2>
      </AnimatedReveal>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {testimonials.map((item, idx) => (
          <AnimatedReveal key={item.name} delay={idx * 0.08}>
            <blockquote className="glass rounded-3xl p-6 text-sm leading-relaxed text-white/80">
              “{item.quote}”
              <footer className="mt-4 text-gold">— {item.name}</footer>
            </blockquote>
          </AnimatedReveal>
        ))}
      </div>
    </section>
  );
}
