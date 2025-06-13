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
import { redirectInvalidRoutesGuard } from './guards/redirect-invalid-routes.guard';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: 'auth/login',
    component: LoginComponent,
    title: 'Login',
  },
  {
    path: 'auth/registro',
    component: RegistroComponent,
    title: 'Registro',
  },
  {
    path: 'auth/reset-password',
    component: ResetPasswordComponent,
    title: 'Recuperar Contraseña',
  },
  {
    path: 'dashboard',
    component: SideNavComponent,
    title: 'Dashboard',
    canActivate: [authGuard],
    children: [
      { path: 'passwords', component: PasswordComponent, title: 'Lista de Contraseña'},
      { path: 'passwords/:categoria', component: PasswordComponent, title: '' },
      { path: 'password/detalles/:id', component: PasswordDetailComponent, title: 'Detalles de contraseña' },
      { path: 'password/nueva', component: PasswordFormComponent, title: 'Contraseña Nueva' },
      { path: 'password/editar/:id', component: PasswordFormComponent, title: 'Contraseña Actualizar' },
      { path: 'tarjetas', component: TarjetaComponent, title: 'Lista de Tarjeta' },
      { path: 'tarjeta/detalles/:id', component: TarjetaDetailComponent, title: 'Detalles de Tarjeta' },
      { path: 'tarjeta/nueva', component: TarjetaFormComponent, title: 'Tarjeta Nueva' },
      { path: 'tarjeta/editar/:id', component: TarjetaFormComponent, title: 'Tarjeta Actualizar' },
      { path: 'generator', component: PasswordGeneratorComponent, title: 'Generar Contraseña' },
      { path: 'perfil', component: PerfilComponent, title: 'Perfil'  },
      { path: '', redirectTo: 'passwords', pathMatch: 'full' },
    ],
  },
  {
    path: '**',
    canActivate: [redirectInvalidRoutesGuard],
    component: LoginComponent // este nunca se renderiza, es obligatorio por sintaxis
  }
];
