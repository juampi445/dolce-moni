"use client";

import { useState } from "react";
import styles from "./ProductCard.module.scss";
import { ProductImage } from "./ProductImage";
import { buildWhatsAppLink, mensajeProducto } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { useOrder } from "@/components/order/OrderContext";
import { precioCardLabel } from "@/lib/precio";
import type { Producto } from "@/types/producto";

interface Props { producto: Producto }

function deriveMonogram(nombre: string): string {
  // First two letters of the first significant word, lowercased.
  const word = nombre.replace(/[^\p{L}\s]/gu, "").split(/\s+/).find(Boolean) ?? nombre;
  return word.slice(0, 2).toLowerCase();
}

export function ProductCard({ producto }: Props) {
  const { add } = useOrder();
  const [variante, setVariante] = useState<string | null>(null);

  const variantRequired = !!producto.variantes && producto.variantes.length > 0;
  const canAdd = !variantRequired || variante !== null;

  return (
    <article className={styles.card}>
      <ProductImage
        imagenes={producto.imagenes}
        alt={producto.alt}
        monogram={deriveMonogram(producto.nombre)}
      />

      <div className={styles.body}>
        <header className={styles.head}>
          <h3 className={styles.name}>{producto.nombre}</h3>
          <div>
            <p className={styles.price}>{precioCardLabel(producto, variante)}</p>
            {producto.unidad && <span className={styles.unit}>{"/ "}{producto.unidad}</span>}
          </div>
        </header>

        <p className={styles.desc}>{producto.descripcionBreve}</p>

        {producto.incluye && producto.incluye.length > 0 && (
          <ul className={styles.includes}>
            {producto.incluye.map((i) => <li key={i}>{i}</li>)}
          </ul>
        )}

        {producto.variantes && producto.variantes.length > 0 && (
          <fieldset className={styles.variantSelect}>
            <legend className="sr-only">Elegí una variante de {producto.nombre}</legend>
            {producto.variantes.map((v) => (
              <button
                key={v}
                type="button"
                className={styles.variant}
                aria-pressed={variante === v}
                onClick={() => setVariante((cur) => (cur === v ? null : v))}
              >
                {v}
              </button>
            ))}
          </fieldset>
        )}
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.add}
          disabled={!canAdd}
          onClick={() => add(producto, variante)}
          aria-label={`Agregar ${producto.nombre} al pedido`}
        >
          {variantRequired && !canAdd ? "Elegí una variante" : "Agregar al pedido"}
        </button>
        <a
          className={styles.consult}
          href={buildWhatsAppLink(mensajeProducto(producto, variante))}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Consultar ${producto.nombre} por WhatsApp`}
        >
          <WhatsAppIcon />
          Consultar
        </a>
      </div>
    </article>
  );
}
