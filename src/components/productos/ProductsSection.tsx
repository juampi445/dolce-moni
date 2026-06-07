"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./ProductsSection.module.scss";
import { ProductCard } from "./ProductCard";
import { productos } from "@/lib/productos";
import { CATEGORIAS, type Categoria } from "@/types/producto";

type Filter = "Todos" | Categoria;
const FILTERS: Filter[] = ["Todos", ...CATEGORIAS];

function isFilter(x: unknown): x is Filter {
  return x === "Todos" || (typeof x === "string" && (CATEGORIAS as readonly string[]).includes(x));
}

export function ProductsSection() {
  const [filter, setFilter] = useState<Filter>("Todos");

  // Listen for filter intents from elsewhere on the page (footer category links).
  useEffect(() => {
    const handler = (e: Event) => {
      const next = (e as CustomEvent).detail;
      if (isFilter(next)) setFilter(next);
    };
    window.addEventListener("dm:filter", handler as EventListener);
    return () => window.removeEventListener("dm:filter", handler as EventListener);
  }, []);

  const visibles = useMemo(() => {
    const list = productos.filter((p) => p.disponible);
    return filter === "Todos" ? list : list.filter((p) => p.categoria === filter);
  }, [filter]);

  return (
    <section className={styles.section} id="productos" aria-labelledby="productos-title">
      <header className={styles.head}>
        <p className={styles.eyebrow} data-reveal>La carta</p>
        <h2 id="productos-title" className={styles.title} data-reveal>
          Hecho a mano, en generosas y riquísimas porciones.
        </h2>
        <p className={styles.lead} data-reveal>
          Elegí lo que más te tienta. Agregalo a tu pedido o consultalo directo por WhatsApp,
          como te resulte más cómodo.
        </p>
      </header>

      <div className={styles.filterRow}>
        <div className={styles.filters} role="tablist" aria-label="Filtrar por categoría">
          {FILTERS.map((f) => (
            <button
              key={f}
              role="tab"
              type="button"
              className={styles.filter}
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
        <span className={styles.count} aria-live="polite">
          {visibles.length} {visibles.length === 1 ? "producto" : "productos"}
        </span>
      </div>

      {visibles.length === 0 ? (
        <div className={styles.empty}>No hay productos en esta categoría por ahora.</div>
      ) : (
        <div className={styles.grid} key={filter}>
          {visibles.map((p) => <ProductCard key={p.id} producto={p} />)}
        </div>
      )}
    </section>
  );
}
