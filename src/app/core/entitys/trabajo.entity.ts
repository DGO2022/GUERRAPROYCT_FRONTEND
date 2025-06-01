import { Categoria } from './categoria.entity';
import { Usuario } from './usuario.entity';

export interface Trabajo {
  id_trabajo: number;
  titulo: string;
  detalle: string;
  imagen: File | null;
  usuario: Usuario;
  categoria: Categoria;
}
