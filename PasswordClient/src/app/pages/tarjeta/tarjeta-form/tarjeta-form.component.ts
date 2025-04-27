import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Tarjeta } from '../../../interfaces/tarjeta';
import { HeaderComponent } from '../../../layouts/header/header.component';
import { TarjetaService } from '../../../services/tarjeta.service';

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
          numeracion: [
            this.formatCardNumber(tarjeta.numeracion),
            [Validators.required],
          ],
          fechaExpiracion: [
            this.formatDateToMMYY(tarjeta.fechaExpiracion),
            [Validators.required],
          ],
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

  // Cargar opciones de Red y Tipo desde el backend
  loadOptions(): void {
    this.tarjetaService.getRedes().subscribe((redes) => {
      this.redOptions = redes.map((red) => ({
        id: red.id,
        nombre: red.nombre,
      }));
    });

    this.tarjetaService.getTipos().subscribe((tipos) => {
      this.tipoOptions = tipos.map((tipo) => ({
        id: tipo.id,
        nombre: tipo.nombre,
      }));
    });
  }

  // Formatear fecha a MM/YY
  private formatDateToMMYY(date: string): string {
    const [year, month] = date.split('-');
    return `${month}/${year.slice(-2)}`;
  }

  // Formatear numeración de tarjeta
  private formatCardNumber(number: string): string {
    return number
      .replace(/\s?/g, '')
      .replace(/(\d{4})/g, '$1 ')
      .trim();
  }

  // Guardar cambios con formato correcto
  save(): void {
    if (this.form?.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const tarjetaForm = this.form!.value;
    tarjetaForm.numeracion = tarjetaForm.numeracion.replace(/\s/g, ''); // Quitar espacios
    tarjetaForm.fechaExpiracion = this.formatDateToYYYYMM(
      tarjetaForm.fechaExpiracion
    ); // Convertir a YYYY-MM

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

  // Convertir fecha de MM/YY a YYYY-MM
  private formatDateToYYYYMM(date: string): string {
    const [month, year] = date.split('/');
    return `20${year}-${month}`;
  }

  // Método para regresar a la pagina anterior
  goBack(): void {
    window.history.back();
  }
}
