import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../../interfaces/usuario';
import { HeaderComponent } from '../../layouts/header/header.component';
import { UsuarioService } from '../../services/usuario.service';
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
  private router = inject(Router);
  private fb = inject(FormBuilder);

  usuario!: Usuario;
  form!: FormGroup;

  ngOnInit(): void {
    this.initializeForm();
    this.loadPerfil();
  }

  // Método Inicializa el formulario
  initializeForm(): void {
    this.form = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      clave: ['', Validators.required],
    });
  }

  // Método para cargar los datos del perfil
  loadPerfil(): void {
    const user = this.usuarioService.getUser();
    this.form.patchValue({
      nombre: user.nombre,
      correo: user.correo,
      clave: user.clave,
    });
  }

  // Método para actualizar Perfil
  updatePerfil(): void {
    if (this.form.valid) {
      const user: Usuario = {
        id: 1, // Aquí puedes asignar dinámicamente si lo deseas
        ...this.form.value,
      };
      this.usuarioService.saveUser(user);
      showToastAlert('Usuario guardado correctamente.', 'success');
    }
  }

  // Método para eliminar cuenta
  deleteAccount(): void {
    // Instancia de util: sweet-alert
    confirmDialog('¿Estás seguro?', 'Esta acción eliminará la cuenta.').then(
      (confirmed) => {
        if (confirmed) {
          this.usuarioService.restoreStorage();
          this.router.navigate(['/auth/login']);
        }
      }
    );
  }
}
