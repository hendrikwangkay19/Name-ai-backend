import Image from "next/image";
import AnimatedReveal from "@/components/AnimatedReveal";

const works = [
  {
    title: "AutoClip Campaign - Creator Edukasi",
    description: "View shorts naik 320% dalam 30 hari.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Website AI - Konsultan Personal Brand",
    description: "Konten website otomatis aktif 24/7.",
    image:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Automation n8n - E-commerce Funnel",
    description: "Response lead lebih cepat hingga 4x.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80"
  }
];

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="mx-auto max-w-6xl px-6 py-24">
      <AnimatedReveal>
        <h2 className="section-title">Portfolio & Hasil Kerja</h2>
      </AnimatedReveal>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {works.map((work, idx) => (
          <AnimatedReveal key={work.title} delay={idx * 0.1}>
            <article className="group relative overflow-hidden rounded-3xl border border-white/10">
              <Image
                src={work.image}
                alt={work.title}
                width={1200}
                height={900}
                className="h-80 w-full object-cover transition duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-5">
                <h3 className="mt-44 text-lg font-semibold">{work.title}</h3>
                <p className="text-sm text-white/80">{work.description}</p>
              </div>
            </article>
          </AnimatedReveal>
        ))}
      </div>
    </section>
  );
}
