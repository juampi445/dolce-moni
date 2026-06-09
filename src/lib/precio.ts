import type { Producto } from "@/types/producto";

export const fmtARS = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

function tieneOverride(p: Producto, variante: string | null): variante is string {
  return !!variante && !!p.preciosVariante && variante in p.preciosVariante;
}

/** Resolves the effective price for a product given the chosen variant. */
export function precioDe(p: Producto, variante: string | null): number {
  if (tieneOverride(p, variante)) return p.preciosVariante![variante];
  return p.precio;
}

/** Formatted effective price. Preserves the hand-written base format when no override applies. */
export function precioFormateadoDe(p: Producto, variante: string | null): string {
  if (tieneOverride(p, variante)) return fmtARS.format(p.preciosVariante![variante]);
  return p.precioFormateado;
}

/** True when variants carry different prices, so a single figure can't represent the product. */
export function tienePreciosVariables(p: Producto): boolean {
  if (!p.preciosVariante) return false;
  const precios = new Set<number>([p.precio, ...Object.values(p.preciosVariante)]);
  return precios.size > 1;
}

/**
 * Label for the product card header: the selected variant's price, or a
 * "desde {mínimo}" hint when prices vary and nothing is selected yet.
 */
export function precioCardLabel(p: Producto, variante: string | null): string {
  if (variante !== null) return precioFormateadoDe(p, variante);
  if (tienePreciosVariables(p)) {
    const min = Math.min(p.precio, ...Object.values(p.preciosVariante!));
    return `desde ${fmtARS.format(min)}`;
  }
  return p.precioFormateado;
}
