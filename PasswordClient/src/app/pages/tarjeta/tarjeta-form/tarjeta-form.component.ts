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
    this.loadRedes();
    this.loadTipos();

    const id = this.route.snapshot.paramMap.get('id');
    // si hay un id en la url, carga los datos
    if (id) {
      this.loading = true;
      this.tarjetaService.get(+id).subscribe({ // +id convierte a number el id
        next: (data) => {
          this.tarjeta = data;
          this.form.patchValue(data); // carga los datos al form
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          // Redirige si no encuentra
          this.router.navigate(['/dashboard/tarjetas']);
        },
      });
    }
  }

  // Inicializa el formulario
  private initForm(): void {
    this.form = this.fb.group({
      id: [0], 
      numeracion: ['', Validators.required],
      fechaExpiracion: ['', Validators.required],
      nombreTitular: ['', Validators.required],
      nombreTarjeta: ['', Validators.required],
      descripcion: [''],
      redId: [null, Validators.required],
      tipoId: [null, Validators.required],
    });
  }

  // Carga las redes
  private loadRedes(): void {
    this.optionService.getRedes().subscribe({
      next: (data) => (this.redes = data),
      error: () => (this.errors = ['Error al cargar las redes']),
    });
  }

  // Carga los tipos
  private loadTipos(): void {
    this.optionService.getTipos().subscribe({
      next: (data) => (this.tipos = data),
      error: () => (this.errors = ['Error al cargar los tipos']),
    });
  }

  // Guarda el formulario
  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const tarjetaForm: Tarjeta = this.form.value;
    // si hay un id en la url, actualiza y si no crea uno nuevo
    const request = tarjetaForm.id && tarjetaForm.id !== 0
      ? this.tarjetaService.update(tarjetaForm)
      : this.tarjetaService.add({ ...tarjetaForm, id: 0 });

    request.subscribe({
      next: (resp) => {
        if (resp.isSuccess) {
          // Instancia de sweet-alert
          showToastAlert(resp.message ?? 'Guardado Correctamente', 'success');
          this.router.navigate(['/dashboard/tarjetas'])
        }
      },
      error: (resp) => {
        console.error('Error al guardar:', resp);
        this.errors = resp.error.errors || [resp.error.message] || ['Ocurrió un error inesperado.'];
      },
    });
  }

}
