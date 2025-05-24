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
        data: [2, 5, 1, 7, 3],
        label: 'Usuários cadastrados',
        fill: true,
        tension: 0.4,
        borderColor: '#42a5f5',
        backgroundColor: 'rgba(66,165,245,0.2)',
        pointBackgroundColor: '#1e88e5',
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  public lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false, // evita overflow
    plugins: {
      legend: {
        labels: {
          color: '#333',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
      tooltip: {
        backgroundColor: '#f5f5f5',
        titleColor: '#000',
        bodyColor: '#333',
        borderColor: '#ccc',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: { color: '#666' },
        grid: { display: false },
      },
      y: {
        ticks: { color: '#666' },
        grid: { color: '#e0e0e0' },
      },
    },
  };

  public lineChartType: ChartType = 'line';
}
