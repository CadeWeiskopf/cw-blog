"use client";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BlogPost } from "@/app/data/data";

export default function Nav({ posts }: { posts: BlogPost[] }) {
  const navOpenTextRef = useRef<HTMLSpanElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const navButtonRef = useRef<HTMLButtonElement>(null);
  const rightCursor = useMemo(() => ["border-r-2", "border-r-slate-300"], []);
  const leftCursor = useMemo(() => ["border-l-2", "border-l-slate-300"], []);
  let isOpen = useRef(false);
  let isCursor = useRef(false);
  let isTyping = useRef(false);
  let cursorInterval = useRef<NodeJS.Timeout>();

  const startCursor = useCallback(
    (cursorClasses: string[]): NodeJS.Timeout => {
      clearInterval(cursorInterval.current);
      if (!navOpenTextRef.current) {
        throw Error(`no nav text ref`);
      }
      isCursor.current = true;
      navOpenTextRef.current.classList.remove(...rightCursor, ...leftCursor);
      navOpenTextRef.current.classList.add(...cursorClasses);
      return setInterval(() => {
        if (!navOpenTextRef.current) {
          throw Error(`no nav text ref`);
        }
        isCursor.current = !isCursor.current;
        if (isCursor.current) {
          navOpenTextRef.current.classList.add(...cursorClasses);
          return;
        }
        navOpenTextRef.current.classList.remove(...rightCursor, ...leftCursor);
      }, 750);
    },
    [leftCursor, rightCursor]
  );

  const toggleNav = useCallback(() => {
    if (isTyping.current) {
      return;
    }
    isTyping.current = true;

    function* typeChars() {
      for (const c of JSON.stringify(isOpen.current)) {
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
      cursorInterval.current = startCursor(leftCursor);
      setTimeout(() => {
        if (!navOpenTextRef.current) {
          throw Error(`no nav text ref`);
        }
        navOpenTextRef.current.innerText = "";
        navOpenTextRef.current.classList.remove("bg-slate-700");
        cursorInterval.current = startCursor(rightCursor);
        setTimeout(() => {
          isOpen.current = !isOpen.current;
          doTypeChars();
        }, 100);
      }, 125);
    }

    function doTypeChars() {
      const typeCharsInterval = setInterval(() => {
        const { value, done } = charGenerator.next();
        if (done) {
          clearInterval(typeCharsInterval);
          if (isOpen.current) {
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
          isTyping.current = false;
          return;
        }
        if (!navOpenTextRef.current) {
          throw Error(`no nav text ref`);
        }
        navOpenTextRef.current.innerText += value;
      }, 60);
    }
  }, [leftCursor, rightCursor, startCursor]);

  useEffect(() => {
    cursorInterval.current = startCursor(rightCursor);
    const closeOnOutsideClick = (ev: MouseEvent) => {
      if (!isOpen.current || !ev.target || isTyping.current) {
        return;
      }
      if (!navButtonRef.current) {
        throw Error("no nav button ref");
      }
      if (!navRef.current) {
        throw Error("no nav ref");
      }
      const target = ev.target as HTMLElement;
      if (
        target !== navButtonRef.current &&
        !navButtonRef.current.contains(target) &&
        target !== navRef.current &&
        !navRef.current.contains(target)
      ) {
        toggleNav();
      }
    };
    document.body.addEventListener("click", closeOnOutsideClick);
    return () => {
      clearInterval(cursorInterval.current);
      document.body.removeEventListener("click", closeOnOutsideClick);
    };
  }, [rightCursor, startCursor, toggleNav]);

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
          {JSON.stringify(isOpen.current)}
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
                <span className=" text-amber-500">
                  &quot;{post.title}&quot;
                </span>
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
