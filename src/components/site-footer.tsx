import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-bloom-ink text-white">
      <div className="container-bloom flex flex-col gap-8 px-4 py-12 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
        <div className="max-w-md space-y-3">
          <Image
            src="/logo-bloom-web.png"
            alt="BLOOM"
            width={160}
            height={80}
            className="h-12 w-auto brightness-0 invert"
          />
          <p className="font-display text-xl font-medium">
            Everyone has the opportunity to Bloom.
          </p>
          <p className="text-sm text-white/70">
            <a
              className="underline decoration-white/30 underline-offset-2 hover:decoration-white"
              href={`mailto:${site.email}`}
            >
              {site.email}
            </a>
            <span className="mx-2 text-white/40">·</span>
            {site.location}
            <span className="mx-2 text-white/40">·</span>
            {site.hours}
          </p>
        </div>

        <div className="flex items-end gap-4">
          <div className="text-sm text-white/65">
            <p>With love from Blossom</p>
            <p className="mt-1">
              <Link href="#top" className="underline underline-offset-2">
                Back to top
              </Link>
            </p>
          </div>
          <Image
            src="/mascot-blossom-web.png"
            alt="Blossom waving goodbye"
            width={100}
            height={96}
            className="h-20 w-auto drop-shadow-lg"
          />
        </div>
      </div>
    </footer>
  );
}
