"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Phone, Mail, Globe } from "lucide-react";
import { dict, langFromPathname, localizeHref } from "@/lib/i18n";

const NAV_BASE = [
  { key: "about", href: "/about" },
  { key: "owners", href: "/host" },
  { key: "pm", href: "/property-manager" },
  { key: "stays", href: "/hosting" },
  { key: "contact", href: "/#contact" },
] as const;

const SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/7sundays",
    name: "LinkedIn 7Sundays",
  },
  {
    label: "Instagram",
    href: "https://instagram.com/",
    name: "Instagram Elena (Personal Branding)",
  },
  { label: "TikTok", href: "https://tiktok.com", name: "TikTok" },
];

export function Footer() {
  const pathname = usePathname();
  const lang = langFromPathname(pathname);
  const navLinks = NAV_BASE.map((item) => ({
    label: dict[lang].footer[item.key],
    href: localizeHref(item.href, lang),
  }));

  return (
    <footer className="w-full bg-white px-6 pt-16 pb-8 text-foreground md:px-[90px]">
      <div className="flex flex-col gap-12 md:flex-row md:justify-between">
        {/* Logo + address */}
        <div className="flex flex-col gap-6">
          <span
            aria-label="7Sundays"
            className="block h-[34px] w-[200px] bg-foreground"
            style={{
              maskImage: "url(/logo.svg)",
              WebkitMaskImage: "url(/logo.svg)",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              maskPosition: "left center",
              WebkitMaskPosition: "left center",
              maskSize: "contain",
              WebkitMaskSize: "contain",
            }}
          />
          <address className="flex flex-col gap-2 text-body text-foreground/80 not-italic">
            <span className="flex items-center gap-2">
              <MapPin size={16} className="shrink-0 translate-y-px" />
              Via Andrea Maria Ampère, 56
            </span>
            <a href="mailto:info@7sundays.it" className="flex items-center gap-2 hover:underline">
              <Mail size={16} className="shrink-0 translate-y-px" />
              info@7sundays.it
            </a>
            <a href="tel:+393930047956" className="flex items-center gap-2 hover:underline">
              <Phone size={16} className="shrink-0 translate-y-px" />
              +39 393 004 7956
            </a>
            <a href="https://7sundays.it" className="flex items-center gap-2 hover:underline">
              <Globe size={16} className="shrink-0 translate-y-px" />
              7sundays.it
            </a>
          </address>
        </div>

        {/* Nav + socials */}
        <div className="flex gap-16">
          <nav className="flex flex-col gap-3 text-body">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-foreground/80 transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <nav className="flex flex-col gap-3 text-body">
            {SOCIALS.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.name}
                className="text-foreground/80 transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="mt-12 border-t border-border pt-6 text-right text-sm text-foreground/60">
        Designed and developed by{" "}
        <span className="font-semibold text-foreground/80">Diana Lab</span>
      </div>
    </footer>
  );
}
