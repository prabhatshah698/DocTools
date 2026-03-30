import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Free PDF & Document Tools Online | PDF, Word, PPT, QR & More",
  description:
    "Convert, compress, and generate documents online for free. Word to PDF, PDF to Word, PPT tools, QR generator and more. Fast, secure, no signup required.",

  keywords: [
    "pdf tools",
    "word to pdf",
    "pdf to word",
    "ppt to pdf",
    "pdf compressor",
    "qr code generator",
    "free document tools",
  ],

  authors: [{ name: "DocTools" }],

  verification: {
    google: "tZHnvI13wUubxPIoQ-CzxdOHzZ9ozwzoO-lxnd3D8tM",
  },

  openGraph: {
    title: "Document Tools Hub",
    description:
      "All-in-one free online document tools. Convert, compress, and generate files instantly.",
    url: "https://doc-tools-frontend.vercel.app",
    siteName: "DocTools",
    type: "website",
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />

        <main className="flex-1">{children}</main>

        <Footer />
      </body>
    </html>
  );
}