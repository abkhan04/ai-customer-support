'use client';

import { Nunito as FontSans } from "next/font/google";
import { usePathname } from "next/navigation";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isDashboard = pathname === "/dashboard";
  return (
    <html lang="en" className="h-full">
      <body
        className={cn(
          "bg-background font-sans antialiased flex flex-col min-h-screen",
          fontSans.variable
        )}
      >
        {!isDashboard && <Navbar />}
        <main className="flex-grow">{children}</main>
        {!isDashboard && <Footer />}
      </body>
    </html>
  );
}