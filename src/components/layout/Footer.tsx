export default function Footer() {
  return (
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