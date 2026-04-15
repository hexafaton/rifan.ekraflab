import Layout from "../../components/Layout";

export default function Pemesanan() {
  return (
    <Layout>
      <section className="checkout-header">
        <div className="checkout-headline">
          <h1>Konfirmasi Pesanan</h1>
          <p>
            Silakan isi data pesanan Anda. Pilih metode pembayaran QRIS atau Cash,
            lalu kirim detail pesanan untuk diproses.
          </p>
        </div>
      </section>

      <section className="checkout-page">
        <aside className="checkout-summary">
          <h2>Ringkasan Pesanan</h2>
          <div id="checkoutSummary" className="checkout-summary-content"></div>
        </aside>

        <section className="payment-panel">
          <h2>Detail Pesanan</h2>
          <form id="paymentForm" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label htmlFor="customerName">Nama Lengkap</label>
              <input type="text" id="customerName" name="customerName" required placeholder="Nama penerima" />
            </div>
            <div className="form-group">
              <label htmlFor="customerPhone">Nomor Kontak</label>
              <input type="tel" id="customerPhone" name="customerPhone" required placeholder="0812xxxxxxx" />
            </div>
            <div className="form-group">
              <label htmlFor="customerAddress">Alamat Penerima</label>
              <textarea id="customerAddress" name="customerAddress" required placeholder="Alamat lengkap pengiriman"></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="orderNote">Catatan untuk Penjual</label>
              <textarea id="orderNote" name="orderNote" placeholder="Tuliskan permintaan khusus jika ada"></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="voucherCode">Masukkan Voucher</label>
              <input type="text" id="voucherCode" name="voucherCode" placeholder="Kode voucher jika ada" />
            </div>
            <input type="hidden" id="orderTotal" name="orderTotal" />

            <div className="payment-methods">
              <p>Pilih Metode</p>
              <label className="payment-method">
                <input type="radio" name="paymentMethod" value="qris" defaultChecked onClick={() => document.getElementById("qrisInfo")?.classList.remove("hidden")} />
                QRIS
              </label>
              <label className="payment-method">
                <input type="radio" name="paymentMethod" value="cash" onClick={() => {
                    document.getElementById("qrisInfo")?.classList.add("hidden");
                    document.getElementById("cashInfo")?.classList.remove("hidden");
                  }}
                />
                Cash
              </label>
            </div>

            <div id="qrisInfo" className="payment-info">
              <h3>QRIS</h3>
              <p>
                Pembayaran QRIS akan diproses sesuai metode yang dipilih.
                Instruksi pembayaran akan diberikan setelah pengiriman pesanan.
              </p>
              <p className="payment-amount">Total: <span id="paymentAmount">Rp0</span></p>
              <div id="voucherInfo" className="voucher-info hidden"></div>
            </div>

            <div id="cashInfo" className="payment-info hidden">
              <h3>Cash</h3>
              <p>Bayar tunai saat pesanan sampai. Pastikan alamat dan detail pesanan sudah benar.</p>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="btn-pesan"
                id="submitOrderButton"
                onClick={(e) => {
                  if (typeof window !== "undefined" && typeof window.handlePaymentSubmit === "function") {
                    window.handlePaymentSubmit(e.nativeEvent);
                  }
                }}
              >
                Kirim Pesanan
              </button>
              <a href="/" className="button-secondary">Kembali Belanja</a>
            </div>
          </form>
        </section>
      </section>
    </Layout>
  );
}
