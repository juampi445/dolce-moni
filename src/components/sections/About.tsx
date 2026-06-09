"use client";

import { useId, useState } from "react";
import styles from "./About.module.scss";
import { SITE } from "@/lib/config";
import { ShapeDivider } from "@/components/ui/ShapeDivider";

export function About() {
  const [expanded, setExpanded] = useState(false);
  const [signatureFailed, setSignatureFailed] = useState(false);
  const regionId = useId();

  return (
    <section className={styles.section} id="sobre-mi" aria-labelledby="sobre-mi-title">
      <ShapeDivider variant="curve" position="top" flipY />
      <ShapeDivider variant="curve" position="bottom" flipX />

      {/* Faint baking sprig, decorative, never announced. */}
      <Sprig className={styles.sprig} />

      <div className={styles.inner}>
        <header className={styles.head} data-reveal>
          <p className={styles.eyebrow}>Sobre mí</p>
          <h2 id="sobre-mi-title" className={styles.title}>
            Recetas heredadas, hechas con amor
          </h2>
          <span className={styles.ornament} aria-hidden="true">
            <i /><span className={styles.ornamentDot} /><i />
          </span>
        </header>

        <div className={styles.prose} data-reveal>
          <p className={styles.lead}>Bienvenidos a mi rincón dulce.</p>

          <p>
            El aroma a vainilla y azúcar horneándose tiene el poder mágico de hacerme viajar en el
            tiempo. Cada vez que enciendo el horno, regreso a la cocina de mi infancia. Allí estaba
            ella, mi mamá, con las manos manchadas de harina, una sonrisa enorme y esa paciencia
            infinita con la que me enseñaba que el ingrediente más importante nunca viene en un
            paquete: es el amor.
          </p>

          <p>
            De ella aprendí que un pastel no es solo comida. Es un abrazo en un día difícil, el
            centro de una celebración familiar y la excusa perfecta para reunir a los que más
            queremos.
          </p>

          <p>
            Hoy abro las puertas de esta página de repostería casera para compartir ese legado con
            ustedes. Cada torta, budín y postre que sale de mi cocina está hecho desde cero, con
            ingredientes frescos, técnicas tradicionales y ese toque de hogar que tanto nos cuida el
            alma.
          </p>

          {/* Smoothly-expanding region (grid-rows 0fr → 1fr). */}
          <div
            id={regionId}
            className={styles.more}
            data-expanded={expanded}
            role="region"
            aria-label="Continuación de la historia"
          >
            <div className={styles.moreInner} aria-hidden={!expanded}>
              <p>
                Ella me heredó sus recetas secretas, sus cuadernos anotados a mano y, sobre todo, la
                pasión por hornear recuerdos.
              </p>

              <p>
                Quiero que cada bocado los lleve de regreso a sus propios momentos felices. Gracias
                por permitirme formar parte de sus mesas y de sus recuerdos más dulces.
              </p>

              <p className={styles.closing}>Con todo mi cariño,</p>

              <figure className={styles.signature}>
                {signatureFailed ? (
                  <span className={styles.signatureFallback}>{SITE.name}</span>
                ) : (
                  <img
                    src="/assets/firma.png"
                    alt={`Firma de ${SITE.name}`}
                    width={260}
                    height={120}
                    loading="lazy"
                    decoding="async"
                    onError={() => setSignatureFailed(true)}
                  />
                )}
              </figure>
            </div>
          </div>

          {/* Toggle stays at the end (natural letter flow). */}
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.toggle}
              aria-expanded={expanded}
              aria-controls={regionId}
              onClick={() => setExpanded((v) => !v)}
            >
              <span>{expanded ? "Ver menos" : "Ver más"}</span>
              <svg
                className={styles.toggleIcon}
                data-expanded={expanded}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Delicate vanilla sprig — a quiet artisanal flourish. */
function Sprig({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 200"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M60 8C60 60 60 120 60 192" />
      <path d="M60 40C60 40 40 34 30 18M60 40C60 40 80 34 90 18" />
      <path d="M60 84C60 84 38 78 26 60M60 84C60 84 82 78 94 60" />
      <path d="M60 128C60 128 40 122 30 106M60 128C60 128 80 122 90 106" />
    </svg>
  );
}
