import {
  createInstance, // 创建实例的工厂函数
  initSDK,
} from "@zama-fhe/relayer-sdk/web";

// ==== 2️⃣ 实例缓存 ====
let relayerInstance: any = null;

/**
 * 获取（或创建）Relayer 实例
 */
export async function getRelayerInstance(): Promise<any> {
  await initSDK();

  if (!relayerInstance) {
    relayerInstance = await createInstance({
      // ACL_CONTRACT_ADDRESS (FHEVM Host chain)
      aclContractAddress: "0x687820221192C5B662b25367F70076A37bc79b6c",
      // KMS_VERIFIER_CONTRACT_ADDRESS (FHEVM Host chain)
      kmsContractAddress: "0x1364cBBf2cDF5032C47d8226a6f6FBD2AFCDacAC",
      // INPUT_VERIFIER_CONTRACT_ADDRESS (FHEVM Host chain)
      inputVerifierContractAddress:
        "0xbc91f3daD1A5F19F8390c400196e58073B6a0BC4",
      // DECRYPTION_ADDRESS (Gateway chain)
      verifyingContractAddressDecryption:
        "0xb6E160B1ff80D67Bfe90A85eE06Ce0A2613607D1",
      // INPUT_VERIFICATION_ADDRESS (Gateway chain)
      verifyingContractAddressInputVerification:
        "0x7048C39f048125eDa9d678AEbaDfB22F7900a29F",
      // FHEVM Host chain id
      chainId: 11155111,
      // Gateway chain id
      gatewayChainId: 55815,
      // Optional RPC provider to host chain
      network:
        "https://api.zan.top/node/v1/eth/sepolia/3277793abeff4d399ab40fa7ae21abfd",
      // Relayer URL
      relayerUrl: "https://relayer.testnet.zama.cloud",
    });
  }
  return relayerInstance;
}
