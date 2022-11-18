'use client'

import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

export default function RootLayout({
  children}) {
  return (
      <html data-theme="cupcake">
      <head />
      <body className="flex flex-col justify-between min-h-screen">
        <SessionProvider>
        <header className="">
          <Navbar />
        </header>
        <div className="flex justify-center items-center flex-col px-5">
          {children}
        </div>
        </SessionProvider>
        <Footer />
      </body>
    </html>
  );
}
