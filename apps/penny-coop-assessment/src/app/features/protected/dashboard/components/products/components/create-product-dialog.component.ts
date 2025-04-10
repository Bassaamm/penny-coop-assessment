import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-product-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="p-6">
      <h2 class="text-xl font-semibold mb-4">Create New Product</h2>
      <form [formGroup]="productForm" (ngSubmit)="onSubmit()">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium mb-1">Name</label>
          <input
            id="name"
            type="text"
            formControlName="name"
            class="bg-slate-200 rounded-2xl w-full my-1 p-3 shadow-md border-none"
          />
        </div>
        <div class="mb-4">
          <label for="price" class="block text-sm font-medium mb-1"
            >Price</label
          >
          <input
            id="price"
            type="number"
            formControlName="price"
            class="bg-slate-200 rounded-2xl w-full my-1 p-3 shadow-md border-none"
          />
        </div>
        <div class="flex justify-end gap-2">
          <button
            type="button"
            (click)="dialogRef.close()"
            class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            [disabled]="!productForm.valid"
            class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg  disabled:bg-gray-400"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  `,
})
export class CreateProductDialogComponent {
  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateProductDialogComponent>
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0)]],
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.dialogRef.close(this.productForm.value);
    }
  }
}
