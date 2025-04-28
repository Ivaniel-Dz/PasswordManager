import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Option } from '../../../interfaces/option';
import { Password } from '../../../interfaces/password';
import { PasswordService } from '../../../services/password.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../layouts/header/header.component';
import { OptionService } from '../../../services/option.service';

@Component({
  selector: 'app-password-form',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HeaderComponent],
  templateUrl: './password-form.component.html',
  styleUrl: './password-form.component.css',
})
export class PasswordFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private passwordService = inject(PasswordService);
  private optionService = inject(OptionService);

  form!: FormGroup;
  categorias: Option[] = [];
  password?: Password;
  errors: string[] = [];
  loading = false;

  ngOnInit(): void {
    this.initForm();
    this.loadCategorias();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loading = true;
      this.passwordService.get(+id).subscribe({
        next: (password) => {
          this.password = password;
          this.form.patchValue(password);
          this.loading = false;
        },
        error: () => this.router.navigate(['/dashboard/passwords']),
      });
    }
  }

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

  private loadCategorias(): void {
    this.optionService.getCategorias().subscribe({
      next: (data) => (this.categorias = data),
      error: () => (this.errors = ['Error al cargar las categorías']),
    });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const passwordForm = this.form.value;
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

  goBack(): void {
    window.history.back();
  }
  
}
