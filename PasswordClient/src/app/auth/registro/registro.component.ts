import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Registro } from '../../interfaces/registro';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './registro.component.html',
  styleUrl: '../login/login.component.css', // Reutiliza el css de Login
})

export class RegistroComponent {
  // Inyección de dependencias
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  public registroForm: FormGroup; // Define el formulario reactivo
  public errors: string[] = []; // Arreglo para almacenar errores

  constructor() {
    // Inicializa el formulario con validaciones
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required, Validators.minLength(5)]],
      confirClave: ['', [Validators.required, Validators.minLength(5)]],
    });
  }


  // Método para registrar al usuario
  signUp(): void {
    if (this.registroForm.invalid) {
      return; // No proceder si el formulario es inválido
    }

    const newUser: Registro = this.registroForm.value;

    this.authService.register(newUser).subscribe({
      next: (response) => {
        console.log('Registro exitoso:', response); // Muestra el mensaje del servidor
        alert(response); // Muestra el mensaje en una alerta
        this.router.navigate(['/login']); // Redirige al usuario a la página de login
      },
      error: (error) => {
        this.errors = [error.message]; // Muestra el mensaje de error
        console.error('Error en el registro:', error); // Muestra el error en la consola
      },
    });
  }

}
