import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../../layouts/header/header.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-password-generator',
  imports: [HeaderComponent,CommonModule,FormsModule,RouterModule],
  templateUrl: './password-generator.component.html',
  styleUrl: './password-generator.component.css',
})
export class PasswordGeneratorComponent {
  // Propiedades para la generación de contraseñas
  length: number = 12;
  includeUppercase: boolean = false;
  includeLowercase: boolean = false;
  includeNumbers: boolean = false;
  includeSpecial: boolean = false;
  keyword: string = '';
  password: string = '';

  // Método para generar la contraseña
  generatePassword(): void {
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbersChars = '0123456789';
    const specialChars = '!@#$%^&*()_-+=<>?';

    let characters = '';

    if (this.includeUppercase) characters += uppercaseChars;
    if (this.includeLowercase) characters += lowercaseChars;
    if (this.includeNumbers) characters += numbersChars;
    if (this.includeSpecial) characters += specialChars;

    if (!characters) {
      // Alert
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Advertencia",
        text: "Por favor, selecciona al menos una opción para los tipos de caracteres.",
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }

    let result = this.keyword.trim();

    for (let i = result.length; i < this.length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }

    this.password = result;
  }

  // Método par copiar al portapapeles
  copyClipboard(): void {
    if (this.password) {
      navigator.clipboard.writeText(this.password);
      // Alert
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Copiado al portapapeles",
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

}
