import Reveal from './Reveal'

const galleryImages = Array.from({ length: 27 }, (_, i) => ({
  src: `/img/${i + 1}.jpg`,
  alt: `Gallery photo ${i + 1}`,
}))

export default function Gallery() {
  return (
    <section className="py-section relative overflow-hidden">
      <div className="px-page mb-10 md:mb-14">
        <Reveal y={8}>
          <div className="flex items-baseline justify-between border-y border-line py-3 mb-10">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-ink">
              <span className="text-accent">07</span>
              <span className="text-ink-faint"> / </span>
              Field log
            </span>
            <span className="hidden sm:block font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
              {String(galleryImages.length).padStart(2, '0')} frames
            </span>
          </div>
        </Reveal>
        <Reveal>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold text-ink leading-[1.05] tracking-tight">
            Behind the
            <br />
            <span className="text-accent">scenes.</span>
          </h2>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-10 md:w-32 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-10 md:w-32 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none" />

          <div className="animate-gallery-scroll flex w-max gap-4 md:gap-6 hover:[animation-play-state:paused]">
            {[0, 1].map((dup) => (
              <div key={dup} className="flex gap-4 md:gap-6" aria-hidden={dup === 1}>
                {galleryImages.map((img, i) => (
                  <figure
                    key={`${dup}-${i}`}
                    className="shrink-0 min-w-[160px] border border-line bg-bg-card"
                  >
                    <div className="h-[200px] sm:h-[240px] md:h-[280px] overflow-hidden bg-bg-subtle flex items-center justify-center">
                      <img
                        src={img.src}
                        alt={img.alt}
                        loading="lazy"
                        className="h-full w-auto max-w-none"
                      />
                    </div>
                    <figcaption className="fig-caption">
                      <span>Fig. G-{String(i + 1).padStart(2, '0')}</span>
                      <span>{String(i + 1).padStart(2, '0')} / {galleryImages.length}</span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
