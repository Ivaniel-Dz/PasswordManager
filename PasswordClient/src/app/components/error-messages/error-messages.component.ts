import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-messages',
  imports: [CommonModule],
  templateUrl: './error-messages.component.html'
})
export class ErrorMessagesComponent {
  @Input() errors: string[] = [];
}
