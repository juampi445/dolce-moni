# Dolce Moni

## Product Purpose

Landing page for **Dolce Moni**, an artisanal pastry workshop in Adolfo Gonzales Chaves (Buenos Aires, Argentina). The site does three things: showcases the catalog, transmits trust, and funnels every interaction to WhatsApp. There is no e-commerce, no payments, no cart-and-checkout — orders are coordinated in conversation, and the site exists to start that conversation.

## Register

**brand** — design IS the product. A visitor's impression is the deliverable; the site is the storefront.

## Users

- **Direct consumers** in Adolfo Gonzales Chaves looking for a tarta, a docena de alfajores, or a budín for a specific occasion. Mobile-first; they arrive via Instagram (`@dolce.monii`) or word-of-mouth.
- **Kioscos, comercios, revendedores** in town and nearby towns who want to resell. They don't see wholesale pricing on the site — they're invited to ask by WhatsApp.

Both audiences buy by talking, not by clicking "Add to cart."

## Brand voice

Three physical-object words: **homemade, warm, careful**. A neighborhood pastry kitchen — not a luxury patisserie, not a fast-casual chain. Closer to a hand-lettered receipt from a family bakery than to a glossy magazine spread. Spanish, Argentine register, never English.

## Anti-references

- Generic "elegant food" landing pages — black + gold + Playfair Display.
- "AI bakery" templates: pastel pink everything, hero-with-icon-cards-below.
- Luxury patisserie aesthetics. Dolce Moni is artisanal, not aspirational.
- Anything that feels like Stripe-minimal or SaaS. This is food made by a person.

## Strategic principles

- **WhatsApp is the only conversion action.** Every CTA goes to `+54 9 2983 56-9503`. Floating button on every screen.
- **Consumer prices only.** Wholesale pricing is never shown — wholesale gets its own section that invites a private conversation.
- **3-day minimum lead time** is communicated kindly but clearly.
- **The catalog is the spine of the site.** Products live in `src/data/productos.json` and are typed via `src/types/producto.ts`. Adding a product = editing the JSON.
- **Imagery is placeholder-tolerant by design.** The site must look right with zero real photos and look better as photos arrive. Cards skeleton gracefully.

## Contact

- WhatsApp: `+54 9 2983 56-9503`
- Instagram: `@dolce.monii`
- Zona: Adolfo Gonzales Chaves. Envíos gratuitos a coordinar dentro de la localidad; pedidos grandes a localidades cercanas.
