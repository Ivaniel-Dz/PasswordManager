import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../layouts/header/header.component';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuario } from '../../interfaces/usuario';
import { JwtService } from '../../services/jwt.service';
// Utils
import { confirmDialog, showToastAlert } from '../../utils/sweet-alert.util';

@Component({
  selector: 'app-perfil',
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
})
export class PerfilComponent implements OnInit {
  // Intención de dependencias
  private usuarioService = inject(UsuarioService);
  private jwtService = inject(JwtService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  usuario!: Usuario;
  perfilForm!: FormGroup;
  mensaje: string = '';

  ngOnInit(): void {
    this.loadPerfil();
    this.initializeForm();
  }

  // Método para cargar los datos del perfil
  loadPerfil(): void {
    this.usuarioService.getPerfil().subscribe({
      next: (res) => {
        if (res.isSuccess && res.response) {
          this.usuario = res.response; // usuario = response<Usuario>
          this.perfilForm.patchValue(this.usuario);
        }
      },
      error: (err) => console.error(err),
    });
  }

  // Método Inicializa el formulario
  initializeForm(): void {
    this.perfilForm = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      clave: [''],
    });
  }

  // Método para actualizar Perfil
  updatePerfil(): void {
    if (this.perfilForm.invalid) return;

    // Copia del valor original
    const datos = { ...this.perfilForm.value };

    // Eliminar campo clave si está vacío
    if (!datos.clave || datos.clave.trim() === '') {
      delete datos.clave;
    }

    this.usuarioService.update(datos).subscribe({
      next: (res) => {
        this.mensaje = res.isSuccess ? 'Perfil actualizado' : res.message ?? 'Error al actualizar el perfil';
        // Instancia de sweet-alert
        showToastAlert(this.mensaje, res.isSuccess ? 'success' : 'error');
      },
      error: (err) => {
        // Mostrar mensaje de backend si existe
        this.mensaje = err?.error?.message || 'Ocurrió un error al actualizar el perfil';
      }
    });
  }

  // Método para eliminar cuenta
  deletePerfil(): void {
    // Instancia de util: sweet-alert
    confirmDialog('¿Estás seguro?', 'Esta acción eliminará la cuenta.').then((confirmed) => {

      if (confirmed) {
        this.usuarioService.delete(this.usuario.id).subscribe({
          next: (res) => {
            if (res.isSuccess) {
              // Cerrar sesión y redirigir
              // Instancia de sweet-alert
              showToastAlert(res.message ?? 'Eliminado Correctamente', 'success');
              this.jwtService.logout();
              this.router.navigate(['/auth/login']);
            }
          },
          error: (err) => console.error(err),
        });
      }
    });

  }

}
