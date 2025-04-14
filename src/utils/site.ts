const site_url =
  process.env.NEXT_PUBLIC_APP_URL || "https://aronefritzportfolio.vercel.app";

// Use a static timestamp to avoid hydration errors
// This will still force cache refreshing but won't change between server and client
const timestamp = "20240321-v1";

export const siteConfig = {
  name: "Arone Fritz Lamanilao | Web Stack Developer",
  description:
    "Personal portfolio website showcasing my projects and skills as a Web Stack Developer",
  url: site_url,
  ogImage: `${site_url}/Arone-Fritz.png?v=${timestamp}`,
  links: {
    twitter: "https://twitter.com/aronefritz",
    github: "https://github.com/AroneFritz/aronefritzportfolio",
  },
  mailSupport: "aronefritz@gmail.com",
};

export const openGraphImage = {
  images: [{
    url: `${site_url}/Arone-Fritz.png?v=${timestamp}`,
    width: 1200,
    height: 630,
    alt: "Arone Fritz Lamanilao | Web Stack Developer",
  }],
  type: 'website',
};
