"use client";

import { useEffect } from "react";
import styles from "./OrderPanel.module.scss";
import { useOrder } from "./OrderContext";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { mensajePedido } from "@/lib/whatsapp";

const fmtARS = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

export function OrderPanel() {
  const { items, count, totalARS, isOpen, close, remove, setCantidad, clear } = useOrder();

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  const lineasParaMensaje = items.map((l) => ({
    producto: l.producto,
    cantidad: l.cantidad,
    variante: l.variante,
  }));

  return (
    <>
      <div
        className={styles.scrim}
        data-open={isOpen}
        onClick={close}
        aria-hidden="true"
      />

      <aside
        className={styles.panel}
        data-open={isOpen}
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-panel-title"
        aria-hidden={!isOpen}
      >
        <header className={styles.head}>
          <h2 id="order-panel-title">Tu pedido</h2>
          <button type="button" className={styles.closeBtn} onClick={close} aria-label="Cerrar panel de pedido">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 6 12 12M6 18 18 6" />
            </svg>
          </button>
        </header>

        <div className={styles.body}>
          {items.length === 0 ? (
            <div className={styles.empty}>
              <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M14 32h36l-3 22a4 4 0 0 1-4 3.5H21a4 4 0 0 1-4-3.5L14 32Z" />
                <path d="M16 30c0-8 7-14 16-14s16 6 16 14" />
              </svg>
              <strong>Tu pedido está vacío</strong>
              <span>Sumá productos desde la carta para armar el mensaje.</span>
              <button type="button" className={styles.keepShopping} onClick={close}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                Ver la carta
              </button>
            </div>
          ) : (
            items.map((l) => (
              <article key={`${l.producto.id}::${l.variante ?? "default"}`} className={styles.line}>
                <div>
                  <div className={styles.name}>{l.producto.nombre}</div>
                  {l.variante && <div className={styles.variant}>{l.variante}</div>}
                </div>
                <div className={styles.price}>
                  {fmtARS.format(l.producto.precio * l.cantidad)}
                </div>
                <div className={styles.qty}>
                  <div className={styles.qtyControl}>
                    <button
                      type="button"
                      onClick={() => setCantidad(l.producto.id, l.variante, l.cantidad - 1)}
                      aria-label={`Restar una unidad de ${l.producto.nombre}`}
                    >−</button>
                    <span aria-live="polite">{l.cantidad}</span>
                    <button
                      type="button"
                      onClick={() => setCantidad(l.producto.id, l.variante, l.cantidad + 1)}
                      aria-label={`Sumar una unidad de ${l.producto.nombre}`}
                    >+</button>
                  </div>
                  <button
                    type="button"
                    className={styles.removeBtn}
                    onClick={() => remove(l.producto.id, l.variante)}
                  >
                    Quitar
                  </button>
                </div>
              </article>
            ))
          )}
        </div>

        <footer className={styles.foot}>
          <div className={styles.totals}>
            <span className={styles.totalLabel}>Total estimado</span>
            <span className={styles.totalValue}>{fmtARS.format(totalARS)}</span>
          </div>
          <p className={styles.note}>
            La confirmación final se hace por WhatsApp. Coordinamos fecha y entrega ahí.
          </p>
          <WhatsAppButton
            mensaje={mensajePedido(lineasParaMensaje)}
            label={`Enviar pedido (${count})`}
            size="lg"
            className={styles.send}
          />
          <button type="button" className={styles.keepShopping} onClick={close}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Seguir agregando productos
          </button>
          {items.length > 0 && (
            <button type="button" className={styles.clear} onClick={clear}>
              Vaciar pedido
            </button>
          )}
        </footer>
      </aside>
    </>
  );
}
