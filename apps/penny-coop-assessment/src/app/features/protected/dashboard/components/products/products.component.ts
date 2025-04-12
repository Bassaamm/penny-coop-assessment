import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '../../../../../core/types/Product';
import {
  ProductsActions,
  ProductsSelectors,
} from '../../../../../store/products';
import { MatDialog } from '@angular/material/dialog';
import { CreateProductDialogComponent } from './components/create-product-dialog.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products$: Observable<Product[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private store: Store, private dialog: MatDialog) {
    this.products$ = this.store.select(ProductsSelectors.selectAllProducts);
    this.loading$ = this.store.select(ProductsSelectors.selectProductsLoading);
    this.error$ = this.store.select(ProductsSelectors.selectProductsError);
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.store.dispatch(ProductsActions.loadProducts());
  }

  deleteProduct(id: string): void {
    this.store.dispatch(ProductsActions.deleteProduct({ id }));
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CreateProductDialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.createProduct(result);
      }
    });
  }

  createProduct(product: Partial<Product>): void {
    this.store.dispatch(ProductsActions.createProduct({ product }));
  }
}
