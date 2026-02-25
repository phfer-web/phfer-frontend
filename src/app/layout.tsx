import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import CookieConsent from "@/components/CookieConsent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "initpedro | Software Developer",
  description: "Software Developer portfolio of initpedro",
  icons: {
    icon: '/image-personal.png',
  },
};

import { LanguageProvider } from "@/context/LanguageContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <LanguageProvider>
          <Navbar />
          {children}
          <Chatbot />
          <CookieConsent />
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
