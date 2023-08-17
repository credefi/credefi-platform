import { NgFor, SlicePipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { AutoCompleteModule } from 'src/app/directives/autocomplete';
import { validateEmail } from 'src/app/helpers/emailValidator';
import { IObjectKeys } from 'src/app/helpers/interfaces';
import { strongPasswordValidator } from 'src/app/helpers/strongPasswordValidator';
import { ErrorModule } from 'src/app/pipes/error';
import { UserProvider } from 'src/app/providers';

@Component({
  selector: 'app-login',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgFor,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    ErrorModule,
    AutoCompleteModule,
    SlicePipe,
    RouterLink
  ],
  standalone: true
})

export class LoginComponent {

  isSubmit = false;

  form = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.maxLength(255),
      validateEmail,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.maxLength(255),
      Validators.minLength(6)
    ])
  });

  @Input() translations: IObjectKeys;

  constructor(
    private router: Router,
    private userProvider: UserProvider,
    private changeRef: ChangeDetectorRef,
    ) { }

  onSubmit() {
    if (this.form.valid) {
      this.isSubmit = true;
      this.userProvider.authenticate(this.form.value).subscribe(({ result, errors }) => {
        this.isSubmit = false;

        if (errors) {
          for (let key in errors) {
            const parsedErrors = errors[key].map((item: string) => {
              return this.translations[item];
            })
            this.form.controls[key].setErrors({ 'incorrect': parsedErrors });
          }

          return this.changeRef.markForCheck();
        }

        if(result){
          this.router.navigateByUrl('/authentication/token');
        }

      });
    }
  }

}
