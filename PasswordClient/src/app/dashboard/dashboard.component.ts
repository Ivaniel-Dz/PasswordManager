import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit, OnDestroy {
  private usuarioService = inject(UsuarioService);
  private router = inject(Router);
  userName: string = '';
  userEmail: string = '';
  private userSub?: Subscription;

  ngOnInit(): void {
    this.userSub = this.usuarioService.user$.subscribe((user) => {
      this.userName = user.nombre;
      this.userEmail = user.correo;
    });
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }

  close() {
    this.usuarioService.restoreStorage();
    this.router.navigate(['/auth/login']);
  }
}
