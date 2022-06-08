import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
// import { initFirebase } from "../util/initFirebase";

function MyApp({ Component, pageProps }: AppProps) {
  // useEffect(() => {
  //   initFirebase();
  // }, []);
  return (
    <>
      <Toaster position="top-right" reverseOrder={true} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
