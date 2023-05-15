import Web3 from 'web3';

import { EventEmitter, Inject, Injectable } from '@angular/core';
import { Web3ProviderModule } from './module';
import {
  NetworkLink, Contract, Scan, Metamask, BinanceContract,
  BinanceNetworkLink, BinanceScan, BinanceMetamask, networks,
  environment, LocalContract, LocalNetworkLink, LocalScan,
  LocalMetamask, StakingContract
} from 'src/environments/environment';
import { ABI } from 'src/globals/abi';
import { ABI as ABIBINANCE } from 'src/globals/abi-binance';
import { ABI as ABISTAKING } from 'src/globals/abi-staking';

import { IObjectKeys } from 'src/app/helpers/interfaces';
import { WINDOW } from 'src/app/modules/window';
import { LOCAL_STORAGE } from 'src/app/modules/local-storage';
import { Contract as IContract } from 'web3-eth-contract';
import { SYMBOLS } from 'src/globals/config';

@Injectable({
  providedIn: Web3ProviderModule
})

export class Web3ClientProvider {

  web3!: Web3;
  contractInstance!: IContract;
  stakingInstance!: IContract;

  changeNetwork = new EventEmitter();

  networks: IObjectKeys = networks;

  _network = environment.testnet ? this.networks.ropsten.key : this.networks.eth.key;

  constructor(
    @Inject(WINDOW) private window: Window,
    @Inject(LOCAL_STORAGE) private localStorage: Storage
  ) {
    const network = this.localStorage.getItem('network') ?? (environment.testnet ? this.networks.ropsten.key : this.networks.eth.key);
    this.network = network;
  }

