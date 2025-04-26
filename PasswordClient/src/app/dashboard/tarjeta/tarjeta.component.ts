import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../layouts/header/header.component';
import { TableComponent } from '../../components/table/table.component';
import { FooterComponent } from '../../layouts/footer/footer.component';
import { TarjetaService } from '../../services/tarjeta.service';
import { Tarjeta } from '../../interfaces/tarjeta';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tarjeta',
  imports: [CommonModule, FormsModule,HeaderComponent, TableComponent, FooterComponent],
  templateUrl: './tarjeta.component.html',
  styleUrl: './tarjeta.component.css',
})
export class TarjetaComponent implements OnInit {
  tarjetaService = inject(TarjetaService);
  tarjetas: Tarjeta[] = [];
  term: string = '';

  ngOnInit(): void {
    this.loadTarjetas();
  }

  // Carga la lista de Tarjetas
  loadTarjetas(): void {
    this.tarjetaService.getAll(this.term).subscribe({
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
  onSearch(): void {
    this.loadTarjetas();
  }
}
