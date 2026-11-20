/**
 * NMKHair brand logo — the exact supplied artwork, used unchanged.
 * The file lives at public/images/nmk-logo.png and is rendered as-is
 * (never redrawn, recoloured or re-typeset). The #F6F6F6 studio tile
 * matches the artwork's native background on both light and dark sections.
 */
export default function Logo({ className = "h-12 w-12" }: { className?: string }) {
  return (
    <span
      className={`inline-block shrink-0 overflow-hidden rounded-xl bg-[#F6F6F6] ring-1 ring-black/10 shadow-sm ${className}`}
      role="img"
      aria-label="N · M · K Hair — Your look, our priority"
    >
      <img
        src="/images/nmk-logo.jpeg"
        alt="N · M · K Hair logo"
        className="h-full w-full object-cover"
        draggable={false}
      />
    </span>
  );
}
