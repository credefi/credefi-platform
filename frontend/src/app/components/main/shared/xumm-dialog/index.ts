import { Component, Inject, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CopyModule } from 'src/app/directives/copy';
import { IObjectKeys } from 'src/app/helpers/interfaces';
import { WalletProvider } from 'src/app/providers/wallet/WalletProvider';
import { Environment } from 'src/globals';

@Component({
  selector: 'app-deposit-dialog',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  imports: [MatIconModule, MatRippleModule, MatButtonModule, CopyModule],
  standalone: true
})

export class XummDialog implements OnDestroy {

  api_url = Environment.api_url;
  ws: WebSocket;

  constructor(
    public ref: MatDialogRef<XummDialog>,
    public wallet: WalletProvider,
    @Inject(MAT_DIALOG_DATA) public data: IObjectKeys
  ) {
    this.listen();
  }

  ngOnDestroy(): void {
    if (this.ws) {
      this.ws.close();
    }
  }

  listen() {
    this.ws = new WebSocket(this.data.refs.websocket_status);
    this.ws.onmessage = (event) => {
      const json = JSON.parse(event.data);
      if(json.signed){
        this.ref.close(true);
      }
    }
  }
}
