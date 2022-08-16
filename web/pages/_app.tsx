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

  {
    return process.env.NEXT_PUBLIC_IS_DEV ? (
      <Component {...pageProps} />
    ) : (
      <div className="h-screen prose w-full mx-auto flex flex-col justify-center max-w-2xl p-4">
        <h2 className="font-semibold text-3xl mb-3 text-center">
          🚧 Notium is currently in development 🚧
        </h2>
        <p>
          If you're reading this, it means that you have stumbled upon Notium.
          However, we are currently in a closed beta, and it seems like you
          don't have an invite. In the mean time, you can go to{" "}
          <a href="https://notium.vercel.app">https://notium.vercel.app</a> to
          register on our waitlist to get access, follow us on{" "}
          <a href="https://twitter.com/NotiumApp">Twitter</a>, and join our
          <a href="https://discord.gg/SMpbQ8nzTc"> Discord server</a>. We hope
          that you can join us on our journey to make notetaking for CS a better
          experience than before, and we'll see you in a bit!
        </p>
      </div>
    );
  }
}

export default MyApp;
