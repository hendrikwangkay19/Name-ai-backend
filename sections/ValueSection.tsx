import AnimatedReveal from "@/components/AnimatedReveal";

const values = ["Hemat waktu produksi", "Konten lebih banyak & konsisten", "Scale bisnis tanpa chaos", "Output visual lebih profesional"];

export default function ValueSection() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-24">
      <div className="glass absolute inset-x-6 -z-10 rounded-[2rem] bg-gradient-to-r from-accent/10 to-gold/10" />
      <AnimatedReveal>
        <h2 className="section-title">Kenapa Klien Pilih Sistem AI Ini?</h2>
      </AnimatedReveal>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {values.map((value, idx) => (
          <AnimatedReveal key={value} delay={idx * 0.08}>
            <div className="rounded-2xl border border-white/10 bg-black/30 p-5 text-lg font-medium">{value}</div>
          </AnimatedReveal>
        ))}
      </div>
    </section>
  );
}
