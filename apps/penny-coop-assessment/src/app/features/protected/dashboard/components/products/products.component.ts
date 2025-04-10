import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  products = [
    {
      id: 1,
      name: 'TV',
      price: 125.99,
    },
    {
      id: 2,
      name: 'PC',
      price: 889.5,
    },
    {
      id: 3,
      name: 'iPhone',
      price: 210.75,
    },
  ];
}
