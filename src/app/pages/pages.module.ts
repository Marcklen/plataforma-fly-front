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
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { UsuariosFormComponent } from './usuarios/usuarios-form/usuarios-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DataHoraFormatadaPipe } from '../shared/pipes/data-hora-formatada.pipe';
import { GraficoUsuariosComponent } from './admin-dashboard/charts/grafico-usuarios/grafico-usuarios.component';
import { GraficoEmailsComponent } from './admin-dashboard/charts/grafico-emails/grafico-emails.component';
import { GraficoEmailsUsuarioComponent } from './usuario-dashboard/charts/grafico-emails/grafico-emails.component';
import { NgChartsModule } from 'ng2-charts';
import { EmailsListComponent } from './emails/emails-list/emails-list.component';
import { EmailsFormComponent } from './emails/emails-form/emails-form.component';
import { EmailsDetalheComponent } from './emails/emails-detalhe/emails-detalhe.component';

@NgModule({
  declarations: [
    HomeComponent,
    NotFoundComponent,
    AdminDashboardComponent,
    UsuarioDashboardComponent,
    UsuariosListComponent,
    UsuariosFormComponent,
    DataHoraFormatadaPipe,
    GraficoUsuariosComponent,
    GraficoEmailsComponent,
    GraficoEmailsUsuarioComponent,
    EmailsListComponent,
    EmailsFormComponent,
    EmailsDetalheComponent,
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatCardModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDividerModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatSortModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    NgChartsModule,
  ],
  exports: [
    NotFoundComponent,
    HomeComponent,
    AdminDashboardComponent,
    UsuarioDashboardComponent,
    UsuariosListComponent,
    UsuariosFormComponent,
  ],
})
export class PagesModule {}
