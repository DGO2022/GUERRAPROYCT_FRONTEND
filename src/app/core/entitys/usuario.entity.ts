import { Trabajo } from './trabajo.entity';
// usuario.entity.ts
export interface Usuario {
  id_usuario: number;
  nombre: string;
  apellido: string;
  fechanaci: Date;
  dni: string;
  direccion: string;
  telefono: string;
  correo: string;
  contrasena: string;
  cv: Uint8Array;
  trabajo: Trabajo[];

}



