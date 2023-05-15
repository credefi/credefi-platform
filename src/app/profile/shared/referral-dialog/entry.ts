import { NoopScrollStrategy } from "@angular/cdk/overlay";
import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { ReferralDialog } from "./component";

@Component({
  template: ""
})
export class ReferralDialogEntryComponent {
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {
    this.openDialog();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(ReferralDialog, {
      scrollStrategy: new NoopScrollStrategy(),
      data: {
        translations: this.route.snapshot.data.sharedTranslations.referralDialog,
        configuration: this.route.snapshot.data.configuration,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }
}