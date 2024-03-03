"use server";

import Prism from "prismjs";

export default async function JsGeneratorFunctions({ slug }: { slug: string }) {
  return (
    <div className="w-full">
      <div className=" text-center w-full">
        <h1 className=" text-4xl bg-gradient-to-r from-yellow-400 via-sky-300 to-pink-400 inline-block text-transparent bg-clip-text">
          /{slug}
        </h1>
      </div>
      <div className=" p-8">
        <p className=" text-lg">
          JavaScript Generator Functions,{" "}
          <code className=" bg-slate-800 p-1 rounded-lg">function*</code>,
          enable granular control over function flow and timing. They are
          steered by the{" "}
          <code className=" bg-slate-800 p-1 rounded-lg">yield</code> keyword
          which pauses function execution until{" "}
          <code className=" bg-slate-800 p-1 rounded-lg">next</code> is called
          to resume. Doing a{" "}
          <code className=" bg-slate-800 p-1 rounded-lg">yield</code> returns an
          object with a{" "}
          <code className=" bg-slate-800 p-1 rounded-lg">done</code> boolean
          indicating function completion and a{" "}
          <code className=" bg-slate-800 p-1 rounded-lg">value</code>.
          Additionally, data can be passed to a generator's{" "}
          <code className=" bg-slate-800 p-1 rounded-lg">next</code> call, but
          data passed into the first{" "}
          <code className=" bg-slate-800 p-1 rounded-lg">next</code> call is not
          retained.
        </p>
        <br />
        <div className=" text-center w-full">
          <h2 className=" text-2xl text-center bg-gradient-to-r from-yellow-400 via-sky-300 to-pink-400 inline-block text-transparent bg-clip-text">
            See it in action!
          </h2>
        </div>
        <br />
        <pre className=" overflow-auto bg-slate-800 pl-4 pr-4 rounded-lg">
          {/* <code dangerouslySetInnerHTML={{ __html: codeHtml }}>{}</code> */}
          <code
            dangerouslySetInnerHTML={{ __html: generateCodeHtmlContent() }}
          ></code>
        </pre>
      </div>
    </div>
  );
}

function generateCodeHtmlContent(): string {
  const codeBlock = `
function* sillyStr(s) {
    let x = 0;
    for (const c of s) {
        yield x++ % 2 === 0 ? 
            c.toLowerCase() : 
            c.toUpperCase();
    }
    yield "🎂";
}

let { i, o } = { i: "hello world", o: ""}
const gen = sillyStr(i); // gen is suspended
let r = gen.next(); // goes to first yield here
while (!r.done) {
    o += r.value;
    r = gen.next();
}
console.log(o); // outputs "hElLo wOrLd🎂"
          `;
  const codeHtmlContent = Prism.highlight(
    codeBlock,
    Prism.languages["javascript"],
    "javascript"
  );
  return codeHtmlContent;
}
