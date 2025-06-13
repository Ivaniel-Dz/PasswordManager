import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PasswordDetailComponent } from './pages/password/password-detail/password-detail.component';
import { PasswordFormComponent } from './pages/password/password-form/password-form.component';
import { PasswordGeneratorComponent } from './pages/password/password-generator/password-generator.component';
import { PasswordListComponent } from './pages/password/password-list/password-list.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { TarjetaDetailComponent } from './pages/tarjeta/tarjeta-detail/tarjeta-detail.component';
import { TarjetaFormComponent } from './pages/tarjeta/tarjeta-form/tarjeta-form.component';
import { TarjetaListComponent } from './pages/tarjeta/tarjeta-list/tarjeta-list.component';

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
    component: DashboardComponent,
    title: 'Dashboard',
    children: [
      { path: 'passwords', component: PasswordListComponent, title: 'Lista de Contraseña'},
      { path: 'passwords/:categoria', component: PasswordListComponent },
      { path: 'password/detalles/:id', component: PasswordDetailComponent, title: 'Detalles de contraseña' },
      { path: 'password/nueva', component: PasswordFormComponent, title: 'Contraseña Nueva' },
      { path: 'password/editar/:id', component: PasswordFormComponent, title: 'Contraseña Actualizar' },
      { path: 'tarjetas', component: TarjetaListComponent, title: 'Lista de Tarjeta' },
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
    component: LoginComponent // este nunca se renderizar, es obligatorio por sintaxis
  }
];
