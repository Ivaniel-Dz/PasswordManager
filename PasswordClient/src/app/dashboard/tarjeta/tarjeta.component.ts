import { Component } from '@angular/core';
import { HeaderComponent } from '../../layouts/header/header.component';
import { TableComponent } from '../../components/table/table.component';
import { FooterComponent } from '../../layouts/footer/footer.component';

@Component({
  selector: 'app-tarjeta',
  imports: [HeaderComponent, TableComponent, FooterComponent],
  templateUrl: './tarjeta.component.html',
  styleUrl: './tarjeta.component.css'
})
export class TarjetaComponent {
  
}
