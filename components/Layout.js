import Link from "next/link";

export default function Layout({ children, title = "Buket.ae" }) {
  return (
    <>
      <div className="promo-banner">
        <div className="promo-text">
          Grand Opening! Nikmati promo spesial diskon dan hadiah menarik untuk setiap
          pesanan pertama Anda. KODE VOUCHER: OPENING26
        </div>
      </div>
      <header>
        <div className="header-inner">
          <div className="contact-info">
            <span>📞 0822-4121-5992</span>
            <span>✉️ buket.ae@gmail.com</span>
          </div>

          <p className="toplogo">buket.ae</p>

          <div className="header-icons">
            <div className="search-wrapper">
              <button type="button" className="icon-button search-toggle" aria-label="Buka pencarian">
                <i className="bi bi-search"></i>
              </button>
              <input type="text" id="searchInput" className="search-input" placeholder="Cari produk..." aria-label="Cari produk" />
            </div>
            <button type="button" className="icon-button cart-button" aria-label="Keranjang">
              <i className="bi bi-cart"></i>
              <span className="cart-badge">0</span>
            </button>
          </div>

          <button className="hamburger" aria-label="Menu">&#9776;</button>
        </div>

        <nav className="nav-menu">
          <Link href="/">Toko</Link>
          <Link href="/koleksi">Koleksi</Link>
          <Link href="/pemesanan">Pemesanan</Link>
          <Link href="/kontak">Kontak</Link>
        </nav>
      </header>
      {children}
      <footer>
        <p>Bunga Segar, Hati Bahagia, Momen Berkesan! 🌹</p>
        <ul>
          <li>
            <a href="https://wa.me/6282241215992">📞 Hubungi Kami di WhatsApp</a>
          </li>
          <li>
            <Link href="/kontak">✉️ Kirim Pesan</Link>
          </li>
        </ul>
        <p>Copyright &copy; 2026 buket.ae</p>
      </footer>
      <div id="loadingOverlay" className="loading-overlay">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <p>Mencari produk...</p>
        </div>
      </div>
    </>
  );
}
