export { Environment } from './config';

export enum WalletTypes{
    metamask = 'metamask',
    credi = 'credi',
    gemwallet = 'gemwallet',
    xumm = 'xumm'
}

export enum CurrencyTypes{
    eth = 'eth',
    credi = 'credi',
    usdt = 'usdt',
    xrpl = 'xrpl'
}

export const UserRoles = {
    user: {
        id: 1,
        key: 'user'
    },
    admin: {
        id: 2,
        key: 'admin'
    }
};

export const Languages = [
    {
        icon: 'uk.png',
        shortName: 'EN',
        name: 'English',
        key: 'EN'
    }
];

export const TransactionTypes = {
    send: {
        key: 'send'
    },
    buy: {
        key: 'buy'
    }
}

export const Statuses = {
    unconfirmed: {
        key: 'unconfirmed',
    },
    processing: {
        key: 'processing',
    },
    confirmed: {
        key: 'confirmed',
    },
    completed: {
        key: 'completed',
    },
    rejected: {
        key: 'rejected',
    },
};

export const FileTypes = {
    image: {
        key: 'image',
        suportedTypes: ['image/jpg', 'image/jpeg', 'image/png', 'image/bmp'],
        maxSize: 8 * 1048576
    },
    pdf: {
        key: 'pdf',
        suportedTypes: ['application/pdf'],
        maxSize: 8 * 1048576
    }
};

export const LoanTypes = {
    investment: {
        key: 'investment',
    }
};

export const SYMBOLS = {
    RETH: {
        key: 'RETH',
        image: 'eth-logo.svg'
    },
    ETH: {
        key: 'ETH',
        image: 'eth-logo.svg'
    },
    BNB: {
        key: 'BNB',
        image: 'binance-logo.svg'
    },
}

export const Mercuryo = {
    'key': 'mercuryo',
    'host': 'https://exchange.mercuryo.io/',
    data: {
        'widget_id': '2ce492bc-be4c-4a3f-be3b-0667c0019c8f',
        'type': 'buy',
        'currency': 'BUSD',
        'fiat_currency': 'USD',
        'fix_amount': 'true',
        'fix_currency': 'true',
        'fix_fiat_amount': 'true',
        'fix_fiat_currency': 'true',
        'lang': 'en'
    }
}

export const MobileWidth = 750;
export const MainMobileWidth = 950;

