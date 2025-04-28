import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../layouts/header/header.component';
import { CardComponent } from '../../components/card/card.component';
import { FooterComponent } from '../../layouts/footer/footer.component';
import { PasswordService } from '../../services/password.service';
import { Password } from '../../interfaces/password';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-password',
  imports: [CommonModule,HeaderComponent, CardComponent, FooterComponent],
  templateUrl: './password.component.html',
  styleUrl: './password.component.css',
})
export class PasswordComponent implements OnInit{
  passwordService = inject(PasswordService);
  router = inject(Router);
  passwords: Password[] = [];

  // Método de ciclo de vida
  // Se ejecuta al inicializar el componente
  ngOnInit(): void {
    this.loadPasswords();
  }

  // Carga la lista de contraseñas
  loadPasswords(term?: string): void {
    this.passwordService.getAll(term).subscribe({
      next: (res) => {
        console.log('Contraseñas recibidas:', res);
        this.passwords = res;
      },
      error: (err) => {
        console.error('Error al cargar las contraseñas', err);
      },
    });
  }

  // Método para buscar
  onSearch(term: string): void {
    this.loadPasswords(term);
  }

}
