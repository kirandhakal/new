/* The visitor's avatar: a little mountaineer with a saffron pack, ice axe and headlamp. */
export default function Climber({ facingLeft = false }: { facingLeft?: boolean }) {
  return (
    <svg viewBox="0 0 40 52" className="h-12 w-10 drop-shadow-[0_6px_10px_rgba(0,0,0,0.35)]" style={{ transform: facingLeft ? "scaleX(-1)" : undefined }} aria-hidden="true">
      {/* pack */}
      <rect x="7" y="18" width="11" height="17" rx="3" fill="hsl(var(--accent))" />
      <rect x="8.5" y="15" width="8" height="5" rx="2" fill="hsl(var(--flag-red))" />
      {/* body */}
      <path d="M15 19 h11 a3 3 0 0 1 3 3 v12 h-17 v-12 a3 3 0 0 1 3 -3 Z" fill="hsl(var(--flag-blue))" />
      {/* legs */}
      <path d="M14 34 l-3 14 M26 34 l3 14" stroke="hsl(var(--foreground))" strokeWidth="4" strokeLinecap="round" />
      {/* arm + ice axe */}
      <path d="M27 23 l7 -6" stroke="hsl(var(--flag-blue))" strokeWidth="4" strokeLinecap="round" />
      <path d="M34 6 v20 M30 8 h8" stroke="hsl(var(--foreground))" strokeWidth="2" strokeLinecap="round" />
      {/* head, hat, lamp */}
      <circle cx="21" cy="12" r="6" fill="#f2c9a0" />
      <path d="M14.5 11 a6.5 6.5 0 0 1 13 0 Z" fill="hsl(var(--flag-red))" />
      <circle cx="21" cy="3.5" r="2" fill="hsl(var(--flag-white))" />
      <circle cx="26.5" cy="10" r="1.6" fill="hsl(var(--accent))" />
    </svg>
  );
}
