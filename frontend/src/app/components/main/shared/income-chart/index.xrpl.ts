import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { IncomeBarModel } from 'src/app/model/income.bar.model';
Chart.register(...registerables)

@Component({
  selector: 'app-income-chart',
  templateUrl: './index.xrpl.html',
  styleUrls: ['./style.scss'],
  imports: [MatIconModule, MatButtonModule],
  standalone: true
})
export class IncomeChartComponent implements OnInit {
  data = [
    { month: 'Aug', count: 0 },
    { month: 'Sep', count: 0 },
    { month: 'Oct', count: 0 },
    { month: 'Nov', count: 0 },
    { month: 'Des', count: 0 },
    { month: 'Jan', count: 0 },
    { month: 'Feb', count: 0 },
    { month: 'Mar', count: 0 },
    { month: 'Apr', count: 0 },
    { month: 'May', count: 0 },
    { month: 'Jun', count: 0 },
    { month: 'Jul', count: 0 }
  ];
  DATA_COUNT = 7;
  NUMBER_CFG = { count: this.DATA_COUNT, min: 0, max: 100 };


  chartdata: any;

  labeldata: any[] = [];
  realdata: any[] = [];
  colordata: any[] = [];
  chart: Chart;
  @ViewChild('barChar', { static: true }) barchar: ElementRef<HTMLCanvasElement>;

  ngOnInit(): void {
    this.RenderChart(this.labeldata, this.realdata, this.colordata, 'bar', this.barchar.nativeElement);
  }

  RenderChart(labeldata: any, maindata: any, colordata: any, type: any, id: any) {
    const myChart = new Chart(id, {
      type: type,
      data: {
        labels: this.data.map(row => row.month),
        datasets: [
          {
            backgroundColor: ['rgba(92, 104, 255, 1)'],
            pointStyle: 'circle',
            borderColor: "white",
            borderWidth: 1,
            borderRadius: {
              topLeft: 10,
              topRight: 10,
              bottomLeft: 10,
              bottomRight: 10
            },
            borderSkipped: false,
            barThickness: 6,
            barPercentage: 0.5,

            label: 'Portfolio lend',
            data: this.data.map(row => row.count)
          },

          {
            padding: {
              bottom: 10
            },
            backgroundColor: ['rgba(112, 207, 152,1)'],
            borderColor: "white",
            borderWidth: 1,
            borderRadius: {
              topLeft: 10,
              topRight: 10,
              bottomLeft: 10,
              bottomRight: 10
            },
            borderSkipped: false,
            barThickness: 6,
            barPercentage: 0.5,
            label: 'Corporate bonds',
            data: this.data.map(row => row.count)
          },

          {
            backgroundColor: ['rgba(249, 191, 87, 1)'],
            borderColor: "white",
            borderWidth: 1,
            borderRadius: {
              topLeft: 10,
              topRight: 10,
              bottomLeft: 10,
              bottomRight: 10
            },
            borderSkipped: false,
            barThickness: 6,
            barPercentage: 0.5,
            label: 'P2P lending',
            data: this.data.map(row => row.count)
          },

          {
            backgroundColor: ['rgba(255, 98, 112, 1)'],
            borderColor: "white",
            borderWidth: 1,
            borderRadius: {
              topLeft: 20,
              topRight: 20,
              bottomLeft: 20,
              bottomRight: 20
            },
            borderSkipped: false,
            barThickness: 6,
            barPercentage: 0.5,
            label: 'Autonomous earning',
            data: this.data.map(row => row.count)
          }

        ]
      },
      options: {

        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
            },
          }
        },

        scales: {
          x: {
            stacked: true,
            grid: {
              drawBorder: false,
              display: false,
            },

          },
          y: {
            stacked: true,
            beginAtZero: true,
            border: {
              display: false
            },
          }
        }
      }
    });
  }

  @Input() List: Array<IncomeBarModel>;


  public changeBarData() {
    console.log('changeBarData')
  }

}
