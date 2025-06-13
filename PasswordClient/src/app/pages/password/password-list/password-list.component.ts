import { Component, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Password } from '../../../interfaces/password';
import { PasswordService } from '../../../services/password.service';
import { paginate } from '../../../utils/pagination.util';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../components/card/card.component';
import { FooterComponent } from '../../../layouts/footer/footer.component';
import { HeaderComponent } from '../../../layouts/header/header.component';

@Component({
  selector: 'app-password-list',
  imports: [CommonModule, HeaderComponent, CardComponent, FooterComponent],
  templateUrl: './password-list.component.html',
  styleUrl: './password-list.component.css',
})
export class PasswordListComponent implements OnInit {
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
  ngOnInit(): void {}

  // Método para carga los datos
  loadPasswords(term?: string, category?: string): void {}

  // Método para buscar
  onSearch(term: string): void {}

  // Para paginar en frontend
  // Método para colocar la paginación
  setPaginatedPasswords(): void {
    // Asignamos al util
    this.paginatedPasswords = paginate(
      this.passwords,
      this.currentPage,
      this.itemsPerPage
    );
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
