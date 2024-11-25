// src/app/services/categoria.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../entitys/categoria.entity';

import { Trabajo } from '../entitys/trabajo.entity';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  private readonly apiUrl = 'http://localhost:8080/categoria'; // URL base del backend para categorías


  constructor(private readonly http: HttpClient) {}

  // Obtener todos los trabajos
  listarTrabajos(): Observable<Trabajo[]> {
    return this.http.get<Trabajo[]>(`${this.apiUrl}/trabajo/listar`);
  }

  // Crear un nuevo trabajo
  crearTrabajo(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/trabajo/crear`, formData);
  }

  // Obtener todas las categorías
  listarCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.apiUrl}/categoria/listar`);
  }
}
