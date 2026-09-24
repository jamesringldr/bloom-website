"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { nav, site } from "@/lib/content";
import { cn } from "@/lib/utils";

const dots = ["bg-p2-tomato", "bg-p2-orange", "bg-p2-leaf", "bg-p2-cobalt", "bg-p2-grape"];
const linkClass =
  "inline-flex h-11 items-center rounded-full px-4 text-[15px] font-bold text-p2-ink transition-colors duration-200 hover:bg-p2-cream-deep";

function Logo() {
  return (
    <Link href="#top" aria-label={site.name} className="flex h-11 shrink-0 items-center">
      <Image
        src="/logo-bloom-trim.png"
        alt="BLOOM"
        width={737}
        height={160}
        priority
        className="h-9 w-auto sm:h-11"
      />
    </Link>
  );
}

export function P2Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const cta = nav.find((n) => n.cta)!;
  const links = nav.filter((n) => !n.cta);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // the mobile menu is lg:hidden — close it (and release the scroll lock) when a rotate/resize crosses that breakpoint
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-6">
      <div
        className={cn(
          "mx-auto flex h-16 max-w-5xl items-center justify-between rounded-full bg-white pl-6 pr-3 transition-shadow duration-200 sm:pr-4",
          scrolled ? "shadow-[0_8px_30px_-8px_rgb(31_27_61/0.28)]" : "shadow-[0_2px_10px_-4px_rgb(31_27_61/0.18)]",
        )}
      >
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {links.map((item) => (
            <Link key={item.href} href={item.href} className={linkClass}>
              {item.label}
            </Link>
          ))}
          <Link
            href={cta.href}
            className="ml-2 inline-flex h-11 items-center rounded-full bg-p2-cobalt px-5 text-[15px] font-extrabold text-white transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-px"
          >
            {cta.label}
          </Link>
        </nav>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="p2-mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="grid size-11 place-items-center rounded-full bg-p2-sun text-p2-ink transition-transform duration-200 active:scale-95 lg:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open ? (
        <nav
          id="p2-mobile-nav"
          aria-label="Mobile"
          className="mx-auto mt-2 max-h-[calc(100dvh-6.5rem)] max-w-5xl overflow-y-auto overscroll-contain rounded-[2rem] bg-white p-4 shadow-xl lg:hidden"
        >
          <ul className="flex flex-col gap-1">
            {links.map((item, i) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-2xl px-4 py-3 font-display text-2xl font-bold text-p2-ink transition-colors duration-200 hover:bg-p2-cream-deep"
                >
                  <span className={cn("size-3 rounded-full", dots[i % dots.length])} aria-hidden />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={cta.href}
            onClick={() => setOpen(false)}
            className="mt-3 flex h-14 items-center justify-center rounded-full bg-p2-cobalt text-lg font-extrabold text-white"
          >
            {cta.label}
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
