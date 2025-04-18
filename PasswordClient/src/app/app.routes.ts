import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { SideNavComponent } from './layouts/side-nav/side-nav.component';
import { PasswordComponent } from './dashboard/password/password.component';
import { PerfilComponent } from './dashboard/perfil/perfil.component';
import { TarjetaComponent } from './dashboard/tarjeta/tarjeta.component';
import { PasswordGeneratorComponent } from './pages/password/password-generator/password-generator.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
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
    component: SideNavComponent,
    title: 'SideNav',
    children: [
      { path: 'password', component: PasswordComponent },
      { path: 'tarjetas', component: TarjetaComponent },
      { path: 'generator', component: PasswordGeneratorComponent },
      { path: 'perfil', component: PerfilComponent },
      { path: '', redirectTo: 'password', pathMatch: 'full' },
    ],
  },
  {
    path: '**',
    redirectTo: 'auth/login',
  },
];
