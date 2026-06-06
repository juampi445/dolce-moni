"use client";

import Image from "next/image";
import styles from "./Footer.module.scss";
import { SITE, CONTACT } from "@/lib/config";
import { buildWhatsAppLink, mensajeGenerico } from "@/lib/whatsapp";
import type { Categoria } from "@/types/producto";

type FilterValue = "Todos" | Categoria;

function emitFilter(cat: FilterValue) {
  // Fire after the hash-jump scroll has been queued so the section is the
  // one being looked at when the filter updates.
  window.setTimeout(() => {
    window.dispatchEvent(new CustomEvent("dm:filter", { detail: cat }));
  }, 40);
}

function CatLink({ cat, children }: { cat: FilterValue; children: React.ReactNode }) {
  return (
    <a href="#productos" onClick={() => emitFilter(cat)}>
      {children}
    </a>
  );
}

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brandBlock}>
          <div className={styles.brand}>
            <div className={styles.brandLogo}>
              <Image src="/logo-muffin.svg" alt="" width={64} height={64} />
            </div>
            <div className={styles.brandText}>
              <span className={styles.brandName}>{SITE.name}</span>
              <span className={styles.brandKind}>Repostería</span>
            </div>
          </div>
          <p className={styles.tagline}>{SITE.tagline}</p>
        </div>

        <div className={styles.col}>
          <p className={styles.colTitle}>La carta</p>
          <ul>
            <li><CatLink cat="Todos">Todos los productos</CatLink></li>
            <li><CatLink cat="Clásicos">Clásicos</CatLink></li>
            <li><CatLink cat="Tartas">Tartas</CatLink></li>
            <li><CatLink cat="Budines">Budines</CatLink></li>
            <li><a href="#mayoristas">Mayoristas</a></li>
          </ul>
        </div>

        <div className={styles.col}>
          <p className={styles.colTitle}>Contacto</p>
          <ul>
            <li>
              <a href={buildWhatsAppLink(mensajeGenerico())} target="_blank" rel="noopener noreferrer">
                {CONTACT.whatsappDisplay}
              </a>
            </li>
            <li>
              <a href={CONTACT.instagramUrl} target="_blank" rel="noopener noreferrer">
                @{CONTACT.instagram}
              </a>
            </li>
            <li>{SITE.zona}</li>
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} {SITE.name}. Repostería artesanal.</span>
        <span>Hecho con cariño.</span>
      </div>
    </footer>
  );
}
