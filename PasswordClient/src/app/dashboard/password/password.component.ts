import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../layouts/header/header.component';
import { CardComponent } from '../../components/card/card.component';
import { FooterComponent } from '../../layouts/footer/footer.component';
import { PasswordService } from '../../services/password.service';
import { Password } from '../../interfaces/password';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { paginate } from '../../utils/pagination.util';

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
  route = inject(ActivatedRoute); // nuevo
  // Arrays
  passwords: Password[] = [];
  paginatedPasswords: Password[] = [];
  // Propiedad de paginación
  currentPage = 1;
  itemsPerPage = 4;

  // Se ejecuta al inicializar el componente
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const category = params['category'];
      this.currentPage = 1;
      this.loadPasswords(undefined, category);
    });
  }

  // Método para carga los datos
  loadPasswords(term?: string, category?: string): void {
    this.passwordService.getAll(term, category).subscribe({
      next: (res) => {
        this.passwords = res;
        this.setPaginatedPasswords();
      },
      error: (err) => {
        console.error('Error al cargar las contraseñas', err);
      },
    });
  }

  // Método para buscar
  onSearch(term: string): void {
    console.log('Searching for:', term);
    this.currentPage = 1;
    this.route.queryParams.subscribe((params) => {
      const category = params['category'];
      this.loadPasswords(term, category || undefined);
    });
  }

  // Para paginar en frontend
  // Método para colocar la paginación
  setPaginatedPasswords(): void {
    // Asignamos al util
    this.paginatedPasswords = paginate(this.passwords, this.currentPage, this.itemsPerPage);
  }

  // Ir a la pagina
  goToPage(page: number): void {
    this.currentPage = page;
    this.setPaginatedPasswords();
  }

  // Total de paginas
  get totalPages(): number {
    return Math.ceil(this.passwords.length / this.itemsPerPage);
  }
  
}
