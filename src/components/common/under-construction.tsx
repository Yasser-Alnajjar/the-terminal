"use client";

import { useTranslate } from "@hooks";

export function UnderConstruction() {
  const t = useTranslate("under-construction");
  return (
    <main className="min-h-[80vh] flex items-center justify-center p-6">
      <section className="w-full max-w-3xl bg-slate-800/60 backdrop-blur-md rounded-2xl p-8 shadow-xl flex gap-6 items-center">
        <div className="flex-none">
          <svg
            className="w-20 h-20 animate-pulse"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
          >
            <rect
              x="2"
              y="2"
              width="20"
              height="20"
              rx="3"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-yellow-400"
            />
            <path
              d="M7 16v-4m0 0l2-2m-2 2l2 2"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            />
          </svg>
        </div>

        <div className="flex-1 text-white">
          <h1 className="text-4xl font-extrabold">{t("title")}</h1>
          <p className="mt-2">{t("description")}</p>

          <p className="mt-6 text-xs">
            <span className="inline-flex items-center gap-2">
              <span className="block w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
              <strong>{t("coming-soon")}</strong>
            </span>
          </p>
        </div>
      </section>

      <footer className="absolute bottom-6 text-slate-500 text-sm">
        {t("footer", {
          time: new Date().getFullYear(),
        })}
      </footer>
    </main>
  );
}
