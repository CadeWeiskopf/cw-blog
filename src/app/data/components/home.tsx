"use server";

export default async function Home({ slug }: { slug: string }) {
  return (
    <div className="w-full">
      <div className=" text-center w-full">
        <h1 className=" text-4xl bg-gradient-to-r from-yellow-400 via-sky-300 to-pink-400 inline-block text-transparent bg-clip-text">
          /{slug}
        </h1>
        {/* <div className=" text-sm text-slate-400 ">
          <span className="blur-sm transition-all hover:blur-0 cursor-default">
            Cade Weiskopf
          </span>
        </div> */}
      </div>
      {/* <div className=" p-8">
        Hello and welcome to my journey through software engineering. Stay tuned
        for things to come. Feel free to{" "}
        <a href="mailto:me@cadew.dev">contact me</a> in the meantime.
      </div> */}
    </div>
  );
}
