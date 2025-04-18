import { Component } from '@angular/core';
import { HeaderComponent } from '../../layouts/header/header.component';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-password',
  imports: [HeaderComponent, CardComponent],
  templateUrl: './password.component.html',
  styleUrl: './password.component.css'
})
export class PasswordComponent {

}
