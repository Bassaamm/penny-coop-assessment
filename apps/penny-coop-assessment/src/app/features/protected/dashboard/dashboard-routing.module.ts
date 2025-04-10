import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { authGuardFn } from '../../../core/guards/auth.guard';
import { UsersComponent } from './components/users/users.component';
import { ProductsComponent } from './components/products/products.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [authGuardFn],
    children: [
      { path: '', redirectTo: 'users', pathMatch: 'full' },
      { path: 'users', component: UsersComponent },
      { path: 'products', component: ProductsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
