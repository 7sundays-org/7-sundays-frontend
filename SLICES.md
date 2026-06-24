# Slice da creare in Slice Machine

Avvia Slice Machine con `npm run slicemachine` → [http://localhost:9999](http://localhost:9999) → tab **Slices** → **Create a slice**.

Tutte le slice sono di tipo `SharedSlice` (default).

---

## Tabella riassuntiva: slice per pagina

| Slice | Home | Proprietario | Hosting | About |
| --- | :-: | :-: | :-: | :-: |
| Hero | ✓ | ✓ | ✓ | ✓ |
| EvocativePhrase | ✓ |  | ✓ | ✓ |
| CategoryShowcase | ✓ |  |  |  |
| AboutTeaser | ✓ |  |  |  |
| Testimonials | ✓ | ✓ | ✓ |  |
| Contatti | ✓ |  |  | ✓ |
| PainPoints |  | ✓ |  |  |
| ProcessSteps |  | ✓ |  |  |
| ContactForm |  | ✓ | ✓ |  |
| ApartmentsShowcase |  |  | ✓ |  |
| ServicesIconGrid |  |  | ✓ |  |
| Faq |  | ✓ | ✓ |  |
| Gallery |  |  | ✓ | ✓ |
| TeamPhoto |  |  |  | ✓ |
| FounderSpotlight |  |  |  | ✓ |
| WhyDifferent |  |  |  | ✓ |

---

## 1. Hero

**Usata in:** tutte le pagine
**Variations:** `default`, `singleCta`, `withSlider`

**Campi (primary):**

- `title_1` — Text
- `title_2` — Text
- `paragraph` — Rich Text
- `hero_image` — Image
- `buttons` — Group (repeat):
  - `button_text` — Text
  - `button_href` — Link
  - `variant` — Select (`primary`, `ghost`)

**Variation `withSlider` (in aggiunta):**

- `slider_images` — Group (repeat):
  - `image` — Image

---

## 2. EvocativePhrase

**Usata in:** Home, Hosting, About
**Scopo:** Banner full-width con sola frase evocativa.

**Campi:**

- `phrase` — Rich Text
- `background_color` — Select (`light`, `dark`, `primary`)

---

## 3. CategoryShowcase

**Usata in:** Home
**Scopo:** Scroll orizzontale a 3 card (Proprietari / Host / Consulenze).

**Campi:**

- `eyebrow` — Text
- `title` — Rich Text
- `cards` — Group (repeat):
  - `label` — Text
  - `description` — Rich Text
  - `image` — Image
  - `link` — Link

---

## 4. AboutTeaser

**Usata in:** Home
**Scopo:** Anticipazione sezione About con link alla pagina.

**Campi:**

- `title` — Rich Text
- `paragraph` — Rich Text
- `image` — Image
- `cta_text` — Text
- `cta_link` — Link (default `/about`)

---

## 5. Testimonials

**Usata in:** Home, Proprietario, Hosting

**Campi:**

- `title` — Rich Text
- `display_mode` — Select (`carousel`, `grid`)
- `testimonials` — Group (repeat):
  - `testimonial_link` — Content Relationship → `testimonial`
- `filter_category` — Select (`proprietario`, `ospite`, `host`) — opzionale, per pescare automaticamente

---

## 6. Contatti

**Usata in:** Home, About
**Scopo:** Sezione contatti generica (email, telefono, social).

**Campi:**

- `title` — Rich Text
- `subtitle` — Rich Text
- `email` — Text
- `phone` — Text
- `socials` — Group (repeat):
  - `platform` — Select (`instagram`, `facebook`, `linkedin`, `tiktok`)
  - `url` — Link

---

## 7. PainPoints

**Usata in:** Proprietario
**Scopo:** Lista "pensieri che tengono sveglio il proprietario".

**Campi:**

- `title` — Rich Text
- `intro` — Rich Text
- `items` — Group (repeat):
  - `text` — Text
  - `icon` — Image (opzionale)

---

## 8. ProcessSteps

**Usata in:** Proprietario
**Scopo:** Step orizzontali "Come funziona".

**Campi:**

- `title` — Rich Text
- `steps` — Group (repeat):
  - `number` — Number
  - `label` — Text
  - `description` — Rich Text
  - `icon` — Image

---

## 9. ContactForm

**Usata in:** Proprietario, Hosting
**Scopo:** Form contatti — destinazione delle CTA hero (ancora `#contatti` o `#form`).

**Campi:**

- `title` — Rich Text
- `intro` — Rich Text
- `form_type` — Select (`proprietario`, `hosting`)
- `submit_label` — Text

---

## 10. ApartmentsShowcase

**Usata in:** Hosting
**Scopo:** Scroll orizzontale degli appartamenti.

**Campi:**

- `title` — Rich Text
- `subtitle` — Rich Text
- `mode` — Select (`all`, `featured`)
- `featured_apartments` — Group (repeat, usato se `mode = featured`):
  - `apartment` — Content Relationship → `apartment`

---

## 11. ServicesIconGrid

**Usata in:** Hosting
**Scopo:** Griglia servizi 7 Sundays a icona.

**Campi:**

- `title` — Rich Text
- `subtitle` — Rich Text
- `services` — Group (repeat):
  - `icon` — Image
  - `name` — Text
  - `description` — Rich Text

---

## 12. Faq

**Usata in:** Proprietario, Hosting

**Campi:**

- `title` — Rich Text
- `category` — Select (`proprietario`, `hosting`, `generale`) — filtra automaticamente i `faq_item`
- `items` — Group (repeat, opzionale per override manuale):
  - `faq_item` — Content Relationship → `faq_item`

---

## 13. Gallery

**Usata in:** Hosting, About

**Campi:**

- `title` — Rich Text
- `layout` — Select (`grid`, `masonry`, `carousel`)
- `images` — Group (repeat):
  - `image` — Image
  - `caption` — Text

---

## 14. TeamPhoto

**Usata in:** About
**Scopo:** Foto team grande + lista membri.

**Campi:**

- `title` — Rich Text
- `paragraph` — Rich Text
- `group_photo` — Image
- `members` — Group (repeat):
  - `member` — Content Relationship → `team_member`

---

## 15. FounderSpotlight

**Usata in:** About
**Scopo:** Sezione dedicata a Elena.

**Campi:**

- `member` — Content Relationship → `team_member`
- `headline` — Rich Text
- `story` — Rich Text
- `image` — Image (opzionale, per override della foto del membro)

---

## 16. WhyDifferent

**Usata in:** About

**Campi:**

- `title` — Rich Text
- `points` — Group (repeat):
  - `title` — Text
  - `description` — Rich Text
  - `icon` — Image

---

## Custom Types già scaffoldati

I seguenti custom types sono già stati creati come JSON in `/customtypes` e verranno mostrati in Slice Machine al primo avvio:

### Single (pagine)

- `home_page` — Home
- `proprietario_page` — Proprietario
- `hosting_page` — Hosting
- `about_page` — About

### Repeatable

- `apartment` — Appartamento (nome, location, descrizione, gallery, camere, ospiti, link prenotazione)
- `testimonial` — Testimonianza (autore, ruolo, foto, quote, categoria: proprietario/ospite/host)
- `team_member` — Membro del team (nome, ruolo, foto, bio, flag founder)
- `faq_item` — FAQ (domanda, risposta, categoria: proprietario/hosting/generale)

---

## Workflow consigliato

1. `npm run slicemachine` → apre [http://localhost:9999](http://localhost:9999)
2. Crea le 16 slice una alla volta seguendo le specifiche sopra
3. Per ogni page type (Home, Proprietario, Hosting, About) → tab **Custom Types** → aggiungi alla Slice Zone le slice corrispondenti (vedi tabella in cima)
4. Click su **Push** in alto a destra per sincronizzare i tipi con Prismic
5. Vai su [prismic.io](https://prismic.io) → crea i 4 documenti single (`home_page`, `proprietario_page`, `hosting_page`, `about_page`) + qualche `apartment`, `testimonial`, `team_member`, `faq_item`
6. Imposta `NEXT_PUBLIC_PRISMIC_ENVIRONMENT=7sundays` in `.env.local`
7. `npm run dev` → naviga su `/`, `/proprietario`, `/hosting`, `/about`
