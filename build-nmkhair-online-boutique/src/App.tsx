import { useEffect, useRef, useState } from "react";
import {
  ShoppingBag, Heart, X, Plus, Minus, Trash2, ArrowRight,
  Menu, Star, Check, Search, Sparkles, ShieldCheck, Truck, RefreshCcw,
  Scissors, Calendar, Clock, MapPin, ChevronDown, ChevronLeft, ChevronRight,
  Send, BadgeCheck, Droplets, Wind, Crown, ArrowUp,
  GraduationCap, Palette, Wand2, Layers, SlidersHorizontal
} from "lucide-react";

const WhatsAppIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm5.77 14.08c-.24.68-1.42 1.3-1.97 1.38-.52.08-1.18.11-1.91-.12-.44-.14-1-.33-1.72-.64-3.03-1.31-5-4.37-5.15-4.57-.15-.2-1.23-1.64-1.23-3.13 0-1.49.78-2.22 1.06-2.52.28-.3.61-.38.81-.38.2 0 .41.01.58.01.19 0 .44-.07.69.53.26.62.87 2.13.95 2.28.08.15.13.33.02.53-.11.2-.17.33-.33.51-.17.18-.35.4-.5.54-.17.17-.34.35-.15.69.19.34.86 1.42 1.85 2.3 1.27 1.13 2.34 1.48 2.68 1.65.34.17.54.14.74-.08.2-.22.86-1 .99-1.34.13-.34.26-.28.44-.21.18.07 1.16.55 1.36.65.2.1.33.15.38.23.05.08.05.47-.19 1.15z" />
  </svg>
);

const IMAGES = {
  bodyWave: "/images/nmk-hero-body-wave.jpg",
  straight: "/images/nmk-straight-hair.jpg",
  deepWave: "/images/nmk-deep-wave.jpg",
  curly: "/images/nmk-curly-hair.jpg",
  naturalWave: "/images/nmk-natural-wave.jpg",
  glamLace: "/images/nmk-glam-lace.jpg",
  braids: "/images/nmk-braids.jpg",
  salon: "/images/nmk-salon-styling.jpg",
  care: "/images/nmk-hair-care.jpg",
  bonnet: "/images/nmk-satin-care.jpg",
} as const;

/* ---------------- data ---------------- */
type Origin = "Brazilian" | "Remy" | "Vietnamese";
type Kind = "Wig" | "Bob" | "Closure";
type PriceRow = { length: number; price: number };
type Family = {
  id: string; name: string; kind: Kind; badge?: string; img: string;
  desc: string; rating: number; reviews: number; rows: PriceRow[];
  curlsUpcharge?: number;
};

const rows = (...pairs: [number, number][]): PriceRow[] => pairs.map(([length, price]) => ({ length, price }));

const FAMILIES: Family[] = [
  { id: "sdd-curls", name: "13×4 SDD Curls", kind: "Wig", badge: "Bestseller", img: IMAGES.curly, desc: "Defined, bouncy curls on a soft 13×4 lace frontal.", rating: 5, reviews: 631,
    rows: rows([18, 2750], [20, 3000], [22, 3300], [24, 3800], [26, 4400]) },
  { id: "sdd-straight", name: "13×4 SDD Straight", kind: "Wig", badge: "Bestseller", img: IMAGES.straight, desc: "Silky bone-straight hair with a 13×4 lace frontal.", rating: 5, reviews: 842,
    rows: rows([12, 1900], [14, 2100], [16, 2250], [18, 2550], [20, 2900], [22, 3050]) },
  { id: "sdd-straight-5x5", name: "5×5 SDD Straight", kind: "Wig", badge: "Popular", img: IMAGES.bodyWave, desc: "Neat 5×5 closure in glossy bone-straight hair.", rating: 5, reviews: 519,
    rows: rows([12, 1800], [14, 2000], [16, 2450], [18, 2600], [20, 2800], [22, 3100], [24, 3200]) },
  { id: "single-drawn-13x6", name: "13×6 Straight — Single Drawn", kind: "Wig", img: IMAGES.naturalWave, desc: "Single-drawn 13×6 frontal in a sleek straight finish.", rating: 4, reviews: 356,
    rows: rows([22, 2500], [24, 2800], [26, 3000], [28, 3200], [30, 3600]) },
  { id: "bob-13x4", name: "13×4 Chinese Bone Straight Bob", kind: "Bob", img: IMAGES.deepWave, desc: "Blunt Chinese bone-straight bob with a 13×4 lace frontal.", rating: 5, reviews: 274,
    rows: rows([8, 2000], [10, 2100], [12, 2200], [14, 2500], [16, 2900], [18, 3200]) },
  { id: "bob-5x5", name: "5×5 Chinese Bone Straight Bob", kind: "Bob", img: IMAGES.glamLace, desc: "Sharp 5×5 closure bob in Chinese bone-straight hair.", rating: 5, reviews: 198,
    rows: rows([8, 2100], [10, 2300], [12, 2600], [14, 2800], [16, 3100], [18, 3300]) },
  { id: "hd-dd-wigs", name: "13×4 HD DD Straight Wigs", kind: "Wig", badge: "Top rated", img: IMAGES.straight, curlsUpcharge: 500, desc: "HD double-drawn straight wigs. Add R500 for HD lace curls.", rating: 5, reviews: 631,
    rows: rows([18, 2900], [20, 3200], [22, 3500], [24, 3800], [26, 4100], [28, 4750], [30, 5200]) },
  { id: "lagos-closure", name: "13×4 HD Lagos Hairline Closure", kind: "Closure", img: IMAGES.curly, desc: "HD Lagos hairline closure with a natural, meltable hairline.", rating: 5, reviews: 388,
    rows: rows([12, 1800], [14, 2000], [16, 2300], [18, 2500], [20, 2650]) },
];

const priceFor = (f: Family, length: number, curls = false) =>
  (f.rows.find(r => r.length === length)?.price ?? f.rows[0].price) + (curls ? f.curlsUpcharge ?? 0 : 0);

const FEATURED = FAMILIES[0];

const ORIGINS: { name: Origin; tag: string; img: string; desc: string; feats: string[]; from: number }[] = [
  { name: "Vietnamese", tag: "NMKHair's #1 bestseller", img: IMAGES.straight, desc: "Our most-loved hair: naturally silky, strong and glossy. From bone-straight lengths to soft waves, find the style that's yours.", feats: ["Glass finish", "Strongest strands", "Heat resistant"], from: 2799 },
  { name: "Brazilian", tag: "Full & voluminous", img: IMAGES.bodyWave, desc: "Thick, lustrous and built to hold any style — from silk press to big curls. An effortless texture for everyday glam.", feats: ["Densest bundles", "Holds curl & press", "12–24\" lengths"], from: 3299 },
  { name: "Remy", tag: "True cuticle-aligned", img: IMAGES.deepWave, desc: "100% Remy with cuticles intact and aligned in one direction. No tangling, no matting — just smooth, long-lasting shine.", feats: ["Zero tangle", "Dye & bleach safe", "Natural hairline"], from: 2999 },
];

const SERVICES = [
  { id: "sewin", name: "Sew-In Install", price: 950, time: "2.5 hrs", desc: "Traditional or versatil sew-in with braid-down, styling included.", popular: true },
  { id: "lace", name: "Lace Front Install", price: 1150, time: "2 hrs", desc: "Melted HD lace, custom hairline, baby hairs & finish styling.", popular: true },
  { id: "wig", name: "Wig Customization", price: 750, time: "90 min", desc: "Pluck, bleach knots, tint lace, cut & style — ready to wear.", popular: false },
  { id: "color", name: "Color & Balayage", price: 1450, time: "3 hrs", desc: "Full color, highlights or balayage with bond-protect treatment.", popular: false },
  { id: "silk", name: "Silk Press & Treatment", price: 550, time: "90 min", desc: "Deep cleanse, steam treatment, silk press & trim.", popular: false },
  { id: "braids", name: "Braids & Styling", price: 850, time: "2 hrs", desc: "Knotless braids, cornrows or twist-outs with extensions.", popular: false },
  { id: "maint", name: "Maintenance & Revival", price: 450, time: "60 min", desc: "Wash, deep condition, re-curl, detangle & re-install check.", popular: false },
  { id: "bridal", name: "Bridal & Event Hair", price: 1850, time: "3 hrs", desc: "Trial + day-of styling for brides and special occasions.", popular: false },
];

const CARE_SERVICES = [
  { id: "wig-treatment", name: "Wig Treatment", price: 300, from: true, icon: Sparkles, tag: "Most booked",
    desc: "Deep cleanse, steam and bond repair that brings tired hair back to life." },
  { id: "masterclass", name: "Installation Masterclasses", price: 4000, from: false, icon: GraduationCap, tag: "Training",
    desc: "One-on-one training: melt, pluck, customise and install like a professional." },
  { id: "basic-install", name: "Basic Installations", price: 350, from: true, icon: Scissors,
    desc: "Glued or glueless installs, braided down neat and styled to finish." },
  { id: "wig-colour", name: "Wig Colourings", price: 700, from: true, icon: Palette,
    desc: "Full colour, highlights or toning with bond protection throughout." },
  { id: "wig-revamp", name: "Wig Revamps", price: 500, from: true, icon: RefreshCcw, tag: "Revive",
    desc: "Wash, detangle, re-curl and restyle an old unit until it looks new." },
  { id: "wig-making", name: "Wig Making", price: 500, from: true, icon: Wand2,
    desc: "Your bundles sewn into a custom-fit unit, built on our studio blocks." },
  { id: "closure-replacement", name: "Closure Replacements", price: 500, from: true, icon: Layers,
    desc: "Swap a worn closure for a fresh, natural-looking hairline." },
  { id: "customisation", name: "Customisation", price: 300, from: false, icon: SlidersHorizontal,
    desc: "Plucking, bleached knots, lace tint and baby hairs shaped to you." },
];

