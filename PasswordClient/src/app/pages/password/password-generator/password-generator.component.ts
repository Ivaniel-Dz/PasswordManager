import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-password-generator',
  imports: [CommonModule,FormsModule],
  templateUrl: './password-generator.component.html',
  styleUrl: './password-generator.component.css',
})
export class PasswordGeneratorComponent {
  length: number = 12;
  includeUppercase: boolean = false;
  includeLowercase: boolean = false;
  includeNumbers: boolean = false;
  includeSpecial: boolean = false;
  keyword: string = '';
  password: string = '';

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
      alert(
        'Por favor, selecciona al menos una opción para los tipos de caracteres.'
      );
      return;
    }

    let result = this.keyword.trim();

    for (let i = result.length; i < this.length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }

    this.password = result;
  }

}
