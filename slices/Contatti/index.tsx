import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";
import { ContactFormClient } from "./ContactFormClient";
import { AboutFormClient } from "./AboutFormClient";
import { PropertyManagerFormClient } from "./PropertyManagerFormClient";
import { SoggiorniFormClient } from "./SoggiorniFormClient";

export type ContattiProps = SliceComponentProps<Content.ContattiSlice>;

const Contatti: FC<ContattiProps> = ({ slice }) => {
  const { title, subtitle, show_form, submit_label, email, phone, socials } =
    slice.primary;

  return (
    <section
      id="contatti"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full bg-white px-6 py-20 md:px-[90px]"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-[66px]">
        <div className="flex flex-col items-center gap-4 text-center">
          {title && (
            <div className="font-sans text-[25px] leading-[30px] font-medium text-foreground">
              <PrismicRichText field={title} />
            </div>
          )}
          {subtitle && (
            <div className="max-w-2xl font-sans text-[25px] leading-[30px] font-medium text-foreground">
              <PrismicRichText field={subtitle} />
            </div>
          )}
        </div>

        {show_form !== false && (
          slice.variation === "about" ? (
            <AboutFormClient submitLabel={submit_label} />
          ) : slice.variation === "propertyManager" ? (
            <PropertyManagerFormClient submitLabel={submit_label} />
          ) : slice.variation === "soggiorni" ? (
            <SoggiorniFormClient submitLabel={submit_label} />
          ) : (
            <ContactFormClient submitLabel={submit_label} />
          )
        )}

        {(email || phone || (socials && socials.length > 0)) && (
          <div className="flex flex-col items-center gap-2 pt-4 text-sm text-foreground/80">
            {email && (
              <a href={`mailto:${email}`} className="hover:underline">
                {email}
              </a>
            )}
            {phone && (
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="hover:underline"
              >
                {phone}
              </a>
            )}
            {socials && socials.length > 0 && (
              <div className="mt-2 flex gap-4 text-xs tracking-widest uppercase">
                {socials.map((s, i) => (
                  <PrismicNextLink
                    key={i}
                    field={s.url}
                    className="hover:underline"
                  >
                    {s.platform}
                  </PrismicNextLink>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Contatti;
