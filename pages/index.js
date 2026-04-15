import Layout from "../components/Layout";
import Link from "next/link";

export default function Home() {
  return (
    <Layout>
      <div className="search-row"></div>
      <section className="hero">
        <img src="/buketae.png" alt="logo buket.ae" className="hero-logo" />
        <p>TOKO BUNGA ONLINE TUBAN-BOJONEGORO</p>
        <h1>
          Expressing Feelings Through <span className="highlight">Beautiful Flower</span>
        </h1>
        <p>Rangkaian bunga cantik dan segar untuk setiap momen spesial Anda</p>
        <Link href="/koleksi" className="btn">
          Lihat Koleksi
        </Link>
      </section>

      <main>
        <section className="about">
          <h2>Tentang Kami</h2>
          <p>
            Kami adalah toko bunga yang menyediakan rangkaian bunga segar
            berkualitas tinggi untuk berbagai acara spesial Anda. Setiap buket
            dirancang dengan penuh cinta dan perhatian terhadap detail. Kami
            menggunakan bunga pilihan terbaik yang segar setiap hari.
          </p>
        </section>

        <section className="features">
          <h2>Mengapa Pilih Kami?</h2>
          <div className="features-grid">
            <div className="feature-item">
              <h3>🌸 Bunga Segar</h3>
              <p>Bunga pilihan terbaik langsung dari kebun</p>
            </div>
            <div className="feature-item">
              <h3>💝 Desain Unik</h3>
              <p>Setiap buket dirancang khusus sesuai keinginan Anda</p>
            </div>
            <div className="feature-item">
              <h3>🚚 Pengiriman Cepat</h3>
              <p>Kami siap mengirim ke seluruh kota dengan cepat</p>
            </div>
            <div className="feature-item">
              <h3>💬 Layanan Ramah</h3>
              <p>Tim kami siap membantu setiap kebutuhan Anda</p>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
