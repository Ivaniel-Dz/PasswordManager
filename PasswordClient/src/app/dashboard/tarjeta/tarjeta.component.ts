import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../layouts/header/header.component';
import { TableComponent } from '../../components/table/table.component';
import { FooterComponent } from '../../layouts/footer/footer.component';
import { TarjetaService } from '../../services/tarjeta.service';
import { Tarjeta } from '../../interfaces/tarjeta';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { paginate } from '../../utils/pagination.util';
// Utils
import { confirmDialog, showToastAlert } from '../../utils/sweet-alert.util';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-tarjeta',
  imports: [
    CommonModule,
    FormsModule,
    HeaderComponent,
    TableComponent,
    FooterComponent,
  ],
  templateUrl: './tarjeta.component.html',
  styleUrl: './tarjeta.component.css',
})
// ...existing code...
export class TarjetaComponent implements OnInit {
  private tarjetaService = inject(TarjetaService);
  private searchService = inject(SearchService);
  tarjetas: Tarjeta[] = [];
  filteredTarjeta: Tarjeta[] = [];
  paginatedTarjetas: Tarjeta[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 7;

  ngOnInit(): void {
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
          showToastAlert('Eliminada Correctamente','success')
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
