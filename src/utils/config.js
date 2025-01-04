import {
    getDefaultConfig,
  } from '@rainbow-me/rainbowkit';
  import {
    sepolia,
  } from 'wagmi/chains';
  
  
  export const config = getDefaultConfig({
    appName: 'Custom AMM',
    projectId: '5c34e7e8a0650558f2d3fc5cff924a20',
    chains: [sepolia],
    ssr: true, 
  });