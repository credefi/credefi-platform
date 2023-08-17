import { Injectable, WritableSignal, signal } from '@angular/core';
import { IObjectKeys } from 'src/app/helpers/interfaces';
import { WalletTypes } from 'src/globals';
import { isInstalled, getPublicKey, submitTransaction, SubmitTransactionRequest } from "@gemwallet/api";
import { xrpToDrops, Client, dropsToXrp } from 'xrpl';
import { XRPL_API } from 'src/environments/environment.xrpl';

@Injectable({
  providedIn: 'root'
})

export class WalletXRPLProvider {

  client: Client;
  wallet = signal<{
    type: WalletTypes,
    data?: IObjectKeys | null
  }>(null);

  address: WritableSignal<string | null> = signal<string | null>(null);
  shortAddress = signal<null | string>(null);

  constructor() { }

  async connectGemWallet() {

    await this.getClient();

    const data = await isInstalled();

    if (data.result.isInstalled) {
      const response = await getPublicKey();

      this.wallet.set({
        data: response.result,
        type: WalletTypes.gemwallet
      });

      const address = response.result.address;
      const first = address.slice(0, 5);
      const last = address.slice(address.length - 4, address.length);

      this.address.set(address);
      this.shortAddress.set(`${first}...${last}`);

    }

  }

  async connectXummWallet(address: string) {
    
    await this.getClient();

    this.wallet.set({
      type: WalletTypes.xumm
    });

    const first = address.slice(0, 5);
    const last = address.slice(address.length - 4, address.length);

    this.address.set(address);
    this.shortAddress.set(`${first}...${last}`);

  }

  async getClient(){
    if(this.client){
      return this.client;
    }

    this.client = new Client(XRPL_API)
    await this.client.connect();

    return this.client;
  }

  async transactionGemWallet({
    amount,
    destination,
    memo,
  }: {
    amount: string,
    destination: string,
    memo?: Object,
  }) {

    const memos = [];

    if (memo) {
      memos.push(   {
        Memo: {
          MemoData: Buffer.from(JSON.stringify(memo)).toString('hex')
        }
      })
    }

    const tx: SubmitTransactionRequest = {
      "transaction": {
        "Account": this.address(),
        "TransactionType": "Payment",
        "Destination": destination,
        "Amount": xrpToDrops(amount),
        "Memos": memos

      }
    }

    return submitTransaction(tx);
  }

  async getBalance(addres?: string) {
    await this.getClient();

    const data = await this.client.request({
      "command": "account_info",
      "account": addres ?? this.address(),
      "ledger_index": "validated"
    });

    return dropsToXrp(data.result.account_data.Balance);
  }


  async txHistory() {
    const data = await this.client.request({
      "command": "account_tx",
      "account": this.address(),
      "limitt": 0
    });
    return data.result.transactions;
  }

}
