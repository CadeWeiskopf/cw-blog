import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "./nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "blog.cadew.dev",
  description: "Dev talk and stuff.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + ` bg-slate-950 text-slate-50`}>
        <header className=" flex justify-between p-2">
          <div className=" flex flex-col justify-center">
            <h1 className=" text-3xl">blog.cadew.dev</h1>
          </div>
          <Nav />
        </header>
        <main>{children}</main>
        <footer>footer</footer>
      </body>
    </html>
  );
}
