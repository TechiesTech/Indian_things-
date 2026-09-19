export default function Footer() {
  return (
    <footer className="border-t border-[#f0c66e]/15 bg-gradient-to-b from-[#2a1408] to-[#1a0c04] font-['DM_Sans',sans-serif] text-[#f4e7c9]">
      <div className="mx-auto max-w-7xl px-[7vw] pt-14 pb-8">
        {/* Top: brand + links */}
        <div className="flex flex-col items-start gap-7 border-b border-[#f0c66e]/10 pb-9 sm:flex-row sm:items-center sm:justify-between sm:gap-10">
          <div className="flex items-center gap-[18px]">
            <img
              src="/images/IndianThingsLogo.png"
              alt="Indian Things"
              className="h-14 w-14 rounded-[10px] bg-[#f7d54a] object-contain p-1.5 shadow-[0_0_24px_rgba(247,213,74,0.25)]"
            />
            <div>
              <h3 className="m-0 font-['Cormorant_Garamond',serif] text-[22px] font-semibold tracking-[.18em] text-[#f0c66e]">
                INDIAN THINGS
              </h3>
              <p className="mt-1 text-[10px] uppercase tracking-[.32em] text-[#b8a077]">
                Rooted in Origin.
              </p>
            </div>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-9">
            {[
              { label: "Our Story", href: "#story" },
              { label: "Collection", href: "#collection" },
              { label: "Contact", href: "#contact" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="group relative py-1 text-xs uppercase tracking-[.22em] text-[#e8d9b4] transition-colors duration-250 hover:text-[#f0c66e]"
              >
                {label}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#f0c66e] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>
        </div>

        {/* Middle: tagline strip */}
        <div className="flex items-center justify-center gap-4 py-7 font-['Cormorant_Garamond',serif] text-xl uppercase tracking-[.28em] text-[#d9a642]">
          <span>Pure</span>
          <span className="h-1 w-1 rounded-full bg-[#d9a642] opacity-70" />
          <span>Rooted</span>
          <span className="h-1 w-1 rounded-full bg-[#d9a642] opacity-70" />
          <span>Authentic</span>
        </div>

        {/* Bottom: copyright */}
        <div className="flex flex-col items-start gap-1.5 border-t border-[#f0c66e]/10 pt-6 text-[11px] uppercase tracking-[.14em] text-[#9a8a6a] sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <span>© 2026 Indian Things. All rights reserved.</span>
          <span>Handcrafted in India</span>
        </div>
      </div>
    </footer>
  <footer className="site-footer">
  <div className="footer-inner">

    <div className="footer-brand">
      <video
        src="/images/IndianThingsLogo.mp4"
        className="footer-logo"
        autoPlay
        loop
        muted
        playsInline
      />

      <h3>INDIAN THINGS</h3>
      <p>ROOTED IN ORIGIN.</p>
    </div>

    <div className="footer-links">
      <a href="#story">OUR STORY</a>
      <a href="#collection">COLLECTION</a>
      <a href="#contact">CONTACT</a>
    </div>

    <div className="footer-bottom">
      <span>© 2026 INDIAN THINGS</span>
      <span>PURE. ROOTED. AUTHENTIC.</span>
    </div>

  </div>
</footer>
  );
}