export const environment = {
  production: false
};

// export const NetworkLink = 'https://sepolia.infura.io/v3/823ab188aef049fab30474e9e925052f';
// export const USDT_ADDRESS = '0x29d6Cb128144294cC6D571570EcB32552948FD15';
// export const CREDI_ADDRESS = '0xEaC08Dc8243eFEb56DcBA1020b8847971e44d7A9';
// export const EARN_ADDRESS = '0x64dAEe256aA60a6958629bEb1eAC13787c3b48dc';

// export const Scan = 'https://sepolia.etherscan.io/';
// export const Metamask = {
//   method: 'wallet_addEthereumChain',
//   params: [{
//     chainId: '0xaa36a7',
//     chainName: 'Sepolia',
//     nativeCurrency: {
//       name: 'ETH',
//       symbol: 'ETH',
//       decimals: 18
//     },
//     rpcUrls: ['https://sepolia.infura.io/v3/823ab188aef049fab30474e9e925052f'],
//     blockExplorerUrls: ['https://sepolia.etherscan.io']
//   }]
// };

// export const EXPLORER = 'https://sepolia.etherscan.io/tx';
// export const ALCHEMY_URL = 'https://eth-sepolia.g.alchemy.com/v2/YwsNl0DQ8QBQBtDrFSHsRj8F_BQPhzYt';

export const NetworkLink = 'https://mainnet.infura.io/v3/823ab188aef049fab30474e9e925052f';
export const USDT_ADDRESS = '0xdac17f958d2ee523a2206206994597c13d831ec7';
export const CREDI_ADDRESS = '0xaE6e307c3Fe9E922E5674DBD7F830Ed49c014c6B';
export const EARN_ADDRESS = '0x0ba76d8312508b763da765606af806d2caa7771b'

export const Scan = 'https://etherscan.io/';
export const Metamask = {
  method: 'wallet_switchEthereumChain',
  params: [{ chainId: '0x1' }],
};

export const EXPLORER = 'https://etherscan.io/tx';
export const ALCHEMY_URL = 'https://eth-mainnet.g.alchemy.com/v2/2xwHjE7B2yehN2lxp6ch_KmO1GLpOM5G';