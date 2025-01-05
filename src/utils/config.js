import {
  getDefaultConfig,
} from '@rainbow-me/rainbowkit';
import {
  sepolia,
} from 'wagmi/chains';

// Manually defining the EDU testnet chain configuration
export const eduChain = {
  id: 656476,  // EDU Testnet Chain ID
  name: 'EDU Testnet',
  network: 'edu',
  nativeCurrency: {
    name: 'EDU Token',
    symbol: 'EDU',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.open-campus-codex.gelato.digital'],  // EDU Testnet RPC URL
    },
  },
  blockExplorers: {
    default: {
      name: 'EDU Explorer',
      url: 'https://edu-chain-testnet.blockscout.com',  // EDU Testnet Block Explorer URL
    },
  },
  testnet: true,  // Flag indicating it's a testnet
};

export const config = getDefaultConfig({
  appName: 'Custom AMM',
  projectId: '5c34e7e8a0650558f2d3fc5cff924a20',
  chains: [eduChain],  // Include EDU chain here
  ssr: true,
});
