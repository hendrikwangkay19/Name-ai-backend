import AnimatedReveal from "@/components/AnimatedReveal";

export default function ContactSection() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 pb-24 pt-12">
      <AnimatedReveal>
        <h2 className="section-title">Hubungi Saya</h2>
        <p className="mt-3 text-white/70">Ceritakan kebutuhan bisnis Anda, saya akan bantu desain solusi yang paling efektif.</p>
      </AnimatedReveal>
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <AnimatedReveal>
          <form className="glass space-y-4 rounded-3xl p-6">
            <input className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3" placeholder="Nama" />
            <input className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3" placeholder="Email" type="email" />
            <textarea
              className="min-h-36 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3"
              placeholder="Pesan kebutuhan Anda"
            />
            <button
              type="submit"
              className="rounded-full bg-gradient-to-r from-accent to-deepblue px-6 py-3 text-sm font-semibold shadow-glow"
            >
              Kirim Pesan
            </button>
          </form>
        </AnimatedReveal>

        <AnimatedReveal delay={0.1}>
          <div className="glass rounded-3xl p-6">
            <p className="text-white/80">WhatsApp (WAJIB):</p>
            <a
              href="https://wa.me/6281234567890"
              className="mt-2 inline-block text-lg font-semibold text-gold hover:underline"
            >
              +62 812-3456-7890
            </a>
            <p className="mt-6 text-white/80">Email:</p>
            <a href="mailto:hello@namabrand.ai" className="text-gold hover:underline">
              hello@namabrand.ai
            </a>
            <p className="mt-6 text-white/80">Social Media:</p>
            <div className="mt-2 flex gap-4 text-sm">
              <a href="#" className="hover:text-gold">
                Instagram
              </a>
              <a href="#" className="hover:text-gold">
                LinkedIn
              </a>
              <a href="#" className="hover:text-gold">
                YouTube
              </a>
            </div>
          </div>
        </AnimatedReveal>
      </div>
    </section>
  );
}
