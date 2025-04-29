import { Component, Input } from '@angular/core';
import Swal from 'sweetalert2';
import { showToastAlert } from '../../utils/sweet-alert.util';

@Component({
  selector: 'app-data-visibility',
  imports: [],
  templateUrl: './data-visibility.component.html',
  styleUrl: './data-visibility.component.css'
})
export class DataVisibilityComponent {
  // Recibe la propiedad del padre
  @Input() interfaces: string = '';

  show: boolean = false;

  // Método para ocular o mostrar
  toggle(): void {
    this.show = !this.show;
  }

  // Método par copiar al portapapeles
  copyClipboard(): void {
    if (this.interfaces) {
      navigator.clipboard.writeText(this.interfaces);
      // Instancia de sweet-alert
      showToastAlert('Copiado al portapapeles', 'success');
    }
  }

  // Método para enmascarar
  get maskedData(): string {
    if (!this.interfaces) return '';
    const visible = this.interfaces.substring(0, 4);
    const hidden = '•'.repeat(Math.max(this.interfaces.length - 4, 0));
    return `${visible}${hidden}`;
  }

}
