import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Option } from '../../../interfaces/option';
import { Password } from '../../../interfaces/password';
import { PasswordService } from '../../../services/password.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../layouts/header/header.component';
import { OptionService } from '../../../services/option.service';
import { ErrorMessagesComponent } from '../../../components/error-messages/error-messages.component';
import { BackButtonComponent } from '../../../components/back-button/back-button.component';
import { SpinnerComponent } from '../../../components/spinner/spinner.component';
import { AlertInvalidComponent } from '../../../components/alert-invalid/alert-invalid.component';

@Component({
  selector: 'app-password-form',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HeaderComponent, BackButtonComponent, ErrorMessagesComponent, SpinnerComponent, AlertInvalidComponent],
  templateUrl: './password-form.component.html',
  styleUrl: './password-form.component.css',
})
export class PasswordFormComponent implements OnInit {
  // Inyección de dependencias
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private passwordService = inject(PasswordService);
  private optionService = inject(OptionService);
  // Variables
  form!: FormGroup;
  categorias: Option[] = [];
  password?: Password;
  errors: string[] = [];
  loading = false;

  // Carga el form al iniciar el componente
  ngOnInit(): void {
    // Inicializa el form y categoría si no hay id en la url
    this.initForm();
    this.loadCategorias();

    const id = this.route.snapshot.paramMap.get('id');
    // si hay un id en la url, carga los datos
    if (id) {
      this.loading = true;

      this.passwordService.get(+id).subscribe({ // +id convierte a number el id
        next: (password) => {
          this.password = password;
          this.form.patchValue(password); // carga los datos al form
          this.loading = false;
        },
        // Redirige si no encuentra
        error: () => this.router.navigate(['/dashboard/passwords']),
      });
    }
  }

  // Inicializa el formulario
  private initForm(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      url: ['', Validators.required],
      userEmail: ['', Validators.required],
      clave: ['', Validators.required],
      notas: [''],
      categoriaId: [null, Validators.required],
    });
  }

  // Carga las categorías
  private loadCategorias(): void {
    this.optionService.getCategorias().subscribe({
      next: (data) => (this.categorias = data),
      error: () => (this.errors = ['Error al cargar las categorías']),
    });
  }

  // Guarda el formulario
  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const passwordForm = this.form.value;
    // si hay un id en la url, actualiza y si no crea uno nuevo
    const request = this.password
      ? this.passwordService.update(this.password.id, {
        ...passwordForm,
        id: this.password.id,
      })
      : this.passwordService.add({ ...passwordForm, id: 0 });

    request.subscribe({
      next: () => this.router.navigate(['/dashboard/passwords']),
      error: (response) => {
        this.errors = response.error.errors || ['Ocurrió un error.'];
      },
    });
  }

}
