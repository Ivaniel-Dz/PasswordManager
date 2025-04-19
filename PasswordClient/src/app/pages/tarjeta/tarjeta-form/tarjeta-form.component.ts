import { Component } from '@angular/core';
import { FormComponent } from '../../../components/form/form.component';
import { HeaderComponent } from '../../../layouts/header/header.component';

@Component({
  selector: 'app-tarjeta-form',
  imports: [HeaderComponent, FormComponent],
  templateUrl: './tarjeta-form.component.html',
  styleUrl: './tarjeta-form.component.css'
})
export class TarjetaFormComponent {

}
