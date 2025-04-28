import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Password } from '../../interfaces/password';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [CommonModule, RouterModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  // Recibe el arreglo del padre
  @Input() passwords: Password[] = [];

  extractUrl(url: string): string {
    if (!url) return '';

    // Quitar protocolo (http, https)
    url = url.replace(/^https?:\/\//, '');

    // Quitar "www."
    url = url.replace(/^www\./, '');

    // Quitar todo lo que sigue después del primer "/"
    url = url.split('/')[0];

    // Quitar la extensión del dominio (.com, .net, .org, etc.)
    const parts = url.split('.');
    if (parts.length > 2) {
      return parts[1].toLowerCase(); // Ej: www.netflix.com -> netflix
    } else {
      return parts[0].toLowerCase(); // Ej: netflix.com -> netflix
    }
  }

  // se ejecuta cuando hay un error al cargar la imagen
  onImageError(event: any) {
    event.target.src = 'https://img.icons8.com/ios/50/domain--v1.png';
  }

}
