/**
 * NMKHair brand logo — the exact supplied artwork, used unchanged.
 * The file lives at public/images/nmk-logo.jpeg and is rendered as-is
 * (never redrawn, recoloured or re-typeset). The white background of the
 * artwork is kept, so the mark reads cleanly on light and dark sections.
 */
export default function Logo({ className = "h-12 w-12" }: { className?: string }) {
  return (
    <span
      className={`inline-block shrink-0 overflow-hidden rounded-xl bg-white ring-1 ring-black/10 ${className}`}
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
