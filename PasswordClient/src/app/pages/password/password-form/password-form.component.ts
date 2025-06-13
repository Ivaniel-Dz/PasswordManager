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
import { showToastAlert } from '../../../utils/sweet-alert.util';

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

  // Guarda el formulario
  save(): void {
  }

}
