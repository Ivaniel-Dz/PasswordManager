import { Component, inject, OnInit } from '@angular/core';
import { Tarjeta } from '../../../interfaces/tarjeta';
import { TarjetaService } from '../../../services/tarjeta.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../../layouts/header/header.component';
import { CommonModule } from '@angular/common';
import { DataVisibilityComponent } from '../../../components/data-visibility/data-visibility.component';

@Component({
  selector: 'app-tarjeta-detail',
  // prettier-ignore
  imports: [CommonModule, RouterModule, HeaderComponent, DataVisibilityComponent],
  templateUrl: './tarjeta-detail.component.html',
  styleUrl: './tarjeta-detail.component.css',
})
export class TarjetaDetailComponent implements OnInit {
  //Inyección de dependencias
  private tarjetaService = inject(TarjetaService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  // Variables
  tarjeta?: Tarjeta;
  tarjetaId!: number;

  // Se ejecuta al inicializar el componente
  ngOnInit(): void {
    this.tarjetaId = Number(this.route.snapshot.paramMap.get('id'));
    this.detailTarjeta();
  }

  // Método para obtener los detalles
  detailTarjeta(): void {
    this.tarjeta = this.tarjetaService.getById(this.tarjetaId);
    if (!this.tarjeta) {
      this.router.navigate(['/dashboard/tarjetas']);
    }
  }
}
