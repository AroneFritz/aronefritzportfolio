import { Metadata } from "next";
import { siteConfig, openGraphImage } from "./site";

export const formatDate = (date: string) => {
  const newDate = new Date(date);
  
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const monthIndex = newDate.getMonth();
  const month = months[monthIndex];
  const year = newDate.getFullYear();

  return { month, year };
};

export function constructMetadata({
  title = siteConfig.name,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  icons = "/favicon.ico",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    keywords: [
      "Web Stack Developer",
      "Frontend Developer",
      "Backend Developer",
      "React Developer",
      "Node.js Developer",
      "Next.js Developer",
      "Portfolio",
      "Projects",
      "Skills",
    ],
    authors: [
      {
        name: "Arone Fritz Lamanilao",
      },
    ],
    creator: "Arone Fritz Lamanilao",
    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteConfig.url,
      title,
      description,
      siteName: title,
      images: openGraphImage.images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: openGraphImage.images,
      creator: "@aronefritz",
    },
    icons,
    metadataBase: new URL(siteConfig.url),
    manifest: `${siteConfig.url}/site.webmanifest`,
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
