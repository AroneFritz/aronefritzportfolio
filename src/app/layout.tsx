import { Poppins } from "next/font/google";
import "./globals.css";
import { VariantProvider } from "@/utils/hooks";
import { constructMetadata } from "@/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <meta property="og:title" content="Arone Fritz Lamanilao | Web Stack Developer" />
        <meta property="og:description" content="Personal portfolio website showcasing my projects and skills as a Web Stack Developer" />
        <meta property="og:image" content="https://aronefritzportfoliov2.netlify.app/og-image.png" />
        <meta property="og:url" content="https://aronefritzportfoliov2.netlify.app" />
        <meta property="og:type" content="website" />
      </head>
      <body className={poppins.className}>
        <VariantProvider>{children}</VariantProvider>
      </body>
    </html>
  );
}
