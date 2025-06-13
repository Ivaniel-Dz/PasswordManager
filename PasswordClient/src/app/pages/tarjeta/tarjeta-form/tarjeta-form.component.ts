import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Option } from '../../../interfaces/option';
import { Tarjeta } from '../../../interfaces/tarjeta';
import { HeaderComponent } from '../../../layouts/header/header.component';
import { OptionService } from '../../../services/option.service';
import { TarjetaService } from '../../../services/tarjeta.service';
import { BackButtonComponent } from '../../../components/back-button/back-button.component';
import { SpinnerComponent } from '../../../components/spinner/spinner.component';
import { AlertInvalidComponent } from '../../../components/alert-invalid/alert-invalid.component';
import { ErrorMessagesComponent } from '../../../components/error-messages/error-messages.component';
import { showToastAlert } from '../../../utils/sweet-alert.util';

@Component({
  selector: 'app-tarjeta-form',
  imports: [HeaderComponent, CommonModule, ReactiveFormsModule, RouterModule, BackButtonComponent, SpinnerComponent, AlertInvalidComponent, ErrorMessagesComponent],
  templateUrl: './tarjeta-form.component.html',
  styleUrl: './tarjeta-form.component.css',
})
export class TarjetaFormComponent implements OnInit {
  // Inyección de dependencias
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private tarjetaService = inject(TarjetaService);
  private optionService = inject(OptionService);
  // Variables
  form!: FormGroup;
  redes: Option[] = [];
  tipos: Option[] = [];
  tarjeta?: Tarjeta;
  errors: string[] = [];
  loading = false;

  // Carga el form al iniciar el componente
  ngOnInit(): void {
    // Inicializa el form y las opciones si no hay id en la url
    this.initForm();
  }

  // Inicializa el formulario
  private initForm(): void {
    this.form = this.fb.group({
      id: null, 
      numeracion: ['', [Validators.required, Validators.pattern(/^[0-9]{8,19}$/)]], // Acepta solo enteros
      fechaExpiracion: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]], // MM/AA
      nombreTitular: ['', Validators.required],
      nombreTarjeta: ['', Validators.required],
      red: ['', Validators.required],
      tipo: ['', Validators.required],
      descripcion: [''],
    });
  }

  // Guarda el formulario
  save(): void {

  }

}
