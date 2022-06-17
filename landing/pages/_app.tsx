import Head from "next/head";
import type { AppProps } from "next/app";
import { appData } from "../util/appData";
import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Notium({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>{appData.name}</title>
        <link rel="shortcut icon" href="/logo/logo.png" />

        {/* Meta tags */}
        <meta property="og:type" content="website" />
        <meta property="og:description" content={appData.description} />
        <meta property="og:title" content={appData.name} />
        <meta name="keywords" content={appData.keywords} />
        <meta property="og:url" content={appData.url} />
        <meta property="og:image" content="/logo/logo.png" />
      </Head>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Component {...pageProps} />
    </>
  );
}

export default Notium;
