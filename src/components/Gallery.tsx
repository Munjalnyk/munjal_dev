import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import TextReveal from './TextReveal'

const galleryImages = [
  { src: '/img/1.jpg', alt: 'Gallery photo 1' },
  { src: '/img/2.jpg', alt: 'Gallery photo 2' },
  { src: '/img/3.jpg', alt: 'Gallery photo 3' },
  { src: '/img/4.jpg', alt: 'Gallery photo 4' },
  { src: '/img/5.jpg', alt: 'Gallery photo 5' },
  { src: '/img/6.jpg', alt: 'Gallery photo 6' },
  { src: '/img/7.jpg', alt: 'Gallery photo 7' },
  { src: '/img/8.jpg', alt: 'Gallery photo 8' },
  { src: '/img/9.jpg', alt: 'Gallery photo 9' },
  { src: '/img/10.jpg', alt: 'Gallery photo 10' },
  { src: '/img/11.jpg', alt: 'Gallery photo 11' },
  { src: '/img/12.jpg', alt: 'Gallery photo 12' },
  { src: '/img/13.jpg', alt: 'Gallery photo 13' },
  { src: '/img/14.jpg', alt: 'Gallery photo 14' },
  { src: '/img/15.jpg', alt: 'Gallery photo 15' },
  { src: '/img/16.jpg', alt: 'Gallery photo 16' },
  { src: '/img/17.jpg', alt: 'Gallery photo 17' },
  { src: '/img/18.jpg', alt: 'Gallery photo 18' },
  { src: '/img/19.jpg', alt: 'Gallery photo 19' },
  { src: '/img/20.jpg', alt: 'Gallery photo 20' },
  { src: '/img/21.jpg', alt: 'Gallery photo 21' },
  { src: '/img/22.jpg', alt: 'Gallery photo 22' },
  { src: '/img/23.jpg', alt: 'Gallery photo 23' },
  { src: '/img/24.jpg', alt: 'Gallery photo 24' },
  { src: '/img/25.jpg', alt: 'Gallery photo 25' },
  { src: '/img/26.jpg', alt: 'Gallery photo 26' },
  { src: '/img/27.jpg', alt: 'Gallery photo 27' },
]
const images = [...galleryImages, ...galleryImages]

export default function Gallery() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <section className="py-16 md:py-28 lg:py-32 relative overflow-hidden" ref={ref}>
      <div className="section-padding mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-accent">
            07 / Gallery
          </span>
          <motion.div
            className="mt-3 h-[1px] bg-accent/30 origin-left"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ maxWidth: '80px' }}
          />
        </motion.div>

        <h2 className="mt-10 font-display text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-tight">
          <TextReveal text="Behind the" delay={0.1} inView={isInView} />
          <br />
          <TextReveal text="Scenes" delay={0.3} inView={isInView} gold />
        </h2>
      </div>

      {/* Auto-scrolling carousel */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-12 md:w-40 bg-gradient-to-r from-bg to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-12 md:w-40 bg-gradient-to-l from-bg to-transparent z-10" />

        <div className="animate-gallery-scroll flex items-center gap-3 md:gap-5 w-max hover:[animation-play-state:paused]">
          {images.map((img, i) => (
            <div
              key={i}
              className="shrink-0 h-[200px] sm:h-[240px] md:h-[280px] lg:h-[320px] rounded-xl overflow-hidden border border-border group relative bg-bg-subtle"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="h-full w-auto max-w-none object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ filter: 'saturate(0.85) contrast(1.05)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <span className="font-grotesk text-xs text-text-secondary/70">
                  {img.alt}
                </span>
              </div>
              <div className="absolute top-3 right-3">
                <span className="font-mono text-[9px] text-text-muted/40 bg-bg/50 backdrop-blur-sm px-2 py-0.5 rounded-md border border-border/30">
                  0{(i % galleryImages.length) + 1}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  )
}
