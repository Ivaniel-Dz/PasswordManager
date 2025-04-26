import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { JwtService } from '../../services/jwt.service';

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

  perfil: any = {};

  constructor() {}

  ngOnInit(): void {
    this.perfilNav();
  }

  // Datos para el SideNav
  perfilNav(): void {
    this.usuarioService.getPerfil().subscribe({
      next: (res) => {
        this.perfil = res.response; // perfil = response<Usuario>
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