  setMetamaskNetwork(network: IObjectKeys | string | any) {

    return this.#setNetwork(network).then(() => {

      const window: IObjectKeys = this.window;

      if (window.ethereum == null) {
        throw new Error('metamask ext missing');
      }

      return window.ethereum.request({ method: 'eth_chainId' })
    }).then((data) => {

      const n: IObjectKeys = this.#getNetwork(network);

      if (Number(data) != Number(n?.Metamask?.params[0]?.chainId)) {
        throw new Error('Not correct chain');
      }

      this._network = network;

      this.localStorage.setItem('network', network);
      if (this.web3) {
        (this.web3?.currentProvider as any)?.connection?.close();
      }
      this.web3 = new Web3(new Web3.providers.HttpProvider(this.network.NetworkLink));

      this.contractInstance = new this.web3.eth.Contract(this.network.ABI, this.network.Contract);
      this.stakingInstance = new this.web3.eth.Contract(ABISTAKING, StakingContract);
      this.changeNetwork.emit();

    });

  }

  async #setNetwork(network: IObjectKeys | string | any) {
    switch (network) {
      case (this.networks?.eth?.key): {
        const window: IObjectKeys = this.window;
        if (window.ethereum) {
          return window.ethereum.request(Metamask);
        }
        break;
      }
      case (this.networks?.binance?.key): {
        const window: IObjectKeys = this.window;
        if (window.ethereum) {
          return window.ethereum.request(BinanceMetamask);
        }
        break
      }
      case (this.networks?.ropsten?.key): {
        const window: IObjectKeys = this.window;
        if (window.ethereum) {
          return window.ethereum.request(Metamask);
        }
        break;
      }
      case (this.networks?.local?.key): {
        const window: IObjectKeys = this.window;
        if (window.ethereum) {
          return window.ethereum.request(LocalMetamask);
        }
        break;
      }
    }
  }

  set network(network: IObjectKeys | string | any) {
    this._network = network;

    this.localStorage.setItem('network', network);
    if (this.web3) {
      (this.web3?.currentProvider as any)?.connection?.close();
    }
    this.web3 = new Web3(new Web3.providers.HttpProvider(this.network.NetworkLink));

    this.contractInstance = new this.web3.eth.Contract(this.network.ABI, this.network.Contract);
    this.stakingInstance = new this.web3.eth.Contract(ABISTAKING, StakingContract);

    switch (network) {
      case (this.networks?.eth?.key): {
        const window: IObjectKeys = this.window;
        if (window.ethereum) {
          window.ethereum.request(Metamask).catch((error: IObjectKeys) => {
            console.log(error)
          });
        }
        break;
      }
      case (this.networks?.binance?.key): {
        const window: IObjectKeys = this.window;
        if (window.ethereum) {
          window.ethereum.request(BinanceMetamask).catch((error: IObjectKeys) => {
            console.log(error)
          });
        }
        break
      }
      case (this.networks?.ropsten?.key): {
        const window: IObjectKeys = this.window;
        if (window.ethereum) {
          window.ethereum.request(Metamask).catch((error: IObjectKeys) => {
            console.log(error)
          });
        }
        break;
      }
      case (this.networks?.local?.key): {
        const window: IObjectKeys = this.window;
        if (window.ethereum) {
          window.ethereum.request(LocalMetamask).catch((error: IObjectKeys) => {
            console.log(error)
          });
        }
        break;
      }
    }
    this.changeNetwork.emit();

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

  getParams() {
    return Promise.all([
      this.contractInstance.methods.name().call(),
      this.contractInstance.methods.symbol().call(),
      this.contractInstance.methods.burnWallet().call(),
      this.contractInstance.methods.decimals().call(),
      this.contractInstance.methods.totalSupply().call(),
      this.contractInstance.methods.getOwners().call(),
      this.contractInstance.methods.getReceiver().call(),
      this.contractInstance.methods.getNonConfirmedIncreaseSupplyTransactions().call(),
      this.contractInstance.methods.getNonConfirmedDecreaseSupplyTransactions().call(),
      this.contractInstance.methods.getNonConfirmedChangeReceiverTransactions().call(),
      this.contractInstance.methods.getNonConfirmedAddOwnerTransactions().call(),
      this.contractInstance.methods.getNonConfirmedRemoveOwnerTransactions().call(),
    ]).then(([
      name,
      symbol,
      burnWallet,
      decimals,
      totalSupply,
      owners,
      receiver,
      nonConfirmedIncreaseSupplyTransactions,
      nonConfirmedDecreaseSupplyTransactions,
      nonConfirmedChangeReceiverTransactions,
      nonConfirmedAddOwnerTransactions,
      nonConfirmedRemoveOwnerTransactions
    ]) => {
      return {
        name,
        symbol,
        burnWallet,
        decimals: Number(decimals),
        totalSupply,
        owners,
        receiver,
        nonConfirmedIncreaseSupplyTransactions,
        nonConfirmedDecreaseSupplyTransactions,
        nonConfirmedChangeReceiverTransactions,
        nonConfirmedAddOwnerTransactions,
        nonConfirmedRemoveOwnerTransactions
      }
    });
  }

  toHex(d: string) {
    return this.web3.utils.toHex(d);
  }

  async getContractBalance({ address, contract }: { address: string, contract: IObjectKeys }): Promise<number> {

    const contractInstance = new this.web3.eth.Contract(contract.ABI, contract.address);

    return contractInstance.methods.decimals().call().then((decimal: number) => {
      return contractInstance.methods.balanceOf(address).call({ from: address }).then((tokens: number) => {

        const value = this.web3.utils.toBN(tokens);
        const decimals = this.web3.utils.toBN(decimal);

        return value.div(this.web3.utils.toBN(10).pow(decimals)).toNumber();
      });
    });

  }

  async getContractDecimal({ contract, batch }: { contract: IObjectKeys, batch: any }): Promise<any> {
    const contractInstance = new this.web3.eth.Contract(contract.ABI, contract.address);

    return new Promise((resolve, reject) => {
      const b = contractInstance.methods.decimals().call.request((err: any, data: any) => {
        if (err) reject(err);
        resolve(data);
      });
      batch.add(b);
    });

  }

  sendCustomCoinMetamask({ from, amount, to, contract, noncePlus }: { from: any, amount: number, to: string, contract: IObjectKeys, noncePlus: number }): Promise<IObjectKeys> {

    const contractInstance = new this.web3.eth.Contract(contract.ABI, contract.address);
    from = this.web3.utils.toHex(from);
    to = this.web3.utils.toHex(to);

    return Promise.all([
      this.prepareGas(from),
      contractInstance.methods.decimals().call()
    ]).then(([[count, gas], decimal]) => {
      const gasPrice = Math.round(Number(gas) * 2.2);
      const txValue = this.web3.utils.numberToHex(this.web3.utils.toWei('0', 'ether'));
      const value = Math.round(amount * 10 ** Number(decimal)).toLocaleString('fullwide', { useGrouping: false, maximumFractionDigits: 6 });
      const rawTx: IObjectKeys = {
        from,
        nonce: (count + noncePlus).toString(),
        gasPrice: this.web3.utils.toHex(gasPrice),
        to: contract.address,
        value: txValue,
        data: (contractInstance.methods.transfer(to, this.web3.utils.toBN(value)).encodeABI() as string)
      }

      return this.estimateGas({
        "from": from,
        ...rawTx
      }).then((gasLimit) => {

        gasLimit = Math.round(Number(gasLimit) * 2.2);
        rawTx.gas = this.web3.utils.toHex(gasLimit);

        return rawTx;

      });

    });

  }

  sendCustomCoin({ from, privateKey, amount, to, contract, noncePlus }: { from: string, privateKey: string, amount: number, to: string, contract: IObjectKeys, noncePlus: number }): Promise<IObjectKeys> {
    const contractInstance = new this.web3.eth.Contract(contract.ABI, contract.address);

    from = this.web3.utils.toHex(from);
    to = this.web3.utils.toHex(to);
    return Promise.all([
      this.prepareGas(from),
      contractInstance.methods.decimals().call()
    ]).then(([[count, gas], decimal]) => {

      const gasPrice = Math.round(Number(gas) * 2.2);

      const txValue = this.web3.utils.numberToHex(this.web3.utils.toWei('0', 'ether'));
      const value = Math.round(amount * 10 ** Number(decimal)).toLocaleString('fullwide', { useGrouping: false, maximumFractionDigits: 6 });

      const rawTx: IObjectKeys = {
        nonce: count + noncePlus,
        gasPrice: this.web3.utils.toHex(gasPrice),
        to: contract.address,
        value: txValue,
        data: (contractInstance.methods.transfer(to, this.web3.utils.toBN(value)).encodeABI() as string)
      }

      return this.estimateGas({
        "from": from,
        ...rawTx
      }).then((gasLimit) => {

        gasLimit = Math.round(Number(gasLimit) * 2.2);
        rawTx.gasLimit = this.web3.utils.toHex(gasLimit);

        return this.web3.eth.accounts.signTransaction(rawTx, privateKey).then((signData) => {
          return this.transaction(signData);
        });

      });

    });

  }

  async getBalance(address: string): Promise<number> {
    address = this.web3.utils.toHex(address);
    return this.contractInstance.methods.balanceOf(address).call({ from: address }).then((tokens: number) => {
      const value = this.web3.utils.fromWei(tokens.toString(), 'ether')
      return Number(value);
    });
  }

  getEthBalance(address: string) {
    address = this.web3.utils.toHex(address);
    return this.web3.eth.getBalance(address).then((value) => {
      value = this.web3.utils.fromWei(value, 'ether');
      return Number(value);
    });
  }

  getPrivKey(keyStore: IObjectKeys | any, password: string): Promise<IObjectKeys> {
    return new Promise((resolve, reject) => {
      try {
        let r = this.web3.eth.accounts.decrypt(keyStore, password);
        return resolve(r);
      } catch (e) {
        return reject(e);
      }
    });
  }

  sendCoins({ from, privateKey, amount, to }: { from: string, privateKey: string, amount: number, to: string }): Promise<IObjectKeys> {

    from = this.web3.utils.toHex(from);
    to = this.web3.utils.toHex(to);
    return this.prepareGas(from).then(([count, gas]) => {

      const gasPrice = Math.round(Number(gas) * 2.2);
      const txValue = this.web3.utils.numberToHex(this.web3.utils.toWei('0', 'ether'));
      const value = this.web3.utils.numberToHex(this.web3.utils.toWei(amount.toString(), 'ether'));

      const rawTx: IObjectKeys = {
        nonce: count,
        gasPrice: this.web3.utils.toHex(gasPrice),
        to: this.network.Contract,
        value: txValue,
        data: (this.contractInstance.methods.transfer(to, value).encodeABI() as string)
      }

      return this.estimateGas({
        "from": from,
        ...rawTx
      }).then((gasLimit) => {

        gasLimit = Math.round(Number(gasLimit) * 2.2);
        rawTx.gasLimit = this.web3.utils.toHex(gasLimit);
        return this.web3.eth.accounts.signTransaction(rawTx, privateKey).then((signData) => {
          return this.transaction(signData);
        });

      });

    });

  }

  sendEth({ from, privateKey, amount, to }: { from: string, privateKey: string, amount: number, to: string }): Promise<IObjectKeys> {

    from = this.web3.utils.toHex(from);
    to = this.web3.utils.toHex(to);
    return this.prepareGas(from).then(([count, gas]) => {

      const gasPrice = Math.round(Number(gas) * 2.2);
      const txValue = this.web3.utils.toWei(amount.toString(), 'ether');

      const rawTx: IObjectKeys = {
        nonce: count,
        gasPrice: this.web3.utils.toHex(gasPrice),
        to,
        value: txValue
      }

      return this.estimateGas({
        "from": from,
        ...rawTx
      }).then((gasLimit) => {

        gasLimit = Math.round(Number(gasLimit) * 2.2);
        rawTx.gasLimit = this.web3.utils.toHex(gasLimit);

        return this.web3.eth.accounts.signTransaction(rawTx, privateKey).then((signData) => {
          return this.transaction(signData);
        });

      });

    });

  }


  sendEthMetamsk({ from, amount, to }: { from: string, amount: number, to: string }): Promise<IObjectKeys> {

    from = this.web3.utils.toHex(from);
    to = this.web3.utils.toHex(to);
    return this.prepareGas(from).then(([count, gas]) => {

      const gasPrice = Math.round(Number(gas) * 2.2);
      const txValue = this.web3.utils.toWei(amount.toString(), 'ether');

      const rawTx: IObjectKeys = {
        from,
        nonce: count.toString(),
        gasPrice: this.web3.utils.toHex(gasPrice),
        to,
        value: this.web3.utils.toHex(txValue)
      }

      return this.estimateGas({
        "from": from,
        ...rawTx
      }).then((gasLimit) => {

        gasLimit = Math.round(Number(gasLimit) * 2.2);
        rawTx.gasLimit = this.web3.utils.toHex(gasLimit);
        return rawTx;
      });

    });

  }

  createAccount({ password }: { password: string }) {
    const wallet = this.web3.eth.accounts.create();
    return wallet.encrypt(password);
  }

  privateKeyToAccount({ privateKey, password }: { privateKey: string, password: string }) {
    const wallet = this.web3.eth.accounts.privateKeyToAccount(privateKey);
    return wallet.encrypt(password);
  }

  approveMetamask({ from, spender, amount }: { from: any, spender: any, amount: number }): Promise<IObjectKeys> {

    from = this.web3.utils.toHex(from);
    spender = this.web3.utils.toHex(spender);

    return Promise.all([
      this.prepareGas(from),
    ]).then(([[count, gas]]) => {

      const gasPrice = Math.round(Number(gas) * 2.2);
      const txValue = this.web3.utils.numberToHex(this.web3.utils.toWei('0', 'ether'));
      const value = this.web3.utils.numberToHex(this.web3.utils.toWei(amount.toString(), 'ether'));
      const rawTx: IObjectKeys = {
        from,
        nonce: count.toString(),
        gasPrice: this.web3.utils.toHex(gasPrice),
        to: this.network.Contract,
        value: txValue,
        data: (this.contractInstance.methods.approve(spender, value).encodeABI() as string)
      }

      return this.estimateGas({
        "from": from,
        ...rawTx
      }).then((gasLimit) => {

        gasLimit = Math.round(Number(gasLimit) * 2.2);
        rawTx.gas = this.web3.utils.toHex(gasLimit);

        return rawTx;

      });

    });

  }

  stakeMetamask({ from, amount }: { from: any, amount: number }): Promise<IObjectKeys> {

    from = this.web3.utils.toHex(from);

    return Promise.all([
      this.prepareGas(from),
    ]).then(([[count, gas]]) => {
      const gasPrice = Math.round(Number(gas) * 2.2);
      const txValue = this.web3.utils.numberToHex(this.web3.utils.toWei('0', 'ether'));
      const value = this.web3.utils.numberToHex(this.web3.utils.toWei(amount.toString(), 'ether'));
      const rawTx: IObjectKeys = {
        from,
        nonce: count.toString(),
        gasPrice: this.web3.utils.toHex(gasPrice),
        to: StakingContract,
        value: txValue,
        data: (this.stakingInstance.methods.stake(value).encodeABI() as string)
      }
      return this.estimateGas({
        "from": from,
        ...rawTx
      }).then((gasLimit) => {

        gasLimit = Math.round(Number(gasLimit) * 2.2);
        rawTx.gas = this.web3.utils.toHex(gasLimit);

        return rawTx;

      });

    });

  }

  withDrawPrincipal({ from, index, amount }: { from: any, index: number, amount: number }): Promise<IObjectKeys> {

    from = this.web3.utils.toHex(from);

    return Promise.all([
      this.prepareGas(from),
    ]).then(([[count, gas]]) => {
      const gasPrice = Math.round(Number(gas) * 2.2);
      const txValue = this.web3.utils.numberToHex(this.web3.utils.toWei('0', 'ether'));
      const value = this.web3.utils.numberToHex(this.web3.utils.toWei(amount.toString(), 'ether'));
      const rawTx: IObjectKeys = {
        from,
        nonce: count.toString(),
        gasPrice: this.web3.utils.toHex(gasPrice),
        to: StakingContract,
        value: txValue,
        data: (this.stakingInstance.methods.withdrawPrincipal(index, value).encodeABI() as string)
      }
      return this.estimateGas({
        "from": from,
        ...rawTx
      }).then((gasLimit) => {

        gasLimit = Math.round(Number(gasLimit) * 2.2);
        rawTx.gas = this.web3.utils.toHex(gasLimit);

        return rawTx;

      });

    });

  }

  getStakingContractParams() {
    return Promise.all([
      this.stakingInstance.methods.params().call(),
      this.stakingInstance.methods.getStartStakingDate().call(),
      this.stakingInstance.methods.getEndDate().call(),
      this.stakingInstance.methods.getCurrentDate().call()
    ]);
  }

  getStakings(from: string) {
    return Promise.all([
      this.stakingInstance.methods.userStakings().call({ from }).then((data: IObjectKeys[]) => {
        const promises = data.map((i) => {
          return Promise.all([
            this.stakingInstance.methods.userStaking(i).call(),
            this.stakingInstance.methods.calculateRewards(i).call({ from })
          ]).then(([data, rewards]) => {

            const [
              user,
              amount,
              status,
              startDay
            ] = data;

            const { [0]: r, [1]: c } = rewards;

            return {
              user,
              amount,
              status,
              startDay,
              index: i,
              rewards: {
                value: r,
                claimable: c
              }
            }
          });
        })
        return Promise.all(promises);
      }),
      this.stakingInstance.methods.getStartStakingDate().call(),
      this.stakingInstance.methods.getCurrentDay().call(),
      this.stakingInstance.methods.getEndDate().call(),
      this.stakingInstance.methods.userClaims().call({ from }).then((data: IObjectKeys[]) => {
        const promises = data.map((i) => {
          return this.stakingInstance.methods.userClaim(i).call().then((data: IObjectKeys) => {
            const { [0]: cl, [1]: b } = data;
            const [
              user,
              paidAmount,
              total,
              date,
              stakeIndex
            ] = cl;

            return {
              user,
              paidAmount,
              total,
              date,
              stakeIndex,
              claimable: b,
              requestIndex: i
            }
          });
        });
        return Promise.all(promises);
      })
    ]);
  }

  requestClaim(from: string, index: number) {
    from = this.web3.utils.toHex(from);

    return Promise.all([
      this.prepareGas(from),
    ]).then(([[count, gas]]) => {
      const gasPrice = Math.round(Number(gas) * 2.2);
      const txValue = this.web3.utils.numberToHex(this.web3.utils.toWei('0', 'ether'));
      const rawTx: IObjectKeys = {
        from,
        nonce: count.toString(),
        gasPrice: this.web3.utils.toHex(gasPrice),
        to: StakingContract,
        value: txValue,
        data: (this.stakingInstance.methods.requestClaim(index).encodeABI() as string)
      }
      return this.estimateGas({
        "from": from,
        ...rawTx
      }).then((gasLimit) => {

        gasLimit = Math.round(Number(gasLimit) * 2.2);
        rawTx.gas = this.web3.utils.toHex(gasLimit);

        return rawTx;

      });

    });
  }

  claim(from: string, index: number) {
    from = this.web3.utils.toHex(from);
    return Promise.all([
      this.prepareGas(from),
    ]).then(([[count, gas]]) => {
      const gasPrice = Math.round(Number(gas) * 2.2);
      const txValue = this.web3.utils.numberToHex(this.web3.utils.toWei('0', 'ether'));
      const rawTx: IObjectKeys = {
        from,
        nonce: count.toString(),
        gasPrice: this.web3.utils.toHex(gasPrice),
        to: StakingContract,
        value: txValue,
        data: (this.stakingInstance.methods.claim(index).encodeABI() as string)
      }
      return this.estimateGas({
        "from": from,
        ...rawTx
      }).then((gasLimit) => {

        gasLimit = Math.round(Number(gasLimit) * 2.2);
        rawTx.gas = this.web3.utils.toHex(gasLimit);

        return rawTx;

      });

    });
  }

  private prepareGas(address: string) {
    return Promise.all([
      this.web3.eth.getTransactionCount(address),
      this.web3.eth.getGasPrice(),
    ]);
  }

  private estimateGas(data: IObjectKeys) {
    return this.web3.eth.estimateGas(data);
  }

  private transaction(rawTx: IObjectKeys): Promise<IObjectKeys> {
    return this.web3.eth.sendSignedTransaction(rawTx.rawTransaction);
  }

}