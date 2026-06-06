import Image from "next/image";
import styles from "./Hero.module.scss";
import { SITE } from "@/lib/config";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { mensajeGenerico } from "@/lib/whatsapp";

/** Clipped word wrapper for the GSAP page-load reveal. */
function Word({ children }: { children: React.ReactNode }) {
  return (
    <span className="split-word" data-hero-word>
      <span>{children}</span>
    </span>
  );
}

export function Hero() {
  return (
    <section className={styles.hero} id="top" data-hero>
      <div className={styles.bg} aria-hidden="true" data-hero-bg />

      <div className={styles.inner}>
        <div className={styles.copy}>
          <h1 className={styles.title}>
            <span className={styles.titleLine}>
              <Word>Algo</Word>{" "}
              <Word><em>dulce</em>,</Word>
            </span>
            <span className={styles.titleLine}>
              <Word>hecho</Word>{" "}
              <Word>con</Word>{" "}
              <Word><em>tiempo</em>.</Word>
            </span>
          </h1>

          <p className={styles.lead} data-hero-el>
            Repostería artesanal por encargo en {SITE.zona}.
          </p>

          <div className={styles.actions} data-hero-el>
            <WhatsAppButton mensaje={mensajeGenerico()} label="Hacer un pedido" size="lg" />
            <a href="#productos" className={styles.inlineLink}>
              <span>Ver la carta</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
        </div>

        <aside className={styles.seal} data-hero-el aria-hidden="true">
          <div className={styles.sealRing}>
            <Image
              src="/logo-muffin.svg"
              alt=""
              width={420}
              height={420}
              priority
              className={styles.sealLogo}
            />
          </div>
          <div className={styles.sealCaption}>
            <span className={styles.sealMark}>Dolce Moni</span>
            <span className={styles.sealSub}>Repostería · MMXXVI</span>
          </div>
        </aside>
      </div>
    </section>
  );
}
