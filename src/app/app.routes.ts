import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home/home.component';
import { LoginComponent } from '../pages/login/login/login.component';
import { PageNotFoundComponent } from '../pages/page-not-found/page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Default route
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: PageNotFoundComponent }, // Wildcard route for 404
];
