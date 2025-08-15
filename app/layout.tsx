import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/src/styles/globals.css";

const InterFont = Inter({
  variable: "--font-Inter-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Todo App",
  authors: [{ name: "Wisam Jbori", url: "https://github.com/SamJbori" }],
  description: "To Make your life easier",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={InterFont.className}>{children}</body>
    </html>
  );
}
