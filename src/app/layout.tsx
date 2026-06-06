import type { Metadata, Viewport } from "next";
import { Petrona, Manrope } from "next/font/google";
import { SITE, CONTACT } from "@/lib/config";
import { OrderProvider } from "@/components/order/OrderContext";
import { OrderPanel } from "@/components/order/OrderPanel";
import { FloatingActions } from "@/components/order/FloatingActions";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/motion/Reveal";
import "./globals.scss";

const petrona = Petrona({
  subsets: ["latin"],
  variable: "--font-petrona",
  display: "swap",
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Repostería artesanal en ${SITE.zona}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: SITE.name,
    title: `${SITE.name} — Repostería artesanal`,
    description: SITE.description,
  },
  twitter: { card: "summary_large_image", title: SITE.name, description: SITE.description },
  icons: { icon: "/logo-muffin.svg" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#f2efde",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Bakery",
  name: SITE.name,
  description: SITE.description,
  url: SITE.url,
  image: `${SITE.url}/logo-muffin.svg`,
  telephone: CONTACT.whatsappDisplay,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Adolfo Gonzales Chaves",
    addressRegion: "Buenos Aires",
    addressCountry: "AR",
  },
  areaServed: SITE.zona,
  sameAs: [CONTACT.instagramUrl, `https://wa.me/${CONTACT.whatsappNumber}`],
  priceRange: "$$",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR" className={`${petrona.variable} ${manrope.variable}`}>
      <body>
        <OrderProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <FloatingActions />
          <OrderPanel />
          <Reveal />
        </OrderProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
