import { createReducer, on } from '@ngrx/store';
import * as ProductsActions from './products.actions';
import { Product } from '../../core/types/Product';

export interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

export const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
};

export const productsReducer = createReducer(
  initialState,
  on(ProductsActions.loadProducts, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ProductsActions.loadProductsSuccess, (state, { products }) => ({
    ...state,
    products,
    loading: false,
    error: null,
  })),
  on(ProductsActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(ProductsActions.deleteProduct, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ProductsActions.deleteProductSuccess, (state, { id }) => ({
    ...state,
    products: state.products.filter(product => product._id !== id),
    loading: false,
    error: null,
  })),
  on(ProductsActions.deleteProductFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(ProductsActions.createProduct, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ProductsActions.createProductSuccess, (state, { product }) => ({
    ...state,
    products: [...state.products, product],
    loading: false,
    error: null,
  })),
  on(ProductsActions.createProductFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
