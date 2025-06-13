import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
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
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tarjeta-form',
  // prettier-ignore
  imports: [HeaderComponent, CommonModule, ReactiveFormsModule, RouterModule, BackButtonComponent, SpinnerComponent, AlertInvalidComponent, ErrorMessagesComponent],
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
      numeracion: ['', Validators.required],
      fechaExpiracion: ['', Validators.required],
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
          this.form.patchValue({
            ...tarjeta,
            fechaExpiracion: this.formatDateInput(tarjeta.fechaExpiracion),
          });
        } else {
          alert('Tarjeta no encontrada');
          this.router.navigate(['/tarjetas']);
        }
      }
    });
  }

  private formatDateInput(date: Date | string): string {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const tarjeta: Tarjeta = {
      id: this.tarjetaId ?? Date.now(),
      ...this.form.value,
      fechaExpiracion: new Date(this.form.value.fechaExpiracion),
    };

    if (this.isEdit) {
      this.tarjetaService.update(tarjeta);
      alert('Tarjeta actualizada correctamente.');
    } else {
      this.tarjetaService.add(tarjeta);
      alert('Tarjeta agregada correctamente.');
    }

    this.router.navigate(['dashboard/tarjetas']);
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }
}
