// src/app/services/trabajo.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trabajo } from '../entitys/trabajo.entity';
import { Categoria } from '../entitys/categoria.entity';
import { Usuario } from '../entitys/usuario.entity';
import { Mensaje } from '../entitys/mensaje.entity';

@Injectable({
  providedIn: 'root',
})
export class TrabajoService {
  private readonly apiUrl = 'http://localhost:8080';

  constructor(private readonly http: HttpClient) {}

  listarTrabajos(): Observable<Trabajo[]> {
    return this.http.get<Trabajo[]>(`${this.apiUrl}/trabajo/listar`);
  }

  crearTrabajo(trabajoData: any): Observable<Mensaje> {
    return this.http.post<Mensaje>(`${this.apiUrl}/trabajo/crear`, trabajoData);
  }

  listarCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.apiUrl}/categoria/listar`);
  }

  listarUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/usuario/listar`);
  }

  //Buscar trabjo con buscador
  buscarTrabajos(keyword: string): Observable<Trabajo[]> {
  return this.http.get<Trabajo[]>(`${this.apiUrl}/trabajo/buscar?keyword=${keyword}`);
  }
}
