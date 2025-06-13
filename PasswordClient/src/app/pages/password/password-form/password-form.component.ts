import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertInvalidComponent } from '../../../components/alert-invalid/alert-invalid.component';
import { BackButtonComponent } from '../../../components/back-button/back-button.component';
import { HeaderComponent } from '../../../layouts/header/header.component';
import { Password } from '../../../interfaces/password';
import { PasswordService } from '../../../services/password.service';
import { showToastAlert } from '../../../utils/sweet-alert.util';
import { SpinnerComponent } from '../../../components/spinner/spinner.component';

@Component({
  selector: 'app-password-form',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    BackButtonComponent,
    AlertInvalidComponent,
  ],
  templateUrl: './password-form.component.html',
  styleUrl: './password-form.component.css',
})
export class PasswordFormComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  isEdit = false;
  passwordId?: number;
  private routeSub?: Subscription;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private passwordService: PasswordService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      url: ['', Validators.required],
      userEmail: ['', [Validators.required, Validators.email]],
      clave: ['', Validators.required],
      categoria: ['', Validators.required],
      notas: [''],
    });

    this.routeSub = this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEdit = true;
        this.passwordId = +id;
        const password = this.passwordService.getById(this.passwordId);
        if (password) {
          this.form.patchValue({ ...password });
        } else {
          showToastAlert('Contraseña no encontrada', 'error');
          this.router.navigate(['/dashboard/passwords']);
        }
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const now = new Date();
    const formData = this.form.value;

    const password: Password = {
      ...formData,
      id: this.isEdit && this.passwordId ? this.passwordId : Date.now(),
      fechaCreacion: this.isEdit
        ? this.passwordService.getById(this.passwordId!)?.fechaCreacion || now
        : now,
      fechaActualizacion: now,
    };

    if (this.isEdit) {
      this.passwordService.update(password);
      showToastAlert('Contraseña actualizada correctamente.', 'success');
    } else {
      this.passwordService.add(password);
      showToastAlert('Contraseña agregada correctamente.', 'success');
    }

    this.router.navigate(['/dashboard/passwords']);
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }
}
