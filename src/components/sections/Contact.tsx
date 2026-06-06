import styles from "./Contact.module.scss";
import { CONTACT, SITE } from "@/lib/config";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { buildWhatsAppLink, mensajeGenerico } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export function Contact() {
  return (
    <section className={styles.section} id="contacto" aria-labelledby="contacto-title">
      <div className={styles.grid}>
        <div data-reveal>
          <p className={styles.eyebrow}>Contacto</p>
          <h2 id="contacto-title" className={styles.title}>
            Hablemos por WhatsApp.
          </h2>
          <p className={styles.body}>
            Te respondemos en el día. Si querés, contanos para qué fecha y cuántas personas son,
            y armamos juntos lo que mejor se adapte.
          </p>
          <div className={styles.cta}>
            <WhatsAppButton mensaje={mensajeGenerico()} label="Escribir por WhatsApp" size="lg" />
          </div>
        </div>

        <ul className={styles.list} data-reveal>
          <li className={styles.item}>
            <span className={styles.icon} aria-hidden="true">
              <WhatsAppIcon size={18} />
            </span>
            <div>
              <div className={styles.label}>WhatsApp</div>
              <div className={styles.value}>
                <a href={buildWhatsAppLink(mensajeGenerico())} target="_blank" rel="noopener noreferrer">
                  {CONTACT.whatsappDisplay}
                </a>
              </div>
            </div>
          </li>

          <li className={styles.item}>
            <span className={styles.icon} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
            </span>
            <div>
              <div className={styles.label}>Instagram</div>
              <div className={styles.value}>
                <a href={CONTACT.instagramUrl} target="_blank" rel="noopener noreferrer">
                  @{CONTACT.instagram}
                </a>
              </div>
            </div>
          </li>

          <li className={styles.item}>
            <span className={styles.icon} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 7-8 12-8 12s-8-5-8-12a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            </span>
            <div>
              <div className={styles.label}>Zona</div>
              <div className={styles.value}>{SITE.zona}</div>
              <p className={styles.note}>
                Envíos gratuitos a coordinar dentro de la localidad.<br />
                Pedidos grandes a localidades cercanas, a coordinar.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
