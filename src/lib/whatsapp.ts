import { CONTACT } from "./config";
import { precioDe, precioFormateadoDe, fmtARS } from "./precio";
import type { Producto } from "@/types/producto";

export function buildWhatsAppLink(mensaje: string): string {
  const text = encodeURIComponent(mensaje.trim());
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${text}`;
}

export function mensajeProducto(p: Producto, varianteElegida?: string | null): string {
  const variante = varianteElegida ? ` (${varianteElegida})` : "";
  const unidad = p.unidad ? ` por ${p.unidad}` : "";
  return [
    `¡Hola Dolce Moni!`,
    `Me interesa: ${p.nombre}${variante} — ${precioFormateadoDe(p, varianteElegida ?? null)}${unidad}.`,
    `¿Cómo coordinamos el pedido?`,
  ].join("\n");
}

export interface SeleccionLinea {
  producto: Producto;
  cantidad: number;
  variante: string | null;
}

export function mensajePedido(lineas: SeleccionLinea[]): string {
  if (lineas.length === 0) return "";
  const items = lineas.map((l) => {
    const variante = l.variante ? ` (${l.variante})` : "";
    return `• ${l.cantidad}× ${l.producto.nombre}${variante} — ${precioFormateadoDe(l.producto, l.variante)}`;
  });
  const total = lineas.reduce((sum, l) => sum + precioDe(l.producto, l.variante) * l.cantidad, 0);
  const totalFmt = fmtARS.format(total);
  return [
    `¡Hola Dolce Moni!`,
    `Quería hacer un pedido:`,
    ``,
    ...items,
    ``,
    `Total estimado: ${totalFmt}`,
    `¿Cómo coordinamos fecha y entrega?`,
  ].join("\n");
}

export function mensajeMayorista(): string {
  return [
    `¡Hola Dolce Moni!`,
    `Tengo un comercio / kiosco y me gustaría consultar condiciones para revendedores.`,
    `¿Me podrían pasar la información?`,
  ].join("\n");
}

export function mensajeGenerico(): string {
  return `¡Hola Dolce Moni! Quería hacer una consulta sobre los productos.`;
}
