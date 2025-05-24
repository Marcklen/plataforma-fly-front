import { Component } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-grafico-usuarios',
  templateUrl: './grafico-usuarios.component.html',
  styleUrls: ['./grafico-usuarios.component.scss'],
})
export class GraficoUsuariosComponent {
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'],
    datasets: [
      {
        data: [5, 10, 3, 8, 6],
        label: 'Usuários cadastrados',
        fill: true,
        tension: 0.4,
        borderColor: '#42a5f5',
        backgroundColor: 'rgba(66,165,245,0.2)',
      },
    ],
  };

  public lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
  };

  public lineChartType: ChartType = 'line';
}
