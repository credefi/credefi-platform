import { EventEmitter, Injectable } from '@angular/core';
import { IObjectKeys } from 'src/app/helpers/interfaces';
import { Web3ProviderModule } from './module';
import { NetworkLink, Contract, Scan, BinanceContract, BinanceNetworkLink, BinanceScan, networks, LocalContract, LocalNetworkLink, LocalScan, Metamask, BinanceMetamask, LocalMetamask } from 'src/environments/environment';
import { ABI } from 'src/globals/abi';
import { ABI as ABIBINANCE } from 'src/globals/abi-binance';
import { SYMBOLS } from 'src/globals/config';

@Injectable({
  providedIn: Web3ProviderModule
})

export class Web3ClientProvider {

  web3!: IObjectKeys;
  contractInstance!: any;
  stakingInstance!: any;

  changeNetwork = new EventEmitter();

  networks: any = {}

  _network = this.networks.eth;

  async getParams() {
    return {
      name: '',
      symbol: '',
      burnWallet: '',
      decimals: 18,
      totalSupply: 0,
      owners: [],
      receiver: '',
      nonConfirmedIncreaseSupplyTransactions: [],
      nonConfirmedDecreaseSupplyTransactions: [],
      nonConfirmedChangeReceiverTransactions: [],
      nonConfirmedAddOwnerTransactions: [],
      nonConfirmedRemoveOwnerTransactions: []
    };
  }

  async setMetamaskNetwork(network: IObjectKeys | string | any) {
    return {}
  }

