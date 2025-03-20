const site_url =
  process.env.NEXT_PUBLIC_APP_URL || "https://the-portfolio-lac.vercel.app";

export const siteConfig = {
  name: "Arone Fritz Lamanilao | Web Stack Developer",
  description:
    "Personal portfolio website showcasing my projects and skills as a Web Stack Developer",
  url: site_url,
  ogImage: `${site_url}/_static/og-image.png`,
  links: {
    twitter: "https://twitter.com/aronefritz",
    github: "https://github.com/AroneFritz/main-portfolio",
  },
  mailSupport: "aronefritz@gmail.com",
};
