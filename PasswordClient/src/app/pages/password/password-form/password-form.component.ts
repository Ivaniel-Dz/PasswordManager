import { Component } from '@angular/core';
import { HeaderComponent } from '../../../layouts/header/header.component';

@Component({
  selector: 'app-password-form',
  imports: [HeaderComponent],
  templateUrl: './password-form.component.html',
  styleUrl: './password-form.component.css',
})
export class PasswordFormComponent {
  // Método para regresar a la pagina anterior
  goBack(): void {
    window.history.back();
  }
}
