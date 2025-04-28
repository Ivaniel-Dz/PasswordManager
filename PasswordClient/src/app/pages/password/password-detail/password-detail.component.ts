import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../../layouts/header/header.component';
import { PasswordService } from '../../../services/password.service';

@Component({
  selector: 'app-password-detail',
  imports: [RouterModule, HeaderComponent],
  templateUrl: './password-detail.component.html',
  styleUrl: './password-detail.component.css',
})
export class PasswordDetailComponent implements OnInit{
  passwordService = inject(PasswordService);
  router = inject(Router);

  ngOnInit(): void {
    this.loadPassword();
  }

  loadPassword() {

  }

  // Método para eliminar
  deletePassword(id: number): void {
    if (confirm('¿Está seguro de eliminar la contraseña?')) {
      this.passwordService.delete(id).subscribe({
        next: (res) => {
          if (res.isSuccess) {
            alert(res.message);
            this.router.navigate(['/dashboard/passwords']);
          }
        },
        error: (err) => console.error(err),
      });
    }
  }

}
