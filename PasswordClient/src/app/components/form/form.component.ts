import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form',
  imports: [],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  @Input() textButton : string = "Botón";

  // Método para regresar a la pagina anterior
  goBack(): void {
    window.history.back();
  }

}
