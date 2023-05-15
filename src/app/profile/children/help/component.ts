import { Component, ChangeDetectionStrategy } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IObjectKeys } from 'src/app/helpers/interfaces';

@Component({
  selector: 'help-page',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HelpComponent {

  form = new UntypedFormGroup({
    text: new UntypedFormControl(''),
  })

  translations: { [key: string]: string | Function | any } = this.activateRoute.snapshot.data.translations;

  questions: IObjectKeys[] = [];
  filteredQuestion: IObjectKeys[] = [];

  constructor(
    private activateRoute: ActivatedRoute
  ) {
    const { questions = [] } = this.activateRoute.snapshot.data.translations;
    this.questions = questions;
    this.filteredQuestion = questions;
  }

  submit() {
    let { text = '' } = this.form.value;

    if (text.length == 0) {
      this.filteredQuestion = this.questions;
    } else {
      text = text.toLowerCase();
      this.filteredQuestion = this.questions.filter((item) => {
        if (item.title.toLowerCase().includes(text) || item.description.toLowerCase().includes(text)) {
          return true;
        }
        if(item.sub){
          for (const s of item?.sub) {
            if (s.toLowerCase().includes(text)) {
              return true;
            }
          }
        }
        return false
      });
    }

  }

}
