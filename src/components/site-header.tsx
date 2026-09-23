"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { nav, site } from "@/lib/content";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/80 bg-white/90 shadow-sm backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <div className="container-bloom flex items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="#top" className="flex items-center gap-2 shrink-0" aria-label={site.name}>
          <Image
            src="/logo-bloom-web.png"
            alt="BLOOM"
            width={140}
            height={70}
            className="h-10 w-auto sm:h-12"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {nav.map((item) =>
            item.cta ? (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  buttonVariants({ size: "default" }),
                  "ml-2 h-9 rounded-full bg-bloom-blue px-5 font-bold text-white shadow-md shadow-bloom-blue/25 hover:bg-bloom-blue/90",
                )}
              >
                {item.label}
              </Link>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-2 text-sm font-semibold text-bloom-ink/80 transition hover:bg-bloom-sky hover:text-bloom-ink"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <Button
          type="button"
          variant="outline"
          size="icon"
          className="lg:hidden rounded-full"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-border bg-white px-4 py-4 lg:hidden"
        >
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-xl px-4 py-3 text-base font-semibold",
                  item.cta
                    ? "bg-bloom-blue text-center text-white"
                    : "text-bloom-ink hover:bg-bloom-sky",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
