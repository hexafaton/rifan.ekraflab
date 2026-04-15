import Head from "next/head";
import Script from "next/script";
import "../style/reset.css";
import "../style/main.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Buket.ae</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/logoba.png" type="image/png" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css"
        />
      </Head>
      <Component {...pageProps} />
      <Script src="/js/main.js" strategy="afterInteractive" />
    </>
  );
}