const REVIEWS = [
  { name: "Amara O.", loc: "Cape Town", hair: "Brazilian Body Wave", stars: 5, text: "Third order from NMK and the quality is still unreal. No shedding after 4 months, and my stylist asked where I got it from. The bundles are so full I only needed 2." },
  { name: "Keisha M.", loc: "Gqeberha", hair: "Vietnamese Bone Straight", stars: 5, text: "Bone straight that actually stays straight. I got the sew-in at the NMK salon too — best install I've ever had. Melted lace, zero bumps." },
  { name: "Sofia R.", loc: "Durban", hair: "Remy Deep Wave Wig", stars: 5, text: "The HD lace is invisible on my skin tone. Pre-plucked hairline is perfect, I wore it glueless to brunch. NMK is my only plug now." },
  { name: "Tobi A.", loc: "Gqeberha", hair: "Brazilian Kinky Curly", stars: 4, text: "Maintenance service saved my install. They washed, re-curled and re-styled everything in an hour. My curls look brand new again." },
];

const FAQS = [
  { q: "What is the difference between Brazilian, Remy and Vietnamese hair?", a: "Brazilian hair is known for fullness and volume. Remy hair has cuticles aligned in one direction so it never tangles. Vietnamese hair is naturally silky and strong, ideal for bone-straight styles. All three are 100% human hair at NMK — the difference is texture, density and finish." },
  { q: "How many bundles do I need?", a: "For a natural look: 2 bundles for 12–16\", 3 bundles for 18–24\", and 3–4 bundles for 26\"+. If you want extra fullness, add one more bundle. Our length guide above calculates this for you, and our stylists can confirm on a free consultation." },
  { q: "Can I dye or bleach NMK hair?", a: "Yes. All NMK hair is 100% human hair and can be dyed, bleached and heat-styled. We recommend a strand test first and using bond-protect products. Our color service includes a free consultation." },
  { q: "How long does NMK hair last?", a: "With proper maintenance, Brazilian and Vietnamese hair lasts 12–18 months; Remy lasts 9–12 months. Wash weekly, deep condition, and store wigs on a stand. Our maintenance service extends the life of every install." },
  { q: "Do you offer installs and maintenance in-salon?", a: "Yes — NMK Studio offers sew-ins, lace installs, wig customization, coloring, silk press, braids and maintenance. Book online above; walk-ins are welcome for maintenance only." },
];

const money = (n: number) => "R" + Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

