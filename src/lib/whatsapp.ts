import { CONTACT } from "./config";
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
    `Me interesa: ${p.nombre}${variante} — ${p.precioFormateado}${unidad}.`,
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
    return `• ${l.cantidad}× ${l.producto.nombre}${variante} — ${l.producto.precioFormateado}`;
  });
  const total = lineas.reduce((sum, l) => sum + l.producto.precio * l.cantidad, 0);
  const totalFmt = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(total);
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
