import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { GeistSans } from "geist/font/sans";

export const metadata: Metadata = {
  title: "Nex Trade Waves",
  description: "Next generation crypto trading platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={GeistSans.className}>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}