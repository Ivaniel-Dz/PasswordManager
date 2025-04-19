import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from '../../layouts/header/header.component';
import { FormComponent } from '../../components/form/form.component';

@Component({
  selector: 'app-perfil',
  imports: [CommonModule, HeaderComponent, FormComponent],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
})
export class PerfilComponent {
  data = Array.from({ length: 4 }, (_, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`,
  }));

  pageSize = 10;
  currentPage = 1;

  get totalPages(): number {
    return Math.ceil(this.data.length / this.pageSize);
  }

  get totalPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  get paginatedData() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.data.slice(start, end);
  }

  goToPreviousPage(event: Event) {
    event.preventDefault();
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  goToNextPage(event: Event) {
    event.preventDefault();
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  goToPage(event: Event, page: number) {
    event.preventDefault();
    this.currentPage = page;
  }
}
