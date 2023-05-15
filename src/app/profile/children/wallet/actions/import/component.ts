import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ExistingAccountDialog } from 'src/app/profile/shared/existing-account-dialog/component';
import { ImportPrivateKeyDialog } from 'src/app/profile/shared/import-privatekey-dialog/component';

@Component({
  selector: 'wallet-import-page',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class WalletImportComponent {

  translations: { [key: string]: string | Function | any } = this.activatedRoute.snapshot.data.translations;

  constructor(
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute
    ) { }

  onPostFromPrivateKey() {
    this.dialog.open(ImportPrivateKeyDialog, {
      scrollStrategy: new NoopScrollStrategy(),
      data: {
        translations: this.activatedRoute.snapshot.data.sharedTranslations.importPrivateKeyDialog,
      }
    });
  }

  onPostExistingAccount() {
    this.dialog.open(ExistingAccountDialog, {
      scrollStrategy: new NoopScrollStrategy(),
      data: {
        translations: this.activatedRoute.snapshot.data.sharedTranslations.existingKeyDialog,
      }
    });
  }

}
