import { Component, ElementRef, Input, OnInit, ViewChild, signal } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { IncomeBarModel } from 'src/app/model/income.bar.model';
import { WalletProvider } from 'src/app/providers/wallet/WalletProvider';
import { LoaderProvider } from 'src/app/providers';
import { DatePipe, DecimalPipe } from '@angular/common';
Chart.register(...registerables)

@Component({
  selector: 'app-income-chart',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  imports: [MatIconModule, MatButtonModule, DecimalPipe, DatePipe],
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

  startDate: bigint = 0n;
  decimals = 18;
  
  start = signal<Date | null>(null);
  end = signal<Date | null>(null);

  amount = signal<number>(4);

  labeldata: any[] = [];
  realdata: any[] = [];
  colordata: any[] = [];
  chart: Chart;
  @ViewChild('barChar', { static: true }) barchar: ElementRef<HTMLCanvasElement>;
  chartAmount = 0;

  constructor(private walletProvider: WalletProvider, private loaderProvider: LoaderProvider) { }

  ngOnInit(): void {
    this.RenderChart(this.labeldata, this.realdata, this.colordata, 'bar', this.barchar.nativeElement);
    this.init();
  }

  ngOnDestroy(){
    this.chart.destroy();
  }

  async init() {
    this.loaderProvider.show();

    await this.walletProvider.connect();
    const [params, percent, periods, decimals] = await this.walletProvider.getEarnContractParams();
    this.amount.set(Number(percent.amount / 10n));
    this.decimals = Number(decimals);
    this.startDate = params[2] * 1000n;
    this.setLends();
    this.loaderProvider.hide();
  }

  async setLends() {
    const k = await this.walletProvider.getLends();
    let start = null;
    let end = null;
    let amount = 0;
    let apy = 0;

    for (const i of k) {
      if (i.status == 0n) {
        if(i.rewards[1] > 0){
          apy += (Number(i.rewards[0]) / Number(i.rewards[1]))
        }
        amount += Number(i.amount);
        if (start == null || start < i.startDay) {
          start = i.startDay;
        }
        if (end == null || end > i.endDay) {
          end = i.endDay;
        }
      }
    }
    const mreturn = apy/1000 * (amount/10**this.decimals)/12
    this.data[0].count = mreturn;
    if (start != null) {
      this.start.set(new Date(Number(this.startDate) + Number(start) * 24 * 60 * 60 * 1000))
    }

    if (start != null) {
      this.end.set(new Date(Number(this.startDate) + Number(end) * 24 * 60 * 60 * 1000))
    }

    this.RenderChart(this.labeldata, this.realdata, this.colordata, 'bar', this.barchar.nativeElement);

  }

  RenderChart(labeldata: any, maindata: any, colordata: any, type: any, id: any) {
    if(this.chart){
      this.chart.destroy()
    }
    this.chart = new Chart(id, {
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

          // {
          //   padding: {
          //     bottom: 10
          //   },
          //   backgroundColor: ['rgba(112, 207, 152,1)'],
          //   borderColor: "white",
          //   borderWidth: 1,
          //   borderRadius: {
          //     topLeft: 10,
          //     topRight: 10,
          //     bottomLeft: 10,
          //     bottomRight: 10
          //   },
          //   borderSkipped: false,
          //   barThickness: 6,
          //   barPercentage: 0.5,
          //   label: 'Corporate bonds',
          //   data: this.data.map(row => row.count)
          // },

          // {
          //   backgroundColor: ['rgba(249, 191, 87, 1)'],
          //   borderColor: "white",
          //   borderWidth: 1,
          //   borderRadius: {
          //     topLeft: 10,
          //     topRight: 10,
          //     bottomLeft: 10,
          //     bottomRight: 10
          //   },
          //   borderSkipped: false,
          //   barThickness: 6,
          //   barPercentage: 0.5,
          //   label: 'P2P lending',
          //   data: this.data.map(row => row.count)
          // },

          // {
          //   backgroundColor: ['rgba(255, 98, 112, 1)'],
          //   borderColor: "white",
          //   borderWidth: 1,
          //   borderRadius: {
          //     topLeft: 20,
          //     topRight: 20,
          //     bottomLeft: 20,
          //     bottomRight: 20
          //   },
          //   borderSkipped: false,
          //   barThickness: 6,
          //   barPercentage: 0.5,
          //   label: 'Autonomous earning',
          //   data: this.data.map(row => row.count)
          // }

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