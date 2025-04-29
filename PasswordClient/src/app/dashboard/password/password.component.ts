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
export class PasswordComponent implements OnInit {
  // Inyección de dependencias
  passwordService = inject(PasswordService);
  router = inject(Router);
  // Arrays
  passwords: Password[] = [];
  paginatedPasswords: Password[] = [];

  // paginación
  currentPage: number = 1;
  itemsPerPage: number = 4;

  // Se ejecuta al inicializar el componente
  ngOnInit(): void {
    this.loadPasswords();
  }

  // Carga los datos de la tabla
  loadPasswords(term?: string): void {
    this.passwordService.getAll(term).subscribe({
      next: (res) => {
        this.passwords = res;
        this.setPaginatedPasswords();
      },
      error: (err) => {
        console.error('Error al cargar las contraseñas', err);
      },
    });
  }

  // para paginar en frontend
  setPaginatedPasswords(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedPasswords = this.passwords.slice(start, end);
  }

  // Métodos para cambiar de página
  goToPage(page: number): void {
    this.currentPage = page;
    this.setPaginatedPasswords();
  }

  // Siguiente Pagina
  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.setPaginatedPasswords();
    }
  }

  // Pagina anterior
  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.setPaginatedPasswords();
    }
  }

  // Obtener las total de paginas
  get totalPages(): number {
    return Math.ceil(this.passwords.length / this.itemsPerPage);
  }

  // Obtener total de paginas
  get totalPagesArray(): number[] {
    return Array(this.totalPages).fill(0).map((_, i) => i + 1);
  }

  // Método de búsqueda
  onSearch(term: string): void {
    this.currentPage = 1; // volver a la primera página en búsqueda
    this.loadPasswords(term);
  }
  
}

