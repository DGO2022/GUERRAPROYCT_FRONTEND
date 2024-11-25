import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/usuario'; // Cambia la URL si es diferente

  constructor(private http: HttpClient) {}

  // Método para iniciar sesión
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, {
      correo: email,
      contrasena: password,
    });
  }

  // Método para registrar un nuevo usuario
  signUp(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/crear`, userData);
  }
}
