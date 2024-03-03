"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BlogPost } from "@/app/data/data";

export default function Nav({ posts }: { posts: BlogPost[] }) {
  const navOpenTextRef = useRef<HTMLSpanElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const navButtonRef = useRef<HTMLButtonElement>(null);
  const rightCursor = ["border-r-2", "border-r-slate-300"];
  const leftCursor = ["border-l-2", "border-l-slate-300"];
  let isOpen = false;
  let isCursor = false;
  let isTyping = false;
  let cursorInterval: NodeJS.Timeout | undefined;

  function startCursor(cursorClasses: string[]): NodeJS.Timeout {
    clearInterval(cursorInterval);
    if (!navOpenTextRef.current) {
      throw Error(`no nav text ref`);
    }
    isCursor = true;
    navOpenTextRef.current.classList.remove(...rightCursor, ...leftCursor);
    navOpenTextRef.current.classList.add(...cursorClasses);
    return setInterval(() => {
      if (!navOpenTextRef.current) {
        throw Error(`no nav text ref`);
      }
      isCursor = !isCursor;
      if (isCursor) {
        navOpenTextRef.current.classList.add(...cursorClasses);
        return;
      }
      navOpenTextRef.current.classList.remove(...rightCursor, ...leftCursor);
    }, 750);
  }

  function toggleNav() {
    if (isTyping) {
      return;
    }
    isTyping = true;

    function* typeChars() {
      for (const c of JSON.stringify(isOpen)) {
        yield c;
      }
    }
    const charGenerator = typeChars();

    doDeleteChars();

    function doDeleteChars() {
      if (!navOpenTextRef.current) {
        throw Error(`no nav text ref`);
      }
      navOpenTextRef.current.classList.add("bg-slate-700");
      cursorInterval = startCursor(leftCursor);
      setTimeout(() => {
        if (!navOpenTextRef.current) {
          throw Error(`no nav text ref`);
        }
        navOpenTextRef.current.innerText = "";
        navOpenTextRef.current.classList.remove("bg-slate-700");
        cursorInterval = startCursor(rightCursor);
        setTimeout(() => {
          isOpen = !isOpen;
          doTypeChars();
        }, 100);
      }, 125);
    }

    function doTypeChars() {
      const typeCharsInterval = setInterval(() => {
        const { value, done } = charGenerator.next();
        if (done) {
          clearInterval(typeCharsInterval);
          if (isOpen) {
            navRef.current?.classList.remove("hidden");
            setTimeout(() => {
              navRef.current?.classList.remove("w-0");
              navRef.current?.classList.add("w-64");
            });
            navButtonRef.current?.classList.add("rounded-t-lg");
            navButtonRef.current?.classList.remove("rounded-lg");
          } else {
            navRef.current?.classList.remove("w-64");
            navRef.current?.classList.add("w-0");
            setTimeout(() => {
              navRef.current?.classList.add("hidden");
            }, 500);
            navButtonRef.current?.classList.add("rounded-lg");
            navButtonRef.current?.classList.remove("rounded-t-lg");
          }
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
    cursorInterval = startCursor(rightCursor);
    return () => {
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <div className=" relative">
      <button
        style={{ textAlign: "left" }}
        className=" text-sky-300 bg-slate-800 rounded-lg p-2 w-36 h-36"
        onClick={() => toggleNav()}
        ref={navButtonRef}
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
        style={{ transition: "750ms" }}
        className=" hidden absolute text-sky-300 bg-slate-800 rounded-b-lg rounded-tl-lg top-36 right-0 w-0 p-2 transition text-nowrap whitespace-nowrap"
        ref={navRef}
      >
        <span className=" text-yellow-400">{"{"}</span>
        <br />
        <h2>
          &ensp;{"posts: "}
          <span className=" text-pink-400">{"["}</span>
        </h2>
        <ul>
          {posts.map((post, i) => (
            <li
              key={`${post.slug}`}
              className=" text-slate-50 overflow-hidden text-ellipsis"
            >
              &ensp;&ensp;&ensp;
              <Link href={post.slug}>
                <span className=" text-amber-500">"{post.title}"</span>
                {i + 1 < posts.length && (
                  <span className=" text-slate-200">,</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
        &ensp;&ensp;<span className=" text-pink-400">{"]"}</span>
        <br />
        <span className=" text-yellow-400">{"}"}</span>
      </nav>
    </div>
  );
}
