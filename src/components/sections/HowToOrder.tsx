import styles from "./HowToOrder.module.scss";
import { SITE } from "@/lib/config";
import { ShapeDivider } from "@/components/ui/ShapeDivider";

const steps = [
  {
    title: "Elegí tus productos",
    body: "Mirá la carta y armá lo que querés llevar. Podés sumar tantas variedades como quieras.",
  },
  {
    title: "Escribinos por WhatsApp",
    body: "Mandanos tu pedido en un mensaje. Si querés, sumá fotos o referencias de inspiración.",
  },
  {
    title: "Coordinamos la entrega",
    body: "Confirmamos disponibilidad, día de entrega y la forma de pago que más te convenga.",
  },
  {
    title: "Disfrutá tu pedido",
    body: "Lo retirás o te lo llevamos. Listo para compartir, recién hecho esa misma mañana.",
  },
];

const pad = (n: number) => String(n).padStart(2, "0");

export function HowToOrder() {
  return (
    <section className={styles.section} id="pedido" aria-labelledby="pedido-title">
      <ShapeDivider variant="curve" position="top" flipY />
      <ShapeDivider variant="curve" position="bottom" flipX />
      <div className={styles.inner}>
        <header className={styles.head}>
          <p className={styles.eyebrow} data-reveal>Cómo realizar un pedido</p>
          <h2 id="pedido-title" className={styles.title} data-reveal>
            Cuatro pasos, una conversación.
          </h2>
        </header>

        <ol className={styles.steps}>
          {steps.map((s, i) => (
            <li key={s.title} className={styles.step} data-reveal>
              <span className={styles.badge} aria-hidden="true">
                <span className={styles.badgeDot} />
                <span className={styles.badgeNum}>{pad(i + 1)}</span>
                <span>·</span>
                <span>Paso</span>
              </span>
              <h3 className={styles.stepTitle}>{s.title}</h3>
              <p className={styles.stepBody}>{s.body}</p>
            </li>
          ))}
        </ol>

        <aside className={styles.notice} role="note" data-reveal>
          <span className={styles.noticeIcon} aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" />
            </svg>
          </span>
          <div className={styles.noticeBody}>
            <strong>Pedimos {SITE.anticipacionDias} días de anticipación.</strong>
            <span>
              Así llegamos con todo recién hecho. Para fechas especiales, conviene avisar antes — los fines de semana se completan rápido.
            </span>
          </div>
          <div className={styles.noticeAsideWrap} aria-hidden="true">
            <div className={styles.noticeAside}>
              {SITE.anticipacionDias}d
              <small>mínimo</small>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
