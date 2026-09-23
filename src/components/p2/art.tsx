import { cn } from "@/lib/utils";

type ArtProps = { className?: string };

const petals = (n: number, cx: number, cy: number, r: number, rx: number, ry: number) =>
  Array.from({ length: n }, (_, i) => (
    <ellipse
      key={i}
      cx={cx}
      cy={cy - r}
      rx={rx}
      ry={ry}
      transform={`rotate(${(i * 360) / n} ${cx} ${cy})`}
    />
  ));

export function Cloud({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 160 70" aria-hidden className={className} fill="currentColor">
      <ellipse cx="40" cy="45" rx="34" ry="22" />
      <ellipse cx="82" cy="32" rx="38" ry="28" />
      <ellipse cx="122" cy="45" rx="34" ry="22" />
      <rect x="40" y="45" width="82" height="22" rx="11" />
    </svg>
  );
}

export function SunDoodle({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden className={className} fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round">
      <circle cx="50" cy="50" r="18" />
      <path d="M43 47v.5M57 47v.5M42 56q8 8 16 0" strokeWidth="4" />
      {Array.from({ length: 8 }, (_, i) => (
        <path key={i} d="M50 14v10" transform={`rotate(${i * 45} 50 50)`} />
      ))}
    </svg>
  );
}

export function FlowerDoodle({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden className={className} fill="currentColor">
      {petals(8, 50, 50, 22, 9, 20)}
      <circle cx="50" cy="50" r="9" fill="var(--color-p2-cream)" />
    </svg>
  );
}

export function BurstDoodle({ className }: ArtProps) {
  const pts = Array.from({ length: 24 }, (_, i) => {
    const a = (i * Math.PI) / 12;
    const r = i % 2 ? 26 : 46;
    return `${50 + r * Math.sin(a)},${50 - r * Math.cos(a)}`;
  }).join(" ");
  return (
    <svg viewBox="0 0 100 100" aria-hidden className={className} fill="currentColor">
      <polygon points={pts} />
    </svg>
  );
}

export function SwirlDoodle({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden className={className} fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round">
      <circle cx="50" cy="50" r="20" />
      <ellipse cx="50" cy="50" rx="42" ry="12" transform="rotate(-24 50 50)" />
    </svg>
  );
}

/** Flat Maxima-style scene: blocks, hills, flower. Placeholder for the real photo. */
export function HeroScene({ className }: ArtProps) {
  return (
    <svg
      viewBox="0 0 1440 480"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden
      className={className}
    >
      <rect width="1440" height="480" fill="#FFC22E" />
      <path d="M0 480V330Q240 230 520 330T1080 320T1440 290V480Z" fill="#FFE08A" />
      <path d="M760 480V360Q1000 270 1200 350T1440 340V480Z" fill="#FFB3C6" />
      <path d="M0 480V410Q300 350 640 420T1440 400V480Z" fill="#7FE0B0" />
      {/* block tower */}
      <g>
        <rect x="330" y="360" width="190" height="120" fill="#FFB3C6" />
        <path d="M380 480V430a35 35 0 0 1 70 0v50Z" fill="#1A55EE" />
        <rect x="350" y="255" width="110" height="105" fill="#D0300A" />
        <polygon points="330,255 480,255 405,150" fill="#5B3FD6" />
        <circle cx="405" cy="320" r="14" fill="#FFC22E" />
      </g>
      {/* flower */}
      <g>
        <path d="M1010 480V330" stroke="#2FBF71" strokeWidth="10" strokeLinecap="round" />
        <path d="M1010 420q-50-10-60-50 45 0 60 50Z" fill="#2FBF71" />
        <g transform="translate(1010 300)" fill="#D0300A">
          {petals(7, 0, 0, 44, 26, 34)}
        </g>
        <circle cx="1010" cy="300" r="26" fill="#FFC22E" />
        <circle cx="1010" cy="300" r="12" fill="#5B3FD6" />
      </g>
      {/* birds */}
      <g fill="none" stroke="#1A55EE" strokeWidth="4" strokeLinecap="round">
        <path d="M1120 160q18-22 36 0q18-22 36 0" />
        <path d="M250 200q12-16 24 0q12-16 24 0" />
      </g>
    </svg>
  );
}

