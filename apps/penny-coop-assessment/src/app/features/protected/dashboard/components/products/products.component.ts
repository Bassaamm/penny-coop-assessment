import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarService } from '../../../../../shared/components/snackbar/snackbar.service';
import { ProductService } from './product.service';
import { Product } from '../../../../../core/types/Product';
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
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private snackbar: SnackbarService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadProducts();
  }
  openCreateDialog() {
    const dialogRef = this.dialog.open(CreateProductDialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.createProduct(result);
      }
    });
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (error) => {
        this.snackbar.error(
          error.error.message[0] || 'Failed to load products'
        );
      },
    });
  }

  createProduct(product: Partial<Product>) {
    this.productService.createProduct(product).subscribe({
      next: (createdProduct) => {
        this.snackbar.success('Product created successfully');
        this.products.push(createdProduct);
      },
      error: (error) => {
        this.snackbar.error(
          error.error.message[0] || 'Failed to create product'
        );
      },
    });
  }

  deleteProduct(id: string) {
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.snackbar.success('Product deleted successfully');
        this.loadProducts();
      },
      error: (error) => {
        this.snackbar.error(
          error.error.message[0] || 'Failed to delete product'
        );
      },
    });
  }
}
