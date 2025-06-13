import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-side-nav',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css',
})
export class SideNavComponent implements OnInit {
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
    this.router.navigate(['/auth/login']);
  }
}
