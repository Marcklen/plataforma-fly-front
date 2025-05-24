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
        data: [120, 45],
        backgroundColor: ['#66bb6a', '#ffa726'],
      },
    ],
  };

  public pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
  };

  public pieChartType: ChartType = 'pie';
}
