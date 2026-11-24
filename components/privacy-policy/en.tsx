import { COMPANY } from "@/lib/company";

const mail = <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>;

/**
 * English privacy policy text. Draft to be reviewed by 7Sundays' legal
 * counsel: replace with the approved version when it comes back.
 */
export function PrivacyPolicyEn() {
  return (
    <>
      <p>
        This notice explains how we process the personal data of people who
        visit 7sundays.it and of people who contact us through the forms on the
        website, pursuant to Article 13 of Regulation (EU) 2016/679
        (&quot;GDPR&quot;) and Italian Legislative Decree 196/2003, as amended
        by Legislative Decree 101/2018 (the &quot;Italian Privacy Code&quot;).
      </p>

      <section>
        <h2>1. Data controller</h2>
        <p>
          The data controller is <strong>{COMPANY.name}</strong>, with
          registered office at {COMPANY.address}, VAT number {COMPANY.vatNumber}{" "}
          (&quot;7Sundays&quot;, &quot;we&quot; or &quot;us&quot;). For any
          request about your personal data you can write to us at {mail}.
        </p>
      </section>

      <section>
        <h2>2. What data we process</h2>
        <p>
          <strong>Browsing data.</strong> The systems that run the website
          automatically collect some data whose transmission is inherent in the
          use of Internet protocols, such as your IP address, browser and device
          type, the date and time of the request and the page requested. This
          data is used to deliver the website and keep it secure, and is not
          used to profile you.
        </p>
        <p>
          <strong>Data you provide through the forms.</strong> When you fill in
          one of the contact forms we collect your name, your email address and
          the other information requested by the form (fields marked with * are
          required), which depends on the form:
        </p>
        <ul>
          <li>
            <strong>Contact:</strong> your message;
          </li>
          <li>
            <strong>Owners:</strong> city and area of the property, type, size,
            number of beds, a link to a folder of photos (for example WeTransfer
            or Google Drive) and your message;
          </li>
          <li>
            <strong>Stays:</strong> city or area of interest, dates, number of
            guests, type of accommodation, reason for the stay and any special
            requests;
          </li>
          <li>
            <strong>Property Manager:</strong> type of consulting you are
            interested in, main goal and a description of your situation;
          </li>
          <li>
            <strong>About:</strong> your profile (owner, guest or other) and
            your message.
          </li>
        </ul>
        <p>
          If you send us a link to WeTransfer, Google Drive or a similar
          service, we view the photos to assess your property. The service you
          chose processes the data under the terms you accepted with its
          provider. Please do not include identifiable people or documents in
          the photos.
        </p>
        <p>
          <strong>Data you send us directly.</strong> If you email or call us
          using the contact details on the website, we process the data
          contained in your communication.
        </p>
        <p>
          Do not enter special categories of data (Article 9 GDPR), such as
          information about your health or a disability, in the forms. If we
          need this kind of information to organise your stay (for example
          accessibility requirements), we will ask you for it separately with
          your explicit consent (Article 9(2)(a) GDPR). If you send it to us
          anyway, we will delete it without using it.
        </p>
      </section>

      <section>
        <h2>3. Why we process data and on what legal basis</h2>
        <ul>
          <li>
            <strong>To reply to your requests</strong> and give you information
            about our services. If your request concerns a service you wish to
            receive (management of your property, a stay, consulting), the legal
            basis is taking steps at your request prior to entering into a
            contract (Article 6(1)(b) GDPR). In other cases, for example if you
            write to us on behalf of a company or for other requests, the legal
            basis is our legitimate interest in replying to people who contact
            us (Article 6(1)(f) GDPR).
          </li>
          <li>
            <strong>To deliver the website and keep it secure</strong>: the
            legal basis is our legitimate interest in keeping the website
            working and protected (Article 6(1)(f) GDPR).
          </li>
          <li>
            <strong>To comply with legal obligations</strong> and, where
            necessary, to establish, exercise or defend our legal claims: the
            legal basis is compliance with a legal obligation (Article 6(1)(c)
            GDPR) and our legitimate interest (Article 6(1)(f) GDPR).
          </li>
        </ul>
        <p>
          We do not use your data to send you promotional messages or
          newsletters, we do not sell it, and we do not use it for profiling or
          for decisions based solely on automated processing.
        </p>
      </section>

      <section>
        <h2>4. Whether you must provide your data</h2>
        <p>
          Providing data through the forms is optional. However, the fields
          marked with an asterisk (*) are needed to reply to your request:
          without them we cannot follow up on it.
        </p>
      </section>

      <section>
        <h2>5. How we process data</h2>
        <p>
          Data is processed electronically, by authorised people and with
          appropriate technical and organisational measures to protect it
          against unauthorised access, loss or disclosure. The website is served
          exclusively over an encrypted connection (HTTPS).
        </p>
      </section>

      <section>
        <h2>6. Who we share data with</h2>
        <p>
          Your data can be accessed by 7Sundays staff authorised to process it
          and by the following providers, who process it on our behalf as data
          processors (Article 28 GDPR):
        </p>
        <ul>
          <li>
            <strong>Vercel Inc.</strong> (United States): website hosting and
            processing of the messages sent through the forms;
          </li>
          <li>
            <strong>Resend</strong> (United States): forwarding by email of the
            messages received through the forms;
          </li>
          <li>
            <strong>Google</strong>: email service, which receives the form
            messages and the emails sent to {COMPANY.email};
          </li>
          <li>
            <strong>Prismic</strong>: website content management. Images are
            delivered through content delivery networks (CDNs) run by its
            sub-processors, including Amazon Web Services and imgix (United
            States), which receive the visitor&apos;s IP address;
          </li>
          <li>the agency that develops and maintains the website (Italy).</li>
        </ul>
        <p>
          If your request leads to a contract, your data may also be disclosed
          to consultants and professionals (for example our accountant and
          lawyers). Your data is not published or transferred to third parties
          for their own purposes, and may be disclosed to the competent
          authorities only where required by law.
        </p>
      </section>

      <section>
        <h2>7. Transfers outside the European Economic Area</h2>
        <p>
          Vercel, Resend and Google, as well as Amazon Web Services and imgix
          (Prismic&apos;s sub-processors), are companies based in the United
          States or process data there. The transfer is based on the European
          Commission&apos;s adequacy decision for the EU-U.S. Data Privacy
          Framework (Commission Implementing Decision (EU) 2023/1795 of 10 July
          2023), in which these providers participate, and on the standard
          contractual clauses approved by the Commission (Article 46(2)(c) GDPR)
          included in their data processing agreements. You can obtain a copy of
          the standard contractual clauses by writing to {mail}.
        </p>
      </section>

      <section>
        <h2>8. How long we keep data</h2>
        <ul>
          <li>
            <strong>Browsing data:</strong> kept in the hosting provider&apos;s
            technical logs for no longer than 30 days, and by the image delivery
            networks according to their own technical retention periods, unless
            needed to investigate abuse or unlawful activity;
          </li>
          <li>
            <strong>Data sent through the forms or by email:</strong> for the
            time needed to handle your request and in any case no longer than 12
            months after our last contact. A technical copy of the form messages
            is kept by the email delivery service (Resend) for no longer than 30
            days. If your request leads to a contract, you will receive a
            specific privacy notice and the data will be kept for the duration
            of the contract and, after it ends, for the period required by law
            (for example 10 years for accounting and tax records).
          </li>
        </ul>
        <p>After these periods, the data is deleted or anonymised.</p>
      </section>

      <section>
        <h2>9. Cookies</h2>
        <p>
          The website does not set cookies or store information on your device
          (for example through localStorage), and does not use analytics or
          profiling tools, whether our own or from third parties. Your consent
          is therefore not required (Article 122 of the Italian Privacy Code;
          Italian Data Protection Authority guidelines of 10 June 2021) and the
          website does not show a cookie banner. If we introduce different
          tools, we will update this notice and, where necessary, ask for your
          consent.
        </p>
        <p>
          The links to our social media profiles (for example Instagram and
          TikTok) and to reviews published on third-party platforms (Google,
          Airbnb, Booking.com) are plain links: no content from these platforms
          is loaded on the website until you open them. Once on the platform,
          its own privacy policy applies.
        </p>
      </section>

      <section>
        <h2>10. Your rights</h2>
        <p>
          You can exercise the rights set out in Articles 15-22 GDPR at any time
          and free of charge, within the limits and under the conditions laid
          down by the GDPR. In particular, you can:
        </p>
        <ul>
          <li>access your data and obtain a copy of it;</li>
          <li>have it rectified or completed;</li>
          <li>have it erased;</li>
          <li>request the restriction of processing;</li>
          <li>
            receive your data in a structured, commonly used format and transmit
            it to another controller (portability).
          </li>
        </ul>
        <p>
          <strong>Right to object.</strong> You can object at any time, on
          grounds relating to your particular situation, to processing based on
          our legitimate interest (Article 21 GDPR).
        </p>
        <p>
          Where processing is based on your consent, you can withdraw it at any
          time, without affecting the lawfulness of processing carried out
          before the withdrawal.
        </p>
        <p>
          To exercise your rights, write to {mail}. We will reply without undue
          delay and in any case within one month of your request, a period that
          may be extended by two further months in the cases set out in Article
          12(3) GDPR.
        </p>
        <p>
          If you believe that the processing of your data infringes the law, you
          can lodge a complaint with the Italian Data Protection Authority
          (Garante per la protezione dei dati personali,{" "}
          <a
            href="https://www.garanteprivacy.it"
            target="_blank"
            rel="noreferrer"
          >
            www.garanteprivacy.it
          </a>
          ) or with the supervisory authority of the EU Member State where you
          habitually live, work or where the alleged infringement took place
          (Article 77 GDPR).
        </p>
      </section>

      <section>
        <h2>11. Changes to this notice</h2>
        <p>
          We may update this notice, for example if we add new services to the
          website. The current version is always published on this page, with
          the date of the last update.
        </p>
      </section>
    </>
  );
}
