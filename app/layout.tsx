import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mundeer Radio — The 2011 Road Trip",
  description:
    "A moving 2011 India road trip through OG songs, cyber cafés, Bluetooth transfers, cricket nights and shared memories.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: {
    title: "Mundeer Radio — The 2011 Road Trip",
    description: "One white hatchback. One frequency. All the OG songs.",
    images: [{ url: "/og-v2.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mundeer Radio — The 2011 Road Trip",
    description: "One white hatchback. One frequency. All the OG songs.",
    images: ["/og-v2.jpg"],
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
