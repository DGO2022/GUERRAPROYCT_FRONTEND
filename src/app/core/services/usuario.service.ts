// src/app/services/usuario.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../entitys/usuario.entity';
import { UsuarioDTO } from '../dto/usuario.dto';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private readonly apiUrl = 'http://localhost:8080/usuario'; // URL base del backend para usuarios

  constructor(private readonly http: HttpClient) {}

  // Obtener todos los usuarios
  listarUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/listar`);
  }

  // Crear un nuevo usuario
  crearUsuario(usuario: UsuarioDTO): Observable<any> {
    const formData = this.convertToFormData(usuario);
    return this.http.post(`${this.apiUrl}/crear`, formData);
  }

  // Actualizar un usuario por ID
  actualizarUsuario(id: number, usuario: UsuarioDTO): Observable<any> {
    const formData = this.convertToFormData(usuario);
    return this.http.put(`${this.apiUrl}/update/${id}`, formData);
  }

  // Eliminar un usuario por ID
  eliminarUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/borrar/${id}`);
  }

  // Método auxiliar para convertir un objeto a FormData
  private convertToFormData(object: any): FormData {
    const formData = new FormData();
    for (const key in object) {
      formData.append(key, object[key]);
    }
    return formData;
  }
}
