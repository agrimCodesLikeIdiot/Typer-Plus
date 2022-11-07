import React from "react";
import Head from "next/head";
import "../styles/Home.module.css";
import { useState } from "react";
import { useEffect } from "react";

function Home() {
  const [md, setmd] = useState(null);

  useEffect(() => {
    setmd(localStorage.getItem("text"));
  }, [typeof window != "undefined"]);

  if (typeof window != "undefined") {
    window.document.onkeyup = (e) => {
      if (e.ctrlKey && e.which === 83) {
        var htmlContent = [`${md}`];
        var bl = new Blob(htmlContent, { type: "markdown" });
        var a = document.createElement("a");
        a.href = URL.createObjectURL(bl);
        a.download = "Untitled.md";
        a.hidden = true;
        document.body.appendChild(a);
        a.innerHTML = "idk";
        a.click();
      }
    };
  }

  return (
    <React.Fragment>
      <Head>
        <title>Typer +</title>
        <script src="https://cdn.tailwindcss.com" />
      </Head>
      <div id="main">
        <nav
          id="navbar"
          className="w-[100vw] h-[30px] bg-slate-100 border-[1px] flex border-gray-300"
        >
          <button className="pl-2 flex space-x-3 items-center w-[120px] h-[28px] font-bold">
            <img src="https://img.icons8.com/ios-glyphs/24/null/markdown.png" />
            <span>Untitled.md</span>
            <span
              onClick={() => {
                if (typeof window != "undefined") {
                  window.close();
                }
              }}
            >
              &times;
            </span>
          </button>
          <div className="p-2 flex justify-center space-x-2 items-center h-[28px] bg-slate-200 ml-[50px] rounded-lg">
            <button
              onClick={() => {
                var htmlContent = [`${md}`];
                var bl = new Blob(htmlContent, { type: "markdown" });
                var a = document.createElement("a");
                a.href = URL.createObjectURL(bl);
                a.download = "Untitled.md";
                a.hidden = true;
                document.body.appendChild(a);
                a.innerHTML = "idk";
                a.click();
              }}
            >
              <img src="https://img.icons8.com/material-rounded/24/000000/save-as.png" />
            </button>
            <button
              onClick={() => {
                localStorage.clear();
                if (typeof window != "undefined") {
                  window.location.reload();
                }
              }}
            >
              <img src="https://img.icons8.com/fluency-systems-filled/24/000000/delete-history.png" />
            </button>
            <button
              onClick={() => {
                let tarea = document.querySelector("textarea");
                tarea.removeAttribute("spellcheck");
                tarea.setAttribute("spellcheck", "true");

                document.querySelector("#true-sc").classList.add("hidden");
                document.querySelector("#false-sc").classList.remove("hidden");
              }}
              id="true-sc"
              className=""
            >
              <img src="https://img.icons8.com/ios-glyphs/24/000000/spellcheck.png" />
            </button>
            <button
              onClick={() => {
                let tarea = document.querySelector("textarea");
                tarea.removeAttribute("spellcheck");
                tarea.setAttribute("spellcheck", "false");

                document.querySelector("#true-sc").classList.remove("hidden");
                document.querySelector("#false-sc").classList.add("hidden");
              }}
              id="false-sc"
              className="hidden"
            >
              <img src="https://img.icons8.com/ios-glyphs/24/94928d/spellcheck.png" />
            </button>
            <button
              onClick={() =>
                window.open("https://www.markdownguide.org/getting-started/")
              }
            >
              <img src="https://img.icons8.com/ios-glyphs/24/null/learn-more.png" />
            </button>
          </div>
        </nav>
        <textarea
          value={md}
          onChange={(e) => {
            setmd(e.target.value);
            localStorage.setItem("text", md);
          }}
          onKeyDown={(e) => {
            if (e.key === "Tab" && !e.shiftKey) {
              // execCommand operations are "Cmd|Ctrl+Z"-able
              // note: execCommand is deprecated and may not work in the future
              document.execCommand("insertText", false, "\t");
              e.preventDefault();
              return false;
            } else if (e.key === "{") {
              setTimeout(() => setmd(md + "{}"), 100);
            } else if (e.key === "[") {
              setTimeout(() => setmd(md + "[]"), 100);
            } else if (e.key === "(") {
              setTimeout(() => setmd(md + "()"), 100);
            }
          }}
          spellcheck="false"
          className="border-1 w-[100vw] h-[94vh] fixed bottom-0 bg-white p-2.5 focus:outline-none"
        ></textarea>
      </div>
    </React.Fragment>
  );
}

export default Home;

// Made by @agrimf (https://fagrim.netlify.app/)
