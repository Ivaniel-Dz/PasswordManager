import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-registro',
  imports: [RouterModule],
  templateUrl: './registro.component.html',
  styleUrl: '../login/login.component.css', // Reutiliza el css de Login
})
export class RegistroComponent {}
