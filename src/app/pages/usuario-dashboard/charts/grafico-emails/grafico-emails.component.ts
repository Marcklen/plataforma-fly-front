import { Component } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-grafico-emails-usuario',
  templateUrl: './grafico-emails.component.html',
  styleUrls: ['./grafico-emails.component.scss'],
})
export class GraficoEmailsUsuarioComponent {
  public pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: ['Lidos', 'Não Lidos'],
    datasets: [
      {
        data: [35, 15],
        backgroundColor: ['#66bb6a', '#ef5350'],
      },
    ],
  };

  public pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  public pieChartType: ChartType = 'pie';
}
