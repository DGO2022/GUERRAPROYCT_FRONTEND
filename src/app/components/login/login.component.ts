import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  isLogin: boolean = true;

  // Variables para almacenar datos de los formularios
  email: string = '';
  password: string = '';
  dob: string = '';
  location: string = '';
  firstName: string = '';
  lastName: string = '';
  phone: string = '';
  dni: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  toggleView(isLogin: boolean) {
    this.isLogin = isLogin;
  }

  onLoginSubmit() {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        console.log('Login exitoso:', response);
        this.router.navigate(['/home']); // Redirige a la ruta /home en caso de login exitoso
      },
      (error) => {
        console.error('Error en el login:', error);
        alert('Email o contraseña incorrectos');
      }
    );
  }

  onSignUpSubmit() {
    const userData = {
      nombre: this.firstName,
      apellido: this.lastName,
      fechanaci: this.dob,
      dni: this.dni, // Puedes capturar este campo o generar un valor predeterminado
      direccion: this.location,
      telefono: this.phone, // Similarmente, puedes capturarlo desde el formulario
      correo: this.email,
      contrasena: this.password,
      cv: Uint8Array, // Aquí podrías añadir la lógica para manejar el archivo del CV
    };

    this.authService.signUp(userData).subscribe(
      (response) => {
        console.log('Registro exitoso:', response);
        alert('Registro exitoso. Ahora puedes iniciar sesión.');
        this.toggleView(true); // Cambia a la vista de login
      },
      (error) => {
        console.error('Error en el registro:', error);
        alert('Hubo un error al registrarse. Inténtalo de nuevo.');
      }
    );
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    console.log('Archivo seleccionado:', file);
    // Lógica adicional para manejar el archivo (por ejemplo, CV o foto de perfil)
  }
}
