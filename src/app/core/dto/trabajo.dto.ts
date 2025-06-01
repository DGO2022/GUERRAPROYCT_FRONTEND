import { Categoria } from "../entitys/categoria.entity";
import { Usuario } from "../entitys/usuario.entity";

export interface TrabajoDTO {
  titulo: string;
  detalle: string;
  imagen: Uint8Array;
  usuario: Usuario;
  categoria: Categoria;

}
