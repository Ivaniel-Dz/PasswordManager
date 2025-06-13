import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AlertInvalidComponent } from '../../components/alert-invalid/alert-invalid.component';

@Component({
  selector: 'app-registro',
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    AlertInvalidComponent,
  ],
  templateUrl: './registro.component.html',
  styleUrl: '../login/login.component.css', // Reutiliza el css de Login
})
export class RegistroComponent implements OnInit {
  // Inyección de dependencias
  private router = inject(Router);
  private fb = inject(FormBuilder);

  form!: FormGroup; // Define el formulario reactivo

  ngOnInit(): void {
    // Inicializa el formulario con validaciones
    this.form = this.fb.group(
      {
        nombre: ['', Validators.required],
        correo: ['', [Validators.required, Validators.email]],
        clave: ['', [Validators.required, Validators.minLength(5)]],
        confirClave: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  // Método para validar que las contraseñas coincidan
  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('clave')?.value;
    const confirm = group.get('confirClave')?.value;
    return password === confirm ? null : { passwordMismatch: true };
  }

  // Método para registrar al usuario
  signUp(): void {
    if (this.form.valid) {
    }

    this.router.navigate(['/auth/login']);
  }
}
