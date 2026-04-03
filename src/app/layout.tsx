import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import MainLayoutWrapper from "@/components/layout/MainLayoutWrapper";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "NoteFlow ERP | Enterprise Resource Planning",
  description: "Next-generation ERP systems for modern enterprises.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body suppressHydrationWarning={true}>
        <AuthProvider>
          <MainLayoutWrapper>
            {children}
          </MainLayoutWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
