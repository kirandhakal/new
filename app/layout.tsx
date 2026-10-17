import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import localFont from "next/font/local";
import "./globals.css";
import { siteConfig } from "@/lib/seo";

const chakra = localFont({
  src: [
    { path: "./fonts/ChakraPetch-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/ChakraPetch-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "./fonts/ChakraPetch-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-chakra",
  display: "swap",
});

const plexSans = localFont({
  src: "./fonts/IBMPlexSans-Variable.woff2",
  weight: "400 700",
  style: "normal",
  variable: "--font-plex-sans",
  display: "swap",
});

const plexMono = localFont({
  src: [
    { path: "./fonts/IBMPlexMono-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/IBMPlexMono-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/IBMPlexMono-SemiBold.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-plex-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#07130e" },
    { media: "(prefers-color-scheme: light)", color: "#f4f4ef" },
  ],
};

// Runs before first paint so a saved light/dark choice never flashes the wrong theme. Dark is the default.
const themeScript = `try{var t=localStorage.getItem("theme");document.documentElement.classList.toggle("dark",t!=="light");if(sessionStorage.getItem("kd-booted"))document.documentElement.setAttribute("data-booted","true")}catch(e){}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: "Kiran Dhakal - Full Stack Developer | React & Node.js Expert",
  description:
    "Full-stack web developer specializing in React, Node.js, and modern web technologies.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${chakra.variable} ${plexSans.variable} ${plexMono.variable} dark`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
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
