import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../../layouts/header/header.component';

@Component({
  selector: 'app-password-detail',
  imports: [RouterModule, HeaderComponent],
  templateUrl: './password-detail.component.html',
  styleUrl: './password-detail.component.css'
})
export class PasswordDetailComponent {

}
