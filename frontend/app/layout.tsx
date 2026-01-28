import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PerkFlow | Startup Benefits",
  description: "Exclusive deals for early stage founders",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-950`}>
        <div className=" relative z-60" >
        <Navbar />
        </div>
        {/* Added pt-16 to prevent content from hiding under fixed navbar */}
        <main className="">
          {children}
        </main>
      </body>
    </html>
  );
}