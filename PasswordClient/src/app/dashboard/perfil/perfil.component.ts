import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../layouts/header/header.component';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuario } from '../../interfaces/usuario';
import { JwtService } from '../../services/jwt.service';

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

    // Si la clave está vacía, eliminara del objeto
    if (!datos.clave || datos.clave.trim() === '') {
      delete datos.clave;
    }

    this.usuarioService.update(datos).subscribe({
      next: (res) => {
        this.mensaje = res.isSuccess
          ? 'Perfil actualizado'
          : res.message ?? 'Error';
      },
      error: (err) => console.error(err),
    });
  }

  // Método para eliminar cuenta
  deletePerfil(): void {
    if (confirm('¿Estás seguro de que deseas eliminar tu cuenta?')) {
      this.usuarioService.delete(this.usuario.id).subscribe({
        next: (res) => {
          if (res.isSuccess) {
            // Cerrar sesión y redirigir
            alert(res.message);
            this.jwtService.logout();
            this.router.navigate(['/auth/login']);
          }
        },
        error: (err) => console.error(err),
      });
    }
  }

}