  async #setNetwork(network: IObjectKeys | string | any) {
    return {};
  }

  set network(network: IObjectKeys | string | any) {
    this._network = network;
  }

  get currencies() {
    switch (this._network) {
      case (this.networks?.eth?.key): {
        return (networks as IObjectKeys)?.eth?.currencies;
      }
      case (this.networks?.ropsten?.key): {
        return (networks as IObjectKeys)?.ropsten?.currencies;
      }
      case (this.networks?.binance?.key): {
        return (networks as IObjectKeys)?.binance?.currencies;
      }
      case (this.networks?.local?.key): {
        return (networks as IObjectKeys)?.local?.currencies;
      }
      default: {
        return (networks as IObjectKeys)?.eth?.currencies;
      }
    }
  }

  get currenciesObject() {
    switch (this._network) {
      case (this.networks?.eth?.key): {
        return (networks as IObjectKeys)?.eth?.currenciesObject;
      }
      case (this.networks.ropsten?.key): {
        return (networks as IObjectKeys)?.ropsten?.currenciesObject;
      }
      case (this.networks.binance?.key): {
        return (networks as IObjectKeys)?.binance?.currenciesObject;
      }
      case (this.networks.local?.key): {
        return (networks as IObjectKeys)?.local?.currenciesObject;
      }
      default: {
        return (networks as IObjectKeys)?.eth?.currenciesObject;
      }
    }
  }

  get network() {
    switch (this._network) {
      case (this.networks?.eth?.key): {
        return {
          Contract,
          NetworkLink,
          Scan,
          name: this._network,
          ABI,
          symbol: SYMBOLS.ETH,
          image: SYMBOLS.ETH.image
        };
      }
      case (this.networks?.ropsten?.key): {
        return {
          Contract,
          NetworkLink,
          Scan,
          name: this._network,
          ABI,
          symbol: SYMBOLS.RETH,
          image: SYMBOLS.RETH.image
        };
      }
      case (this.networks?.binance?.key): {
        return {
          Contract: BinanceContract,
          NetworkLink: BinanceNetworkLink,
          Scan: BinanceScan,
          name: this._network,
          ABI: ABIBINANCE,
          symbol: SYMBOLS.BNB,
          image: SYMBOLS.BNB.image
        };
      }
      case (this.networks?.local?.key): {
        return {
          Contract: LocalContract,
          NetworkLink: LocalNetworkLink,
          Scan: LocalScan,
          name: this._network,
          ABI: ABIBINANCE,
          symbol: SYMBOLS.ETH,
          image: SYMBOLS.ETH.image
        };
      }
      default: {
        return {
          Contract,
          NetworkLink,
          Scan,
          name: 'eth',
          ABI,
          symbol: SYMBOLS.ETH,
          image: SYMBOLS.ETH.image
        };
      }
    }
  }

  #getNetwork(network: string) {
    switch (network) {
      case (this.networks?.eth?.key): {
        return {
          Contract,
          NetworkLink,
          Scan,
          name: network,
          ABI,
          symbol: SYMBOLS.ETH,
          image: SYMBOLS.ETH.image,
          Metamask: Metamask
        };
      }
      case (this.networks?.ropsten?.key): {
        return {
          Contract,
          NetworkLink,
          Scan,
          name: network,
          ABI,
          symbol: SYMBOLS.RETH,
          image: SYMBOLS.RETH.image,
          Metamask: Metamask
        };
      }
      case (this.networks?.binance?.key): {
        return {
          Contract: BinanceContract,
          NetworkLink: BinanceNetworkLink,
          Scan: BinanceScan,
          name: network,
          ABI: ABIBINANCE,
          symbol: SYMBOLS.BNB,
          image: SYMBOLS.BNB.image,
          Metamask: BinanceMetamask
        };
      }
      case (this.networks?.local?.key): {
        return {
          Contract: LocalContract,
          NetworkLink: LocalNetworkLink,
          Scan: LocalScan,
          name: network,
          ABI: ABIBINANCE,
          symbol: SYMBOLS.ETH,
          image: SYMBOLS.ETH.image,
          Metamask: LocalMetamask
        };
      }
      default: {
        return {
          Contract,
          NetworkLink,
          Scan,
          name: 'eth',
          ABI,
          symbol: SYMBOLS.ETH,
          image: SYMBOLS.ETH.image,
          Metamask: Metamask
        };
      }
    }
  }

  toHex(d: string) {
    return ''
  }

  async getContractDecimal({ contract, batch }: { contract: IObjectKeys, batch: any }): Promise<any> {
    return {};
  }

  async sendCustomCoinMetamask({ from, amount, to, contract, noncePlus }: { from: any, amount: number, to: string, contract: IObjectKeys, noncePlus: number }): Promise<IObjectKeys> {
    return {};
  }

  async sendCustomCoin({ from, privateKey, amount, to, contract, noncePlus }: { from: string, privateKey: string, amount: number, to: string, contract: IObjectKeys, noncePlus: number }): Promise<IObjectKeys> {
    return {}
  }

  async getContractBalance({ address, contract }: { address: string, contract: IObjectKeys }) {
    return 0
  }

  async getBalance(address: string) {
    return 0;
  }

  async getEthBalance(address: string) {
    return '0';
  }

  async getPrivKey(keyStore: IObjectKeys | any, password: string): Promise<IObjectKeys> {
    return {};
  }

  async sendCoins({ from, privateKey, amount, to }: { from: string, privateKey: string, amount: number, to: string }): Promise<IObjectKeys> {
    return {};
  }

  async sendEth({ from, privateKey, amount, to }: { from: string, privateKey: string, amount: number, to: string }): Promise<IObjectKeys> {
    return {};
  }

  async sendEthMetamsk({ from, amount, to }: { from: string, amount: number, to: string }): Promise<IObjectKeys> {

    return {};

  }

  async approveMetamask({ from, spender, amount }: { from: any, spender: any, amount: number }): Promise<IObjectKeys> {
    return {};
  }

  async stakeMetamask({ from, amount }: { from: any, amount: number }): Promise<IObjectKeys> {
    return {};
  }

  async withDrawPrincipal({ from, index, amount }: { from: any, index: number, amount: number }): Promise<IObjectKeys> {
    return {};
  }

  async getStakingContractParams(): Promise<any> {
    return {};
  }

  async getStakings(from: string): Promise<any> {
    return {};
  }

  async requestClaim(from: string, index: number) {
    return {};
  }

  async claim(from: string, index: number) {
    return {};
  }

  createAccount({ password }: { password: string }): IObjectKeys {
    return {};
  }

  privateKeyToAccount({ privateKey, password }: { privateKey: string, password: string }): IObjectKeys {
    return {};
  }

}