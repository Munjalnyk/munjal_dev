const words = [
  'Hardware',
  'Embedded',
  'IoT',
  'PCB Design',
  'Firmware',
  'Systems',
  'SIL4',
  'Engineering',
]

export default function MarqueeDivider() {
  const row = [...words, ...words]

  return (
    <div className="relative overflow-hidden border-y border-line py-3.5 bg-bg-subtle">
      <div className="animate-ticker flex w-max items-center whitespace-nowrap">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex items-center" aria-hidden={dup === 1}>
            {row.map((word, i) => (
              <span key={`${dup}-${i}`} className="inline-flex items-center">
                <span className="font-mono text-xs md:text-sm uppercase tracking-[0.3em] text-ink-soft mx-5 md:mx-8 select-none">
                  {word}
                </span>
                <span className="text-accent text-xs select-none">+</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
