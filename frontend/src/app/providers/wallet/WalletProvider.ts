import { Injectable, WritableSignal, signal } from '@angular/core';
import Contract, { Contract as IContract } from 'web3-eth-contract';
import { ABI as USDT_ABI } from '../../../globals/abi-usdt';
import { ABI as CREDI_ABI } from '../../../globals/abi-credi';
import { ABI as EARN_ABI } from '../../../globals/abi-earn';

import { EARN_ADDRESS, USDT_ADDRESS, NetworkLink, Metamask, ALCHEMY_URL, CREDI_ADDRESS } from 'src/environments/environment';
import { Web3, Address, ContractAbi } from 'web3';
import { IObjectKeys } from '../../helpers/interfaces';
import { WalletTypes } from 'src/globals';

@Injectable({
    providedIn: 'root'
})

export class WalletProvider {

    web3!: Web3;

    credi: IContract<ContractAbi> | any;
    earning!: IContract<ContractAbi> | any;
    usdt!: IContract<ContractAbi> | any;

    wallet = signal<{
        type: WalletTypes,
        data?: IObjectKeys | null
    }>(null);

    address: WritableSignal<Address | null> = signal<Address | null>(null);
    shortAddress = signal<null | string>(null);

    constructor() {
        this.web3 = new Web3(new Web3.providers.HttpProvider(NetworkLink));
        this.earning = new this.web3.eth.Contract(EARN_ABI, EARN_ADDRESS);
        this.usdt = new this.web3.eth.Contract(USDT_ABI, USDT_ADDRESS);
        this.credi = new this.web3.eth.Contract(CREDI_ABI, CREDI_ADDRESS);
    }

    setWallet(wallet: IObjectKeys) {
        this.wallet.set({
            type: WalletTypes.credi,
            data: wallet
        });

        const address = `0x${wallet.address}`;
        const first = address.slice(0, 5);
        const last = address.slice(address.length - 4, address.length);

        this.address.set(address);
        this.shortAddress.set(`${first}...${last}`);
    }

