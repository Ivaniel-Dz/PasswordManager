import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../layouts/header/header.component';
import { TableComponent } from '../../components/table/table.component';
import { FooterComponent } from '../../layouts/footer/footer.component';
import { TarjetaService } from '../../services/tarjeta.service';
import { Tarjeta } from '../../interfaces/tarjeta';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tarjeta',
  imports: [CommonModule,FormsModule,HeaderComponent,TableComponent,FooterComponent],
  templateUrl: './tarjeta.component.html',
  styleUrl: './tarjeta.component.css',
})
export class TarjetaComponent implements OnInit {
  tarjetaService = inject(TarjetaService);
  tarjetas: Tarjeta[] = [];
  router = inject(Router);

  // Método de ciclo de vida
  // Se ejecuta al inicializar el componente
  ngOnInit(): void {
    this.loadTarjetas();
  }

  // Carga la lista de Tarjetas
  loadTarjetas(term?: string): void {
    this.tarjetaService.getAll(term).subscribe({
      next: (res) => {
        console.log('Tarjetas recibidas:', res);
        this.tarjetas = res;
      },
      error: (err) => {
        console.error('Error cargando tarjetas', err);
      },
    });
  }

  // Método para buscar
  onSearch(term: string): void {
    this.loadTarjetas(term);
  }

  // Método para eliminar
  onDelete(id: number): void {
    if (confirm('¿Está seguro de eliminar la tarjeta?')) {
      this.tarjetaService.delete(id).subscribe({
        next: (res) => {
          if (res.isSuccess) {
            alert(res.message);
            this.router.navigate(['/dashboard/tarjetas']);
          }
        },
        error: (err) => console.error(err),
      });
    }
  }
  
}
