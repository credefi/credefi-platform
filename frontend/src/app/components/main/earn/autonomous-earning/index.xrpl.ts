import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { Chart, registerables } from 'chart.js';
import { WalletXRPLProvider } from 'src/app/providers/wallet/WalletXRPLProvider';
import { HeaderComponent } from 'src/app/components/main/shared/header';
import { SidebarComponent } from '../../shared/sidebar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { LoaderProvider, XummProvider } from 'src/app/providers';
import { BannerAutonomousEarningComponent } from '../../shared/banner-autonomous-earning';
import { MatButtonModule } from '@angular/material/button';
import { WalletTypes } from 'src/globals';
import { ConnectXRPLDialog } from 'src/app/helpers/connectXRPLDialog';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { xrpToDrops } from 'xrpl';
import { XummDialog } from '../../shared/xumm-dialog';
import { NoopScrollStrategy } from '@angular/cdk/overlay';
Chart.register(...registerables)

@Component({
  selector: 'app-autonomous-earning',
  templateUrl: './index.xrpl.html',
  styleUrls: ['./style.scss'],
  imports: [
    HeaderComponent,
    SidebarComponent,
    MatIconModule,
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSliderModule,
    ReactiveFormsModule,
    FormsModule,
    BannerAutonomousEarningComponent,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    XummDialog
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})

export class AutonomousEarningComponent extends ConnectXRPLDialog implements OnDestroy, OnInit {

  lend = "rhikRdkFw28csKw9z7fVoBjWncz1HSoQij";
  load = signal(false);
  title = "Autonomous Earning is live!";
  description = "Unlock the power of your stablecoins and earn interest on autopilot!";
  image = "./assets/images/dashboardBanner.png"
  currentPage = "Autonomous earning"
  color1 = "#6FACFF"
  color2 = "#5C68FF"
  color3 = "#2984FE"
  linearGradient = "background: linear-gradient(91.78deg, #6FACFF, #5C68FF,#2984FE);"
  height = '2426px';
  list: Array<string> = ["Tether", "Cardano", "Bitcoin"];
  disabled = false;
  progress = 30;
  max = 3000000;
  min = 250000;
  showTicks = false;
  step = 1000;
  thumbLabel = false;
  value = 250000;
  tvldata = [
    { month: 'Jul', count: 200000 },
    { month: 'Aug', count: 250000 },
    { month: 'Sep', count: 0 },
    { month: 'Oct', count: 0 },
    { month: 'Nov', count: 0 },
    { month: 'Des', count: 0 },
    { month: 'Jan', count: 0 },
    { month: 'Feb', count: 0 },
    { month: 'Mar', count: 0 },
    { month: 'Apr', count: 0 },
    { month: 'May', count: 0 },
    { month: 'Jun', count: 0 }
  ];
  apydata = [
    { month: 'Jul', count: 12 },
    { month: 'Aug', count: 12 },
    { month: 'Sep', count: 0 },
    { month: 'Oct', count: 0 },
    { month: 'Nov', count: 0 },
    { month: 'Des', count: 0 },
    { month: 'Jan', count: 0 },
    { month: 'Feb', count: 0 },
    { month: 'Mar', count: 0 },
    { month: 'Apr', count: 0 },
    { month: 'May', count: 0 },
    { month: 'Jun', count: 0 }
  ];
  uratedata = [
    { month: 'Jul', count: 100 },
    { month: 'Aug', count: 80 },
    { month: 'Sep', count: 0 },
    { month: 'Oct', count: 0 },
    { month: 'Nov', count: 0 },
    { month: 'Des', count: 0 },
    { month: 'Jan', count: 0 },
    { month: 'Feb', count: 0 },
    { month: 'Mar', count: 0 },
    { month: 'Apr', count: 0 },
    { month: 'May', count: 0 },
    { month: 'Jun', count: 0 }
  ];
  data = [];
  DATA_COUNT = 7;
  NUMBER_CFG = { count: this.DATA_COUNT, min: 0, max: 100 };

  chartdata: any;
  buttonActive = 1;
  info = 1;
  infoActive = 1;
  labeldata: any[] = [];
  realdata: any[] = [];
  colordata: any[] = [];

  form = new FormGroup({
    period: new FormControl(0, [
      Validators.required
    ]),
    amount: new FormControl<number | null>(null, [
      Validators.required
    ]),
  });

  periods = signal<any>([
    {
      index: 0,
      period: 90
    },
    {
      index: 1,
      period: 180
    },
    {
      index: 2,
      period: 270
    },
    {
      index: 3,
      period: 360
    }
  ])
  amount = signal<bigint>(4n);
  total = signal(0);
  apy = signal(0);
  earn = signal(0);
  daily = signal(0);
  active = signal(false);
  chart: Chart;
  @ViewChild('barchart', {static: true}) barchart: ElementRef<HTMLCanvasElement>;

  constructor(
    private xummWallet: XummProvider,
    private walletProvider: WalletXRPLProvider,
    private loaderProvider: LoaderProvider,
    private matDialog: MatDialog
  ) {
    super();
  }

  ngOnInit(): void {
    if (window.outerWidth <= 700) {
      const element = document.getElementsByClassName("h4-padding mobile")[0];
      element.textContent = "CityCash";
      this.tvldata = [
        { month: 'Jan', count: 40 },
        { month: 'Feb', count: 30 },
        { month: 'Mar', count: 10 },
        { month: 'Apr', count: 8 },
        { month: 'May', count: 12 },
      ];
    }
    try {
      this.RenderChartTVL(this.labeldata, this.realdata, this.colordata, 'bar', this.barchart.nativeElement);
      this.loadTotal();
    } catch (e) { }
  }

  async setLends() { }

  ngOnDestroy(){
    this.cleanChart();
  }

  fn(value) {
    if (value < 1000000) {
      // let a = value / 1000;
      if (value % 1000 == 0) {
        var right = "000";
      } else {
        right = (value % 1000).toString();
      }
      return Math.floor(value / 1000) + "." + right + ".00";
    } else {
      if (value % 1000 == 0) {
        var hundred = "000";
      } else {
        hundred = (value % 1000).toString();
      }
      if (Math.floor(value / 1000) % 1000 == 0) {
        var thousand = "000";
      } else {
        thousand = (Math.floor(value / 1000) % 1000).toString();
        if (thousand.length == 1) thousand = "00" + thousand;
        if (thousand.length == 2) thousand = "0" + thousand;
      }
      return Math.floor(value / 1000000) + "," + thousand + "." + hundred + ".00";
    }
    return value / 100;
  }

  cleanChart() {
    if (this.chart) {
      this.chart.destroy()
    }
  }

  RenderChartTVL(labeldata: any, maindata: any, colordata: any, type: any, id: any) {
    this.cleanChart();
    this.chart = new Chart(id, {
      type: type,
      data: {
        labels: this.tvldata.map(row => row.month),
        datasets: [
          {
            backgroundColor: ['rgba(79, 166, 119, 1)'],
            pointStyle: 'circle',
            borderColor: "white",
            borderWidth: 1,
            borderRadius: {
              topLeft: 20,
              topRight: 20,
              bottomLeft: 20,
              bottomRight: 20
            },
            borderSkipped: false,
            barThickness: 10,
            barPercentage: 0.5,

            // label: 'Portfolio lend',
            data: this.tvldata.map(row => row.count)
          },


        ]
      },
      options: {
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },

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
            // stacked: true,
            beginAtZero: true,
            border: {
              display: false
            },
          }
        }
      }
    });
  }

  RenderChartAPY(labeldata: any, maindata: any, colordata: any, type: any, id: any) {
    this.cleanChart();
    this.chart = new Chart(id, {
      type: type,
      data: {
        labels: this.apydata.map(row => row.month),
        datasets: [
          {
            backgroundColor: ['rgba(92, 104, 255, 1)'],
            pointStyle: 'circle',
            borderColor: "white",
            borderWidth: 1,
            borderRadius: {
              topLeft: 20,
              topRight: 20,
              bottomLeft: 20,
              bottomRight: 20
            },
            borderSkipped: false,
            barThickness: 10,
            barPercentage: 0.5,

            // label: 'Portfolio lend',
            data: this.apydata.map(row => row.count)
          },


        ]
      },
      options: {

        plugins: {
          legend: {
            display: false
          },

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
            // stacked: true,
            beginAtZero: true,
            border: {
              display: false
            },
          }
        }
      }
    });
  }

  RenderChartUrate(labeldata: any, maindata: any, colordata: any, type: any, id: any) {
    this.cleanChart();
    this.chart = new Chart(id, {
      type: type,
      data: {
        labels: this.uratedata.map(row => row.month),
        datasets: [
          {
            backgroundColor: ['rgba(211, 174, 219, 1)'],
            pointStyle: 'circle',
            borderColor: "white",
            borderWidth: 1,
            borderRadius: {
              topLeft: 20,
              topRight: 20,
              bottomLeft: 20,
              bottomRight: 20
            },
            borderSkipped: false,
            barThickness: 10,
            barPercentage: 0.5,

            // label: 'Portfolio lend',
            data: this.uratedata.map(row => row.count)
          },


        ]
      },
      options: {

        plugins: {
          legend: {
            display: false
          },

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
            // stacked: true,
            beginAtZero: true,
            border: {
              display: false
            },
          }
        }
      }
    });
  }

  async onSubmit() {
    if (this.form.valid) {

      if (!this.walletProvider.wallet()) {
        return await this.connect();
      }

      switch (this.walletProvider.wallet().type) {
        case (WalletTypes.gemwallet): {
          this.gumWalletSubmit();
          break;
        }
        case (WalletTypes.xumm): {
          this.xummWalletSubmit();
          break;
        }
      }

    }
  }

  async gumWalletSubmit() {
    if (this.form.valid) {
      try {
        const value = this.form.value;
        this.load.set(true);
        await this.walletProvider.transactionGemWallet({
          amount: value.amount.toString(),
          destination: this.lend,
          memo: {
            period: this.periods()[value.period].period,
            lease: 5
          }
        });
        this.form.reset();
        this.loadTotal();
      } catch (e) {
        console.log(e)
      } finally {
        this.load.set(false);
      }

    }
  }

  xummWalletSubmit() {
    const value = this.form.value;

    this.xummWallet.request({
      "TransactionType": "Payment",
      "Destination": this.lend,
      "Amount": xrpToDrops(value.amount),
      "Memos": [
        {
          Memo: {
            MemoData: Buffer.from(JSON.stringify({
              period: this.periods()[value.period].period,
              lease: 5
            })).toString('hex')
          }
        }
      ]
    }).subscribe(({ result }) => {
      if (result) {
        this.matDialog.open(XummDialog, {
          scrollStrategy: new NoopScrollStrategy(),
          autoFocus: false,
          panelClass: 'wallet-dialog',
          data: result
        }).afterClosed().subscribe((data) => {
          this.load.set(false);
          if(data){
            this.form.reset();
            this.loadTotal();
          }
        })
      }
    })
  }

  async loadTotal(){
    const balance = await this.walletProvider.getBalance(this.lend);
    this.total.set(Number(balance));
  }

  showTVL() {
    this.RenderChartTVL(this.labeldata, this.realdata, this.colordata, 'bar', this.barchart.nativeElement);
  }

  showAPY() {
    this.RenderChartAPY(this.labeldata, this.realdata, this.colordata, 'bar', this.barchart.nativeElement);
  }

  showURate() {
    this.RenderChartUrate(this.labeldata, this.realdata, this.colordata, 'bar', this.barchart.nativeElement);
  }


  loadDeal(){
    this.infoActive = 1;
    this.info =1;
  }

  loadParams(){
    this.infoActive = 2;
    this.info =2;
  }

  loadRecent(){
    this.infoActive = 3;
    this.info =3;
  }
}
