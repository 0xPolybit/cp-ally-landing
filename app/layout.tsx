import type { Metadata, Viewport } from "next";
import { Geist, Pixelify_Sans } from "next/font/google";
import { SITE_URL } from "./_components/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const pixelifySans = Pixelify_Sans({
  variable: "--font-pixel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "CP Ally IDE — partner editor for competitive programming",
  description:
    "Unofficial partner code editor for competitive programming, in CodeForces. Fetch problems, write, and run locally — built for the contest clock.",
  openGraph: {
    title: "CP Ally IDE",
    description:
      "Unofficial partner code editor for competitive programming, in CodeForces.",
    type: "website",
    url: SITE_URL,
    siteName: "CP Ally IDE",
    images: ["/logo.png"],
  },
  twitter: {
    card: "summary",
    title: "CP Ally IDE",
    description:
      "Unofficial partner code editor for competitive programming, in CodeForces.",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${pixelifySans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
