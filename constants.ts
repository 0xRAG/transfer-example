import { createPublicClient, http } from "viem";
import { baseSepolia } from "viem/chains";

export const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http(),
});

// USDC contract address on Base Sepolia
export const usdcContractAddress = "0x036CbD53842c5426634e7929541eC2318f3dCF7e";
