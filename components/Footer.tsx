import Link from "next/link";

const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Proprietari", href: "/proprietario" },
  { label: "Host", href: "/hosting" },
  { label: "Consulenze", href: "/consulenze" },
  { label: "Contatti", href: "/#contatti" },
];

const SOCIALS = [
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Instagram", href: "https://instagram.com/7sundays" },
  { label: "TikTok", href: "https://tiktok.com" },
];

export function Footer() {
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
          <address className="text-body text-foreground/80 not-italic">
            Via Andrea Maria Ampère, 56
            <br />
            <a href="mailto:7sundays@7sundays.it" className="hover:underline">
              E 7sundays@7sundays.it
            </a>
            <br />
            <a href="tel:+393930047956" className="hover:underline">
              M +39 393 004 7956
            </a>
            <br />
            <a href="https://7sundays.it" className="hover:underline">
              7sundays.it
            </a>
          </address>
        </div>

        {/* Nav + socials */}
        <div className="flex gap-16">
          <nav className="flex flex-col gap-3 text-body">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.label}
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
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
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
