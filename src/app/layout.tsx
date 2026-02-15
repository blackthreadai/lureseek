import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LureSeek — Find Your Perfect Lure",
  description:
    "Visual search engine for fishing lures. Describe what you want and find it instantly.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans antialiased">{children}</body>
    </html>
  );
}
