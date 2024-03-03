"use client";
import { useEffect, useRef, useState } from "react";

export default function Nav() {
  const navOpenTextRef = useRef<HTMLSpanElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  let isOpen = false;
  let isCursor = false;
  let isTyping = false;

  function toggleNav() {
    if (isTyping) {
      return;
    }
    isTyping = true;
    if (!navOpenTextRef.current) {
      throw Error(`no nav text ref`);
    }

    // generators
    function* deleteChars() {
      let isOpenStr = JSON.stringify(isOpen);
      for (let i = isOpenStr.length; i-- > 0; ) {
        yield isOpenStr.substring(0, i);
      }
    }
    const delCharGenerator = deleteChars();

    function* typeChars() {
      for (const c of JSON.stringify(isOpen)) {
        yield c;
      }
    }
    const charGenerator = typeChars();

    // using generators in intervals
    // delete chars first
    // then call type chars.
    function doDeleteChars() {
      const deleteCharsInterval = setInterval(() => {
        const { value, done } = delCharGenerator.next();
        if (done) {
          clearInterval(deleteCharsInterval);
          isOpen = !isOpen;
          setTimeout(() => {
            doTypeChars();
          }, 50);
          return;
        }
        if (!navOpenTextRef.current) {
          throw Error(`no nav text ref`);
        }
        navOpenTextRef.current.innerText = value;
      }, 60);
    }

    doDeleteChars();

    function doTypeChars() {
      const typeCharsInterval = setInterval(() => {
        const { value, done } = charGenerator.next();
        if (done) {
          clearInterval(typeCharsInterval);
          //   if (isOpen) {
          //     navRef.current?.classList.remove("hidden");
          //   }
          isTyping = false;
          return;
        }
        if (!navOpenTextRef.current) {
          throw Error(`no nav text ref`);
        }
        navOpenTextRef.current.innerText += value;
      }, 60);
    }
  }

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      if (!navOpenTextRef.current) {
        throw Error(`no nav text ref`);
      }
      isCursor = !isCursor;
      if (isCursor) {
        navOpenTextRef.current.classList.add("border-r-2");
        navOpenTextRef.current.classList.add("border-r-slate-300");
        return;
      }
      navOpenTextRef.current.classList.remove("border-r-2");
      navOpenTextRef.current.classList.remove("border-r-slate-300");
    }, 750);
    return () => {
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <div className=" relative">
      <button
        style={{ textAlign: "left" }}
        className="text-sm text-sky-300 bg-slate-800 rounded-lg p-2 w-28"
        onClick={() => toggleNav()}
      >
        <span className=" text-yellow-400">{"{"}</span>
        <br />
        &ensp;{"nav: "}
        <span className=" text-pink-400">{"{"}</span>
        <br />
        &ensp;&ensp;{"open: "}
        <span
          className=" text-sky-600 text-center"
          ref={navOpenTextRef}
        >
          {JSON.stringify(isOpen)}
        </span>
        <br />
        &ensp;<span className=" text-pink-400">{"}"}</span>
        <br />
        <span className=" text-yellow-400">{"}"}</span>
      </button>
      <nav
        className=" absolute "
        ref={navRef}
      >
        <ul>
          <li className=" text-slate-50">test</li>
          <li className=" text-slate-50">test</li>
          <li className=" text-slate-50">test</li>
          <li className=" text-slate-50">test</li>
          <li className=" text-slate-50">test</li>
        </ul>
      </nav>
    </div>
  );
}
