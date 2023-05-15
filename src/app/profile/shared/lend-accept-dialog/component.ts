import { Component, ChangeDetectionStrategy, Inject, ChangeDetectorRef } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IObjectKeys } from 'src/app/helpers/interfaces';

@Component({
  selector: 'lend-accept-dialog',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LendAcceptDialog {

  months: number;

  configuration: IObjectKeys;
  currency: string;
  groupFourAmount: number;
  groupOneAmount: number;
  groupThreeAmount: number;
  groupTwoAmount: number;

  date = new Date();

  submit = false;
  submitted = false;
  form = new UntypedFormGroup({
    accept: new UntypedFormControl(false, [
      Validators.requiredTrue,
    ])
  });

  translations: { [key: string]: string | Function | any } = this.data.translations;

  allowedDays = [1, 2, 3, 4, 5];

  constructor(
    private change: ChangeDetectorRef,
    private MatDialogRef: MatDialogRef<LendAcceptDialog>,
    @Inject(MAT_DIALOG_DATA) public data: IObjectKeys
  ) {
    const {
      months,
      configuration,
      currency,
      groupFourAmount,
      groupOneAmount,
      groupThreeAmount,
      groupTwoAmount,
    } = data;

    this.months = months;
    this.configuration = configuration;
    this.currency = currency?.toUpperCase();
    this.groupFourAmount = groupFourAmount;
    this.groupOneAmount = groupOneAmount;
    this.groupThreeAmount = groupThreeAmount;
    this.groupTwoAmount = groupTwoAmount;

  }

  onSubmit() {
    this.submitted = true;

    if (this.form.valid) {

      const { callback } = this.data;
      this.submit = true;
      this.change.markForCheck();
      this.MatDialogRef.close();
      callback();

    }
  }

  close() {
    this.MatDialogRef.close();
  }

}
