"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useBalance } from "wagmi";
import { sepolia } from "wagmi/chains";
import { getRelayerInstance } from "../lib/fhevm";
import { useEffect } from "react";

export default function Home() {
  const { address, isConnected, chain } = useAccount();
  const { data: balance } = useBalance({
    address,
    chainId: sepolia.id, // Sepolia 余额
  });

  const test = async () => {
    await getRelayerInstance();
  };

  useEffect(() => {
    test();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">连接</h1>

      {/* 钱包连接按钮：自动显示 OKX/MetaMask 等 */}
      <ConnectButton
        label="连接钱包"
        accountStatus={{ smallScreen: "avatar", largeScreen: "full" }}
        chainStatus="name" // 显示链名，如 "Sepolia"
      />

      {isConnected && (
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <p>地址: {address}</p>
          <p>
            链: {chain?.name} (ID: {chain?.id})
          </p>
          <p>
            余额: {balance?.formatted} {balance?.symbol}
          </p>
          {/* 示例：切换到 Sepolia */}
          {chain?.id !== sepolia.id && (
            <button className="ml-4 bg-blue-500 text-white px-4 py-2 rounded">
              切换到 Sepolia
            </button>
          )}
        </div>
      )}
    </main>
  );
}
