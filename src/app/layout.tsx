import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";



const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"], // Required: Prevents loading unused characters
  weight: ["400", "500", "600", "700"], // Required: Choose the weights you need
});

export const metadata: Metadata = {
  title: "Shop | Martin Mumo",
  description: "Explore the exclusive Martin Mumo collection. Shop high-quality apparel, accessories, and curated finds designed to elevate your lifestyle.",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className}`}
      >
        <div className="mx-auto p-4 sm:px-0 sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-6xl">
          <Navbar />
          {children}
          <Footer />
        </div>
        <ToastContainer position="bottom-right" />
      </body>
    </html>
  );
}
