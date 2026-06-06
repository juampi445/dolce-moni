import styles from "./Wholesale.module.scss";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { mensajeMayorista } from "@/lib/whatsapp";

const bullets = [
  "Condiciones especiales para kioscos, comercios y revendedores.",
  "Productos seleccionados, cantidades pactadas por encargo.",
  "Coordinamos entrega y frecuencia según tu local.",
];

export function Wholesale() {
  return (
    <section className={styles.section} id="mayoristas" aria-labelledby="mayoristas-title">
      <div className={styles.box} data-reveal>
        <div>
          <p className={styles.eyebrow}>Mayoristas y comercios</p>
          <h2 id="mayoristas-title" className={styles.title}>
            ¿Tenés un kiosco o comercio?
          </h2>
          <p className={styles.body}>
            Trabajamos con revendedores en Adolfo Gonzales Chaves y zonas cercanas. Las condiciones
            se conversan según volumen y frecuencia — escribinos y armamos algo a tu medida.
          </p>
          <WhatsAppButton
            mensaje={mensajeMayorista()}
            label="Consultar condiciones"
            size="lg"
          />
        </div>

        <ul className={styles.list}>
          {bullets.map((b) => (
            <li key={b}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m5 12 5 5 9-11" />
              </svg>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
