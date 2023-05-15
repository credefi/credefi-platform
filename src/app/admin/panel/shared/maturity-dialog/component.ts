import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IObjectKeys } from 'src/app/helpers/interfaces';
import { trackByIndex } from 'src/app/helpers/track';

@Component({
  selector: 'maturity-dialog',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MaturityDialog {

  track = trackByIndex

  constructor(
    private MatDialogRef: MatDialogRef<MaturityDialog>,
    @Inject(MAT_DIALOG_DATA) public data: IObjectKeys
  ) { }

}
