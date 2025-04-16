import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  IBM_Plex_Mono,
  Lekton,
  Kode_Mono,
} from "next/font/google";
import "./globals.css";

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const lekton = Lekton({
  variable: "--font-lekton",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const kodeMono = Kode_Mono({
  variable: "--font-lekton",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Marathon Ops",
  description:
    "Marathon character progression, contracts, vault, black market, and more. Marathon Ops is a Marathon fan site that allows users to interact with your Marathon account in new and fun ways.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
