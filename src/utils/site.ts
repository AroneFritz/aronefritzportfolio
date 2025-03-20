const site_url =
  process.env.NEXT_PUBLIC_APP_URL || "https://arone-portfolio.netlify.app";

export const siteConfig = {
  name: "Arone Fritz Lamanilao | Web Stack Developer",
  description:
    "Professional portfolio website showcasing my projects and skills as a Web Stack Developer. Explore my latest work, technical expertise, and professional experience.",
  url: site_url,
  ogImage: `${site_url}/portfolio-preview.jpg`,
  links: {
    twitter: "https://twitter.com/aronefritz",
    github: "https://github.com/AroneFritz/AroneFritz-Portfolio",
    linkedin: "https://www.linkedin.com/in/arone-fritz-lamanilao"
  },
  mailSupport: "aronefritz@gmail.com",
};