export default function App() {
  const [filter, setFilter] = useState<"All" | Kind>("All");
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<{ id: number; name: string; price: number; img: string; meta: string; qty: number }[]>([]);
  const [wish, setWish] = useState<number[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [quick, setQuick] = useState<{ f: Family; length: number; curls: boolean; qty: number } | null>(null);
  const [picks, setPicks] = useState<Record<string, { length: number; curls: boolean }>>(
    () => Object.fromEntries(FAMILIES.map(f => [f.id, { length: f.rows[0].length, curls: false }]))
  );
  const [reviewIdx, setReviewIdx] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [checkoutDone, setCheckoutDone] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const [fabClear, setFabClear] = useState({ wa: true, top: true });
  const waRef = useRef<HTMLAnchorElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  /* booking */
  const [bk, setBk] = useState({ name: "", phone: "", service: "Sew-In Install", date: "", time: "10:00 AM", notes: "" });
  const [booked, setBooked] = useState<string | null>(null);

  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(""), 2600); };
  const cartCount = cart.reduce((a, c) => a + c.qty, 0);
  const subtotal = cart.reduce((a, c) => a + c.price * c.qty, 0);

  const addCart = (id: number, name: string, price: number, img: string, meta: string, qty = 1) => {
    setCart(prev => {
      const i = prev.findIndex(x => x.id === id && x.meta === meta);
      if (i >= 0) { const c = [...prev]; c[i] = { ...c[i], qty: c[i].qty + qty }; return c; }
      return [...prev, { id, name, price, img, meta, qty }];
    });
    showToast(`${name} added to bag`);
  };
  const addFamily = (f: Family, length: number, curls: boolean, qty = 1) => {
    const id = 1000 + FAMILIES.indexOf(f) * 100 + length + (curls ? 50 : 0);
    const meta = `${f.name} · ${length}"${curls ? " · Curls" : ""}`;
    addCart(id, f.name, priceFor(f, length, curls), f.img, meta, qty);
  };
  const toggleWish = (id: number) => setWish(w => w.includes(id) ? w.filter(x => x !== id) : [...w, id]);
  const chooseLength = (id: string, length: number) => setPicks(p => ({ ...p, [id]: { ...p[id], length } }));
  const toggleCurls = (id: string) => setPicks(p => ({ ...p, [id]: { ...p[id], curls: !p[id].curls } }));
  const openQuick = (f: Family) => setQuick({ f, length: picks[f.id].length, curls: picks[f.id].curls, qty: 1 });

  const filtered = FAMILIES.filter(f =>
    (filter === "All" || f.kind === filter) &&
    (f.name.toLowerCase().includes(query.toLowerCase()) || f.desc.toLowerCase().includes(query.toLowerCase()))
  );

  const bookService = (name: string) => {
    setBk(b => ({ ...b, service: name }));
    setBooked(null);
    showToast(`${name} selected — choose your date`);
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const submitBooking = () => {
    if (!bk.name.trim() || !bk.phone.trim() || !bk.date) { showToast("Please add your name, phone and date"); return; }
    const ref = "NMK-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    setBooked(ref); showToast("Appointment booked — see you soon");
  };

  useEffect(() => {
    const onScroll = () => { const h = document.documentElement; setProgress(h.scrollTop / (h.scrollHeight - h.clientHeight) * 100); setShowTop(h.scrollTop > 480); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }), { threshold: 0.1 });
    document.querySelectorAll(".reveal").forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [filter, query]);

  useEffect(() => { const t = setInterval(() => setReviewIdx(i => (i + 1) % REVIEWS.length), 6000); return () => clearInterval(t); }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setQuick(null); setCartOpen(false); setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const locked = Boolean(quick) || cartOpen;
    document.body.style.overflow = locked ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [quick, cartOpen]);

  /* Keep the floating buttons from ever covering a price or an action. */
  useEffect(() => {
    const GUARDS = 'a,button,input,select,textarea,[role="button"],[data-fab-guard]';
    const isClear = (el: HTMLElement | null) => {
      if (!el) return true;
      const r = el.getBoundingClientRect();
      if (!r.width) return true;
      const nodes = document.querySelectorAll(GUARDS);
      for (const node of nodes) {
        if (el.contains(node)) continue;
        const b = node.getBoundingClientRect();
        if (!b.width || b.bottom < 0 || b.top > window.innerHeight) continue;
        const hits = !(b.right < r.left + 4 || b.left > r.right - 4 || b.bottom < r.top + 4 || b.top > r.bottom - 4);
        if (hits) return false;
      }
      return true;
    };
    let frame = 0;
    const measure = () => {
      frame = 0;
      const next = { wa: isClear(waRef.current), top: isClear(topRef.current) };
      setFabClear(prev => (prev.wa === next.wa && prev.top === next.top ? prev : next));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(measure); };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const settle = window.setTimeout(schedule, 600);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.clearTimeout(settle);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [filter, query, openFaq, cartOpen, quick, showTop]);

  const subscribe = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showToast("Please enter a valid email"); return; }
    setSubscribed(true); showToast("Welcome to the NMK list — 10% off sent");
  };

  return (
    <div className="min-h-screen bg-white text-[#0A0A0A] font-sans antialiased">
      <div className="fixed top-0 left-0 h-[3px] z-[80] bg-gradient-to-r from-[#E10600] via-[#D4AF37] to-[#0A0A0A] transition-all" style={{ width: progress + "%" }} />
      {toast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[90] flex items-center gap-3 bg-[#0A0A0A] text-white px-5 py-3 rounded-full shadow-2xl text-sm font-medium border border-[#D4AF37]/60 max-w-[calc(100vw-2rem)]">
          <span className="h-2 w-2 shrink-0 rounded-full bg-[#E10600]" /> {toast}
        </div>
      )}

      {/* floating whatsapp */}
      <a
        ref={waRef}
        href="https://wa.me/27671550084"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp NMKHair on +27 67 155 0084"
        aria-hidden={!fabClear.wa}
        tabIndex={fabClear.wa ? 0 : -1}
        className={`fixed left-4 bottom-4 md:left-7 md:bottom-7 z-40 inline-flex items-center gap-2.5 h-12 px-3.5 sm:px-4 rounded-full bg-[#25D366] hover:bg-[#2EE070] text-[#0A0A0A] font-bold text-xs sm:text-sm shadow-xl shadow-black/25 border border-black/15 transition-all duration-300 hover:-translate-y-0.5 ${fabClear.wa ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"}`}
      >
        <WhatsAppIcon className="h-5 w-5 shrink-0" />
        <span className="hidden sm:inline tracking-tight">+27 67 155 0084</span>
      </a>

      {/* back to top */}
      <div ref={topRef} className={`fixed right-4 bottom-4 md:right-7 md:bottom-7 z-40 transition-all duration-500 ${showTop && fabClear.top ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"}`}>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="group relative grid place-items-center h-14 w-14 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2"
        >
          <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 56 56" aria-hidden="true">
            <defs>
              <linearGradient id="nmkTopRing" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E10600" />
                <stop offset="100%" stopColor="#D4AF37" />
              </linearGradient>
            </defs>
            <circle cx="28" cy="28" r="25" fill="none" stroke="rgba(212,175,55,0.3)" strokeWidth="2.5" />
            <circle cx="28" cy="28" r="25" fill="none" stroke="url(#nmkTopRing)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray={2 * Math.PI * 25} strokeDashoffset={2 * Math.PI * 25 * (1 - progress / 100)} className="transition-[stroke-dashoffset] duration-150 ease-linear" />
          </svg>
          <span className="grid place-items-center h-11 w-11 rounded-full bg-[#0A0A0A] text-[#F1D27A] shadow-xl shadow-black/25 border border-[#D4AF37]/40 transition-all duration-300 group-hover:bg-[#E10600] group-hover:text-white group-hover:border-[#E10600] group-hover:-translate-y-0.5 group-active:translate-y-0 group-active:scale-95">
            <ArrowUp className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </span>
          <span className="pointer-events-none absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-[#0A0A0A] text-white text-xs font-semibold px-3.5 py-2 opacity-0 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 hidden md:block border border-[#D4AF37]/40">
            Back to top
          </span>
        </button>
      </div>

      {/* announcement */}
      <div className="bg-[#0A0A0A] text-white text-center text-[11px] tracking-[0.22em] uppercase py-2.5 px-4">
        Vietnamese hair: our #1 bestseller <span className="text-[#D4AF37] mx-2">◆</span> Free shipping over R1 500 <span className="text-[#E10600] mx-2">◆</span> 30-day exchange
      </div>

      {/* nav */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-8 h-[72px] flex items-center justify-between gap-2 sm:gap-4">
          <a href="#top" className="flex items-center gap-2.5 min-w-0">
            <span className="h-10 w-10 shrink-0 grid place-items-center bg-[#0A0A0A] text-white rounded-full relative overflow-hidden">
              <span className="font-display font-bold text-lg leading-none">N</span>
              <span className="absolute bottom-1.5 h-[3px] w-5 bg-gradient-to-r from-[#E10600] to-[#D4AF37] rounded-full" />
            </span>
            <span className="leading-none min-w-0">
              <span className="block font-display font-bold text-[22px] tracking-tight">NMK<span className="gold-text">Hair</span></span>
              <span className="hidden sm:block text-[9px] tracking-[0.35em] uppercase text-black/50 mt-0.5 truncate">Brazilian · Remy · Vietnamese</span>
            </span>
          </a>
          <nav className="hidden lg:flex items-center gap-7 text-[13px] font-medium tracking-wide text-black/70">
            <a href="#shop" className="hover:text-[#E10600] transition">Shop Hair</a>
            <a href="#origins" className="hover:text-[#E10600] transition">Hair Types</a>
            <a href="#services" className="hover:text-[#E10600] transition">Services</a>
            <a href="#care" className="hover:text-[#E10600] transition">Maintenance</a>
            <a href="#reviews" className="hover:text-[#E10600] transition">Reviews</a>
          </nav>
          <div className="flex items-center gap-1.5 shrink-0">
            <a href="#shop" className="hidden md:grid h-10 w-10 place-items-center rounded-full hover:bg-black/5 transition" aria-label="Search"><Search className="h-5 w-5" /></a>
            <button onClick={() => showToast(wish.length ? `${wish.length} item(s) in wishlist` : "Tap a heart to save a style")} className="relative hidden md:grid h-10 w-10 place-items-center rounded-full hover:bg-black/5 transition" aria-label="Wishlist">
              <Heart className={`h-5 w-5 ${wish.length ? "fill-[#E10600] text-[#E10600]" : ""}`} />
              {wish.length > 0 && <span className="absolute top-1 right-1 h-4 w-4 grid place-items-center rounded-full bg-[#E10600] text-white text-[10px] font-bold">{wish.length}</span>}
            </button>
            <button onClick={() => setCartOpen(true)} className="relative flex items-center gap-2 bg-[#0A0A0A] text-white pl-4 pr-5 py-2.5 rounded-full text-sm font-semibold hover:bg-black transition">
              <ShoppingBag className="h-4 w-4" /> Bag
              {cartCount > 0 && <span className="absolute -top-1.5 -right-1.5 h-5 w-5 grid place-items-center rounded-full bg-[#E10600] text-[11px] font-bold">{cartCount}</span>}
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2">{menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}</button>
          </div>
        </div>
        {menuOpen && (
          <div className="lg:hidden border-t border-black/10 px-5 py-4 flex flex-col gap-1 bg-white">
            {[["#shop", "Shop Hair"], ["#origins", "Hair Types"], ["#services", "Services"], ["#care", "Maintenance"], ["#reviews", "Reviews"]].map(([h, l]) => (
              <a key={h} href={h} onClick={() => setMenuOpen(false)} className="py-2.5 font-medium border-b border-black/5 last:border-0">{l}</a>
            ))}
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="top" className="relative overflow-hidden streaks bg-white">
        <div className="absolute top-0 right-0 h-full w-1/2 bg-gradient-to-l from-[#F3EFE6] to-transparent pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-5 md:px-8 pt-12 pb-16 md:pt-20 md:pb-24 grid lg:grid-cols-2 gap-12 items-center">
          <div className="reveal visible">
            <div className="inline-flex items-center gap-2 border border-black/15 rounded-full pl-2 pr-4 py-1.5 text-xs font-semibold tracking-wide">
              <span className="bg-[#E10600] text-white text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full">Bestseller</span>
              Vietnamese Hair · Our most-loved collection
            </div>
            <h1 className="font-display font-semibold leading-[0.95] mt-6 text-[clamp(3rem,7.5vw,5.8rem)] tracking-tight">
              Hair that<br />turns <em className="gold-text not-italic font-bold">heads.</em><br />
              <span className="text-[0.55em] font-medium text-black/80">Worn with <span className="text-[#E10600]">confidence.</span></span>
            </h1>
            <p className="mt-5 max-w-md text-black/60 leading-relaxed">
              Meet NMKHair's bestselling Vietnamese hair: silky, strong and made to shine. Explore Brazilian and Remy textures too, plus expert installs, styling and maintenance in Gqeberha.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#shop" onClick={() => { setQuery(""); setFilter("Wig"); }} className="group inline-flex items-center gap-2 bg-[#0A0A0A] text-white px-7 py-4 rounded-full text-sm font-semibold hover:bg-black transition">
                Shop Vietnamese Hair <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
              </a>
              <a href="#services" className="inline-flex items-center gap-2 border-2 border-[#0A0A0A] px-7 py-4 rounded-full text-sm font-semibold hover:bg-[#E10600] hover:border-[#E10600] hover:text-white transition">
                <Scissors className="h-4 w-4" /> Book a Service
              </a>
            </div>
            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
              <div className="flex items-center gap-2">
                <span className="flex">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-[#D4AF37] text-[#D4AF37]" />)}</span>
                <span className="text-sm font-semibold">4.9/5</span><span className="text-sm text-black/50">· 12,400+ reviews</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-black/60"><ShieldCheck className="h-4 w-4 text-[#E10600]" /> 30-day exchange guarantee</div>
            </div>
            <div className="mt-8 grid grid-cols-3 max-w-md divide-x divide-black/10 border-y border-black/10 py-4">
              {[["12k+", "Happy clients"], ["100%", "Human hair"], ["48h", "Fast dispatch"]].map(([v, l]) => (
                <div key={l} className="px-4 first:pl-0"><p className="font-display text-2xl font-bold">{v}</p><p className="text-[11px] tracking-widest uppercase text-black/45 mt-0.5">{l}</p></div>
              ))}
            </div>
          </div>

          <div className="relative reveal visible">
            <div className="absolute -inset-3 rounded-[2rem] border-2 border-[#D4AF37]/70 rotate-1 pointer-events-none" />
            <div className="absolute -inset-3 rounded-[2rem] border border-[#E10600]/30 -rotate-1 pointer-events-none" />
            <div className="img-zoom relative rounded-[2rem] overflow-hidden shadow-2xl shadow-black/20">
              <img src={FEATURED.img} alt="Model with long, glossy curls" fetchPriority="high" className="w-full h-[540px] object-cover object-[center_25%]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3">
                <div className="text-white">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-[#F1D27A] font-bold">#1 Bestseller · {FEATURED.rows[0].length}"</p>
                  <p className="font-display text-2xl mt-1">{FEATURED.name}</p>
                </div>
                <button onClick={() => addFamily(FEATURED, FEATURED.rows[0].length, false)} className="shrink-0 bg-white text-black text-sm font-bold px-5 py-3 rounded-full hover:bg-[#D4AF37] transition">Add — {money(FEATURED.rows[0].price)}</button>
              </div>
            </div>
            <div className="absolute -left-4 md:-left-10 top-8 bg-white rounded-2xl shadow-xl shadow-black/15 border border-black/10 p-3 flex items-center gap-3 animate-floaty">
              <img src={IMAGES.straight} alt="Model with long, bone straight hair" className="h-14 w-14 rounded-xl object-cover object-top" />
              <div><p className="text-xs font-bold">13×4 SDD Straight</p><p className="text-xs text-black/50">From {money(FAMILIES[1].rows[0].price)}</p></div>
              <span className="h-2 w-2 rounded-full bg-[#E10600]" />
            </div>
            <div className="absolute -right-3 md:-right-6 bottom-24 bg-[#0A0A0A] text-white rounded-2xl shadow-xl p-4 animate-floaty" style={{ animationDelay: "1.2s" }}>
              <p className="flex items-center gap-1.5 text-xs font-bold"><Sparkles className="h-4 w-4 text-[#D4AF37]" /> Zero shedding</p>
              <p className="text-[11px] text-white/60 mt-1">Tangle-free · 12+ months</p>
            </div>
          </div>
        </div>
      </section>

      {/* marquee */}
      <div className="bg-[#0A0A0A] text-white overflow-hidden py-3.5">
        <div className="flex whitespace-nowrap animate-marquee w-max">
          {[0, 1].map(k => (
            <span key={k} className="flex items-center gap-7 pr-7 text-[13px] font-bold tracking-[0.25em] uppercase">
              {["Vietnamese Hair · #1 Bestseller", "Brazilian Hair", "Remy Hair", "100% Human Hair", "Free Shipping R1 500+", "Salon Services", "Vietnamese Hair · #1 Bestseller", "Brazilian Hair", "Remy Hair", "100% Human Hair"].map((w, i) => (
                <span key={i} className="flex items-center gap-7">
                  <span className={i % 3 === 0 ? "text-[#D4AF37]" : i % 3 === 1 ? "text-[#E10600]" : ""}>{w}</span>
                  <span className="h-1.5 w-1.5 rotate-45 bg-[#D4AF37]" />
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ORIGINS */}
      <section id="origins" className="bg-[#FAF8F4] streaks-soft">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-20 md:py-24">
          <div className="reveal text-center max-w-2xl mx-auto">
            <p className="text-[11px] tracking-[0.35em] uppercase font-bold text-[#E10600]">Shop by origin</p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold mt-3">Three origins. <em className="gold-text not-italic">One standard.</em></h2>
            <p className="text-black/55 mt-4">Every NMK bundle is 100% human hair, double-drawn and hand-checked. The difference is in the texture — find yours.</p>
          </div>
          <div className="mt-12 grid md:grid-cols-3 gap-5">
            {ORIGINS.map((o, i) => (
              <article key={o.name} className={`reveal group bg-white rounded-[1.75rem] overflow-hidden border ${o.name === "Vietnamese" ? "border-[#D4AF37]" : "border-black/10"} hover:shadow-2xl hover:shadow-black/10 hover:-translate-y-1.5 transition-all duration-500`} style={{ transitionDelay: `${i * 70}ms` }}>
                <div className="img-zoom relative h-72 overflow-hidden">
                  <img src={o.img} alt={`Black woman showing ${o.name} hair`} loading="lazy" decoding="async" className="w-full h-full object-cover object-top" />
                  <span className={`absolute top-4 left-4 text-[11px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full ${o.name === "Vietnamese" ? "bg-[#0A0A0A] text-[#F1D27A]" : "bg-white/95 text-black"}`}>{o.tag}</span>
                  <span className="absolute bottom-4 right-4 bg-[#0A0A0A] text-[#F1D27A] text-xs font-bold px-3 py-1.5 rounded-full">from {money(o.from)}</span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-3xl font-semibold">{o.name} <span className="text-[#E10600]">Hair</span></h3>
                  <p className="text-sm text-black/55 leading-relaxed mt-2">{o.desc}</p>
                  <ul className="mt-4 space-y-2">
                    {o.feats.map(f => <li key={f} className="flex items-center gap-2 text-sm font-medium"><Check className="h-4 w-4 text-[#E10600]" /> {f}</li>)}
                  </ul>
                  <a href="#shop" onClick={() => setQuery("")} className="mt-5 inline-flex items-center gap-2 font-bold text-sm border-b-2 border-[#D4AF37] pb-1 hover:text-[#E10600] hover:border-[#E10600] transition">Shop {o.name} <ArrowRight className="h-4 w-4" /></a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SHOP */}
      <section id="shop" className="bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-20 md:py-24">
          <div className="reveal flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <p className="text-[11px] tracking-[0.35em] uppercase font-bold text-[#E10600]">Real per-length pricing</p>
              <h2 className="font-display text-4xl md:text-5xl font-semibold mt-3">Shop the <em className="gold-text not-italic">price list</em></h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-black/40" />
                <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search wigs, bobs, closures…" className="w-full sm:w-72 rounded-full border border-black/15 pl-11 pr-4 py-3 text-sm outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30" />
              </div>
              <div className="flex flex-wrap gap-2">
                {(["All", "Wig", "Bob", "Closure"] as const).map(f => (
                  <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2.5 rounded-full text-xs font-bold tracking-wide border transition ${filter === f ? "bg-[#0A0A0A] text-white border-[#0A0A0A]" : "border-black/15 text-black/60 hover:border-black hover:text-black"}`}>{f}{f === "All" ? " hair" : "s"}</button>
                ))}
              </div>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-black/50"><p className="font-display text-3xl">No matches</p><p className="text-sm mt-2">Try another style or search term.</p></div>
          ) : (
            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((f, i) => {
                const selected = picks[f.id].length;
                const selectedCurls = picks[f.id].curls;
                return (
                <article key={f.id} className={`reveal group bg-white rounded-[1.5rem] overflow-hidden border ${f.id === FEATURED.id ? "border-[#D4AF37]" : "border-black/10"} hover:shadow-2xl hover:shadow-black/10 hover:-translate-y-1 transition-all duration-500`} style={{ transitionDelay: `${(i % 4) * 50}ms` }}>
                  <div className="img-zoom relative h-64 overflow-hidden">
                    <img src={f.img} alt="Model with long, glossy hair" loading="lazy" decoding="async" className="w-full h-full object-cover object-top" />
                    <span className={`absolute top-3 left-3 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1.5 rounded-full ${f.badge === "Bestseller" ? "bg-[#D4AF37] text-black" : f.badge === "Top rated" ? "bg-[#E10600] text-white" : f.badge === "Popular" ? "bg-[#0A0A0A] text-[#F1D27A]" : "bg-white text-black"}`}>{f.badge ?? f.kind}</span>
                    <button onClick={() => toggleWish(i)} className="absolute top-3 right-3 h-9 w-9 grid place-items-center rounded-full bg-white/90 shadow hover:scale-110 transition" aria-label="wishlist">
                      <Heart className={`h-4 w-4 ${wish.includes(i) ? "fill-[#E10600] text-[#E10600]" : "text-black"}`} />
                    </button>
                    <span className="absolute bottom-3 left-3 bg-black/70 backdrop-blur text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">{f.kind} · from {money(f.rows[0].price)}</span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between">
                      <span className="flex gap-0.5">{Array.from({ length: 5 }).map((_, s) => <Star key={s} className={`h-3.5 w-3.5 ${s < f.rating ? "fill-[#D4AF37] text-[#D4AF37]" : "text-black/20"}`} />)}</span>
                      <span className="text-xs text-black/45">{f.reviews} reviews</span>
                    </div>
                    <h3 className="font-display text-[22px] font-semibold leading-tight mt-2">{f.name}</h3>
                    <p className="text-[13px] text-black/50 mt-1">{f.desc}</p>

                    <p className="text-[10px] tracking-[0.25em] uppercase font-bold text-black/45 mt-4">Choose your length</p>
                    <div className="mt-2 grid grid-cols-3 gap-1.5">
                      {f.rows.map(r => (
                        <button key={r.length} onClick={() => chooseLength(f.id, r.length)} aria-pressed={selected === r.length} className={`rounded-xl border px-2 py-2 text-center transition ${selected === r.length ? "border-[#D4AF37] bg-[#FAF8F4]" : "border-black/10 hover:border-black/40"}`}>
                          <span className="block text-sm font-bold leading-none">{r.length}"</span>
                          <span className={`block text-[11px] mt-1 leading-none ${selected === r.length ? "text-[#E10600] font-bold" : "text-black/50"}`}>{money(r.price)}</span>
                        </button>
                      ))}
                    </div>

                    {f.curlsUpcharge && (
                      <div className="mt-3 flex items-center justify-between rounded-xl border border-black/10 px-3 py-2.5">
                        <span className="text-[13px] font-semibold">HD lace curls</span>
                        <button onClick={() => toggleCurls(f.id)} aria-pressed={selectedCurls} className={`px-3 py-1.5 rounded-full text-xs font-bold transition ${selectedCurls ? "bg-[#E10600] text-white" : "bg-black/5 hover:bg-black/10"}`}>
                          {selectedCurls ? `Added +${money(f.curlsUpcharge)}` : `Add +${money(f.curlsUpcharge)}`}
                        </button>
                      </div>
                    )}

                    <div className="mt-4 flex items-center justify-between gap-2">
                      <span data-fab-guard className="font-display text-2xl font-bold">{money(priceFor(f, selected, selectedCurls))}</span>
                      <div className="flex gap-2">
                        <button onClick={() => openQuick(f)} className="px-4 py-3 rounded-full border border-black/15 text-sm font-semibold hover:border-[#D4AF37] transition">View</button>
                        <button onClick={() => addFamily(f, selected, selectedCurls)} className="bg-[#0A0A0A] text-white text-sm font-semibold py-3 px-4 rounded-full hover:bg-[#E10600] transition flex items-center justify-center gap-2">
                          <ShoppingBag className="h-4 w-4" /> Add
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* FULL PRICE LIST */}
      <section id="pricelist" className="bg-[#0A0A0A] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-40" style={{ background: "linear-gradient(115deg, transparent 60%, rgba(225,6,0,0.25) 60%, rgba(225,6,0,0.25) 61%, transparent 61%), linear-gradient(115deg, transparent 72%, rgba(212,175,55,0.3) 72%, rgba(212,175,55,0.3) 73.5%, transparent 73.5%)" }} />
        <div className="relative max-w-7xl mx-auto px-5 md:px-8 py-20 md:py-24">
          <div className="reveal text-center max-w-2xl mx-auto">
            <p className="text-[11px] tracking-[0.35em] uppercase font-bold text-[#D4AF37]">Full price list</p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold mt-3">Every style, every <em className="gold-text not-italic">length</em></h2>
            <p className="text-white/60 mt-4">Tap a length to select it, then add it to your bag. All prices in ZAR. HD lace curls are +R500 on 13×4 HD DD straight wigs.</p>
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-5">
            {FAMILIES.map(f => (
              <div key={f.id} className={`reveal rounded-[1.75rem] p-6 md:p-7 border ${f.id === FEATURED.id ? "border-[#D4AF37] bg-white/[0.06]" : "border-white/15 bg-white/[0.03]"}`}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-2xl font-semibold leading-tight">{f.name}</h3>
                    <p className="text-[11px] tracking-[0.25em] uppercase text-white/45 mt-1">{f.kind}</p>
                  </div>
                  {f.badge && <span className={`shrink-0 text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full ${f.badge === "Bestseller" ? "bg-[#D4AF37] text-black" : "bg-[#E10600] text-white"}`}>{f.badge}</span>}
                </div>
                <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {f.rows.map(r => {
                    const active = picks[f.id].length === r.length;
                    return (
                      <button
                        key={r.length}
                        onClick={() => chooseLength(f.id, r.length)}
                        aria-pressed={active}
                        className={`flex items-center justify-between rounded-xl border px-3 py-2.5 transition ${active ? "border-[#D4AF37] bg-white/10" : "border-white/15 hover:border-white/50"}`}
                      >
                        <span className="text-sm font-bold">{r.length}"</span>
                        <span className={`text-sm font-semibold ${active ? "text-[#F1D27A]" : "text-white/70"}`}>{money(r.price)}</span>
                      </button>
                    );
                  })}
                </div>
                {f.curlsUpcharge && (
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <p className="text-xs text-white/55">HD lace curls — +{money(f.curlsUpcharge)}</p>
                    <button onClick={() => toggleCurls(f.id)} aria-pressed={picks[f.id].curls} className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition ${picks[f.id].curls ? "bg-[#E10600] text-white" : "bg-white/10 text-white hover:bg-white/20"}`}>
                      {picks[f.id].curls ? "Curls added" : "Add curls"}
                    </button>
                  </div>
                )}
                <div className="mt-4 pt-4 border-t border-white/15 flex items-end justify-between gap-3">
                  <div>
                    <span className="block text-[10px] tracking-[0.25em] uppercase text-white/45">Selected · {picks[f.id].length}"{picks[f.id].curls ? " · curls" : ""}</span>
                    <span data-fab-guard className="font-display text-2xl font-bold gold-text">{money(priceFor(f, picks[f.id].length, picks[f.id].curls))}</span>
                  </div>
                  <button onClick={() => addFamily(f, picks[f.id].length, picks[f.id].curls)} className="shrink-0 bg-white text-black text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#D4AF37] transition flex items-center gap-2">
                    <ShoppingBag className="h-4 w-4" /> Add to bag
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="reveal mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm font-semibold text-white/60">
            <span className="flex items-center gap-2"><Truck className="h-4 w-4 text-[#D4AF37]" /> Free shipping over R1 500</span>
            <span className="flex items-center gap-2"><RefreshCcw className="h-4 w-4 text-[#D4AF37]" /> 30-day exchange</span>
            <span className="flex items-center gap-2"><Scissors className="h-4 w-4 text-[#D4AF37]" /> Install available in-salon</span>
          </div>
        </div>
      </section>

      {/* WHY NMK */}
      <section className="bg-white streaks-soft">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-20">
          <div className="reveal text-center max-w-xl mx-auto">
            <p className="text-[11px] tracking-[0.35em] uppercase font-bold text-[#E10600]">The NMK promise</p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold mt-3">Quality you can <em className="gold-text not-italic">feel</em></h2>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: BadgeCheck, t: "100% Human Hair", d: "No synthetics, no blends. Every bundle passes burn + strand tests before it ships." },
              { icon: Wind, t: "Zero Shedding", d: "Double-wefted, reinforced tracks. Wear it, wash it, style it — it stays put." },
              { icon: Sparkles, t: "Tangle-Free Remy", d: "Cuticle-aligned strands glide past each other. Brush in seconds, not minutes." },
              { icon: RefreshCcw, t: "30-Day Exchange", d: "Not in love? Exchange within 30 days — no questions, no restocking fees." },
            ].map((f, i) => (
              <div key={f.t} className="reveal bg-[#FAF8F4] border border-black/10 rounded-3xl p-7 hover:border-[#D4AF37] hover:shadow-xl transition-all" style={{ transitionDelay: `${i * 60}ms` }}>
                <span className="h-12 w-12 grid place-items-center rounded-2xl bg-[#0A0A0A] text-[#F1D27A]"><f.icon className="h-6 w-6" /></span>
                <h3 className="font-display text-2xl font-semibold mt-5">{f.t}</h3>
                <p className="text-sm text-black/55 leading-relaxed mt-2">{f.d}</p>
                <span className="block mt-5 h-[3px] w-10 bg-gradient-to-r from-[#E10600] to-[#D4AF37] rounded-full" />
              </div>
            ))}
          </div>
          <div className="reveal mt-8 flex flex-wrap justify-center gap-x-10 gap-y-3 text-sm font-semibold text-black/60">
            <span className="flex items-center gap-2"><Truck className="h-4 w-4 text-[#E10600]" /> Ships in 48h, tracked</span>
            <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[#E10600]" /> Secure checkout</span>
            <span className="flex items-center gap-2"><Crown className="h-4 w-4 text-[#D4AF37]" /> VIP loyalty rewards</span>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="bg-[#FAF8F4] border-y border-black/10">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-20 md:py-24">
          <div className="reveal flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-[11px] tracking-[0.35em] uppercase font-bold text-[#E10600]">NMK Studio · Gqeberha — Services</p>
              <h2 className="font-display text-4xl md:text-5xl font-semibold mt-3">Salon services & <em className="gold-text not-italic">maintenance</em></h2>
            </div>
            <p className="text-black/55 max-w-sm text-sm leading-relaxed">Buy the hair, book the chair. Every install includes a consultation, styling and a 7-day touch-up guarantee.</p>
          </div>

          <div className="mt-10 grid lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3 grid sm:grid-cols-2 gap-4">
              {SERVICES.map((s, i) => (
                <div key={s.id} className="reveal bg-white border border-black/10 rounded-3xl p-6 hover:shadow-xl hover:border-[#D4AF37] transition-all" style={{ transitionDelay: `${(i % 4) * 50}ms` }}>
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-[22px] font-semibold leading-tight">{s.name}</h3>
                    {s.popular && <span className="shrink-0 bg-[#E10600] text-white text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full">Popular</span>}
                  </div>
                  <p className="text-sm text-black/55 leading-relaxed mt-2">{s.desc}</p>
                  <div className="flex items-center justify-between mt-5">
                    <div><span className="font-display text-2xl font-bold">{money(s.price)}</span><span className="text-xs text-black/45 ml-2"><Clock className="h-3.5 w-3.5 inline" /> {s.time}</span></div>
                    <button onClick={() => bookService(s.name)} className="bg-[#0A0A0A] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#E10600] transition">Book</button>
                  </div>
                </div>
              ))}
            </div>

            {/* booking form */}
            <div id="booking" className="lg:col-span-2 reveal">
              <div className="bg-[#0A0A0A] text-white rounded-[2rem] p-7 md:p-8 shadow-2xl sticky top-24">
                <div className="flex items-center gap-3">
                  <span className="h-11 w-11 grid place-items-center rounded-full bg-[#E10600]"><Calendar className="h-5 w-5" /></span>
                  <div><h3 className="font-display text-2xl font-semibold">Book appointment</h3><p className="text-xs text-white/50">NMK Studio · Gqeberha</p></div>
                </div>
                {booked ? (
                  <div className="mt-8 text-center py-8">
                    <span className="mx-auto h-16 w-16 grid place-items-center rounded-full bg-[#D4AF37] text-black"><Check className="h-8 w-8" /></span>
                    <p className="font-display text-3xl mt-5">You're booked!</p>
                    <p className="text-white/60 text-sm mt-2">Reference <span className="text-[#F1D27A] font-bold">{booked}</span><br />{bk.service} · {bk.date} · {bk.time}</p>
                    <p className="text-white/45 text-xs mt-3">A confirmation SMS is on its way to {bk.phone}. Please arrive 10 minutes early.</p>
                    <button onClick={() => { setBooked(null); setBk({ name: "", phone: "", service: "Sew-In Install", date: "", time: "10:00 AM", notes: "" }); }} className="mt-6 border border-white/25 px-6 py-3 rounded-full text-sm font-semibold hover:border-[#D4AF37] hover:text-[#D4AF37] transition">Book another</button>
                  </div>
                ) : (
                  <div className="mt-6 space-y-3.5">
                    <input value={bk.name} onChange={e => setBk({ ...bk, name: e.target.value })} placeholder="Your name" className="w-full rounded-xl bg-white/10 border border-white/15 px-4 py-3.5 text-sm placeholder:text-white/40 outline-none focus:border-[#D4AF37]" />
                    <input value={bk.phone} onChange={e => setBk({ ...bk, phone: e.target.value })} placeholder="Phone number (e.g. 082 123 4567)" className="w-full rounded-xl bg-white/10 border border-white/15 px-4 py-3.5 text-sm placeholder:text-white/40 outline-none focus:border-[#D4AF37]" />
                    <div className="relative">
                      <select value={bk.service} onChange={e => setBk({ ...bk, service: e.target.value })} className="w-full appearance-none rounded-xl bg-white/10 border border-white/15 px-4 py-3.5 text-sm outline-none focus:border-[#D4AF37] [&_option]:text-black [&_optgroup]:text-black [&_optgroup]:font-bold">
                        <optgroup label="Salon services">
                          {SERVICES.map(s => <option key={s.id} value={s.name}>{s.name} — {money(s.price)}</option>)}
                        </optgroup>
                        <optgroup label="Wig care & studio">
                          {CARE_SERVICES.map(s => <option key={s.id} value={s.name}>{s.name} — {s.from ? "from " : ""}{money(s.price)}</option>)}
                        </optgroup>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50 pointer-events-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <input type="date" value={bk.date} onChange={e => setBk({ ...bk, date: e.target.value })} className="rounded-xl bg-white/10 border border-white/15 px-4 py-3.5 text-sm outline-none focus:border-[#D4AF37] [color-scheme:dark]" />
                      <div className="relative">
                        <select value={bk.time} onChange={e => setBk({ ...bk, time: e.target.value })} className="w-full appearance-none rounded-xl bg-white/10 border border-white/15 px-4 py-3.5 text-sm outline-none focus:border-[#D4AF37] [&>option]:text-black">
                          {["9:00 AM", "10:00 AM", "11:30 AM", "1:00 PM", "2:30 PM", "4:00 PM", "5:30 PM"].map(t => <option key={t}>{t}</option>)}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50 pointer-events-none" />
                      </div>
                    </div>
                    <textarea value={bk.notes} onChange={e => setBk({ ...bk, notes: e.target.value })} placeholder="Notes (hair type, length, inspo link…)" rows={3} className="w-full rounded-xl bg-white/10 border border-white/15 px-4 py-3.5 text-sm placeholder:text-white/40 outline-none focus:border-[#D4AF37] resize-none" />
                    <button onClick={submitBooking} className="w-full bg-[#E10600] hover:bg-[#B80000] font-semibold py-4 rounded-full transition flex items-center justify-center gap-2">
                      Confirm Booking <ArrowRight className="h-4 w-4" />
                    </button>
                    <p className="text-center text-[11px] text-white/40">No deposit needed · Free reschedule up to 24h before</p>
                    <div className="pt-2 border-t border-white/10 text-center">
                      <a
                        href="https://wa.me/27671550084"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 text-xs font-semibold text-[#25D366] hover:text-[#4AE583] transition"
                      >
                        <WhatsAppIcon className="h-4 w-4 shrink-0" />
                        WhatsApp Studio: +27 67 155 0084
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="reveal mt-8 grid md:grid-cols-3 gap-4">
            <div className="img-zoom rounded-3xl overflow-hidden h-56 relative">
              <img src={IMAGES.salon} alt="Black stylist working on a client's long, wavy hair" loading="lazy" decoding="async" className="w-full h-full object-cover" />
              <span className="absolute bottom-4 left-4 bg-white text-black text-xs font-bold px-3 py-1.5 rounded-full">Installs & styling</span>
            </div>
            <div className="img-zoom rounded-3xl overflow-hidden h-56 relative">
              <img src={IMAGES.braids} alt="Black woman wearing long knotless braids" loading="lazy" decoding="async" className="w-full h-full object-cover object-top" />
              <span className="absolute bottom-4 left-4 bg-white text-black text-xs font-bold px-3 py-1.5 rounded-full">Braids & protective styles</span>
            </div>
            <div className="img-zoom rounded-3xl overflow-hidden h-56 relative">
              <img src={IMAGES.glamLace} alt="Black woman wearing a full, glamorous lace-front hairstyle" loading="lazy" decoding="async" className="w-full h-full object-cover object-top" />
              <span className="absolute bottom-4 left-4 bg-[#0A0A0A] text-[#F1D27A] text-xs font-bold px-3 py-1.5 rounded-full">Wig bar — try before you buy</span>
            </div>
          </div>
        </div>
      </section>

      {/* CARE / MAINTENANCE */}
      <section id="care" className="bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-20 md:py-24">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28 reveal">
                <p className="text-[11px] tracking-[0.35em] uppercase font-bold text-[#E10600]">Maintenance & care</p>
                <h2 className="font-display text-4xl md:text-5xl font-semibold mt-3 leading-[1.05]">Keep it <em className="gold-text not-italic">flawless</em></h2>
                <p className="text-black/55 text-sm leading-relaxed mt-4 max-w-sm">
                  Eight studio services that keep every unit looking new — from a quick treatment to a full installation masterclass. Bring your own hair or buy it from us.
                </p>

                <div className="img-zoom relative mt-7 rounded-[1.75rem] overflow-hidden border border-black/10 shadow-xl shadow-black/10 hidden sm:block">
                  <img src={IMAGES.care} alt="Black woman caring for her long wavy hair in the studio" loading="lazy" decoding="async" className="w-full h-72 object-cover object-top" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                    <div className="text-white">
                      <p className="text-[10px] tracking-[0.3em] uppercase text-[#F1D27A] font-bold">Studio care menu</p>
                      <p className="font-display text-xl mt-1">Gqeberha · by appointment</p>
                    </div>
                    <span className="shrink-0 h-9 w-9 grid place-items-center rounded-full bg-[#D4AF37] text-black"><Crown className="h-4 w-4" /></span>
                  </div>
                </div>

                <a
                  href="https://wa.me/27671550084"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#128C4A] hover:text-[#0d6b38] transition"
                >
                  <WhatsAppIcon className="h-4 w-4 shrink-0" />
                  Not sure what you need? WhatsApp us
                </a>
              </div>
            </div>

            <div className="lg:col-span-8 grid sm:grid-cols-2 gap-4">
              {CARE_SERVICES.map((s, i) => {
                const feature = s.tag === "Training";
                return (
                  <article
                    key={s.id}
                    className={`reveal group relative overflow-hidden rounded-3xl p-6 border transition-all duration-500 hover:-translate-y-1 hover:shadow-xl ${feature ? "bg-[#0A0A0A] text-white border-[#D4AF37] shadow-lg shadow-black/20" : "bg-[#FAF8F4] border-black/10 hover:border-[#D4AF37]"}`}
                    style={{ transitionDelay: `${(i % 2) * 60}ms` }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className={`h-11 w-11 shrink-0 grid place-items-center rounded-2xl transition-colors ${feature ? "bg-[#D4AF37] text-black" : "bg-[#0A0A0A] text-[#F1D27A] group-hover:bg-[#E10600] group-hover:text-white"}`}>
                        <s.icon className="h-5 w-5" />
                      </span>
                      <div className="flex items-center gap-2">
                        {s.tag && (
                          <span className={`text-[9px] font-bold tracking-[0.18em] uppercase px-2.5 py-1 rounded-full ${feature ? "bg-[#E10600] text-white" : "bg-white text-black border border-black/10"}`}>{s.tag}</span>
                        )}
                        <span className={`font-display text-lg ${feature ? "text-white/25" : "text-black/15"}`}>{String(i + 1).padStart(2, "0")}</span>
                      </div>
                    </div>

                    <h3 className="font-display text-[22px] font-semibold leading-tight mt-4">{s.name}</h3>
                    <p className={`text-[13px] leading-relaxed mt-1.5 ${feature ? "text-white/60" : "text-black/55"}`}>{s.desc}</p>

                    <div className={`mt-5 pt-4 flex items-end justify-between gap-3 border-t ${feature ? "border-white/15" : "border-black/10"}`}>
                      <div>
                        <span className={`block text-[10px] tracking-[0.25em] uppercase ${feature ? "text-white/45" : "text-black/40"}`}>{s.from ? "From" : "Flat rate"}</span>
                        <span data-fab-guard className={`font-display text-2xl font-bold ${feature ? "gold-text" : ""}`}>{money(s.price)}</span>
                      </div>
                      <button
                        onClick={() => bookService(s.name)}
                        className={`text-sm font-semibold px-5 py-2.5 rounded-full transition ${feature ? "bg-[#D4AF37] text-black hover:bg-[#F1D27A]" : "bg-[#0A0A0A] text-white hover:bg-[#E10600]"}`}
                      >
                        Book
                      </button>
                    </div>
                    <span className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-gradient-to-r from-[#E10600] to-[#D4AF37]" />
                  </article>
                );
              })}
            </div>
          </div>

          <div className="reveal mt-10 bg-[#FAF8F4] border border-black/10 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
            <span className="h-14 w-14 shrink-0 grid place-items-center rounded-2xl bg-[#E10600] text-white"><Droplets className="h-7 w-7" /></span>
            <div className="flex-1 text-center md:text-left">
              <h3 className="font-display text-2xl font-semibold">The 5-minute weekly routine</h3>
              <p className="text-sm text-black/55 mt-1">Co-wash on day 1 · Deep condition day 3 · Detangle and seal day 5 · Satin bonnet every night. Follow this and NMK hair lasts 12+ months.</p>
            </div>
            <button onClick={() => bookService("Wig Treatment")} className="shrink-0 bg-[#0A0A0A] text-white px-6 py-3.5 rounded-full text-sm font-semibold hover:bg-[#E10600] transition">Book a wig treatment</button>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="bg-[#0A0A0A] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{ background: "linear-gradient(115deg, transparent 70%, rgba(212,175,55,0.35) 70%, rgba(212,175,55,0.35) 71%, transparent 71%)" }} />
        <div className="relative max-w-5xl mx-auto px-5 py-20 text-center">
          <p className="text-[11px] tracking-[0.35em] uppercase font-bold text-[#D4AF37]">Verified reviews</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold mt-3">12,400+ five-star <em className="gold-text not-italic">heads</em></h2>
          <div className="mt-12 bg-white/[0.06] border border-white/10 rounded-[2rem] p-8 md:p-12 backdrop-blur">
            <div className="flex justify-center gap-1">{Array.from({ length: REVIEWS[reviewIdx].stars }).map((_, i) => <Star key={i} className="h-5 w-5 fill-[#D4AF37] text-[#D4AF37]" />)}</div>
            <blockquote className="font-display text-2xl md:text-[28px] leading-snug font-light mt-6">“{REVIEWS[reviewIdx].text}”</blockquote>
            <div className="mt-8 flex items-center justify-center gap-4">
              <span aria-hidden="true" className="h-14 w-14 shrink-0 rounded-full border-2 border-[#D4AF37] bg-white/10 grid place-items-center font-display text-xl text-[#F1D27A]">{REVIEWS[reviewIdx].name.charAt(0)}</span>
              <div className="text-left">
                <p className="font-bold">{REVIEWS[reviewIdx].name} <span className="text-white/40 font-normal">· {REVIEWS[reviewIdx].loc}</span></p>
                <p className="text-sm text-[#F1D27A] flex items-center gap-1.5"><BadgeCheck className="h-4 w-4" /> Verified buyer — {REVIEWS[reviewIdx].hair}</p>
              </div>
            </div>
          </div>
          <div className="mt-8 flex items-center justify-center gap-3">
            <button onClick={() => setReviewIdx((reviewIdx - 1 + REVIEWS.length) % REVIEWS.length)} className="h-11 w-11 grid place-items-center rounded-full border border-white/25 hover:border-[#D4AF37] hover:text-[#D4AF37] transition"><ChevronLeft className="h-5 w-5" /></button>
            {REVIEWS.map((_, i) => <button key={i} onClick={() => setReviewIdx(i)} className={`h-2 rounded-full transition-all ${i === reviewIdx ? "w-9 bg-[#E10600]" : "w-2 bg-white/25"}`} aria-label={`review ${i + 1}`} />)}
            <button onClick={() => setReviewIdx((reviewIdx + 1) % REVIEWS.length)} className="h-11 w-11 grid place-items-center rounded-full border border-white/25 hover:border-[#D4AF37] hover:text-[#D4AF37] transition"><ChevronRight className="h-5 w-5" /></button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white">
        <div className="max-w-3xl mx-auto px-5 py-20">
          <div className="reveal text-center">
            <p className="text-[11px] tracking-[0.35em] uppercase font-bold text-[#E10600]">Good questions</p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold mt-3">Before you <em className="gold-text not-italic">buy</em></h2>
          </div>
          <div className="mt-10 space-y-3">
            {FAQS.map((f, i) => (
              <div key={f.q} className="reveal border border-black/10 rounded-2xl overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? -1 : i)} className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left font-semibold hover:bg-[#FAF8F4] transition">
                  {f.q}
                  <ChevronDown className={`h-5 w-5 shrink-0 transition-transform ${openFaq === i ? "rotate-180 text-[#E10600]" : ""}`} />
                </button>
                {openFaq === i && <p className="px-6 pb-6 text-sm text-black/60 leading-relaxed border-t border-black/5 pt-4">{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="bg-[#FAF8F4] border-t border-black/10 streaks-soft">
        <div className="max-w-4xl mx-auto px-5 py-20 text-center">
          <span className="inline-grid place-items-center h-14 w-14 rounded-full bg-[#0A0A0A] text-[#F1D27A]"><Crown className="h-7 w-7" /></span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold mt-5">Join the <em className="gold-text not-italic">NMK list</em></h2>
          <p className="text-black/55 mt-3 max-w-md mx-auto">Get 10% off your first order, early access to limited drops and salon offers. One email a week — no spam, ever.</p>
          {subscribed ? (
            <div className="mt-8 inline-flex items-center gap-3 bg-[#0A0A0A] text-white px-7 py-4 rounded-full font-semibold"><Check className="h-5 w-5 text-[#D4AF37]" /> You're in! Check your inbox for 10% off.</div>
          ) : (
            <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && subscribe()} type="email" placeholder="your@email.com" className="flex-1 rounded-full border border-black/15 px-6 py-4 text-sm outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30 bg-white" />
              <button onClick={subscribe} className="bg-[#E10600] hover:bg-[#B80000] text-white font-semibold px-8 py-4 rounded-full inline-flex items-center justify-center gap-2 transition">Get 10% Off <Send className="h-4 w-4" /></button>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0A0A0A] text-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-16 grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <p className="font-display font-bold text-3xl">NMK<span className="gold-text">Hair</span></p>
            <p className="text-white/50 text-sm leading-relaxed mt-4 max-w-sm">Premium Brazilian, Remy and Vietnamese hair with full salon services. Ethically sourced, hand-checked, and guaranteed for 30 days.</p>
            <div className="flex gap-2 mt-6">
              <span className="h-8 w-8 rounded-full bg-white border border-white/20" title="White" />
              <span className="h-8 w-8 rounded-full bg-black border border-white/30" title="Black" />
              <span className="h-8 w-8 rounded-full bg-[#E10600]" title="Red" />
              <span className="h-8 w-8 rounded-full bg-gradient-to-br from-[#FCF6BA] to-[#AA771C]" title="Gold" />
            </div>
          </div>
          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase text-[#D4AF37] font-bold">Shop</p>
            <ul className="mt-4 space-y-2.5 text-sm text-white/60">
              {(["Wig", "Bob", "Closure"] as const).map(kind => (
                <li key={kind}>
                  <a href="#shop" onClick={() => { setQuery(""); setFilter(kind); }} className="hover:text-[#D4AF37] transition">{kind}s</a>
                </li>
              ))}
              <li><a href="#pricelist" className="hover:text-[#D4AF37] transition">Full price list</a></li>
              <li><a href="#care" className="hover:text-[#D4AF37] transition">Care & Maintenance</a></li>
            </ul>
          </div>
          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase text-[#D4AF37] font-bold">Studio</p>
            <ul className="mt-4 space-y-2.5 text-sm text-white/60">
              <li className="flex gap-2"><MapPin className="h-4 w-4 text-[#E10600] shrink-0" /> Gqeberha, Eastern Cape</li>
              <li>
                <a
                  href="https://wa.me/27671550084"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-semibold text-[#25D366] hover:text-[#4AE583] transition"
                >
                  <WhatsAppIcon className="h-4 w-4 shrink-0" />
                  <span>+27 67 155 0084</span>
                  <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#25D366]/15 border border-[#25D366]/40">WhatsApp</span>
                </a>
              </li>
              <li className="flex gap-2"><Clock className="h-4 w-4 text-[#E10600] shrink-0" /> Tue–Sat · 9am–7pm</li>
              <li><a href="#services" className="hover:text-[#D4AF37] transition">Book an appointment →</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 py-6 text-center text-xs text-white/35 tracking-widest uppercase px-4">
          © 2026 NMKHair — Gqeberha, South Africa · Brazilian · Remy · Vietnamese · Prices in ZAR (R)
        </div>
      </footer>

      {/* QUICK VIEW MODAL */}
      {quick && (
        <div className="fixed inset-0 z-[70] grid place-items-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setQuick(null)} />
          <div className="relative bg-white rounded-[2rem] w-full max-w-3xl overflow-hidden shadow-2xl grid md:grid-cols-2 max-h-[90vh]">
            <div className="relative h-64 md:h-auto">
              <img src={quick.f.img} alt="Model with long, glossy hair" className="absolute inset-0 w-full h-full object-cover object-top" />
              <span className="absolute top-4 left-4 bg-[#E10600] text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full">{quick.f.badge ?? quick.f.kind}</span>
            </div>
            <div className="p-7 overflow-y-auto">
              <button onClick={() => setQuick(null)} className="absolute top-4 right-4 h-10 w-10 grid place-items-center rounded-full bg-white shadow hover:rotate-90 transition"><X className="h-5 w-5" /></button>
              <p className="text-[11px] tracking-[0.3em] uppercase font-bold text-[#E10600]">{quick.f.kind} · 100% human hair</p>
              <h3 className="font-display text-3xl font-semibold mt-2 leading-tight">{quick.f.name}</h3>
              <div className="flex items-center gap-2 mt-2">
                <span className="flex">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className={`h-4 w-4 ${i < quick.f.rating ? "fill-[#D4AF37] text-[#D4AF37]" : "text-black/20"}`} />)}</span>
                <span className="text-sm text-black/50">{quick.f.reviews} verified reviews</span>
              </div>
              <p className="text-sm text-black/55 leading-relaxed mt-3">{quick.f.desc}. Ships in 48 hours with a free satin pouch.</p>

              <p className="text-xs tracking-[0.25em] uppercase font-bold text-black/45 mt-6">Length — <span className="text-[#E10600]">{quick.length}"</span></p>
              <div className="mt-2 grid grid-cols-3 gap-1.5">
                {quick.f.rows.map(r => (
                  <button key={r.length} onClick={() => setQuick(q => q && { ...q, length: r.length })} className={`rounded-xl border px-2 py-2 text-center transition ${quick.length === r.length ? "border-[#D4AF37] bg-[#FAF8F4]" : "border-black/10 hover:border-black/40"}`}>
                    <span className="block text-sm font-bold leading-none">{r.length}"</span>
                    <span className={`block text-[11px] mt-1 leading-none ${quick.length === r.length ? "text-[#E10600] font-bold" : "text-black/50"}`}>{money(r.price)}</span>
                  </button>
                ))}
              </div>

              {quick.f.curlsUpcharge && (
                <div className="mt-3 flex items-center justify-between rounded-xl border border-black/10 px-3 py-2.5">
                  <span className="text-[13px] font-semibold">HD lace curls</span>
                  <button onClick={() => setQuick(q => q && { ...q, curls: !q.curls })} className={`px-3 py-1.5 rounded-full text-xs font-bold transition ${quick.curls ? "bg-[#E10600] text-white" : "bg-black/5 hover:bg-black/10"}`}>
                    {quick.curls ? `Added +${money(quick.f.curlsUpcharge)}` : `Add +${money(quick.f.curlsUpcharge)}`}
                  </button>
                </div>
              )}

              <div className="flex items-center gap-4 mt-6">
                <div className="flex items-center border border-black/15 rounded-full">
                  <button onClick={() => setQuick(q => q && { ...q, qty: Math.max(1, q.qty - 1) })} className="px-4 py-3"><Minus className="h-4 w-4" /></button>
                  <span className="w-8 text-center font-bold">{quick.qty}</span>
                  <button onClick={() => setQuick(q => q && { ...q, qty: Math.min(9, q.qty + 1) })} className="px-4 py-3"><Plus className="h-4 w-4" /></button>
                </div>
                <p className="font-display text-3xl font-bold">{money(priceFor(quick.f, quick.length, quick.curls) * quick.qty)}</p>
              </div>
              <button onClick={() => { addFamily(quick.f, quick.length, quick.curls, quick.qty); setQuick(null); setCartOpen(true); }} className="mt-6 w-full bg-[#0A0A0A] text-white font-semibold py-4 rounded-full hover:bg-[#E10600] transition flex items-center justify-center gap-2">
                <ShoppingBag className="h-5 w-5" /> Add to Bag
              </button>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[11px] font-semibold text-black/55">
                <span className="border border-black/10 rounded-xl py-2.5">Free shipping R1 500+</span>
                <span className="border border-black/10 rounded-xl py-2.5">30-day exchange</span>
                <span className="border border-black/10 rounded-xl py-2.5">Install available</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CART DRAWER */}
      {cartOpen && (
        <div className="fixed inset-0 z-[70]">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setCartOpen(false)} />
          <aside className="absolute right-0 top-0 h-full w-full max-w-md bg-white flex flex-col shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-black/10">
              <h3 className="font-display text-2xl font-semibold">Your Bag <span className="text-[#E10600]">({cartCount})</span></h3>
              <button onClick={() => setCartOpen(false)} className="h-10 w-10 grid place-items-center rounded-full border border-black/15 hover:border-[#E10600] hover:text-[#E10600] transition"><X className="h-5 w-5" /></button>
            </div>
            {checkoutDone ? (
              <div className="flex-1 grid place-items-center p-8 text-center">
                <div>
                  <span className="mx-auto h-16 w-16 grid place-items-center rounded-full bg-[#0A0A0A] text-[#F1D27A]"><Check className="h-8 w-8" /></span>
                  <p className="font-display text-3xl mt-5">Order placed!</p>
                  <p className="text-black/50 text-sm mt-2">Your hair ships within 48 hours in discreet NMK packaging.</p>
                </div>
              </div>
            ) : cart.length === 0 ? (
              <div className="flex-1 grid place-items-center p-8 text-center">
                <div>
                  <ShoppingBag className="h-10 w-10 mx-auto text-black/20" />
                  <p className="font-display text-2xl mt-4">Your bag is empty</p>
                  <p className="text-black/45 text-sm mt-1">Brazilian, Remy or Vietnamese — pick your texture.</p>
                  <button onClick={() => setCartOpen(false)} className="mt-6 bg-[#0A0A0A] text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#E10600] transition">Start shopping</button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {cart.map((c, i) => (
                    <div key={i} className="flex gap-4 border border-black/10 rounded-2xl p-3">
                      <img src={c.img} alt="" className="h-24 w-20 object-cover object-top rounded-xl" />
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#E10600]">{c.meta}</p>
                        <p className="font-display text-lg leading-tight truncate">{c.name}</p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-black/15 rounded-full">
                            <button onClick={() => setCart(prev => prev.map((x, j) => j === i ? { ...x, qty: Math.max(1, x.qty - 1) } : x))} className="px-2.5 py-1.5"><Minus className="h-3.5 w-3.5" /></button>
                            <span className="w-6 text-center text-sm font-bold">{c.qty}</span>
                            <button onClick={() => setCart(prev => prev.map((x, j) => j === i ? { ...x, qty: x.qty + 1 } : x))} className="px-2.5 py-1.5"><Plus className="h-3.5 w-3.5" /></button>
                          </div>
                          <span className="font-display text-lg font-bold">{money(c.price * c.qty)}</span>
                        </div>
                      </div>
                      <button onClick={() => setCart(prev => prev.filter((_, j) => j !== i))} className="self-start text-black/35 hover:text-[#E10600] transition"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  ))}
                </div>
                <div className="p-6 border-t border-black/10 space-y-3 bg-[#FAF8F4]">
                  <div className="flex justify-between text-sm text-black/55"><span>Shipping</span><span className="font-bold text-black">{subtotal >= 1500 ? "Free" : money(99)}</span></div>
                  <div className="flex justify-between font-display text-2xl"><span>Subtotal</span><span className="font-bold">{money(subtotal + (subtotal >= 1500 ? 0 : 99))}</span></div>
                  <button onClick={() => { setCheckoutDone(true); setCart([]); setTimeout(() => { setCheckoutDone(false); setCartOpen(false); }, 3200); }} className="w-full bg-[#E10600] hover:bg-[#B80000] text-white py-4 rounded-full font-semibold transition">Checkout — {money(subtotal + (subtotal >= 1500 ? 0 : 99))}</button>
                  <p className="text-center text-[11px] text-black/40 tracking-widest uppercase">30-day exchange · Secure checkout</p>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}
