import { Component, inject, OnInit } from '@angular/core';
import { Tarjeta } from '../../../interfaces/tarjeta';
import { TarjetaService } from '../../../services/tarjeta.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../../layouts/header/header.component';
import { CommonModule } from '@angular/common';
import { DataVisibilityComponent } from '../../../components/data-visibility/data-visibility.component';

@Component({
  selector: 'app-tarjeta-detail',
  imports: [CommonModule, RouterModule, HeaderComponent, DataVisibilityComponent],
  templateUrl: './tarjeta-detail.component.html',
  styleUrl: './tarjeta-detail.component.css',
})
export class TarjetaDetailComponent implements OnInit {
  //Inyección de dependencias
  tarjetaService = inject(TarjetaService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  tarjeta?: Tarjeta;

  // Se ejecuta al inicializar el componente
  ngOnInit(): void {
    this.detailTarjeta();
  }

  // Método para obtener los detalles
  detailTarjeta(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.tarjetaService.get(parseInt(id)).subscribe({
        next: (data) => {
          console.log('Tarjeta recibida', data);
          this.tarjeta = data;
        },
        error: (err) => {
          console.error('Error al cargar los detalles', err);
          // redirigir si hay error
          this.router.navigate(['/dashboard/tarjetas']);
        },
      });
    } else {
      console.error('ID no encontrado en la URL');
      this.router.navigate(['/dashboard/tarjetas']); // Redireccionar si no hay id
    }
  }
  
}
