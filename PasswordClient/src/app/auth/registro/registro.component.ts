import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators, } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './registro.component.html',
  styleUrl: '../login/login.component.css', // Reutiliza el css de Login
})

export class RegistroComponent implements OnInit {
  // Inyección de dependencias
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  registroForm!: FormGroup; // Define el formulario reactivo
  errors: string[] = []; // Arreglo para almacenar errores

  ngOnInit(): void {
    // Inicializa el formulario con validaciones
    this.registroForm = this.fb.group(
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
    if (this.registroForm.invalid) return; // No proceder si el formulario es inválido

    const registro = this.registroForm.value;

    this.authService.register(registro).subscribe({
      next: (resp) => {
        if (resp.isSuccess) {
          this.router.navigate(['/auth/login']);
        } else {
          this.errors = [resp.message || 'Error al registrarse']; // Muestra el mensaje de error en html
        }
      },
      error: (resp) => {
        this.errors = [resp.message]; // Muestra el mensaje de error
        console.error('Error en el registro:', resp); // Muestra el error en la consola
      },
    });
  }

}
