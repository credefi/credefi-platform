import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, SkipSelf } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { UserProvider } from 'src/app/providers';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { passwordMatchValidator } from 'src/app/helpers/passwordConfirmValidator';
import { NgFor, NgIf, SlicePipe } from '@angular/common';
import { ErrorModule } from 'src/app/pipes/error';
import { AutoCompleteModule } from 'src/app/directives/autocomplete';
import { IObjectKeys } from 'src/app/helpers/interfaces';
import { strongPasswordValidator } from 'src/app/helpers/strongPasswordValidator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  imports: [
    NgIf,
    NgFor,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterLink,
    ErrorModule,
    AutoCompleteModule,
    SlicePipe
  ],
  providers: [UserProvider],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})

export class ResetPasswordComponent {

  isSubmit = false;
  form = new FormGroup({
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(255),
      strongPasswordValidator
    ]),
    passwordConfirm: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(255)
    ]),
  }, passwordMatchValidator('password', 'passwordConfirm'));

  @Input() translations: IObjectKeys;
  @Input() token: string;

  show: boolean = false;

  constructor(
    private router: Router,
    private changeRef: ChangeDetectorRef,
    @SkipSelf() private userProvider: UserProvider
  ) { }


  onSubmit() {
    this.changeRef.markForCheck();
    if (this.form.valid) {
      this.isSubmit = true;
      this.changeRef.markForCheck();
      this.userProvider.changePassword({ ...this.form.value, token: this.token }).subscribe(({ result, errors }) => {
        this.isSubmit = false;

        if (errors) {
          for (let key in errors) {
            const parsedErrors = errors[key].map((item: string) => {
              return this.translations[item];
            })
            this.form.controls[key].setErrors({ 'incorrect': parsedErrors });
          }
        }

        if (result) {
          this.router.navigateByUrl('/authentication')
        }

        return this.changeRef.markForCheck();

      });
    }
  }

  password() {
    this.show = !this.show;
  }

}
