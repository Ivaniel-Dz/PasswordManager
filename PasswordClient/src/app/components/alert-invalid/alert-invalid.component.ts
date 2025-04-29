import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-alert-invalid',
  imports: [CommonModule],
  templateUrl: './alert-invalid.component.html',
})
export class AlertInvalidComponent {
  @Input() formGroup!: FormGroup;
  @Input() controlName!: string;
  @Input() message!: string;
}
