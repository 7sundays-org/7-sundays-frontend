"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Proprietari", href: "/proprietario" },
  { label: "Property Manager", href: "/property-manager" },
  { label: "Soggiorni", href: "/hosting" },
];

/**
 * The asset is a single-color (near-white) SVG. We render it as a CSS mask so
 * the color comes from `background-color`, letting it switch cleanly between
 * porcelain (over the hero) and primary (on the white scrolled bar).
 */
function Logo({ onLight }: { onLight?: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "block h-[34px] w-[318px] max-w-[55vw] transition-colors duration-300",
        onLight ? "bg-primary" : "bg-porcelain"
      )}
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
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Lock background scroll while the sidebar is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Turn the bar solid once the hero (~viewport height) has scrolled past.
  useEffect(() => {
    const onScroll = () =>
      setScrolled(window.scrollY > window.innerHeight - 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Depends on scroll only — opening the menu must not change the bar's
  // background or position.
  const whiteMode = scrolled;

  return (
    <>
      {/* Taller bar anchored at the top (covers up to the edge); extra top
          padding keeps the logo/hamburger at the same height. z above the
          sidebar so the morphed hamburger doubles as the close (X). */}
      <header
        className={cn(
          "fixed top-0 left-0 z-[120] w-full px-6 pt-10 pb-10 transition-colors duration-300 ease-in-out md:px-12",
          whiteMode
            ? "bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
            : "bg-transparent"
        )}
      >
        <nav className="flex h-[34px] items-center justify-between">
          <Link href="/" aria-label="7Sundays — Home">
            <Logo onLight={whiteMode} />
          </Link>

          {/* EN/IT lives next to the toggle so the morphed X sits to its right */}
          <div className="flex items-center gap-6">
            {open && (
              <span
                className={cn(
                  "font-sans text-[30px] leading-[58px] font-medium tracking-[0.05em]",
                  whiteMode ? "text-primary" : "text-porcelain"
                )}
              >
                EN / IT
              </span>
            )}

            <button
              type="button"
              aria-label={open ? "Chiudi menu" : "Apri menu"}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              className={cn(
                "relative cursor-pointer transition-all duration-300 ease-in-out",
                open ? "size-14" : "h-[16px] w-[114px]"
              )}
            >
              <span
                className={cn(
                  "absolute left-0 h-[4px] w-full origin-center transition-all duration-300 ease-in-out",
                  whiteMode ? "bg-primary" : "bg-porcelain",
                  open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 h-[4px] w-full origin-center transition-all duration-300 ease-in-out",
                  whiteMode ? "bg-primary" : "bg-porcelain",
                  open ? "bottom-1/2 translate-y-1/2 -rotate-45" : "bottom-0"
                )}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Click-catcher to close when tapping outside the sidebar */}
      {open && (
        <button
          type="button"
          aria-label="Chiudi menu"
          tabIndex={-1}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[105] cursor-default bg-transparent"
        />
      )}

      <aside
        className={cn(
          "fixed top-0 right-0 z-[110] flex h-screen w-[768px] max-w-full flex-col bg-primary px-[92px] py-[64px] transition-transform duration-[400ms] ease-in-out",
          open ? "translate-x-0" : "translate-x-full"
        )}
        aria-hidden={!open}
      >
        {/* EN/IT and the close (X) live in the header above, over this panel */}
        <nav className="mt-[122px] flex flex-col items-end gap-8 text-right">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="font-serif text-[64px] leading-[1.04] font-extrabold text-porcelain uppercase transition-opacity hover:opacity-80"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