const Backdrop = ({ children }: { children: React.ReactNode }) => (
  <svg viewBox="0 0 200 200" aria-hidden className="h-full w-full">
    {children}
  </svg>
);

export function SeedArt({ className }: ArtProps) {
  return (
    <div className={cn(className)}>
      <Backdrop>
        {/* kraft seed packet */}
        <path d="M54 62H146L157 176Q158 188 146 188H54Q42 188 43 176Z" fill="#D9A066" />
        <path d="M54 62H80L70 188H54Q42 188 43 176Z" fill="#E6B57C" />
        <path d="M49 46 57 52 65 46 73 52 81 46 89 52 97 46 105 52 113 46 121 52 129 46 137 52 145 46 151 46 148 76H52Z" fill="#B9803F" />
        <path d="M55 86H145" stroke="#FFF4E0" strokeWidth="3" strokeDasharray="6 6" strokeLinecap="round" />
        {/* label with the sprout */}
        <rect x="66" y="98" width="68" height="76" rx="12" fill="#FFF4E0" />
        <ellipse cx="100" cy="160" rx="20" ry="6" fill="#8A5A3B" />
        <path d="M100 158V128" stroke="#178048" strokeWidth="5" strokeLinecap="round" />
        <path d="M100 138q-24-2-28-22 24-2 28 22Z" fill="#2FBF71" />
        <path d="M100 132q22 0 28-20-26-4-28 20Z" fill="#7FE0B0" />
        {/* a few loose seeds */}
        <ellipse cx="28" cy="184" rx="7" ry="4" fill="#FFC22E" transform="rotate(-20 28 184)" />
        <ellipse cx="172" cy="188" rx="7" ry="4" fill="#FFC22E" transform="rotate(15 172 188)" />
        <ellipse cx="184" cy="176" rx="6" ry="3.5" fill="#FFC22E" transform="rotate(-35 184 176)" />
      </Backdrop>
    </div>
  );
}

export function SproutArt({ className }: ArtProps) {
  return (
    <div className={cn(className)}>
      <Backdrop>
        <path d="M30 172Q100 130 170 172V190H30Z" fill="#8A5A3B" />
        <path d="M100 160Q104 120 100 80" stroke="#178048" strokeWidth="8" strokeLinecap="round" fill="none" />
        <path d="M100 100q-56-2-66-52 60-6 66 52Z" fill="#2FBF71" />
        <path d="M100 84q52 0 64-46-58-8-64 46Z" fill="#7FE0B0" />
      </Backdrop>
    </div>
  );
}

export function SunflowerArt({ className }: ArtProps) {
  return (
    <div className={cn(className)}>
      <Backdrop>
        <path d="M100 190V110" stroke="#178048" strokeWidth="9" strokeLinecap="round" />
        <path d="M100 160q-40 0-48-30 38-4 48 30Z" fill="#2FBF71" />
        <g transform="translate(100 82)" fill="#FFC22E">{petals(12, 0, 0, 40, 12, 24)}</g>
        <circle cx="100" cy="82" r="24" fill="#6B3E26" />
        <circle cx="93" cy="78" r="3" fill="#FFC22E" />
        <circle cx="107" cy="76" r="3" fill="#FFC22E" />
        <circle cx="100" cy="90" r="3" fill="#FFC22E" />
      </Backdrop>
    </div>
  );
}

export function WildflowerArt({ className }: ArtProps) {
  return (
    <div className={cn(className)}>
      <Backdrop>
        <g stroke="#178048" strokeWidth="6" strokeLinecap="round" fill="none">
          <path d="M60 190Q58 140 62 100" />
          <path d="M100 190Q102 130 100 70" />
          <path d="M142 190Q146 150 140 112" />
        </g>
        <g transform="translate(62 90)" fill="#FF8FAE">{petals(5, 0, 0, 20, 14, 18)}</g>
        <circle cx="62" cy="90" r="10" fill="#FFC22E" />
        <g transform="translate(100 60)" fill="#5B3FD6">{petals(8, 0, 0, 22, 8, 20)}</g>
        <circle cx="100" cy="60" r="11" fill="#FFC22E" />
        <g transform="translate(140 102)" fill="#D0300A">{petals(6, 0, 0, 18, 11, 16)}</g>
        <circle cx="140" cy="102" r="9" fill="#FFC22E" />
      </Backdrop>
    </div>
  );
}
