import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../../layouts/header/header.component';
import { PasswordService } from '../../../services/password.service';
import { Password } from '../../../interfaces/password';
import { CommonModule } from '@angular/common';
import { DataVisibilityComponent } from '../../../components/data-visibility/data-visibility.component';

@Component({
  selector: 'app-password-detail',
  imports: [CommonModule, RouterModule, HeaderComponent, DataVisibilityComponent],
  templateUrl: './password-detail.component.html',
  styleUrl: './password-detail.component.css',
})
export class PasswordDetailComponent implements OnInit {
  // Inyección de dependencias
  passwordService = inject(PasswordService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  password?: Password;

  // Se ejecuta al inicializar el componente
  ngOnInit(): void {
    this.detailPassword();
  }

  // Método para obtener los detalles
  detailPassword(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.passwordService.get(parseInt(id)).subscribe({
        next: (data) => {
          console.log('Contraseña recibida', data);
          this.password = data;
        },
        error: (err) => {
          console.error('Error al cargar los detalles', err);
          // redirigir si hay error
          this.router.navigate(['/dashboard/passwords']);
        },
      });
    } else {
      console.error('ID no encontrado en la URL');
      this.router.navigate(['/dashboard/passwords']); // Redireccionar si no hay id
    }
  }

  // Método para eliminar
  deletePassword(id: number): void {
    if (confirm('¿Está seguro de eliminar la contraseña?')) {
      this.passwordService.delete(id).subscribe({
        next: (res) => {
          if (res.isSuccess) {
            alert(res.message);
            this.router.navigate(['/dashboard/passwords']);
          }
        },
        error: (err) => console.error(err),
      });
    }
  }

}
