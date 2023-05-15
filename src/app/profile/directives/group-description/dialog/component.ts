import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IObjectKeys } from 'src/app/helpers/interfaces';

@Component({
  selector: 'group-dialog',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class GroupDialog {

  constructor(
    private ref: MatDialogRef<GroupDialog>,
    @Inject(MAT_DIALOG_DATA) public data: IObjectKeys,
  ) { }

  close(){
    this.ref.close();
  }

}
