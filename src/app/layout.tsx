import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "./nav";
import { getBlogPosts } from "./data/data";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "blog.cadew.dev",
  description: "Dev talk and stuff.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  "use server";
  const posts = await getBlogPosts();
  return (
    <html lang="en">
      <body
        style={{ overflowX: "hidden" }}
        className={inter.className + ` bg-slate-950 text-slate-50`}
      >
        <header className=" flex flex-wrap p-2 w-full justify-center">
          <div className=" flex flex-wrap w-full justify-between max-w-3xl">
            <div className=" flex flex-col justify-center">
              <h1 className=" text-4xl">
                <span className=" text-yellow-400">blog</span>
                <span className=" text-pink-400">()</span>
                <br />
                &ensp;.<span className=" text-sky-300">cadew</span>
                <br />
                &ensp;.<span className=" text-sky-300">dev</span>
              </h1>
            </div>
            <Nav posts={posts} />
          </div>
        </header>
        <main className=" flex justify-center pt-4">
          <div className=" w-full max-w-3xl p-2">{children}</div>
        </main>
        <footer>footer</footer>
      </body>
    </html>
  );
}
