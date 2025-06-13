import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from '../../../components/card/card.component';
import { Password } from '../../../interfaces/password';
import { FooterComponent } from '../../../layouts/footer/footer.component';
import { HeaderComponent } from '../../../layouts/header/header.component';
import { PasswordService } from '../../../services/password.service';
import { SearchService } from '../../../services/search.service';
import { paginate } from '../../../utils/pagination.util';

@Component({
  selector: 'app-password-list',
  imports: [CommonModule, HeaderComponent, CardComponent, FooterComponent],
  templateUrl: './password-list.component.html',
  styleUrl: './password-list.component.css',
})
export class PasswordListComponent implements OnInit {
  // Inyección de dependencias
  private passwordService = inject(PasswordService);
  private searchService = inject(SearchService);
  passwords: Password[] = [];
  filteredPassword: Password[] = [];
  paginatedPasswords: Password[] = [];
  // Propiedad de paginación
  currentPage = 1;
  itemsPerPage = 4;

  // Se ejecuta al inicializar el componente
  ngOnInit(): void {
    this.loadPasswords();
  }

  // Método para carga los datos
  loadPasswords(): void {
    this.passwords = this.passwordService.getAll();
    this.filteredPassword = [...this.passwords];
    this.setPaginatedPasswords();
  }

  // Método para buscar
  onSearch(term: string): void {
    this.currentPage = 1;
    this.filteredPassword = this.searchService.filter(this.passwords, term, [
      'nombre',
      'url',
      'userEmail',
      'fechaCreacion',
      'fechaActualizacion',
      'categoria',
      'notas',
    ]);
    this.setPaginatedPasswords();
  }

  // Método para colocar la paginación
  setPaginatedPasswords(): void {
    // Asignamos al util
    this.paginatedPasswords = paginate(
      this.filteredPassword,
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