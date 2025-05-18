import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UsuarioDashboardComponent } from './usuario-dashboard/usuario-dashboard.component';
import { UsuariosListComponent } from './usuarios/usuarios-list/usuarios-list.component';

@NgModule({
  declarations: [
    HomeComponent,
    NotFoundComponent,
    AdminDashboardComponent,
    UsuarioDashboardComponent,
    UsuariosListComponent,
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatCardModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDividerModule,
    RouterModule,
  ],
  exports: [
    NotFoundComponent,
    HomeComponent,
    AdminDashboardComponent,
    UsuarioDashboardComponent,
  ],
})
export class PagesModule {}
