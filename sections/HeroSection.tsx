import Image from "next/image";
import AnimatedReveal from "@/components/AnimatedReveal";
import Button from "@/ui/Button";

export default function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden pb-24 pt-36 cinematic-grain">
      <div className="absolute inset-0 -z-10 bg-grain" />
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 md:grid-cols-2">
        <AnimatedReveal>
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-gold/90">Premium AI Creative Partner</p>
          <h1 className="text-4xl font-bold leading-tight md:text-6xl">
            Saya membantu Anda mengubah konten menjadi <span className="text-gold">mesin uang</span> dengan AI.
          </h1>
          <p className="mt-6 max-w-xl text-base text-white/75 md:text-lg">
            Dari AutoClip viral, website AI generator, hingga automasi workflow n8n — semua dirancang untuk
            mempercepat growth, memperbanyak output, dan meningkatkan closing bisnis Anda.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="#contact">Mulai Sekarang</Button>
            <Button href="#services" variant="outline">
              Lihat Jasa Saya
            </Button>
          </div>
        </AnimatedReveal>

        <AnimatedReveal delay={0.2} className="relative">
          <div className="glass relative mx-auto max-w-md overflow-hidden rounded-[2rem] p-4 shadow-glow">
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <Image
              src="https://images.unsplash.com/photo-1601412436465-80f31f28917a?auto=format&fit=crop&w=900&q=80"
              alt="Professional portrait"
              width={900}
              height={1200}
              className="h-[520px] w-full rounded-[1.5rem] object-cover"
              priority
            />
          </div>
        </AnimatedReveal>
      </div>
    </section>
  );
}
