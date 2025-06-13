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

  }

  // Método para eliminar
  deletePassword(id: number): void {
  }

}
