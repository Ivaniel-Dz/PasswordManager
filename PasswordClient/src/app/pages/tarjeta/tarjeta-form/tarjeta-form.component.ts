import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertInvalidComponent } from '../../../components/alert-invalid/alert-invalid.component';
import { BackButtonComponent } from '../../../components/back-button/back-button.component';
import { Tarjeta } from '../../../interfaces/tarjeta';
import { HeaderComponent } from '../../../layouts/header/header.component';
import { TarjetaService } from '../../../services/tarjeta.service';
import { showToastAlert } from '../../../utils/sweet-alert.util';

@Component({
  selector: 'app-tarjeta-form',
  // prettier-ignore
  imports: [HeaderComponent, CommonModule, ReactiveFormsModule, RouterModule, BackButtonComponent, AlertInvalidComponent],
  templateUrl: './tarjeta-form.component.html',
  styleUrl: './tarjeta-form.component.css',
})
export class TarjetaFormComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  isEdit = false;
  tarjetaId?: number;
  private routeSub?: Subscription;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private tarjetaService: TarjetaService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      numeracion: [ '', [Validators.required, Validators.pattern(/^[0-9]{8,19}$/)],], // Acepta solo enteros
      fechaExpiracion: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)],], // MM/AA
      titular: ['', Validators.required],
      nombre: ['', Validators.required],
      red: ['', Validators.required],
      tipo: ['', Validators.required],
      descripcion: [''],
    });

    this.routeSub = this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEdit = true;
        this.tarjetaId = +id;
        const tarjeta = this.tarjetaService.getById(this.tarjetaId);
        if (tarjeta) {
          this.form.patchValue({...tarjeta});
        } else {
          showToastAlert('Tarjeta no encontrada', 'error');
          this.router.navigate(['/tarjetas']);
        }
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched()
      return;
    }

    const tarjeta: Tarjeta = {...this.form.value};

    if (this.isEdit) {
      this.tarjetaService.update(tarjeta);
      showToastAlert('Tarjeta actualizada correctamente.', 'success');
    } else {
      this.tarjetaService.add(tarjeta);
      showToastAlert('Tarjeta agregada correctamente.', 'success');
    }

    this.router.navigate(['/dashboard/tarjetas']);
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }
}
