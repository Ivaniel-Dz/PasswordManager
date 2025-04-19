import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-table',
  imports: [CommonModule, RouterModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  // Datos de ejemplos para la tabla
  tarjetas = [
    {
      id: 1,
      userId: 1,
      numeracion: 1234567812345678,
      fechaExpiracion: '2026-08-01',
      nombreTitular: 'Juan Pérez',
      redTarjeta: 'visa',
      tipoTarjeta: 'Crédito',
      descripcion: 'Tarjeta principal',
    },
    {
      id: 2,
      userId: 2,
      numeracion: 8765432187654321,
      fechaExpiracion: '2025-12-01',
      nombreTitular: 'Ana López',
      redTarjeta: 'mastercard',
      tipoTarjeta: 'Débito',
      descripcion: 'Uso diario',
    },
    {
      id: 3,
      userId: 2,
      numeracion: 8765432187654321,
      fechaExpiracion: '2025-12-01',
      nombreTitular: 'Ana López',
      redTarjeta: 'mastercard',
      tipoTarjeta: 'Débito',
      descripcion: 'Uso diario',
    },
    {
      id: 4,
      userId: 2,
      numeracion: 8765432187654321,
      fechaExpiracion: '2025-12-01',
      nombreTitular: 'Ana López',
      redTarjeta: 'mastercard',
      tipoTarjeta: 'Débito',
      descripcion: 'Uso diario',
    },
    {
      id: 5,
      userId: 2,
      numeracion: 8765432187654321,
      fechaExpiracion: '2025-12-01',
      nombreTitular: 'Ana López',
      redTarjeta: 'mastercard',
      tipoTarjeta: 'Débito',
      descripcion: 'Uso diario',
    },
    {
      id: 6,
      userId: 2,
      numeracion: 8765432187654321,
      fechaExpiracion: '2025-12-01',
      nombreTitular: 'Ana López',
      redTarjeta: 'mastercard',
      tipoTarjeta: 'Débito',
      descripcion: 'Uso diario',
    },
    {
      id: 7,
      userId: 2,
      numeracion: 8765432187654321,
      fechaExpiracion: '2025-12-01',
      nombreTitular: 'Ana López',
      redTarjeta: 'mastercard',
      tipoTarjeta: 'Débito',
      descripcion: 'Uso diario',
    },
    {
      id: 8,
      userId: 2,
      numeracion: 8765432187654321,
      fechaExpiracion: '2025-12-01',
      nombreTitular: 'Ana López',
      redTarjeta: 'mastercard',
      tipoTarjeta: 'Débito',
      descripcion: 'Uso diario',
    },
  ];

  getMaskedNumber(num: number): string {
    const str = num.toString();
    return '*'.repeat(str.length - 4) + str.slice(-4);
  }

  getCardIcon(red: string): string {
    return `https://cdn.simpleicons.org/${red}/000000`;
  }
}
