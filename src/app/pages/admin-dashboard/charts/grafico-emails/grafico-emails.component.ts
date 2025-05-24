import { Component } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-grafico-emails',
  templateUrl: './grafico-emails.component.html',
  styleUrls: ['./grafico-emails.component.scss'],
})
export class GraficoEmailsComponent {
  public pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: ['Enviados', 'Pendentes'],
    datasets: [
      {
        data: [60, 10],
        label: 'Emails',
        backgroundColor: ['#66bb6a', '#ffa726'],
      },
    ],
  };

  public pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    maintainAspectRatio: false, // evita overflow
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#333',
          font: {
            size: 13,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.raw || 0;
            return `${label}: ${value} e-mails`;
          },
        },
      },
    },
  };

  public pieChartType: ChartType = 'pie';
}
