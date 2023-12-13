"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import { useState } from "react";
import Navbar from "./components/navbar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
          <div
            style={{
              marginLeft: `${isOpen ? "7rem" : "17rem"}`,
            }}
          >
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
