import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
// prettier-ignore
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  // prettier-ignore
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  // Intención de dependencias
  private router = inject(Router);
  private fb = inject(FormBuilder);

  errors: string[] = [];

  public form: FormGroup = this.fb.group({
    correo: ['', [Validators.required, Validators.email]],
    clave: ['', Validators.required],
  });

  // Método para ingresar al dashboard
  signIn() {
    if (this.form.valid) return;
    
    this.router.navigate(['/dashboard/passwords'])
  }
}
