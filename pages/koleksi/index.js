import Layout from "../../components/Layout";

export default function Koleksi() {
  return (
    <Layout>
      <div className="search-row"></div>
      <main>
        <section className="menu">
          <h2>Daftar Harga Buket</h2>
          <div className="menu-grid" id="koleksibuket"></div>
        </section>
      </main>

      <div id="productDetailModal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={() => {
              const modal = document.getElementById("productDetailModal");
              if (modal) modal.style.display = "none";
            }}>
            &times;
          </span>
          <div id="productDetailContent"></div>
        </div>
      </div>
    </Layout>
  );
}
