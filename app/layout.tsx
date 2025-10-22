import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Sora } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import "easymde/dist/easymde.min.css";

// Define fonts
const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sora",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "SparkLine",
  description: "Where Ideas Ignite Growth",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sora.variable} ${inter.variable} ${jetbrainsMono.variable} font-sora antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
