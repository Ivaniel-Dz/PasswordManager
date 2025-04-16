import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';

export const routes: Routes = [
  {
    path: 'auth/login',
    component: LoginComponent,
    title: 'login',
  },
  {
    path: 'auth/registro',
    component: RegistroComponent,
    title: 'registro',
  },
  {
    path: 'auth/reset-password',
    component: ResetPasswordComponent,
    title: 'reset-password',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    title: 'dashboard',
  },
  {
    path: '**',
    redirectTo: 'auth/login',
  },
];
