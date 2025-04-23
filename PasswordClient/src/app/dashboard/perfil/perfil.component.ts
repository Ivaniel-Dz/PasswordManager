import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../layouts/header/header.component';
import { FormComponent } from '../../components/form/form.component';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuario } from '../../interfaces/usuario';
import { JwtService } from '../../services/jwt.service';

@Component({
  selector: 'app-perfil',
  imports: [CommonModule, ReactiveFormsModule ,HeaderComponent],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
})
export class PerfilComponent implements OnInit {
  // Inyección de dependencias
  private usuarioService = inject(UsuarioService);
  private jwtService = inject(JwtService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  usuario!: Usuario;
  perfilForm!: FormGroup;
  mensaje: string = '';

  // ngOnInit es un ciclo de vida de Angular que se ejecuta después de que el constructor ha sido llamado
  ngOnInit(): void {
    this.loadPerfil();
    this.initializeForm();
  }

  // Método para cargar el perfil
  loadPerfil(): void{
    this.usuarioService.getPerfil().subscribe({
      next: (usuario) => {
        this.usuario = usuario;
        this.perfilForm.patchValue(usuario);
      }, error: (err) => {
        console.error('Error al cargar los datos del perfil', err);
      }
    });
  }

  // Método para definir el formulario
  initializeForm(): void {
    this.perfilForm = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      clave: [''], // opcional, solo si desea actualizar
    });
  }
  
  // Método para actualiza el perfil
  updatePerfil(): void {
    if(this.perfilForm.invalid) return;

    this.usuarioService.update(this.perfilForm.value).subscribe({
      next: (usuario) =>{
        this.mensaje = 'Perfil actualizado correctamente.';
        this.perfilForm.patchValue(usuario);
      },
      error: (err) => {
        console.error(err)
        this.mensaje = 'Hubo un error al actualizar el perfil.';
      }
    });
  }

  // Método para eliminar el perfil
  deletePerfil(): void {
    if(!this.usuario || !this.usuario.id) {
      console.error('Usuario no encontrado');
      return
    }

    if (confirm('¿Está seguro de que desea eliminar su cuenta?')) {
      this.usuarioService.delete(this.usuario.id).subscribe({
        next: (data) => {
          console.log('Cuenta eliminada con éxito', data);
          this.jwtService.logout();
          this.router.navigate(['/auth/login']);
        }, 
        error: (err) => {
          console.error('Error al eliminar el usuario', err);
          this.mensaje = 'Error al eliminar la cuenta';
        }
      });
    }
  }


}
