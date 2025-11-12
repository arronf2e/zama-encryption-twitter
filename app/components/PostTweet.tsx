"use client";
import { useState } from "react";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { encryptContent } from "@/lib/fhevm";

const CONTRACT_ADDRESS = "0xYOUR_CONTRACT_ADDRESS"; // 替换为实际地址
const CONTRACT_ABI = [{}]; // 合约ABI

export default function PostTweet() {
  const [content, setContent] = useState("");
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [isPrivate, setIsPrivate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { address } = useAccount();
  const { writeContract, data: hash } = useWriteContract();

  const { isLoading: isConfirming } = useWaitForTransactionReceipt({
    hash,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address || !content.trim()) return;

    setIsLoading(true);

    try {
      // 1. 加密内容
      const encrypted = await encryptContent(
        content,
        CONTRACT_ADDRESS,
        address
      );

      // 2. 上传到IPFS（这里简化处理）
      const contentHash = `ipfs://example-hash-${Date.now()}`;

      // 3. 调用合约
      writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: "postEncryptedTweet",
        args: [
          contentHash,
          encrypted.handles[0],
          encrypted.inputProof,
          selectedFriends,
          isPrivate,
        ],
      });

      setContent("");
      setSelectedFriends([]);
    } catch (error) {
      console.error("Error posting tweet:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <textarea
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        rows={4}
        placeholder="分享你的想法..."
        maxLength={280}
      />
      <span>{isLoading || isConfirming ? "发布中..." : "发布推文"}</span>
    </>
  );
}
