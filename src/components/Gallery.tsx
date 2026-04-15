import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import TextReveal from './TextReveal'

const galleryImages = [
  { src: '/img/1.jpg', alt: '' },
  { src: '/img/2.jpg', alt: '' },
  { src: '/img/3.jpg', alt: '' },
  { src: '/img/4.jpg', alt: '' },
  { src: '/img/5.jpg', alt: '' },
  { src: '/img/6.jpg', alt: '' },
  { src: '/img/7.jpg', alt: '' },
  { src: '/img/8.jpg', alt: '' },
  { src: '/img/9.jpg', alt: '' },
  { src: '/img/10.jpg', alt: '' },
  { src: '/img/11.jpg', alt: '' },
  { src: '/img/12.jpg', alt: '' },
  { src: '/img/13.jpg', alt: '' },
  { src: '/img/14.jpg', alt: '' },
  { src: '/img/15.jpg', alt: '' },
  { src: '/img/16.jpg', alt: '' },
  { src: '/img/17.jpg', alt: '' },
  { src: '/img/18.jpg', alt: '' },
  { src: '/img/19.jpg', alt: '' },
  { src: '/img/20.jpg', alt: '' },
  { src: '/img/21.jpg', alt: '' },
  { src: '/img/22.jpg', alt: '' },
  { src: '/img/23.jpg', alt: '' },
  { src: '/img/24.jpg', alt: '' },
  { src: '/img/25.jpg', alt: '' },
  { src: '/img/26.jpg', alt: '' },
  { src: '/img/27.jpg', alt: '' },

]
// Duplicate for seamless loop
const images = [...galleryImages, ...galleryImages]

export default function Gallery() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-24 md:py-32 relative overflow-hidden" ref={ref}>
      <div className="section-padding mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-accent">
            06 / Gallery
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
          <TextReveal text="Behind the" delay={0.1} />
          <br />
          <span className="text-gradient-gold">
            <TextReveal text="Scenes" delay={0.3} />
          </span>
        </h2>
      </div>

      {/* Auto-scrolling carousel */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-12 md:w-40 bg-gradient-to-r from-bg to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-12 md:w-40 bg-gradient-to-l from-bg to-transparent z-10" />

        <div className="animate-gallery-scroll flex gap-3 md:gap-5 w-max hover:[animation-play-state:paused]">
          {images.map((img, i) => (
            <div
              key={i}
              className="shrink-0 w-[240px] sm:w-[280px] md:w-[340px] lg:w-[400px] aspect-[4/3] rounded-xl overflow-hidden border border-border group relative bg-bg-subtle"
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ filter: 'saturate(0.85) contrast(1.05)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060606]/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <span className="font-grotesk text-xs text-text-secondary/70">
                  {img.alt}
                </span>
              </div>
              <div className="absolute top-3 right-3">
                <span className="font-mono text-[9px] text-text-muted/40 bg-bg/50 backdrop-blur-sm px-2 py-0.5 rounded-md border border-white/5">
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
