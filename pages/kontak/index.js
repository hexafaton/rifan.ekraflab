import Layout from "../../components/Layout";

export default function Kontak() {
  return (
    <Layout>
      <main className="thx">
        <p>
          Terima kasih telah menghubungi kami. Silakan gunakan formulir di bawah
          ini untuk mengirim pesan atau hubungi kami melalui informasi berikut.
          Jika Anda suka jajan atau memiliki rekomendasi makanan, kami sangat
          ingin mendengarnya!
        </p>
        <form action="#" method="post" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="name">Nama:</label><br />
          <input type="text" id="name" name="name" required /><br /><br />
          <label htmlFor="email">Email:</label><br />
          <input type="email" id="email" name="email" required /><br /><br />
          <label htmlFor="message">Pesan:</label><br />
          <textarea id="message" name="message" rows="5" required></textarea><br /><br />
          <button type="button" onClick={() => {
            alert("Terima kasih! Pesan Anda telah dikirim.");
            window.location.reload();
          }}>
            Kirim
          </button>
        </form>
      </main>
    </Layout>
  );
}
