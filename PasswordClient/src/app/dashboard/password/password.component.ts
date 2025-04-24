import { Component } from '@angular/core';
import { HeaderComponent } from '../../layouts/header/header.component';
import { CardComponent } from '../../components/card/card.component';
import { FooterComponent } from '../../layouts/footer/footer.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-password',
  imports: [HeaderComponent, CardComponent, FooterComponent,],
  templateUrl: './password.component.html',
  styleUrl: './password.component.css'
})
export class PasswordComponent {

}
