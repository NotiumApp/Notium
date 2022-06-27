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
        <Meta />
      </Head>

      <Toaster position="top-right" reverseOrder={true} />

      <body className="container mx-auto">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
