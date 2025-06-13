import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../layouts/header/header.component';
import { PasswordService } from '../../../services/password.service';
import { Password } from '../../../interfaces/password';
import { DataVisibilityComponent } from '../../../components/data-visibility/data-visibility.component';
// Utils
import { confirmDialog, showToastAlert } from '../../../utils/sweet-alert.util';

@Component({
  selector: 'app-password-detail',
  // prettier-ignore
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
  passwordId!: number;

  // Se ejecuta al inicializar el componente
  ngOnInit(): void {
    this.passwordId = Number(this.route.snapshot.paramMap.get('id'));
    this.detailPassword();
  }

  // Método para obtener los detalles
  detailPassword(): void {
    this.password = this.passwordService.getById(this.passwordId);
    if (!this.password) {
      this.router.navigate(['/dashboard/passwords']);
    }
  }

  // Método para eliminar
  onDelete(id: number): void {
    confirmDialog('¿Estás seguro?', 'Esta acción eliminará la contraseña.').then(
      (confirmed) => {
        if (confirmed) {
          showToastAlert('Eliminada Correctamente', 'success');
          this.passwordService.delete(id);
          this.router.navigate(['/dashboard/passwords'])
        }
      }
    );
  }

}
