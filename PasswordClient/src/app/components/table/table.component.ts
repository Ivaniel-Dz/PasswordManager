import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Tarjeta } from '../../interfaces/tarjeta';

@Component({
  selector: 'app-table',
  imports: [CommonModule, RouterModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  //Recibe el arreglo del padre
  @Input() tarjetas: Tarjeta[] = [];

  // Obtiene el Icono en base al nombre de la red
  getCardIcon(red: string): string {
    return `https://cdn.simpleicons.org/${red}/000000`;
  }

  // Toma los 4 primeros dígitos
  formatCardNumber(numeracion: string): string {
    if (!numeracion || numeracion.length < 4) return '****';

    return `${numeracion.substring(0, 4)} **** **** ****`;
  }

  // Formatear la fecha
  formatExpiry(date: Date): string {
    return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date
      .getFullYear()
      .toString()
      .slice(-2)}`;
  }

}
