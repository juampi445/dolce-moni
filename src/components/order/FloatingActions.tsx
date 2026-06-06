"use client";

import styles from "./FloatingActions.module.scss";
import { CONTACT } from "@/lib/config";
import { buildWhatsAppLink, mensajeGenerico } from "@/lib/whatsapp";
import { useOrder } from "./OrderContext";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { InstagramIcon } from "@/components/ui/InstagramIcon";

export function FloatingActions() {
  const { count, open } = useOrder();
  return (
    <div className={styles.dock}>
      <a
        href={buildWhatsAppLink(mensajeGenerico())}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.fab} ${styles.whatsapp}`}
        aria-label="Abrir chat de WhatsApp con Dolce Moni"
      >
        <WhatsAppIcon size={20} />
      </a>

      <a
        href={CONTACT.instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.fab} ${styles.instagram}`}
        aria-label={`Abrir Instagram de Dolce Moni: @${CONTACT.instagram}`}
      >
        <InstagramIcon size={20} />
      </a>

      {count > 0 && (
        <button
          type="button"
          className={`${styles.fab} ${styles.cart} ${styles.cartEnter}`}
          onClick={open}
          aria-label={`Ver tu pedido (${count} ${count === 1 ? "producto" : "productos"})`}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 6h15l-1.6 10.6A2 2 0 0 1 16.4 18.4H7.6a2 2 0 0 1-2-1.7L4 4H2" />
            <circle cx="9" cy="21" r="1.2" />
            <circle cx="17" cy="21" r="1.2" />
          </svg>
          <span className={styles.count}>{count}</span>
        </button>
      )}
    </div>
  );
}
