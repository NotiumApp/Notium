import { Html, Head, Main, NextScript } from "next/document";
import { Toaster } from "react-hot-toast";
import { Meta } from "../partials/Meta";

export default function Document() {
  const keywords =
    "notes,notetaking,computer science,java,notetaking app for coding,notion alternatives,cs notetaking";
  return (
    <Html>
      <Head>
        <meta name="keywords" content={keywords} />
        <link rel="apple-touch-icon" sizes="180x180" href="/logo.png" />
        <link rel="icon" type="image/svg+xml" href="/logo.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/logo.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/logo.png" />
        <link rel="mask-icon" href="/logo.png" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <Meta />
      </Head>

      <Toaster position="top-right" reverseOrder={true} />

      <body className="">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
