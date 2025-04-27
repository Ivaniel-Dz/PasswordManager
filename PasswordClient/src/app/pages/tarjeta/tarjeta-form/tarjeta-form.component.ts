import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../layouts/header/header.component';
import { TarjetaService } from '../../../services/tarjeta.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Tarjeta } from '../../../interfaces/tarjeta';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tarjeta-form',
  imports: [HeaderComponent, CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './tarjeta-form.component.html',
  styleUrl: './tarjeta-form.component.css',
})
export class TarjetaFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private tarjetaService = inject(TarjetaService);

  form?: FormGroup;
  tarjeta?: Tarjeta;
  errors: string[] = [];

  redOptions: { id: number; nombre: string }[] = [];
  tipoOptions: { id: number; nombre: string }[] = [];

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.loadOptions();

    if (id) {
      this.tarjetaService.get(parseInt(id)).subscribe((tarjeta) => {
        this.tarjeta = tarjeta;
        this.form = this.fb.group({
          numeracion: [tarjeta.numeracion, [Validators.required]],
          fechaExpiracion: [tarjeta.fechaExpiracion, [Validators.required]],
          nombreTitular: [tarjeta.nombreTitular, [Validators.required]],
          nombreTarjeta: [tarjeta.nombreTarjeta, [Validators.required]],
          descripcion: [tarjeta.descripcion],
          redId: [tarjeta.redId, [Validators.required]],
          tipoId: [tarjeta.tipoId, [Validators.required]],
        });
      });
    } else {
      this.form = this.fb.group({
        numeracion: ['', [Validators.required]],
        fechaExpiracion: ['', [Validators.required]],
        nombreTitular: ['', [Validators.required]],
        nombreTarjeta: ['', [Validators.required]],
        descripcion: [''],
        redId: ['', [Validators.required]],
        tipoId: ['', [Validators.required]],
      });
    }
  }

  // Cargar opciones de Red y Tipo
  loadOptions(): void {
    // Luego aquí agregas llamada al servicio para RedTarjeta y TipoTarjeta
    // Por ahora ejemplos fijos
    this.redOptions = [
      { id: 1, nombre: 'Visa' },
      { id: 2, nombre: 'Mastercard' },
    ];
    this.tipoOptions = [
      { id: 1, nombre: 'Débito' },
      { id: 2, nombre: 'Crédito' },
    ];
  }

  save(): void {
    if (this.form?.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const tarjetaForm = this.form!.value;
    let request$;

    if (this.tarjeta) {
      // Editar
      request$ = this.tarjetaService.update({
        ...tarjetaForm,
        id: this.tarjeta.id,
      });
    } else {
      // Crear
      request$ = this.tarjetaService.add(tarjetaForm);
    }

    request$.subscribe({
      next: () => this.router.navigate(['/tarjetas']),
      error: (response) => {
        this.errors = response.error.errors ?? ['Ocurrió un error inesperado.'];
      },
    });
  }

  // Método para regresar a la pagina anterior
  goBack(): void {
    window.history.back();
  }
  
}