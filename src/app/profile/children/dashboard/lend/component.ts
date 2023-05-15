import { isPlatformBrowser } from '@angular/common';
import { Component, ChangeDetectionStrategy, ViewChild, ElementRef, PLATFORM_ID, Inject, OnDestroy, ChangeDetectorRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DecimalPipe } from '@angular/common';

import Chart from 'chart.js/auto'
import { ChartTypeRegistry } from 'chart.js';

import { Subscription } from 'rxjs';


import { IObjectKeys } from 'src/app/helpers/interfaces';
import { MapProvider } from 'src/app/providers';
import { WALLET_TYPES } from 'src/environments/environment';
import { Web3ClientProvider } from 'src/app/providers/web3';

@Component({
  selector: 'dashboard-lend-page',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DashboardLendComponent implements OnInit, OnDestroy {

  hasNextPaymentDate = false;

  metamMaskSubscription!: Subscription;

  configuration: IObjectKeys;
  balance = 0;
  tvl = 0;
  next: IObjectKeys;
  status: IObjectKeys;
  _fundsAvailable!: number;
  _fundsDeployed!: number;
  _interestReceived!: number;

  dateTime!: string;
  timeListener!: NodeJS.Timer;

  time: number;
  userStatus: IObjectKeys;
  accounts!: IObjectKeys[];
  pieChart!: Chart<keyof ChartTypeRegistry, string[], string>;
  chartHorizontal!: Chart<keyof ChartTypeRegistry, string[], string>;
  chartDoughnut!: Chart<keyof ChartTypeRegistry, string[], string>;

  @ViewChild('chartElement', { static: true }) chartElement!: ElementRef<HTMLCanvasElement>;
  @ViewChild('chartHorizontalElement', { static: true }) chartHorizontalElement!: ElementRef<HTMLCanvasElement>;
  @ViewChild('chartDoughnutElement', { static: true }) chartDoughnutElement!: ElementRef<HTMLCanvasElement>;

  translations: { [key: string]: string | Function | any } = this.activateRoute.snapshot.data.translations;

  constructor(
    private mapProvider: MapProvider,
    private web3: Web3ClientProvider,
    private change: ChangeDetectorRef,
    private activateRoute: ActivatedRoute,
    private DecimalPipe: DecimalPipe,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {

    const { status, next, configuration, userStatus, tvl } = this.activateRoute.snapshot.data;

    const c = new Date();
    const cn = new Date(next.nextPaymentDate + 1000 * 60 * 60 * 10);

    if (next.nextPaymentDate) {
      this.hasNextPaymentDate = true;
    }

    this.tvl = tvl;
    this.userStatus = userStatus;
    this.configuration = configuration;
    this.time = cn.getTime() - c.getTime();

    this.status = status;
    this.next = next;
    this.dateTime = this.msToTime();
    this.setWallets();
    this.setFundsDeployed();
    this.setInterestReceived();
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {

      this.metamMaskSubscription = this.mapProvider.setSubsription(MapProvider.METAMASK).subscribe(() => {
        this.setWallets();
        this.change.markForCheck();
      });

      this.createBarChart();
      this.createDoughnut();

      this.timeListener = setInterval(() => {
        this.time = this.time - 1000;
        this.dateTime = this.msToTime();
        this.change.markForCheck();
      }, 1000);

    }

  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      this.pieChart?.destroy();
      this.chartHorizontal?.destroy();
      this.chartDoughnut?.destroy();
      if (this.timeListener) {
        clearInterval(this.timeListener);
      }
      if (this.metamMaskSubscription) {
        this.metamMaskSubscription.unsubscribe();
      }
    }
  }

  createPieChart() {

    if (this.pieChart) {
      const data = {
        labels: [
          `${this.translations['fundsAvailable']}`,
          `${this.translations['fundsDeployed']}`
        ],
        datasets: [
          {
            data: [this.balance.toFixed(2), this.fundsDeployed.toFixed(2)],
            backgroundColor: ['#48B9FF', '#BDC4D3']
          }
        ]
      };

      this.pieChart.data = data;
      this.pieChart.update();
      return true;

    }

    const data = {
      labels: [
        `${this.translations['fundsAvailable']}`,
        `${this.translations['fundsDeployed']}`
      ],
      datasets: [
        {
          data: [this.balance.toFixed(2), this.fundsDeployed.toFixed(2)],
          backgroundColor: ['#48B9FF', '#BDC4D3']
        }
      ]
    };

    this.pieChart = new Chart(this.chartElement.nativeElement, {
      type: 'pie',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                return `${context.label}: ${this.DecimalPipe.transform(Number(context.raw), '1.2-2')} USD`;
              }
            }
          }
        }
      }
    });
  }

  createBarChart() {

    const { userAverageApy } = this.userStatus;
    const percent = (userAverageApy.percent / userAverageApy.count * 100).toFixed(2)
    const amount = (userAverageApy.amount / userAverageApy.count).toFixed(2)

    const data = {
      labels: [
        `${this.configuration.groupOneName}`,
        `${this.configuration.groupTwoName}`,
        `${this.configuration.groupThreeName}`,
        `${this.configuration.groupFourName}`,
        this.translations['weighted']
      ],
      datasets: [
        {
          maxBarThickness: 40,
          data: [
            (this.userStatus.groupOne.api / this.userStatus.groupOne.count).toString(),
            (this.userStatus.groupTwo.api / this.userStatus.groupTwo.count).toString(),
            (this.userStatus.groupThree.api / this.userStatus.groupThree.count).toString(),
            (this.userStatus.groupFour.api / this.userStatus.groupFour.count).toString(),
            percent
          ],
          backgroundColor: ['#9DDBF0', '#bdc4d3', '#0FA3FF', '#1D398C', '#1CB659']
        }
      ]
    };

    this.chartHorizontal = new Chart(this.chartHorizontalElement.nativeElement, {
      type: 'bar',
      data: data,
      plugins: [
        {
          id: '1',
          afterDraw: (c, args, options) => {
            const chartInstance = c;
            const ctx = chartInstance.ctx;

            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';

            data.datasets.forEach((dataset, i) => {
              const meta = chartInstance.getDatasetMeta(i);
              meta.data.forEach((bar, index) => {
                const data = `${dataset.data[index]}%`;
                ctx.fillText(data, bar.x, bar.y - 5);
              });
            });
          }
        }
      ],
      options: {
        responsive: true,
        layout: {
          padding: {
            top: 20
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              offset: true
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                let label = [];
                switch (context.dataIndex) {
                  case (0): {
                    const api = (this.userStatus.groupOne.api / this.userStatus.groupOne.count).toFixed(2);
                    const risk = (this.userStatus.groupOne.risk / this.userStatus.groupOne.count).toFixed(2);
                    const count = this.userStatus.groupOne.count.toString();
                    // const value = this.userStatus.groupOne.value.toFixed(2);

                    label.push(`${this.translations['apy-chart']}: ${api}%`);
                    label.push(`${this.translations['risk']}: ${risk}%`);
                    label.push(`${this.translations['count']}: ${count}`);
                    // label.push(`${this.translations['value']}: ${value} USD`);
                    break
                  }
                  case (1): {
                    const api = (this.userStatus.groupTwo.api / this.userStatus.groupTwo.count).toFixed(2);
                    const risk = (this.userStatus.groupTwo.risk / this.userStatus.groupTwo.count).toFixed(2);
                    const count = this.userStatus.groupTwo.count.toString();
                    // const value = this.userStatus.groupTwo.value.toFixed(2);

                    label.push(`${this.translations['apy-chart']}: ${api}%`);
                    label.push(`${this.translations['risk']}: ${risk}%`);
                    label.push(`${this.translations['count']}: ${count}`);
                    // label.push(`${this.translations['value']}: ${value} USD`);
                    break
                  }
                  case (2): {
                    const api = (this.userStatus.groupThree.api / this.userStatus.groupThree.count).toFixed(2);
                    const risk = (this.userStatus.groupThree.risk / this.userStatus.groupThree.count).toFixed(2);
                    const count = this.userStatus.groupThree.count.toString();
                    // const value = this.userStatus.groupThree.value.toFixed(2);

                    label.push(`${this.translations['apy-chart']}: ${api}%`);
                    label.push(`${this.translations['risk']}: ${risk}%`);
                    label.push(`${this.translations['count']}: ${count}`);
                    // label.push(`${this.translations['value']}: ${value} USD`);
                    break
                  }
                  case (3): {
                    const api = (this.userStatus.groupFour.api / this.userStatus.groupFour.count).toFixed(2);
                    const risk = (this.userStatus.groupFour.risk / this.userStatus.groupFour.count).toFixed(2);
                    const count = this.userStatus.groupFour.count.toString();
                    // const value = this.userStatus.groupFour.value.toFixed(2);

                    label.push(`${this.translations['apy-chart']}: ${api}%`);
                    label.push(`${this.translations['risk']}: ${risk}%`);
                    label.push(`${this.translations['count']}: ${count}`);
                    // label.push(`${this.translations['value']}: ${value} USD`);
                    break
                  }
                  case (4): {
                    label.push(`${this.translations['apy-chart']}: ${percent}%`);
                    // label.push(`${this.translations['value']}: ${amount} USD`);
                    break
                  }
                }
                return label;
              }
            }
          }
        }
      }
    });

  }

  createDoughnut() {
    const total = this.userStatus.groupOne.allocated + this.userStatus.groupTwo.allocated + this.userStatus.groupThree.allocated + this.userStatus.groupFour.allocated;

    let percentOne = 0;
    let percentTwo = 0;
    let percentThree = 0;
    let percentFour = 0;

    if (total > 0) {

      percentOne = this.userStatus.groupOne.allocated / total * 100;
      percentTwo = this.userStatus.groupTwo.allocated / total * 100;
      percentThree = this.userStatus.groupThree.allocated / total * 100;
      percentFour = this.userStatus.groupFour.allocated / total * 100;

      const tt = percentOne + percentTwo + percentThree + percentFour;
      const q = tt - 100;

      if (q < 0) {
        const pfour = Number(percentFour) + q;
        percentFour = pfour;
      } else {
        const pfour = Number(percentFour) - q;
        percentFour = pfour;
      }

    }

    const data = {
      labels: [
        `${this.configuration.groupOneName} ${percentOne.toFixed(2)}%`,
        `${this.configuration.groupTwoName} ${percentTwo.toFixed(2)}%`,
        `${this.configuration.groupThreeName} ${percentThree.toFixed(2)}%`,
        `${this.configuration.groupFourName} ${percentFour.toFixed(2)}%`,
      ],
      datasets: [
        {
          data: [percentOne.toFixed(2), percentTwo.toFixed(2), percentThree.toFixed(2), percentFour.toFixed(2)],
          backgroundColor: ['#1f3c87', '#4c639f', '#48b9ff', '#a5b1cf']
        }
      ]
    };

    this.chartDoughnut = new Chart(this.chartDoughnutElement.nativeElement, {
      type: 'doughnut',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#181818',
              pointStyle: 'dot',
              usePointStyle: true,
              font: {
                size: 12,
                weight: '300'
              },
            }
          },
          title: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: (context) => {

                let label = [];
                switch (context.dataIndex) {
                  case (0): {
                    label.push(`${this.configuration.groupOneName} ${this.userStatus.groupOne.allocated} USD`,)
                    break
                  }
                  case (1): {
                    label.push(`${this.configuration.groupTwoName} ${this.userStatus.groupTwo.allocated} USD`,)
                    break
                  }
                  case (2): {
                    label.push(`${this.configuration.groupThreeName} ${this.userStatus.groupThree.allocated} USD`,)
                    break
                  }
                  case (3): {
                    label.push(`${this.configuration.groupFourName} ${this.userStatus.groupFour.allocated} USD`,)

                    break
                  }
                }

                return label;
              }
            }
          }
        }
      }
    });
  }

  msToTime() {

    const ms = Math.abs(this.time);

    const d = Math.floor(ms / 1000 / 60 / 60 / 24);
    const h = Math.floor((ms / 1000 / 60 / 60) - d * 24);
    const m = Math.floor((ms / 1000 / 60 / 60 - (d * 24) - h) * 60);
    const s = Math.floor(((ms / 1000 / 60 / 60 - (d * 24) - h) * 60 - m) * 60);

    // To get time format 00:00:00
    const days: string = d < 10 ? `0${d}` : `${d}`;
    const seconds: string = s < 10 ? `0${s}` : `${s}`;
    const minutes: string = m < 10 ? `0${m}` : `${m}`;
    const hours: string = h < 10 ? `0${h}` : `${h}`;

    let text = '';

    if (days != '00') {
      text += `${days}d `;
    }

    return `${text}${hours}:${minutes}:${seconds}`;
  }

  setFundsDeployed() {
    let n = 0;
    for (const key in this.status) {
      for (const k in this.status[key]) {
        n += this.status[key][k].totalAmount;
      }
    }
    this._fundsDeployed = n;
  }

  get fundsDeployed() {
    return this._fundsDeployed;
  }

  setInterestReceived() {
    let n = 0;
    for (const k in this.status['completed']) {
      n += this.status.completed[k].amount;
    }
    this._interestReceived = n;
  }

  get interestReceived() {
    return this._interestReceived;
  }

  setWallets() {
    const { accounts } = this.activateRoute.snapshot.data;
    const metamask = this.mapProvider.get(MapProvider.METAMASK);
    this.accounts = accounts.map((item: IObjectKeys) => {
      item.type = WALLET_TYPES.credi;
      return item;
    });
    if (metamask) {
      this.accounts.unshift({
        name: 'Metamask wallet',
        address: metamask,
        type: WALLET_TYPES.metamask
      })
    }
    this.resetBalance();
  }

  resetBalance() {
    const set: Set<string> = new Set();
    this.accounts.forEach((a) => set.add(this.web3.toHex(a.address).toLowerCase()));
    const accounts: string[] = Array.from(set);

    const promisesUSDC = accounts.map((a) => this.web3.getContractBalance({ address: this.web3.toHex(a), contract: this.web3.currenciesObject.usdc }));
    const promisesUSDT = accounts.map((a) => this.web3.getContractBalance({ address: this.web3.toHex(a), contract: this.web3.currenciesObject.usdt }));
    const promisesDAI = accounts.map((a) => this.web3.getContractBalance({ address: this.web3.toHex(a), contract: this.web3.currenciesObject.dai }));

    Promise.all([
      Promise.all(promisesUSDC),
      Promise.all(promisesUSDT),
      Promise.all(promisesDAI),
    ]).then(([usdc, usdt, dai]) => {

      const usdcBalance = usdc.reduce<number>((price, value) => {
        return price + Number(value);
      }, 0);

      const usdtBalance = usdt.reduce<number>((price, value) => {
        return price + Number(value);
      }, 0);

      const daiBalance = dai.reduce<number>((price, value) => {
        return price + Number(value);
      }, 0);

      this.balance = usdcBalance + usdtBalance + daiBalance;
      this.createPieChart();
      this.change.markForCheck();

    }).catch(e => console.log(e)).finally(() => this.change.markForCheck());

  }

}
