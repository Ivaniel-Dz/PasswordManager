import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { SideNavComponent } from './layouts/side-nav/side-nav.component';
import { PasswordComponent } from './dashboard/password/password.component';
import { PerfilComponent } from './dashboard/perfil/perfil.component';
import { TarjetaComponent } from './dashboard/tarjeta/tarjeta.component';
import { PasswordGeneratorComponent } from './pages/password/password-generator/password-generator.component';
import { PasswordFormComponent } from './pages/password/password-form/password-form.component';
import { PasswordDetailComponent } from './pages/password/password-detail/password-detail.component';
import { TarjetaFormComponent } from './pages/tarjeta/tarjeta-form/tarjeta-form.component';
import { authGuard } from './guards/auth.guard';
import { TarjetaDetailComponent } from './pages/tarjeta/tarjeta-detail/tarjeta-detail.component';


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
    canActivate: [authGuard],
    children: [
      { path: 'passwords', component: PasswordComponent },
      { path: 'password/detalles/:id', component: PasswordDetailComponent },
      { path: 'password/nueva', component: PasswordFormComponent },
      { path: 'password/editar/:id', component: PasswordFormComponent },
      { path: 'tarjetas', component: TarjetaComponent },
      { path: 'tarjeta/detalles/:id', component: TarjetaDetailComponent },
      { path: 'tarjeta/nueva', component: TarjetaFormComponent },
      { path: 'tarjeta/editar/:id', component: TarjetaFormComponent },
      { path: 'generator', component: PasswordGeneratorComponent },
      { path: 'perfil', component: PerfilComponent },
      { path: '', redirectTo: 'passwords', pathMatch: 'full' },
    ],
  },
  {
    path: '**',
    redirectTo: 'auth/login',
  },
];
