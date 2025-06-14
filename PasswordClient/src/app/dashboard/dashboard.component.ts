import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  // Intención de dependencias
  private usuarioService = inject(UsuarioService);
  private router = inject(Router);
  userName: string = '';
  userEmail: string = '';

  ngOnInit(): void {
    this.perfilNav();
  }

  // Datos para el SideNav
  perfilNav(): void {
    const user = this.usuarioService.getUser();
    if (user) {
      (this.userName = user.nombre), (this.userEmail = user.correo);
    }
  }

  // Método para cerrar sesión
  close() {
    this.usuarioService.restoreStorage();
    this.router.navigate(['/auth/login']);
  }
}
