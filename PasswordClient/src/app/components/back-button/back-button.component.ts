import { Component } from '@angular/core';

@Component({
  selector: 'app-back-button',
  imports: [],
  templateUrl: './back-button.component.html',
  styleUrl: './back-button.component.css'
})
export class BackButtonComponent {
  // Vuelve a la pagina anterior
  goBack(): void {
    window.history.back();
  }
}
