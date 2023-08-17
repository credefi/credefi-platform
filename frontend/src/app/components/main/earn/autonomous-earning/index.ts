import { ChangeDetectionStrategy, Component, signal, HostListener, OnDestroy, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { WalletProvider } from 'src/app/providers/wallet/WalletProvider';
import { EARN_ADDRESS } from 'src/environments/environment';
import { HeaderComponent } from 'src/app/components/main/shared/header';
import { SidebarComponent } from '../../shared/sidebar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { LoaderProvider } from 'src/app/providers';
import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { track } from 'src/app/helpers/track';
import { AddressPipeModule } from 'src/app/pipes/address';
import { HexToDecPipeModule } from 'src/app/pipes/hextodec';
import { CREDI_ADDRESS, USDT_ADDRESS } from 'src/environments/environment';
import { ABI as USDT_ABI } from 'src/globals/abi-usdt';



import { BannerAutonomousEarningComponent } from '../../shared/banner-autonomous-earning';
import { MatButtonModule } from '@angular/material/button';
import { AlertDialog } from '../../shared/alert';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NoopScrollStrategy } from '@angular/cdk/overlay';
Chart.register(...registerables)

@Component({
  selector: 'app-autonomous-earning',
  templateUrl: './index.html',
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
    RouterLink,
    NgSwitch, 
    NgSwitchCase, 
    NgSwitchDefault, 
    AddressPipeModule,
    HexToDecPipeModule,
    AlertDialog,
    MatDialogModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})

export class AutonomousEarningComponent implements OnDestroy, OnInit{

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
  progress = 100;
  max = 3000000;
  min = 250000;
  showTicks = false;
  step = 1000;
  buttonActive = 1;
  thumbLabel = false;
  value = 250000;

  data = [];
  DATA_COUNT = 7;
  NUMBER_CFG = { count: this.DATA_COUNT, min: 0, max: 100 };

  chartdata: any;

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

  periods = signal<any>([]);
  amount = signal<bigint>(4n);
  total = signal(0);
  apy = signal(0);
  earn = signal(0);
  daily = signal(0);
  balance = signal(0);
  tvl = signal(0);
  active = signal(false);
  totalDays = signal(0);
  recenttxs = signal([]);
  chart: Chart;
  info = 1;
  infoActive = 1;

  @ViewChild('barchart', {static: true}) barchart: ElementRef<HTMLCanvasElement>;

  tvldata =  [];
  
  apydata = [];
  uratedata = [
    { month: 'Aug', count: 100 },
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
    { month: 'Jul', count: 0 },
  ];
  
  constructor(
    private walletProvider: WalletProvider, 
    private loaderProvider: LoaderProvider,
    private dialog: MatDialog
    ) {}

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
      this.init();
    } catch (e) {
      console.log(e)
     }
  }

  ngOnDestroy(){
    this.cleanChart();
  }

  async init() {

    this.loaderProvider.show();

    await this.walletProvider.connect();
    const [params, percent, periods, decimals] = await this.walletProvider.getEarnContractParams();
    const tvl = Number(params[3]) / (10 ** Number(decimals))
    this.tvl.set(tvl);
    const withdraws =  Number(params[4]) / (10 ** Number(decimals))
    
    const p = periods.sort((a, b) => {
      return a.period < b.period ? -1 : 0;
    })

    this.periods.set(p)
    this.amount.set(percent.amount / 10n);
    this.setLends();
    this.balance.set(await this.walletProvider.getContractBalance({
      ABI: USDT_ABI,
      address: USDT_ADDRESS
    }));
    this.tvldata =     [{ month: 'Aug', count: this.tvl() },
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
                        { month: 'Jul', count: 0 }];
    this.RenderChartTVL(this.labeldata, this.realdata, this.colordata, 'bar', 'barchart');
    this.loaderProvider.hide();
  }

  async setLends() {
    const k = await this.walletProvider.getLends();
    let total = 0n;
    let apy: any = 0;
    
    if(k.length > 0){
      this.active.set(true);
    }

    for (const i of k) {
      if (i.status == 0n) {
        total += i.amount;
        if (i.rewards[1] > 0n) {
          apy += (Number(i.rewards[0]) / Number(i.rewards[1]))
        }
      }
     this.totalDays.set(Number(i.endDay));
    }
    this.apy.set(Number(apy) / 10);
    this.total.set(Number(total) / (10 ** 18));
    this.earn.set(this.total() * this.apy() / 100);
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

  cleanChart(){
    if(this.chart){
      this.chart.destroy()
    }
  }

  RenderChartTVL(labeldata: any, maindata: any, colordata: any, type: any, id: any) {
    this.cleanChart();
    this.buttonActive = 1;
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
    this.buttonActive = 2;
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
    this.buttonActive = 3;
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
      const value = this.form.value;
      try {

        const rawData = await this.walletProvider.approveMetamask({
          from: this.walletProvider.address(),
          spender: EARN_ADDRESS,
          amount: value.amount
        });
        this.load.set(true);

        const data = await (window as any).ethereum
          .request({
            method: 'eth_sendTransaction',
            params: [rawData],
          });

        const transaction = await this.checkTransaction(data);

        if (!transaction?.status) {
          await this.checkTransactionListener(data);
        }
        const r = await this.walletProvider.earnMetamask({ from: this.walletProvider.address(), amount: value.amount, index: value.period });

        const tx = await (window as any).ethereum
          .request({
            method: 'eth_sendTransaction',
            params: [r],
          });

        window.open(`https://etherscan.io/tx/${tx}`);
        this.setLends();
        this.form.reset()


      } catch (e) {
        this.alertDialog(e.message)
      } finally {
        this.load.set(false);
        this.setLends();
      }
    }
  }

  async checkTransaction(hash: string) {
    try {
      return await this.walletProvider.web3.eth.getTransactionReceipt(hash);
    } catch (e) {
      return null;
    }
  }

  checkTransactionListener(hash: string) {
    return new Promise((resolve, reject) => {
      const interval = setInterval(() => {
        this.walletProvider.web3.eth.getTransactionReceipt(hash).then((transaction) => {
          if (transaction?.status) {
            clearInterval(interval);
            return resolve(transaction);
          }
        }).catch((e: Error) => {
          console.log(e)
        });
      }, 1000);
    });
  }

  showTVL(){
    this.RenderChartTVL(this.labeldata, this.realdata, this.colordata, 'bar', this.barchart.nativeElement);
  }
  
  showAPY(){
    this.RenderChartAPY(this.labeldata, this.realdata, this.colordata, 'bar', this.barchart.nativeElement);
    this.apydata = [
      { month: 'Aug', count: this.apy() },
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
      { month: 'Jul', count: 0 },
    ];
    this.RenderChartAPY(this.labeldata, this.realdata, this.colordata, 'bar', 'barchart');
  }

  showURate(){
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

  async loadRecent(){
    this.infoActive = 3;
    this.info =3;
    const txs = await this.walletProvider.getTransactions(8, null, '0xda4087f7ab6075fe4599871cd7f464859923a0dd');
    this.recenttxs.set(txs.result.transfers);
  }

  alertDialog(message){
    this.dialog.open(AlertDialog, {
      scrollStrategy: new NoopScrollStrategy(),
      autoFocus: false,
      panelClass: 'wallet-dialog',
      data: {
        message
      }
    });
  }

  track = track;
}
