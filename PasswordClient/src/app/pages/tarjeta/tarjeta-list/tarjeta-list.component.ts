import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { TableComponent } from '../../../components/table/table.component';
import { Tarjeta } from '../../../interfaces/tarjeta';
import { FooterComponent } from '../../../layouts/footer/footer.component';
import { HeaderComponent } from '../../../layouts/header/header.component';
import { SearchService } from '../../../services/search.service';
import { TarjetaService } from '../../../services/tarjeta.service';
import { paginate } from '../../../utils/pagination.util';
import { confirmDialog, showToastAlert } from '../../../utils/sweet-alert.util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tarjeta-list',
  // prettier-ignore
  imports: [ CommonModule, HeaderComponent, TableComponent, FooterComponent ],
  templateUrl: './tarjeta-list.component.html',
  styleUrl: './tarjeta-list.component.css',
})
export class TarjetaListComponent implements OnInit {
  // Inyección de servicios
  private tarjetaService = inject(TarjetaService);
  private searchService = inject(SearchService);
  private router = inject(Router);
  // Propiedades
  tarjetas: Tarjeta[] = [];
  filteredTarjeta: Tarjeta[] = [];
  paginatedTarjetas: Tarjeta[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 8;

  // Inicia al cargar el componente
  async ngOnInit(): Promise<void> {
    await this.tarjetaService.init(); // Espera la inicialización
    this.loadTarjetas();
  }

  loadTarjetas(): void {
    this.tarjetas = this.tarjetaService.getAll();
    this.filteredTarjeta = [...this.tarjetas];
    this.setPaginatedTarjeta();
  }

  onSearch(term: string): void {
    this.currentPage = 1;
    this.filteredTarjeta = this.searchService.filter(this.tarjetas, term, [
      'nombre',
      'numeracion',
      'red',
      'tipo',
      'titular',
      'fechaExpiracion',
    ]);
    this.setPaginatedTarjeta();
  }

  onDelete(id: number): void {
    confirmDialog('¿Estás seguro?', 'Esta acción eliminará la tarjeta.').then(
      (confirmed) => {
        if (confirmed) {
          showToastAlert('Eliminada Correctamente', 'success');
          this.tarjetaService.delete(id);
          this.loadTarjetas();
        }
      }
    );
  }

  setPaginatedTarjeta(): void {
    this.paginatedTarjetas = paginate(
      this.filteredTarjeta,
      this.currentPage,
      this.itemsPerPage
    );
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.setPaginatedTarjeta();
  }

  get totalPages(): number {
    return Math.ceil(this.filteredTarjeta.length / this.itemsPerPage);
  }
}
