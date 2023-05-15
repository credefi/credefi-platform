import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { validateEmail } from 'src/app/helpers/emailValidator';
import { orderKeyValue, trackByKey } from 'src/app/helpers/track';
import { Web3ClientProvider } from 'src/app/providers/web3';
import { CURRENCIES } from 'src/environments/environment';
import { LoanTypes } from 'src/globals/config';
import { LoanProvider } from '../../providers';

@Component({
  selector: 'borrow-page',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class BorrowComponent {

  isSubmit = false;
  currencies = CURRENCIES;

  formOne = new UntypedFormGroup({
    loanType: new UntypedFormControl(null, [
      Validators.required
    ]),
    amount: new UntypedFormControl(null, [
      Validators.required
    ]),
    months: new UntypedFormControl(null, [
      Validators.required
    ]),
    currency: new UntypedFormControl(null, [
      Validators.required
    ]),
    collateral: new UntypedFormControl(true, [
      Validators.required
    ]),
    collateralType: new UntypedFormControl(null),
  });

  formTwo = new UntypedFormGroup({
    companyType: new UntypedFormControl(null, [
      Validators.required
    ]),
    companyName: new UntypedFormControl(null, [
      Validators.required
    ]),
    companyWebsite: new UntypedFormControl(null),
    employees: new UntypedFormControl(null, [
      Validators.required
    ]),
    periodIncorporation: new UntypedFormControl(null, [
      Validators.required
    ]),
    turnOver: new UntypedFormControl(null, [
      Validators.required
    ]),
    industry: new UntypedFormControl(null, [
      Validators.required
    ]),
  });

  formThree = new UntypedFormGroup({
    fullName: new UntypedFormControl(null, [
      Validators.required
    ]),
    dateOfBirth: new UntypedFormControl(null, [
      Validators.required
    ]),
    phoneNumber: new UntypedFormControl(null, [
      Validators.required
    ]),
    email: new UntypedFormControl(null, [
      Validators.required,
      validateEmail
    ]),
    shareholders: new UntypedFormControl(false, [
      Validators.required
    ]),
    authorized: new UntypedFormControl(false, [
      Validators.required
    ]),
    shareholdersPercent: new UntypedFormControl(null),
  });

  translations: { [key: string]: string | Function | any } = this.activateRoute.snapshot.data.translations;

  items = [
    {
      key: LoanTypes.investment.key,
      name: this.translations['investement']
    }
  ]

  trackByKey = trackByKey;
  orderKeyValue = orderKeyValue;

  constructor(
    private router: Router,
    private web3: Web3ClientProvider,
    private change: ChangeDetectorRef,
    private loanProvider: LoanProvider,
    private activateRoute: ActivatedRoute
  ) { }

  onSubmit() {
    if (this.formOne.valid && this.formTwo.valid && this.formThree.valid) {

      const value = {
        ...this.formOne.value,
        ...this.formTwo.value,
        ...this.formThree.value,
        chain: this.web3.network.name
      }

      value.currencyAddress = CURRENCIES[value.currency as keyof typeof CURRENCIES].key;

      this.isSubmit = true;
      this.change.markForCheck();

      return this.loanProvider.post(value).subscribe(({ result }) => {
        if (result) {
          return this.router.navigateByUrl('/profile/loans/borrow/active')
        }
        this.isSubmit = false;
        this.change.markForCheck();
      });

    }
  }

}
