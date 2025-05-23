import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit{
  totalUsuariosAdmin: number = 0;
  totalUsuariosComuns: number = 0;
  emailsEnviados: number = 0;
  emailsPendentes: number = 0;

   constructor() {}

  ngOnInit(): void {
    this.carregarEstatisticas();
  }

  carregarEstatisticas() {
    // Simulação de carregamento de dados
    this.totalUsuariosAdmin = 3;
    this.totalUsuariosComuns = 15;
    this.emailsEnviados = 60;
    this.emailsPendentes = 10;
  }
}
