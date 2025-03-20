const site_url =
  process.env.NEXT_PUBLIC_APP_URL || "https://aronefritzportfolio.vercel.app/";

// Add a fixed timestamp to force cache refreshing
const timestamp = "20240321" + Math.floor(Math.random() * 1000);

export const siteConfig = {
  name: "Arone Fritz Lamanilao | Web Stack Developer",
  description:
    "Personal portfolio website showcasing my projects and skills as a Web Stack Developer",
  url: site_url,
  ogImage: `${site_url}/og-image.png?v=${timestamp}`,
  links: {
    twitter: "https://twitter.com/aronefritz",
    github: "https://github.com/AroneFritz/aronefritzportfolio",
  },
  mailSupport: "aronefritz@gmail.com",
};
