import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { appRoutes } from './app.routes';

import { provideStore } from '@ngrx/store';
import { authReducer } from './store/auth/auth.reducer';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './store/auth/auth.effects';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { usersReducer } from './store/users/users.reducer';
import { productsReducer } from './store/products/products.reducer';
import { UsersEffects } from './store/users/users.effects';
import { ProductsEffects } from './store/products/products.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimations(),
    provideStore({
      auth: authReducer,
      users: usersReducer,
      products: productsReducer,
    }),
    provideEffects([AuthEffects, UsersEffects, ProductsEffects]),
  ],
};
