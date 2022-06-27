import { DefaultSeo } from "next-seo";

export const Meta = ({
  title = "Notium - Revolutionizing notetaking for CS students!",
  description = "Notium is a web app for CS students to create and share notes.",
  url = "https://notiumapp.vercel.app",
}: {
  title?: string;
  description?: string;
  url?: string;
}) => (
  <DefaultSeo
    title={title}
    description={description}
    openGraph={{
      url,
      title,
      description,
      images: [
        {
          url: `${url}/logo/logo.png`,
          width: 1200,
          height: 2114,
          alt: "Notium",
        },
      ],
      site_name: "Notium",
    }}
    twitter={{
      handle: "@notiumapp",
      site: url,
      cardType: "summary_large_image",
    }}
  />
);
