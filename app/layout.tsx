import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mundeer Radio — Streaming Memories from 2011",
  description:
    "A premium single-frequency music experience through cyber cafés, Bluetooth transfers, cricket nights, and the songs of 2011.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: {
    title: "Mundeer Radio — Streaming Memories from 2011",
    description: "One white hatchback. One frequency. All the OG songs.",
    images: [{ url: "/og-v3.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mundeer Radio — Streaming Memories from 2011",
    description: "One white hatchback. One frequency. All the OG songs.",
    images: ["/og-v3.jpg"],
  },
  icons: { icon: "/favicon.png", shortcut: "/favicon.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
