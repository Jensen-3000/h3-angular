import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home/home.component';
import { LoginComponent } from '../pages/login/login/login.component';
import { PageNotFoundComponent } from '../pages/page-not-found/page-not-found/page-not-found.component';
import { AdminComponent } from '../pages/admin/admin/admin.component';
import { authGuard } from '../core/guards/auth.guard';
import { CustomerComponent } from '../pages/customer/customer/customer.component';
import { Role } from '../core/services/auth/auth.interface';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Default route
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [authGuard], data: { roles: [Role.ADMIN] } },
  { path: 'customer', component: CustomerComponent, canActivate: [authGuard], data: { roles: [Role.CUSTOMER] } },
  { path: '**', component: PageNotFoundComponent }, // Wildcard route
];
