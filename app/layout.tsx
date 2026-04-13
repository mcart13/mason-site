import type { Metadata } from "next";
import { IBM_Plex_Sans, JetBrains_Mono, Outfit } from "next/font/google";
import type { ReactNode } from "react";

import "./globals.css";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteDescription, siteName, siteTitle, siteUrl } from "@/lib/site";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const themeScript = `
  try {
    const storageKey = "mason-site-theme";
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const storedTheme = localStorage.getItem(storageKey);
    const theme = storedTheme === "light" || storedTheme === "dark" ? storedTheme : "system";
    const resolvedTheme = theme === "system" ? (media.matches ? "dark" : "light") : theme;
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = resolvedTheme;
  } catch {}
`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Mason",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/twitter-image",
        alt: "Mason",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      className={`${outfit.variable} ${ibmPlexSans.variable} ${jetbrainsMono.variable}`}
      data-theme="system"
      lang="en"
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <SiteHeader />
        {children}
        <SiteFooter />
        <ThemeToggle />
      </body>
    </html>
  );
}
