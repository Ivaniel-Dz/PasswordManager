import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JwtService } from '../../services/jwt.service';
import { Login } from '../../interfaces/login';
import { CommonModule } from '@angular/common';
import { ErrorMessagesComponent } from '../../components/error-messages/error-messages.component';
import { AlertInvalidComponent } from '../../components/alert-invalid/alert-invalid.component';

@Component({
  selector: 'app-login',
  imports: [RouterModule, ReactiveFormsModule, CommonModule, ErrorMessagesComponent, AlertInvalidComponent],
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

  public form: FormGroup = this.fb.group({
    correo: ['', [Validators.required, Validators.email]],
    clave: ['', Validators.required],
  });

  // Método para ingresar al dashboard
  signIn() {
    if (this.form.invalid) return;

    const credencial: Login = {
      correo: this.form.value.correo,
      clave: this.form.value.clave,
    };

    this.authService.login(credencial).subscribe({
      next: (resp) => {
        if (resp.isSuccess && resp.token) {
          this.jwtService.setToken(resp.token);
          this.router.navigate(['/dashboard/passwords']);
        } else {
          this.errors = [resp.message || 'Error en el inicio de sesión']; // Muestra el mensaje de error en html
        }
      },
      error: (resp) => {
        console.error('Revise sus datos: ', resp); // Muestra el error en la consola
        this.errors = resp.error.errors || [resp.error.message || 'Credenciales incorrectas']; // Muestra el mensaje de error
      },
    });
  }

}
