import {Component} from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'todo-my-line-chart',
  templateUrl: './my-line-chart.component.html',
  styleUrls: ['./my-line-chart.component.scss']
})
export class MyLineChartComponent {
  public lineChartData: ChartDataSets[] = [
    {data: [95, 110, 390, 280, 180, 210, 190, 310, 290, 280]},
    {data: [50, 200, 300, 190, 220, 30, 60, 70, 180, 120]},
  ];
  public lineChartLabels: any[] = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'];
  public lineChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      display: false
    },
    scales: {
      yAxes: [
        {
          ticks: {
            fontStyle: 'normal',
            fontSize: 13,
            beginAtZero: false,
          },
          gridLines: {
            drawOnChartArea: true,
            color: '#E7EBEC',
          }
        }],
      xAxes: [{
        gridLines: {
          drawOnChartArea: false,
          lineWidth: 1.5
        }
      }]
    }
  };

  filterSelected = 'Monthly'

  public lineChartColors: Color[] = [
    {
      borderColor: '#4BA8A8',
      backgroundColor: 'transparent',
    },
    {
      borderColor: '#F8B400',
      backgroundColor: 'transparent',
    },
  ];

  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];

  constructor() {
  }

  onSelected(monthly: string) {
    this.filterSelected = monthly
  }
}
