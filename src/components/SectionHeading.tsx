import Reveal from './Reveal'

interface SectionHeadingProps {
  index: string
  title: string
  refCode: string
}

export default function SectionHeading({ index, title, refCode }: SectionHeadingProps) {
  return (
    <Reveal y={8}>
      <div className="flex items-baseline justify-between border-y border-line py-3 mb-10 md:mb-16">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-ink">
          <span className="text-accent">{index}</span>
          <span className="text-ink-faint"> / </span>
          {title}
        </span>
        <span className="hidden sm:block font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
          Ref: {refCode}
        </span>
      </div>
    </Reveal>
  )
}
