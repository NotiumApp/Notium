import "../styles/globals.css";
import type { AppProps } from "next/app";
// import { initFirebase } from "../util/initFirebase";

function MyApp({ Component, pageProps }: AppProps) {
  // useEffect(() => {
  //   initFirebase();
  // }, []);
  return <Component {...pageProps} />;
}

export default MyApp;
