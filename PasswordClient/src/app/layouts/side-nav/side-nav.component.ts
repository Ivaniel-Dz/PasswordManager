import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { JwtService } from '../../services/jwt.service';
import { Usuario } from '../../interfaces/usuario';

@Component({
  selector: 'app-side-nav',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export class SideNavComponent  implements OnInit {
  // Intención de dependencias
  private usuarioService = inject(UsuarioService);
  private jwtService = inject(JwtService);
  private router = inject(Router);

  perfil!: Usuario;

  constructor() {}

  ngOnInit(): void {
    this.perfilNav();
  }

  // Datos para el SideNav
  perfilNav(): void {
    this.usuarioService.getPerfil().subscribe({
      next: (usuario) => {
        this.perfil = usuario;
      },
      error: (err) => {
        console.error('Usuario no encontrado',err);
      }
    });
  }

  // Método para cerrar sesión
  close() {
    this.jwtService.logout();
    this.router.navigate(['/auth/login'])
  }

}
