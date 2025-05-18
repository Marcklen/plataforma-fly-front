import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './core/auth.guard';
import { LayoutComponent } from './layout/layout.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { UsuarioDashboardComponent } from './pages/usuario-dashboard/usuario-dashboard.component';
import { RoleGuard } from './core/role.guard';
import { UsuariosListComponent } from './pages/usuarios/usuarios-list/usuarios-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      // Rotas protegidas abaixo
      { path: 'home', component: HomeComponent },
      {
        path: 'admin-dashboard',
        component: AdminDashboardComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ROLE_ADMIN'] },
      },
      {
        path: 'usuario-dashboard',
        component: UsuarioDashboardComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ROLE_USER'] },
      },
      {
        path: 'usuarios',
        component: UsuariosListComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ROLE_ADMIN', 'ROLE_USER'] }, // Ambos acessam
      },
    ],
  },
  { path: '**', component: NotFoundComponent }, // Rota para página não encontrada
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
