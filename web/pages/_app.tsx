import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { auth } from "../util/initFirebase";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      }
    });
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
