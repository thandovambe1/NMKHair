# NMKHair

NMKHair is a React + Vite + Tailwind CSS v4 storefront for a Gqeberha hair studio: a per-length wig price list, salon services, and a wig care & training menu. Prices are in South African Rands.

## Run locally

1. Install Node.js 20.19+ or 22.12+.
2. `npm ci`
3. `npm run dev` — open the URL Vite prints.
4. `npm run build` — production output in `dist/`.

## Where the code lives

| File | Contents |
| --- | --- |
| `src/App.tsx` | All sections, catalog data, cart, booking and care menu |
| `src/index.css` | Palette tokens, fonts, streaks, motion, scroll offsets |
| `src/main.tsx` | React entry point |
| `public/images/` | Campaign imagery |
| `index.html` | Document title and meta description |

### Editing prices

- `FAMILIES` in `src/App.tsx` holds the wig price list. Each family has `rows` of `[length, price]` pairs, e.g. `rows([18, 2750], [20, 3000])`. `curlsUpcharge: 500` adds the HD lace curls option.
- `SERVICES` holds the salon service menu.
- `CARE_SERVICES` holds the Maintenance & Care menu. `from: true` renders "From", `from: false` renders "Flat rate".

Both service lists feed the booking dropdown automatically, so a new entry is bookable as soon as it is added.

## Maintenance & Care menu

| Service | Price |
| --- | --- |
| Wig Treatment | from R300 |
| Installation Masterclasses | R4 000 |
| Basic Installations | from R350 |
| Wig Colourings | from R700 |
| Wig Revamps | from R500 |
| Wig Making | from R500 |
| Closure Replacements | from R500 |
| Customisation | R300 |

## Behaviour notes

- Card length selection is held in `picks` (per family); the quick-view modal has its own `quick` state, so choosing a length never opens the modal.
- Floating WhatsApp and back-to-top buttons measure themselves against buttons, links and prices and fade out whenever they would cover one.
- `Escape` closes the modal, cart and mobile menu; body scroll locks while an overlay is open.

## Before going live

Cart checkout, booking confirmation and newsletter signup are client-side demos. Connect a payment provider and a backend before accepting real orders or appointments. Campaign images are illustrative, not photographs of actual products or clients.
