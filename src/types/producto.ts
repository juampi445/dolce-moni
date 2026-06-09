export type Categoria = "Clásicos" | "Tartas" | "Budines";

export interface Producto {
  id: string;
  nombre: string;
  categoria: Categoria;
  descripcionBreve: string;
  descripcion: string;
  precio: number;
  precioFormateado: string;
  moneda: "ARS";
  unidad: string | null;
  imagenes: string[];
  alt: string;
  destacado: boolean;
  variantes: string[] | null;
  /**
   * Optional per-variant price overrides, keyed by the variant label.
   * When a selected variant is absent here, the base `precio` applies.
   */
  preciosVariante?: Record<string, number> | null;
  incluye: string[] | null;
  disponible: boolean;
  orden: number;
}

export interface CatalogoFile {
  productos: Producto[];
}

export const CATEGORIAS: Categoria[] = ["Clásicos", "Tartas", "Budines"];
