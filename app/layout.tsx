import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import { Bricolage_Grotesque, Instrument_Sans, Noto_Serif_Devanagari, Space_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/seo";

const bricolage = Bricolage_Grotesque({ subsets: ["latin"], weight: ["400", "600", "700", "800"], variable: "--font-bricolage", display: "swap" });
const instrument = Instrument_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-instrument", display: "swap" });
const spaceMono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-spacemono", display: "swap" });
const devanagari = Noto_Serif_Devanagari({ subsets: ["devanagari"], weight: ["600", "800"], variable: "--font-devanagari", display: "swap" });

export const viewport: Viewport = {
  themeColor: "#0a0e1a",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: "Kiran Dhakal - Full Stack Developer | React & Node.js Expert",
  description:
    "Full-stack web developer specializing in React, Node.js, and modern web technologies.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${bricolage.variable} ${instrument.variable} ${spaceMono.variable} ${devanagari.variable}`}>
      <head>
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-W3GSFLF6');`}
        </Script>
      </head>
      <body className="bg-background text-foreground">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W3GSFLF6"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
