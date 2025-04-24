import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Input() titulo: string = '';
  @Input() showSearch: boolean = true;
  @Input() showButton: boolean = true;
  @Input() textButton: string = '';
  @Input() route: string = '';
}