    async getTransactions(limit: number, page?: string, wallet?: string) {
        const params: IObjectKeys = {
            order: "desc",
            maxCount: `0x${limit.toString(16)}`,
            fromBlock: "0x0",
            toBlock: "latest",
            fromAddress: wallet ?? this.address(),
            category: ["external", "internal", "erc20"],
        };

        if (page) {
            params.pageKey = page;
        }

        const data = await fetch(ALCHEMY_URL, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                jsonrpc: "2.0",
                id: 0,
                method: "alchemy_getAssetTransfers",
                params
            })
        });

        return data.json();
    }

    async connect() {
        if ((window as any).ethereum) {
            try {
                await (window as any).ethereum.request(Metamask);
                const addr = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
                this.address.set(addr?.[0]);

                const first = this.address().slice(0, 5);
                const last = this.address().slice(this.address().length - 4, this.address().length);
                this.shortAddress.set(`${first}...${last}`);
                this.wallet.set({
                    type: WalletTypes.metamask,
                });
            } catch (e) {
                throw new Error(e);
            }
        }

    }

    get parsedAddress() {
        if (this.address() == null) {
            return;
        }
        const first = this.address().slice(0, 5);
        const last = this.address().slice(this.address().length - 4, this.address().length);
        return `${first}...${last}`;
    }

    async getContractBalance(contract: IObjectKeys): Promise<number> {

        if (this.address()) {

            const address = this.address();
            const contractInstance: IContract<ContractAbi> | any = new this.web3.eth.Contract(contract.ABI, contract.address);

            return contractInstance.methods.decimals().call().then((decimal: any) => {
                return contractInstance.methods.balanceOf(address).call({ from: address }).then((tokens: number) => {
                    const amount = Number(tokens) / (10 ** Number(decimal))
                    return amount;
                });
            });
        }



    }

    async getBalance() {
        const value = await this.web3.eth.getBalance(this.address());
        return Number(this.web3.utils.fromWei(value, 'ether'));
    }


    getEarnContractParams() {
        const methods: IObjectKeys = this.earning.methods;
        return Promise.all([
            this.earning.methods.params().call(),
            this.earning.methods.getPercentSize().call().then((data) => {
                return methods.getPercent((data as any) - 1n).call()
            }),
            this.earning.methods.getPeriodSize().call().then((data) => {
                const p = [];
                for (let i = 0n; i < (data as any); i++) {
                    p.push(methods.getPeriod(i).call().then((period) => {
                        return {
                            period,
                            index: i
                        }
                    }));
                }
                return Promise.all(p);
            }),
            this.usdt.methods.decimals().call()
        ]);
    }

    getPrivKey(keyStore: IObjectKeys | any, password: string): Promise<IObjectKeys> {
        return this.web3.eth.accounts.decrypt(keyStore, password);
    }

    async getLends() {
        const data = await this.earning.methods.userLendings().call({ from: this.address() });
        const p = [];
        for (const i of data) {
            p.push(
                this.earning.methods.getLender(i).call({ from: this.address() }).then(async (item) => {
                    if (item.status == 0n) {
                        item.rewards = await this.earning.methods.calculateEarn(i).call({ from: this.address() });
                    } else {
                        item.rewards = { 0: 0n, 1: 0n };
                    }
                    return item;
                })
            )
        }
        return Promise.all(p);
    }

    async approveMetamask({ from, spender, amount }: { from: any, spender: any, amount: number }): Promise<IObjectKeys> {

        from = this.web3.utils.toHex(from);
        spender = this.web3.utils.toHex(spender);

        const [[count, gas]] = await Promise.all([
            this.prepareGas(from),
        ]);

        const gasPrice = Math.round(Number(gas) * 2.2);
        const txValue = this.web3.utils.numberToHex(this.web3.utils.toWei('0', 'ether'));
        const data = this.web3.utils.numberToHex(this.web3.utils.toWei(amount.toString(), 'ether'));
        const rawTx: IObjectKeys = {
            from,
            nonce: count.toString(),
            gasPrice: this.web3.utils.toHex(gasPrice),
            to: USDT_ADDRESS,
            value: txValue,
            data: (this.usdt.methods.approve(spender, data).encodeABI() as string)
        };

        let gasLimit = await this.estimateGas({
            "from": from,
            ...rawTx
        });

        gasLimit = BigInt(Math.round(Number(gasLimit) * 2.2));
        rawTx.gas = this.web3.utils.toHex(gasLimit);
        return rawTx;

    }

    async earnMetamask({ from, amount, index }: { from: any, amount: number, index: number }): Promise<IObjectKeys> {

        from = this.web3.utils.toHex(from);

        const [[count, gas]] = await Promise.all([
            this.prepareGas(from),
        ]);
        const gasPrice = Math.round(Number(gas) * 2.2);
        const txValue = this.web3.utils.numberToHex(this.web3.utils.toWei('0', 'ether'));
        const data = this.web3.utils.numberToHex(this.web3.utils.toWei(amount.toString(), 'ether'));

        const rawTx: IObjectKeys = {
            from,
            nonce: count.toString(),
            gasPrice: this.web3.utils.toHex(gasPrice),
            to: EARN_ADDRESS,
            value: txValue,
            data: (this.earning.methods.lend(data, index).encodeABI() as string)
        };

        let gasLimit = await this.estimateGas({
            "from": from,
            ...rawTx
        });

        gasLimit = this.web3.utils.toBigInt(Math.round(Number(gasLimit) * 2.2));
        rawTx.gas = this.web3.utils.toHex(gasLimit);
        return rawTx;

    }

    createAccount({ password }: { password: string }) {
        const wallet = this.web3.eth.accounts.create();
        return wallet.encrypt(password);
    }

    async sendEth({ amount, to }: { amount: number, to: string }): Promise<IObjectKeys> {
        let from = this.web3.utils.toHex(this.address());
        to = this.web3.utils.toHex(to);

        const [count, gas] = await this.prepareGas(from);
        const gasPrice = Math.round(Number(gas) * 2.2);
        const txValue = this.web3.utils.toWei(amount, 'ether');
        const value = this.web3.utils.toHex(this.web3.utils.toBigInt(txValue));

        const rawTx: IObjectKeys = {
            from,
            to,
            nonce: (count).toString(),
            gasPrice: this.web3.utils.toHex(gasPrice),
            value
        };

        let gasLimit = await this.estimateGas({
            "from": from,
            ...rawTx
        });

        gasLimit = this.web3.utils.toBigInt(Math.round(Number(gasLimit) * 2.2));
        rawTx.gasLimit = this.web3.utils.toHex(gasLimit);

        return rawTx;

    }

    async sendToken({ amount, to, contract }: { amount: number, to: string, contract: Contract<ContractAbi> }): Promise<IObjectKeys> {

        const from = this.web3.utils.toHex(this.address());
        to = this.web3.utils.toHex(to);

        const [[count, gas], decimal] = await Promise.all([
            this.prepareGas(from),
            contract.methods.decimals().call()
        ]);

        const gasPrice = Math.round(Number(gas) * 2.2);
        const txValue = this.web3.utils.numberToHex(this.web3.utils.toWei('0', 'ether'));
        const value = Math.round(amount * 10 ** Number(decimal)).toLocaleString('fullwide', { useGrouping: false, maximumFractionDigits: 6 });
        const methods: IObjectKeys = contract.methods;
        const rawTx: IObjectKeys = {
            from,
            nonce: (count).toString(),
            gasPrice: this.web3.utils.toHex(gasPrice),
            to: contract.options.address,
            value: txValue,
            data: (methods.transfer(to, this.web3.utils.toBigInt(value)).encodeABI())
        };

        let gasLimit = await this.estimateGas({
            "from": from,
            ...rawTx
        });

        gasLimit = this.web3.utils.toBigInt(Math.round(Number(gasLimit) * 2.2));
        rawTx.gas = this.web3.utils.toHex(gasLimit);
        return rawTx;

    }

    async signAndSend(rawTx: IObjectKeys, privateKey: string) {
        const tx = await this.web3.eth.accounts.signTransaction(rawTx, privateKey);
        return this.transaction(tx);
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
