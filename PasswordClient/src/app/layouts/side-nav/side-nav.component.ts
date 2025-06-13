import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-side-nav',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export class SideNavComponent  implements OnInit {
  // Intención de dependencias
  private usuarioService = inject(UsuarioService);
  private router = inject(Router);

  perfil: any = {};

  constructor() {}

  ngOnInit(): void {
    this.perfilNav();
  }

  // Datos para el SideNav
  perfilNav(): void {
    
  }

  // Método para cerrar sesión
  close() {
    this.router.navigate(['/auth/login'])
  }

}
