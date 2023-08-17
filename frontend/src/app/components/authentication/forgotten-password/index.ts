import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, SkipSelf, ViewChild, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { UserProvider } from 'src/app/providers';
import { FormControl, FormGroup, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { validateEmail } from 'src/app/helpers/emailValidator';
import { NgFor, NgIf, SlicePipe } from '@angular/common';
import { ErrorModule } from 'src/app/pipes/error';
import { AutoCompleteModule } from 'src/app/directives/autocomplete';
import { IObjectKeys } from 'src/app/helpers/interfaces';

@Component({
  selector: 'app-forgotten-password',
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

export class ForgottenPasswordComponent {

  isSubmit = false;
  form = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.maxLength(255),
      validateEmail
    ]),
  });

  @Input() translations: IObjectKeys;
  @ViewChild('formChild') public formChild: NgForm; 
  
  show: boolean = false;
  success = signal(false);

  constructor(
    private changeRef: ChangeDetectorRef,
    @SkipSelf() private userProvider: UserProvider
  ) { }


  onSubmit() {
    this.changeRef.markForCheck();
    if (this.form.valid) {
      this.isSubmit = true;
      this.changeRef.markForCheck();
      this.userProvider.resetPassword(this.form.value).subscribe(({ result, errors }) => {
        this.isSubmit = false;
        
        if(result){
          this.success.set(true);
          this.formChild.resetForm();
          return;
        }

        if (errors) {
          for (let key in errors) {
            const parsedErrors = errors[key].map((item: string) => {
              return this.translations[item];
            })
            this.form.controls[key].setErrors({ 'incorrect': parsedErrors });
          }
        }
        return this.changeRef.markForCheck();

      });
    }
  }

  password() {
      this.show = !this.show;
  }

}
