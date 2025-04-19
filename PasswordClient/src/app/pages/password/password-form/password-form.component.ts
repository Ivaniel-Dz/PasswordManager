import { Component } from '@angular/core';
import { FormComponent } from '../../../components/form/form.component';
import { HeaderComponent } from '../../../layouts/header/header.component';

@Component({
  selector: 'app-password-form',
  imports: [HeaderComponent,FormComponent,],
  templateUrl: './password-form.component.html',
  styleUrl: './password-form.component.css'
})
export class PasswordFormComponent {

}
