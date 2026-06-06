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
  incluye: string[] | null;
  disponible: boolean;
  orden: number;
}

export interface CatalogoFile {
  productos: Producto[];
}

export const CATEGORIAS: Categoria[] = ["Clásicos", "Tartas", "Budines"];
