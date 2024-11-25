// src/app/models/usuario.dto.ts
export interface UsuarioDTO {
  nombre: string;
  apellido: string;
  fechanaci: Date;
  dni: string;
  direccion: string;
  telefono: string;
  correo: string;
  contrasena: string;
  cv: Uint8Array;
}
