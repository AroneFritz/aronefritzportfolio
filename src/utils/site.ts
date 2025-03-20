const site_url =
  process.env.NEXT_PUBLIC_APP_URL || "https://aronefritzportfolio.netlify.app";

export const siteConfig = {
  name: "Arone Fritz Lamanilao | Web Stack Developer",
  description:
    "Personal portfolio website showcasing my projects and skills as a Web Stack Developer",
  url: site_url,
  ogImage: `${site_url}/Arone-Fritz.png`,
  links: {
    twitter: "https://twitter.com/aronefritz",
    github: "https://github.com/AroneFritz/aronefritzportfolio",
  },
  mailSupport: "aronefritz@gmail.com",
};
