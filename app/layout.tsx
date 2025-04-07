import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import BottomNav from "@/components/bottomNav";


const rubik = Rubik({
  subsets: ['latin'],
  display: 'swap'
});


export const metadata: Metadata = {
  title: "Merrylow - UG-based food delivery platform",
  description: "We deliver meals from your favourite restaurants on campus right to your doorstep",
};



export const viewport = {
  maximumScale: 1,
  userScalable: false
}



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={rubik.className}>
      <body>
        <Navbar />
          {children}
        <BottomNav />
      </body>
    </html>
  );
}
