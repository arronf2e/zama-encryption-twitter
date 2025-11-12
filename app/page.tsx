"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useBalance } from "wagmi";
import { sepolia } from "wagmi/chains";
import { useEffect } from "react";
import { getRelayerInstance } from "../lib/fhevm";
import PostTweet from '@/app/components/PostTweet';

export default function Home() {
  const { address, isConnected, chain } = useAccount();
  const { data: balance } = useBalance({
    address,
    chainId: sepolia.id, // Sepolia 余额
  });

  // const test = async () => {
  //   await getRelayerInstance();
  // };

  // useEffect(() => {
  //   test();
  // }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <PostTweet />
    </main>
  );
}
