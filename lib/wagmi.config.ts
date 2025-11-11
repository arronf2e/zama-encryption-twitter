import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, sepolia } from 'wagmi/chains';
import { http } from 'viem';

const config = getDefaultConfig({
  appName: 'My Web3 App',  // 你的 App 名称
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!,
  chains: [
    mainnet,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia] : [])
  ],
  transports: {
    [mainnet.id]: http('https://eth-mainnet.publicnode.com'),  // 公共 RPC
    [sepolia.id]: http('https://ethereum-sepolia.publicnode.com'),  // Sepolia 公共 RPC
  },
  ssr: true,  // Next.js SSR 兼容
});

export { config };