import data from "@/data/productos.json";
import type { Producto, Categoria } from "@/types/producto";
import { CATEGORIAS } from "@/types/producto";

interface RawJson {
  productos: unknown[];
}

function isProducto(x: unknown): x is Producto {
  if (typeof x !== "object" || x === null) return false;
  const p = x as Record<string, unknown>;
  return (
    typeof p.id === "string" &&
    typeof p.nombre === "string" &&
    typeof p.categoria === "string" &&
    CATEGORIAS.includes(p.categoria as Categoria) &&
    typeof p.descripcionBreve === "string" &&
    typeof p.descripcion === "string" &&
    typeof p.precio === "number" &&
    typeof p.precioFormateado === "string" &&
    Array.isArray(p.imagenes) &&
    typeof p.alt === "string" &&
    typeof p.destacado === "boolean" &&
    typeof p.disponible === "boolean" &&
    typeof p.orden === "number"
  );
}

function loadProductos(): Producto[] {
  const raw = data as RawJson;
  const valid = raw.productos.filter(isProducto);
  if (valid.length !== raw.productos.length) {
    const skipped = raw.productos.length - valid.length;
    // eslint-disable-next-line no-console
    console.warn(`[productos] ${skipped} entradas inválidas en productos.json`);
  }
  return valid.sort((a, b) => a.orden - b.orden);
}

export const productos: Producto[] = loadProductos();

export const productosDestacados = productos.filter((p) => p.destacado && p.disponible);

export function productosPorCategoria(c: Categoria): Producto[] {
  return productos.filter((p) => p.categoria === c && p.disponible);
}
