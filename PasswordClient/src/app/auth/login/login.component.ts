import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { JwtService } from '../../services/jwt.service';
import { Login } from '../../interfaces/login';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  // Intención de dependencias
  private authService = inject(AuthService);
  private jwtService = inject(JwtService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  errors: string[] = [];

  public formLogin: FormGroup = this.fb.group({
    correo: ['', Validators.required],
    clave: ['', Validators.required],
  });

  signIn() {
    if (this.formLogin.invalid) return;

    const credencial: Login = {
      correo: this.formLogin.value.correo,
      clave: this.formLogin.value.clave,
    };

    this.authService.login(credencial).subscribe({
      next: (data) => {
        if (data.isSuccess && data.token) {
          this.jwtService.setToken(data.token);
          this.router.navigate(['/dashboard/password']);
        } else {
          alert('Revise sus datos,' + data.message);
        }
      },
      error: (error) => {
        this.errors = [error.message]; // Muestra el mensaje de error
        console.error('Error en el registro:', error); // Muestra el error en la consola
      },
    });
  }
}
