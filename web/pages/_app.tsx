import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import Head from "next/head";
import { appData } from "../util/appData";
// import { initFirebase } from "../util/initFirebase";

function MyApp({ Component, pageProps }: AppProps) {
  // useEffect(() => {
  //   initFirebase();
  // }, []);
  return (
    <>
      <Head>
        <title>{appData.name} Web App</title>
        <link rel="shortcut icon" href="/logo/logo.png" />

        {/* Meta tags */}
        <meta property="og:type" content="website" />
        <meta property="og:description" content={appData.description} />
        <meta property="og:title" content={appData.name} />
        <meta name="keywords" content={appData.keywords} />
        <meta property="og:url" content={appData.url} />
        <meta property="og:image" content="/logo/logo.png" />
      </Head>
      <Toaster position="top-right" reverseOrder={true} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
