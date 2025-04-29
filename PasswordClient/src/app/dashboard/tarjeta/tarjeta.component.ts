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

@Component({
  selector: 'app-tarjeta',
  imports: [CommonModule, FormsModule, HeaderComponent, TableComponent, FooterComponent],
  templateUrl: './tarjeta.component.html',
  styleUrl: './tarjeta.component.css',
})
export class TarjetaComponent implements OnInit {
  // Inyección de dependencias
  tarjetaService = inject(TarjetaService);
  router = inject(Router);
  // Arrays
  tarjetas: Tarjeta[] = [];
  paginatedTarjetas: Tarjeta[] = [];
  // Propiedad de paginación
  currentPage: number = 1;
  itemsPerPage: number = 7;

  // Se ejecuta al inicializar el componente
  ngOnInit(): void {
    this.loadTarjetas();
  }

  // Método para carga los datos
  loadTarjetas(term?: string): void {
    this.tarjetaService.getAll(term).subscribe({
      next: (res) => {
        console.log('Tarjetas recibidas:', res);
        this.tarjetas = res;
        this.setPaginatedTarjeta();
      },
      error: (err) => {
        console.error('Error cargando tarjetas', err);
      },
    });
  }

  // Método para buscar
  onSearch(term: string): void {
    this.currentPage = 1;
    this.loadTarjetas(term);
  }

  // Método para eliminar
  onDelete(id: number): void {
    // Instancia de util: sweet-alert
    confirmDialog('¿Estás seguro?', 'Esta acción eliminará la tarjeta.').then((confirmed) => {

      if (confirmed) {
        this.tarjetaService.delete(id).subscribe({
          next: (res) => {
            if (res.isSuccess) {
              // Instancia de sweet-alert
              showToastAlert(res.message ?? 'Eliminado correctamente', 'success');
              this.router.navigate(['/dashboard/tarjetas']);
            }
          },
          error: (err) => console.error(err),
        });
      }
    });
  }

  // Para paginar en frontend
  // Método para colocar la paginación
  setPaginatedTarjeta(): void {
    // Asignamos al util
    this.paginatedTarjetas = paginate(this.tarjetas, this.currentPage, this.itemsPerPage);
  }

  // Ir a la pagina
  goToPage(page: number): void {
    this.currentPage = page;
    this.setPaginatedTarjeta();
  }

  // Total de paginas
  get totalPages(): number {
    return Math.ceil(this.tarjetas.length / this.itemsPerPage);
  }

}
