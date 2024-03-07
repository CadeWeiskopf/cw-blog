"use server";

import Link from "next/link";

export default async function Home({ slug }: { slug: string }) {
  return (
    <div className="w-full">
      <br />
      <div className=" text-center w-full">
        <h1 className=" text-4xl bg-gradient-to-r from-yellow-400 via-sky-300 to-pink-400 inline-block text-transparent bg-clip-text">
          /{slug}
        </h1>
      </div>
      <br />
      <div className="flex flex-wrap justify-center gap-2 ">
        <Link
          className=""
          href="/js-generator-functions"
        >
          <div
            style={{ textAlign: "left" }}
            className=" text-sky-300 bg-slate-800 rounded-lg p-2 w-64 bg-gradient-to-bl from-slate-800 to-slate-950"
          >
            <span className=" text-yellow-400">{"{"}</span>
            &ensp;
            <span className=" text-amber-500"></span>
            <br />
            &ensp;{"title: "}
            <span className=" text-amber-500">
              {'"JS Generator Functions"'}
            </span>
            <span className="text-slate-200">,</span>
            <br />
            &ensp;{"by: "}
            <span className=" text-amber-500">{'"Cade Weiskopf"'}</span>
            <span className="text-slate-200">,</span>
            <br />
            &ensp;{"created: "}
            <span className=" text-amber-500">{'"March 3, 2024"'}</span>
            <br />
            <span className=" text-yellow-400">{"}"}</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
