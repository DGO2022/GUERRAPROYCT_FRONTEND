import { Trabajo } from "./trabajo.entity";

// categoria.entity.ts
export interface Categoria {
  id_categoria: number; // Marca el id como opcional si es necesario
  nombreCategoria: string;
  trabajo: Trabajo[];
}
