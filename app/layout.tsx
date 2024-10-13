import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import meta from "./meta.json";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: meta.title,
  description: meta.title, // Using title as description since there's no description in meta.json
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main className="max-w-3xl mx-auto my-12">
          {children}
        </main>
      </body>
    </html>
  );
}


