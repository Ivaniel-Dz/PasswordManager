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
  // Recibe el arreglo del padre
  @Input() tarjetas: Tarjeta[] = [];
  // Emite el evento al padre
  @Output() delete = new EventEmitter<number>();

  onDelete(id: number): void {
    this.delete.emit(id);
  }

  // Obtiene el Icono en base al nombre de la red
  getCardIcon(red: string): string {
    // Eliminar espacios y caracteres especiales
    const formattedRed = red.replace(/\s+/g, '');

    return `https://cdn.simpleicons.org/${formattedRed}/000000`;
  }

  // se ejecuta cuando hay un error al cargar la imagen
  onImageError(event: any) {
    event.target.src = 'https://img.icons8.com/fluency/50/bank-card-front-side.png';
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
