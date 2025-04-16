import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  imports: [RouterModule],
  templateUrl: './reset-password.component.html',
  styleUrl: '../login/login.component.css', // Reutiliza el css de Login
})
export class ResetPasswordComponent {}
