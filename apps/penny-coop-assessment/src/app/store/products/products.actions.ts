import { createAction, props } from '@ngrx/store';
import { Product } from '../../core/types/Product';

export const loadProducts = createAction('[Products] Load Products');

export const loadProductsSuccess = createAction(
  '[Products API] Load Products Success',
  props<{ products: Product[] }>()
);

export const loadProductsFailure = createAction(
  '[Products API] Load Products Failure',
  props<{ error: string }>()
);

export const deleteProduct = createAction(
  '[Products API] Delete Product',
  props<{ id: string }>()
);

export const deleteProductSuccess = createAction(
  '[Products API] Delete Product Success',
  props<{ id: string }>()
);

export const deleteProductFailure = createAction(
  '[Products API] Delete Product Failure',
  props<{ error: string }>()
);

export const createProduct = createAction(
  '[Products API] Create Product',
  props<{ product: Partial<Product> }>()
);

export const createProductSuccess = createAction(
  '[Products API] Create Product Success',
  props<{ product: Product }>()
);

export const createProductFailure = createAction(
  '[Products API] Create Product Failure',
  props<{ error: string }>()
);
