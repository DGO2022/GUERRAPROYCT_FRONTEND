import { Component, OnInit } from '@angular/core';
import { TrabajoService } from '../../../core/services/trabajo.service';
import { Trabajo } from '../../../core/entitys/trabajo.entity';
import { Categoria } from '../../../core/entitys/categoria.entity';
import { Usuario } from '../../../core/entitys/usuario.entity';

import { Router } from '@angular/router'; //


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  keyword: string = '';
  trabajos: Trabajo[] = [];
  trabajosFiltrados: Trabajo[] = [];
  categorias: Categoria[] = [];
  usuarios: Usuario[] = [];
  categoriaSeleccionada: string = '';
  isModalOpen: boolean = false;
  isMenuOpen: boolean = false;
  isNotificationsOpen = false; // Estado de las notificaciones
  notifications = [
    // Notificaciones de ejemplo
    {
      usuario: { nombre: 'Luis Avilenda', imagen: 'path_to_image' },
      detalle: 'Publicó oferta de trabajo',
      time: '10 h',
    },
    {
      usuario: { nombre: 'Fiorella Saule', imagen: 'path_to_image' },
      detalle: 'Te envió petición',
      time: '12 h',
    },
    // Añade más notificaciones aquí
  ];
  
  // Inicializar los datos del nuevo trabajo sin el campo cv
  nuevoTrabajo = {
    titulo: '',
    detalle:'',
    usuario: { id_usuario: null },
    categoria: { id_categoria: null },
  };

  constructor(private trabajoService: TrabajoService, private router: Router) {}

  ngOnInit(): void {
    this.listarTrabajos();
    this.obtenerCategorias();
    this.obtenerUsuarios();
  }

  // Abrir el modal
  openModal(): void {
    this.isModalOpen = true;
  }

  // Cerrar el modal y resetear el nuevo trabajo
  closeModal(): void {
    this.isModalOpen = false;
    this.resetNuevoTrabajo();
  }

  // Publicar un nuevo trabajo usando los datos del modal
  publicarTrabajo(): void {
    // Crear el objeto JSON para enviar al backend sin cv
    const trabajoData = {
      titulo: this.nuevoTrabajo.titulo,
      detalle: this.nuevoTrabajo.detalle,
      usuario: { id_usuario: this.nuevoTrabajo.usuario.id_usuario },
      categoria: { id_categoria: this.nuevoTrabajo.categoria.id_categoria },
    };

    this.trabajoService.crearTrabajo(trabajoData).subscribe(
      (response) => {
        console.log('Trabajo creado exitosamente:', response);
        this.listarTrabajos(); // Actualizar la lista de trabajos
        this.closeModal(); // Cerrar el modal después de crear
      },
      (error) => {
        console.error('Error al crear trabajo', error);
      }
    );
  }

  listarTrabajos(): void {
    this.trabajoService.listarTrabajos().subscribe(
      (data) => {
        this.trabajos = data;
        this.filtrarPorCategoria();
      },
      (error) => {
        console.error('Error al listar trabajos', error);
      }
    );
  }

  obtenerCategorias(): void {
    this.trabajoService.listarCategorias().subscribe(
      (data) => {
        this.categorias = data;
      },
      (error) => {
        console.error('Error al obtener categorías', error);
      }
    );
  }

  obtenerUsuarios(): void {
    this.trabajoService.listarUsuarios().subscribe(
      (data) => {
        this.usuarios = data;
      },
      (error) => {
        console.error('Error al obtener usuarios', error);
      }
    );
  }

  private resetNuevoTrabajo(): void {
    this.nuevoTrabajo = {
      titulo: '',
      detalle: '',
      usuario: { id_usuario: null },
      categoria: { id_categoria: null },
    };
  }

  // Función para abrir y cerrar el menú desplegable
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Método para cerrar sesión
  logout(): void {
    // Lógica para cerrar sesión, puede ser un servicio que borre el token o haga una solicitud al backend
    console.log('Cerrando sesión...');
    // Aquí puedes limpiar el almacenamiento local o realizar una solicitud de logout
    localStorage.removeItem('token'); // Ejemplo: eliminar token de sesión

    // Redirigir al usuario a la página de login
    this.router.navigate(['/login']); // Cambia la ruta según sea necesario
  }

  toggleNotifications(): void {
    this.isNotificationsOpen = !this.isNotificationsOpen;
  }

  // Filtrar trabajos por categoría seleccionada
  filtrarPorCategoria(): void {
    if (!this.categoriaSeleccionada || this.categoriaSeleccionada === '') {
      this.trabajosFiltrados = this.trabajos;
    } else {
      this.trabajosFiltrados = this.trabajos.filter(trabajo => trabajo.categoria && trabajo.categoria.nombreCategoria === this.categoriaSeleccionada);
    }
  }

  //METODO PARA BUSCAR TRABAJO CON BUSCADOR
  buscarTrabajos(): void {
    if (this.keyword.trim() === '') {
      this.listarTrabajos(); // Trae todos si el campo está vacío
    } else {
      this.trabajoService.buscarTrabajos(this.keyword.trim()).subscribe(
        (data) => {
          this.trabajos = data; // Aquí se asigna la lista filtrada
          this.filtrarPorCategoria();
        },
        (error) => {
          console.error('Error al buscar trabajos', error);
        }
      );
    }
  }

  // Método para eliminar un trabajo
eliminarTrabajo(id_trabajo: number): void {
  this.trabajoService.eliminarTrabajo(id_trabajo).subscribe(
    (response) => {
      console.log('Trabajo eliminado exitosamente:', response);
      this.listarTrabajos(); // Actualizar la lista de trabajos después de la eliminación
    },
    (error) => {
      console.error('Error al eliminar trabajo', error);
    }
  );
}
}