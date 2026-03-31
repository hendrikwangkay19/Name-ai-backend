import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Premium Agency | Portfolio & Landing",
  description:
    "Landing page premium untuk jasa AutoClip AI, website AI generator, dan automasi AI untuk scale bisnis."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
