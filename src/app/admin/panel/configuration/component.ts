import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { IObjectKeys } from 'src/app/helpers/interfaces';
import { ConfigurationProvider } from '../providers';

@Component({
  selector: 'admin-configuration-page',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AdminConfigurationPage {

  configuration!: IObjectKeys;

  submit = false;
  form = new UntypedFormGroup({
    groupOne: new UntypedFormControl('', [
      Validators.required
    ]),
    groupTwo: new UntypedFormControl('', [
      Validators.required
    ]),
    groupThree: new UntypedFormControl('', [
      Validators.required
    ]),
    groupFour: new UntypedFormControl('', [
      Validators.required
    ]),
    groupOneRisk: new UntypedFormControl('', [
      Validators.required
    ]),
    groupTwoRisk: new UntypedFormControl('', [
      Validators.required
    ]),
    groupThreeRisk: new UntypedFormControl('', [
      Validators.required
    ]),
    groupFourRisk: new UntypedFormControl('', [
      Validators.required
    ]),
    groupOneInterest: new UntypedFormControl('', [
      Validators.required
    ]),
    groupTwoInterest: new UntypedFormControl('', [
      Validators.required
    ]),
    groupThreeInterest: new UntypedFormControl('', [
      Validators.required
    ]),
    groupFourInterest: new UntypedFormControl('', [
      Validators.required
    ]),
    groupOneName: new UntypedFormControl('', [
      Validators.required
    ]),
    groupTwoName: new UntypedFormControl('', [
      Validators.required
    ]),
    groupThreeName: new UntypedFormControl('', [
      Validators.required
    ]),
    groupFourName: new UntypedFormControl('', [
      Validators.required
    ]),
    maxLendingAmount: new UntypedFormControl('', [
      Validators.required
    ]),
    crediStakingAddress: new UntypedFormControl('', [
      Validators.required
    ]),
    mercuryoioLendingAddress: new UntypedFormControl('', [
      Validators.required
    ]),
    referral: new UntypedFormControl(null, [
      Validators.required
    ])
  });

  translations: { [key: string]: string | Function | any } = this.activated.snapshot.data.translations;

  constructor(
    private snackBar: MatSnackBar,
    private change: ChangeDetectorRef,
    private activated: ActivatedRoute,
    private configurationProvider: ConfigurationProvider,
  ) {
    const { configuration } = this.activated.snapshot.data;
    this.configuration = configuration;
    this.form.patchValue(configuration);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  onUpload(input: HTMLInputElement, item: string) {
    input.type = 'file';
    input.accept = '.csv';
    input.multiple = false;
    input.click();
    input.onchange = this.handleFile.bind(this, item, input);
  }

  handleFile(item: string, input: HTMLInputElement, event: Event) {
    const target = event?.target as HTMLInputElement;
    const files = target?.files;
    if (files) {

      for (let key = 0; key < files.length; key++) {

        const file = files?.[key];
        const fr = new FileReader();

        fr.onloadend = (e) => {
          const result = e?.target?.result;
          input.value = '';
          this.upload(item, result as string);
        }

        fr.readAsText(file);

      }

    }
  }

  upload(item: string, update: string) {
    this.submit = true;
    return this.configurationProvider.putCSV({ item, update }).subscribe(({ result }) => {
      if (result) {
        this.configuration = result;
        this.openSnackBar(this.translations['update-message'], this.translations['update-button']);
      }
      this.submit = false;
      this.change.markForCheck();
    });
  }

  onSubmit() {

    if (this.form.valid) {
      const update: IObjectKeys = {};
      const values = this.form.value;

      for (let key in values) {
        if (values[key] != this.configuration[key]) {
          switch (key) {
            default: {
              update[key] = values[key];
              break;
            }
          }
        }
      }

      if (Object.keys(update).length > 0) {
        this.submit = true;
        this.change.markForCheck();
        return this.configurationProvider.put({ update }).subscribe(({ result }) => {
          if (result) {
            this.configuration = result;
            this.openSnackBar(this.translations['update-message'], this.translations['update-button']);
          }
          this.submit = false;
          this.change.markForCheck();
        });

      }

    }
  }

}
