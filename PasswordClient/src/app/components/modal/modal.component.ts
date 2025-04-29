import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  // Recibe del padre
  @Input() title: string = '¿Está seguro?';
  @Input() message: string = 'Esta acción no se puede deshacer.';
  @Input() confirmText: string = 'Sí';
  @Input() cancelText: string = 'Cancelar';

  // Emite al padre
  @Output() onConfirm = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();

  show: boolean = false;

  open() {
    this.show = true;
  }

  close() {
    this.show = false;
    this.onCancel.emit();
  }

  confirm() {
    this.show = false;
    this.onConfirm.emit();
  }
}
