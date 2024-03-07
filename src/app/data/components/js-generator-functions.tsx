"use server";

import Prism from "prismjs";

export default async function JsGeneratorFunctions({ slug }: { slug: string }) {
  return (
    <div className="w-full">
      <br />
      <div className=" text-center w-full">
        <h1 className=" text-4xl bg-gradient-to-r from-yellow-400 via-sky-300 to-pink-400 inline-block text-transparent bg-clip-text">
          /{slug}
        </h1>
        {/* <div className=" text-sm text-slate-400">Cade Weiskopf</div> */}
      </div>
      <br />
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
          Additionally, data can be passed to a generator&apos;s{" "}
          <code className=" bg-slate-800 p-1 rounded-lg">next</code> call, but
          data passed into the first{" "}
          <code className=" bg-slate-800 p-1 rounded-lg">next</code> call is not
          retained.
        </p>
        <br />
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
        <br />
        <br />
        <p className=" text-lg">
          Now see how this can be adjusted to pass data into the{" "}
          <code className=" bg-slate-800 p-1 rounded-lg">next</code> function:
        </p>
        <br />
        <pre className=" overflow-auto bg-slate-800 pl-4 pr-4 rounded-lg">
          {/* <code dangerouslySetInnerHTML={{ __html: codeHtml }}>{}</code> */}
          <code
            dangerouslySetInnerHTML={{ __html: generateCodeHtmlContent2() }}
          ></code>
        </pre>
        <br />
        <br />
        <div className=" text-center w-full">
          <h2 className=" text-2xl text-center bg-gradient-to-r from-yellow-400 via-sky-300 to-pink-400 inline-block text-transparent bg-clip-text">
            What next?
          </h2>
        </div>
        <br />
        <p className=" text-lg">
          I encourage you to use generator functions for yourself after seeing
          this particularly unproductive implementation. Generator functions can
          be useful in async environments when utilized as a lazy fetching
          mechanism; there are other ways to do this, but some would argue this
          is a good syntax. I personally just found it fun to animate a part of
          my site using a generator function for a change.
        </p>
        <br />
        <br />
        <div className=" text-center w-full">
          <h2 className=" text-2xl text-center bg-gradient-to-r from-yellow-400 via-sky-300 to-pink-400 inline-block text-transparent bg-clip-text">
            Thank you and happy coding!
          </h2>
        </div>
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

function generateCodeHtmlContent2(): string {
  const codeBlock = `
function* sillyStr(s) {
  let x = 0;
  for (const c of s) {
    //{{REPLACE_ME}}
    const data = yield x++ % 2 === 0 ? 
      c.toLowerCase() : 
      c.toUpperCase();
    yield data;//{{REPLACE_ME_CLOSE}}
  }
  yield "🎂";
}

let { i, o } = { i: "hello world", o: ""}
const gen = sillyStr(i);
let r = gen.next(); //{{REPLACE_ME2}}
while (!r.done) {
  o += r.value; //{{REPLACE_ME3}}
  r = gen.next("_"); // now passing data into next()//{{REPLACE_ME_CLOSE3}}
}
console.log(o); // outputs "h_E_l_L_o_ _w_O_r_L_d_🎂"
          `;
  let codeHtmlContent = Prism.highlight(
    codeBlock,
    Prism.languages["javascript"],
    "javascript"
  );
  codeHtmlContent = codeHtmlContent.replace(
    `<span class="token comment">//{{REPLACE_ME}}</span>`,
    `<span class="  bg-green-900"><span class="token comment">// getting data passed into next</span>`
  );
  codeHtmlContent = codeHtmlContent.replace(
    `<span class="token comment">//{{REPLACE_ME_CLOSE}}</span>`,
    `</span>`
  );
  codeHtmlContent = codeHtmlContent.replace(
    `<span class="token comment">//{{REPLACE_ME2}}</span>`,
    `<span class="  bg-green-900 token comment">// data passed to first next would be ignored</span>`
  );
  codeHtmlContent = codeHtmlContent.replace(
    `<span class="token comment">//{{REPLACE_ME3}}</span>`,
    `<span class="  bg-green-900">`
  );
  codeHtmlContent = codeHtmlContent.replace(
    `//{{REPLACE_ME_CLOSE3}}`,
    `</span>`
  );
  // codeHtmlContent = codeHtmlContent.replace(
  //   `<span class="token comment">//{{REPLACE_ME_CLOSE2}}</span>`,
  //   `</span>`
  // );
  return codeHtmlContent;
}
