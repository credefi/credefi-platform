import { Component, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import { IObjectKeys } from 'src/app/helpers/interfaces';

import { LoanProvider } from '../providers';
import { Environment, FileTypes } from 'src/globals/config';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { validateEmail } from 'src/app/helpers/emailValidator';
import { CURRENCIES } from 'src/environments/environment';

@Component({
  selector: 'admin-load-page',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoanComponent {

  types = {
    title: 'title'
  }

  loan: IObjectKeys;

  fileTypes = FileTypes;

  years: string[] = [];
  _image!: IObjectKeys;
  _pdf!: IObjectKeys;

  currency!: IObjectKeys;
  wallet !: IObjectKeys | null;

  configuration: IObjectKeys;
  currencies = CURRENCIES;

  submitted = false;
  isSubmit = false;

  translations: { [key: string]: string | Function | any } = this.activateRoute.snapshot.data.translations;

  form = new UntypedFormGroup({
    walletAddress: new UntypedFormControl(null, [
      Validators.required,
    ]),
    currencyAddress: new UntypedFormControl(null, [
      Validators.required,
    ]),
    pdfFile: new UntypedFormControl(null, [
      Validators.required,
    ]),
    imageFile: new UntypedFormControl(null, [
      Validators.required,
    ]),
    name: new UntypedFormControl(null, [
      Validators.required,
    ]),
    phone: new UntypedFormControl(null, [
      Validators.required,
    ]),
    email: new UntypedFormControl(null, [
      Validators.required,
      validateEmail
    ]),
    amount: new UntypedFormControl(null, [
      Validators.required,
    ]),
    months: new UntypedFormControl(null, [
      Validators.required,
    ]),
    createdAt: new UntypedFormControl(null, [
      Validators.required,
    ])
  });

  @ViewChild('chartElement', { static: true }) chartElement!: ElementRef<HTMLCanvasElement>;

  pageOne = {
    title: {
      key: 'assets',
      data: this.years,
      type: this.types.title
    },
    data: {
      totalLiquidAssets: {
        number: 1,
        key: 'totalLiquidAssets',
        data: ['cash', 'bankDeposits', 'securities'],
        total: ['cash', 'bankDeposits', 'securities']
      },
      totalReceivables: {
        number: 4,
        key: 'totalReceivables',
        data: ['customers', 'tradeDebtorBills', 'doutfullDebtors', 'otherDebtors', 'otherAccounts', 'dueFromAffiliates'],
        total: ['customers', 'tradeDebtorBills', 'doutfullDebtors', 'otherDebtors', 'otherAccounts', 'dueFromAffiliates'],
      },
      totalInventory: {
        number: 10,
        key: 'totalInventory',
        data: ['finishedGoodsProducts', 'workinProgress', 'rawMaterials', 'inventoryPrepayments'],
        total: ['finishedGoodsProducts', 'workinProgress', 'rawMaterials', 'inventoryPrepayments'],
      },
      totalCurrentAssets: {
        number: 14,
        key: 'totalCurrentAssets',
        data: ['dueEquityPayableWithinNextYear', 'transitoryAccountsInventory'],
        total: ['cash', 'bankDeposits', 'securities', 'customers', 'tradeDebtorBills', 'doutfullDebtors', 'otherDebtors', 'otherAccounts', 'dueFromAffiliates', 'finishedGoodsProducts', 'workinProgress', 'rawMaterials', 'inventoryPrepayments', 'dueEquityPayableWithinNextYear', 'transitoryAccountsInventory']
      },
      totalNetFixedAssets: {
        number: 16,
        key: 'totalNetFixedAssets',
        data: ['land', 'buildings', 'machinery', 'furniture', 'constructionInProgress', 'otherFixedAssets', 'lessDepreciation'],
        total: ['land', 'buildings', 'machinery', 'furniture', 'constructionInProgress', 'otherFixedAssets', 'lessDepreciation'],
      },
      totalLongTermAssets: {
        number: 24,
        key: 'totalLongTermAssets',
        data: ['participations', 'otherLTReceivables', 'LTReceivablesFromAffiliates', 'formationExpenses', 'intangibleFixedAssets'],
        total: ['participations', 'otherLTReceivables', 'LTReceivablesFromAffiliates', 'formationExpenses', 'intangibleFixedAssets'],
      },
      totalNonCurrentAssets: {
        number: 28,
        key: 'totalNonCurrentAssets',
        data: [],
        total: ['land', 'buildings', 'machinery', 'furniture', 'constructionInProgress', 'otherFixedAssets', 'lessDepreciation', 'participations', 'otherLTReceivables', 'LTReceivablesFromAffiliates', 'formationExpenses', 'intangibleFixedAssets'],
      },
      totalAssets: {
        number: 28,
        key: 'totalAssets',
        data: [],
        total: ['cash', 'bankDeposits', 'securities', 'customers', 'tradeDebtorBills', 'doutfullDebtors', 'otherDebtors', 'otherAccounts', 'dueFromAffiliates', 'finishedGoodsProducts', 'workinProgress', 'rawMaterials', 'inventoryPrepayments', 'dueEquityPayableWithinNextYear', 'transitoryAccountsInventory', 'land', 'buildings', 'machinery', 'furniture', 'constructionInProgress', 'otherFixedAssets', 'lessDepreciation', 'participations', 'otherLTReceivables', 'LTReceivablesFromAffiliates', 'formationExpenses', 'intangibleFixedAssets'],
      }
    }
  };

  pageTwo = {
    title: {
      key: 'liabilitiesNetWorth',
      data: this.years,
      type: this.types.title
    },
    data: {
      totalCurrentLiabilities: {
        number: 1,
        key: 'totalCurrentLiabilities',
        data: ['suppliers', 'chequesBillsPayable', 'shortTermDebt', 'taxesPayable', 'socialSecurityContributions', 'dividendsPayable', 'otherCreditors', 'shortTermLiabilitiesAffiliates', 'advancesfromCustomers', 'currentPortionLongTermDebt', 'transitoryAccounts'],
        total: ['suppliers', 'chequesBillsPayable', 'shortTermDebt', 'taxesPayable', 'socialSecurityContributions', 'dividendsPayable', 'otherCreditors', 'shortTermLiabilitiesAffiliates', 'advancesfromCustomers', 'currentPortionLongTermDebt', 'transitoryAccounts'],
      },
      totalLongTermLiabilities: {
        number: 12,
        key: 'totalLongTermLiabilities',
        data: ['longTermDebt', 'longTermLiabilitiesAffiliates', 'otherLongTermLiabilities'],
        total: ['longTermDebt', 'longTermLiabilitiesAffiliates', 'otherLongTermLiabilities'],
      },
      totalLiabilities: {
        number: 15,
        key: 'totalLiabilities',
        data: ['provisions'],
        total: ['suppliers', 'chequesBillsPayable', 'shortTermDebt', 'taxesPayable', 'socialSecurityContributions', 'dividendsPayable', 'otherCreditors', 'shortTermLiabilitiesAffiliates', 'advancesfromCustomers', 'currentPortionLongTermDebt', 'transitoryAccounts', 'longTermDebt', 'longTermLiabilitiesAffiliates', 'otherLongTermLiabilities', 'provisions']
      },
      totalNetWorth: {
        number: 16,
        key: 'totalNetWorth',
        data: ['shareCapital', 'sharePremium', 'dueEquity', 'assetRevaluation', 'subsidies', 'regularReserves', 'otherReserves', 'retainedEarnings'],
        total: ['shareCapital', 'sharePremium', 'dueEquity', 'assetRevaluation', 'subsidies', 'regularReserves', 'otherReserves', 'retainedEarnings'],
      },
      totalLiabilitiesNetWorth: {
        number: 24,
        key: 'totalLiabilitiesNetWorth',
        data: [],
        total: ['suppliers', 'chequesBillsPayable', 'shortTermDebt', 'taxesPayable', 'socialSecurityContributions', 'dividendsPayable', 'otherCreditors', 'shortTermLiabilitiesAffiliates', 'advancesfromCustomers', 'currentPortionLongTermDebt', 'transitoryAccounts', 'longTermDebt', 'longTermLiabilitiesAffiliates', 'otherLongTermLiabilities', 'provisions', 'shareCapital', 'sharePremium', 'dueEquity', 'assetRevaluation', 'subsidies', 'regularReserves', 'otherReserves', 'retainedEarnings']
      },
      totalContingentAccounts: {
        number: 24,
        key: 'totalContingentAccounts',
        data: ['bankLettersGuarantee', 'mortgages', 'otherContingentAccounts'],
        total: ['bankLettersGuarantee', 'mortgages', 'otherContingentAccounts'],
      },
    }
  }

  pageThree = {
    title: {
      key: 'profitLossAccount',
      data: this.years
    },
    data: {
      grossProfit: {
        number: 1,
        key: 'grossProfit',
        data: ['netSales', 'costGoodsSold'],
        total: ['netSales', 'costGoodsSold'],
      },
      operatingProfit: {
        number: 3,
        key: 'operatingProfit',
        data: ['otherOperatingIncome', 'administrativeExpenses', 'generalSellingExpenses', 'otherCosts'],
        total: ['netSales', 'costGoodsSold', 'otherOperatingIncome', 'administrativeExpenses', 'generalSellingExpenses', 'otherCosts'],
      },
      profitBeforeInterestTaxes: {
        number: 7,
        key: 'profitBeforeInterestTaxes',
        data: ['depreciationAmortization'],
        total: ['netSales', 'costGoodsSold', 'otherOperatingIncome', 'administrativeExpenses', 'generalSellingExpenses', 'otherCosts', 'depreciationAmortization']
      },
      profitBeforeTaxesExtraOrdinaryItems: {
        number: 8,
        key: 'profitBeforeTaxesExtraOrdinaryItems',
        data: ['interestExpense', 'interestIncome'],
        total: ['netSales', 'costGoodsSold', 'otherOperatingIncome', 'administrativeExpenses', 'generalSellingExpenses', 'otherCosts', 'depreciationAmortization', 'interestExpense', 'interestIncome'],
      },
      profiBeforeTax: {
        number: 10,
        key: 'profiBeforeTax',
        data: ['extraordinaryIncome', 'extraordinaryExpenses', 'participationsSecuritiesIncome'],
        total: ['netSales', 'costGoodsSold', 'otherOperatingIncome', 'administrativeExpenses', 'generalSellingExpenses', 'otherCosts', 'depreciationAmortization', 'interestExpense', 'interestIncome', 'extraordinaryIncome', 'extraordinaryExpenses', 'participationsSecuritiesIncome']
      },
      netProfit: {
        number: 13,
        key: 'netProfit',
        data: ['incomeTax', 'otherTaxes'],
        total: ['netSales', 'costGoodsSold', 'otherOperatingIncome', 'administrativeExpenses', 'generalSellingExpenses', 'otherCosts', 'depreciationAmortization', 'interestExpense', 'interestIncome', 'extraordinaryIncome', 'extraordinaryExpenses', 'participationsSecuritiesIncome', 'incomeTax', 'otherTaxes']
      },
      final: {
        number: 16,
        key: 'final',
        data: [
          'retainedEarningsBeginningBalance',
          'dividends',
          'BoDCompensation',
          'reserves',
          'retainedEarningsEndingBalance',
          'dividendPayoutRatio',
          'netInflationFigures',
          'inflationrate',
          'salesNetInflation',
          'earningsBeforeTaxesExtraordinaryItems',
          'earningsBeforeTaxes'
        ],
        total: []
      },

    }
  }

  pages = {
    pageOne: this.pageOne,
    pageTwo: this.pageTwo,
    pageThree: this.pageThree
  };

  cloud_url = Environment.cloud_url;

  constructor(
    private snackBar: MatSnackBar,
    private change: ChangeDetectorRef,
    private loanProvider: LoanProvider,
    private activateRoute: ActivatedRoute
  ) {
    const { loan, configuration } = this.activateRoute.snapshot.data;
    this.loan = loan;
    const date = new Date();
    const date1 = new Date(new Date().setFullYear(date.getFullYear() - 1));
    const date2 = new Date(new Date().setFullYear(date1.getFullYear() - 1));
    const date3 = new Date(new Date().setFullYear(date2.getFullYear() - 1));
    const date4 = new Date(new Date().setFullYear(date3.getFullYear() - 1));

    this.form.get('name')?.setValue(loan.name);
    this.form.get('email')?.setValue(loan.email);
    this.form.get('walletAddress')?.setValue(loan.walletAddress);
    this.form.get('amount')?.setValue(loan.amount);
    this.form.get('months')?.setValue(loan.months);
    this.form.get('phone')?.setValue(loan.phone);

    this.form.get('pdfFile')?.setValue(loan.pdfFile);
    this.form.get('imageFile')?.setValue(loan.imageFile);
    this._pdf = loan.pdfFile;
    this._image = loan.imageFile;

    // this.form.get('currencyAddress')?.setValue(this.currency.address);
    // this.form.get('createdAt')?.setValue(loan.createdAt);
    this.configuration = configuration;
    // this.years = [
    //   `${date4.toLocaleDateString('en-US', { day: '2-digit' })}/${date4.toLocaleDateString('en-US', { month: '2-digit' })}/${date4.toLocaleDateString('en-US', { year: 'numeric' })}`,
    //   `${date3.toLocaleDateString('en-US', { day: '2-digit' })}/${date3.toLocaleDateString('en-US', { month: '2-digit' })}/${date3.toLocaleDateString('en-US', { year: 'numeric' })}`,
    //   `${date2.toLocaleDateString('en-US', { day: '2-digit' })}/${date2.toLocaleDateString('en-US', { month: '2-digit' })}/${date2.toLocaleDateString('en-US', { year: 'numeric' })}`,
    //   `${date1.toLocaleDateString('en-US', { day: '2-digit' })}/${date1.toLocaleDateString('en-US', { month: '2-digit' })}/${date1.toLocaleDateString('en-US', { year: 'numeric' })}`
    // ];

    // this.setPages();
  }


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  get image() {

    switch (this._image?.constructor) {
      case (Object): {
        return `${Environment.api_url}/min_uploads/images/${this._image.name}`;
      }
    }

    return '/assets/add-photo.svg';

  }

  get pdf() {

    switch (this._pdf?.constructor) {
      case (Object): {
        return '/assets/pdf.svg';
      }
    }

    return '/assets/pdf-upload.svg';

  }

  setCurrency(i: number) {
    // this.currency = this.currencies[i];
    // this.form.get('currencyAddress')?.setValue(this.currency.address)
    // this.change.markForCheck();
  }

  onSelectImage(event: IObjectKeys) {
    this._image = event;
    this.form.get('imageFile')?.setValue(event)
    this.change.markForCheck();
  }

  onSelectPdf(event: IObjectKeys) {
    this._pdf = event;
    this.form.get('pdfFile')?.setValue(event)
    this.change.markForCheck();
  }

  get disabled() {
    const { months, amount } = this.form.value
    if (!this.isSubmit && this.form.valid && months > 0 && amount > 0) {
      return false;
    }
    return true;
  }

  submit() {
    this.submitted = true;
    this.isSubmit = true;
    this.change.markForCheck();

    return this.loanProvider.put({
      loanKey: this.loan.key,
      update: {
        ...this.form.value
      }

    }).subscribe(({ result }) => {
      if (result) {
        this.openSnackBar(this.translations['update'], this.translations['update-action'])
      }
      this.isSubmit = false;
      this.change.markForCheck();
    });

  }

  trackByFn(index: number, item: IObjectKeys) {
    return item._id;
  }

  trackByIndex(index: number) {
    return index;
  }

  getTotal(fields: string[], position: number) {

    if (fields.length == 0) {
      return;
    }

    let value = 0;
    for (let field of fields) {
      const { [field]: item } = this.form.value;
      const { [position]: v = 0 } = item;
      value += v;
    }
    return value;
  }

  setPages() {

    this.pageOne.title = {
      key: 'assets',
      data: this.years,
      type: this.types.title
    }

    this.pageTwo.title = {
      key: 'liabilitiesNetWorth',
      data: this.years,
      type: this.types.title
    }

    this.pageThree.title = {
      key: 'profitLossAccount',
      data: this.years
    }

    const pageOne: IObjectKeys = this.pageOne;
    const pageTwo: IObjectKeys = this.pageTwo;
    const pageThree: IObjectKeys = this.pageThree;

    for (const key in pageOne.data) {
      const item = pageOne.data[key];
      for (let g of item.data) {
        this.form.addControl(g, new UntypedFormArray([
          new UntypedFormControl(this.loan[g][0], Validators.required),
          new UntypedFormControl(this.loan[g][1], Validators.required),
          new UntypedFormControl(this.loan[g][2], Validators.required),
          new UntypedFormControl(this.loan[g][3], Validators.required),
        ]))
      }
    }

    for (const key in pageTwo.data) {
      const item = pageTwo.data[key];
      for (let g of item.data) {
        this.form.addControl(g, new UntypedFormArray([
          new UntypedFormControl(this.loan[g][0], Validators.required),
          new UntypedFormControl(this.loan[g][1], Validators.required),
          new UntypedFormControl(this.loan[g][2], Validators.required),
          new UntypedFormControl(this.loan[g][3], Validators.required),
        ]))
      }
    }

    for (const key in pageThree.data) {
      const item = pageThree.data[key];
      for (let g of item.data) {
        this.form.addControl(g, new UntypedFormArray([
          new UntypedFormControl(this.loan[g][0], Validators.required),
          new UntypedFormControl(this.loan[g][1], Validators.required),
          new UntypedFormControl(this.loan[g][2], Validators.required),
          new UntypedFormControl(this.loan[g][3], Validators.required),
        ]))
      }
    }

  }

  orderKeyValue() {
    return 0;
  }

}
