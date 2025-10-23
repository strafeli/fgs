"use client";

import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-screen p-8">
        <h1
          className="w-screen m-0 text-[15vw] text-center leading-none tracking-[-0.03em] break-words font-extrabold
                       max-[900px]:text-[18vw] max-[600px]:text-[22vw]"
        >
          <span
            className="inline-block transition-colors duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-default
                          hover:text-[#D092C0] 
                          dark:hover:text-[#FFB3F6]
                          hover:[@media(prefers-color-scheme:light)]:text-[#111313]"
          >
            F
          </span>
          <span
            className="inline-block transition-colors duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-default
                          hover:text-[#D092C0] 
                          dark:hover:text-[#FFB3F6]
                          hover:[@media(prefers-color-scheme:light)]:text-[#111313]"
          >
            G
          </span>
          <span
            className="inline-block transition-colors duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-default
                          hover:text-[#D092C0] 
                          dark:hover:text-[#FFB3F6]
                          hover:[@media(prefers-color-scheme:light)]:text-[#111313]"
          >
            S
          </span>{" "}
          <span
            className="inline-block transition-colors duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-default
                          hover:text-[#D092C0] 
                          dark:hover:text-[#FFB3F6]
                          hover:[@media(prefers-color-scheme:light)]:text-[#111313]"
          >
            O
          </span>
          <span
            className="inline-block transition-colors duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-default
                          hover:text-[#D092C0] 
                          dark:hover:text-[#FFB3F6]
                          hover:[@media(prefers-color-scheme:light)]:text-[#111313]"
          >
            N
          </span>
          <span
            className="inline-block transition-colors duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-default
                          hover:text-[#D092C0] 
                          dark:hover:text-[#FFB3F6]
                          hover:[@media(prefers-color-scheme:light)]:text-[#111313]"
          >
            E
          </span>
        </h1>
      </main>
      <footer className="fixed left-0 right-0 bottom-0 w-full flex justify-center items-center py-4 bg-transparent">
        <Link
          href="/impressum"
          className="text-inherit no-underline text-lg opacity-70 transition-opacity duration-200 font-light hover:opacity-100"
        >
          Impressum
        </Link>
      </footer>
    </>
  );
}
