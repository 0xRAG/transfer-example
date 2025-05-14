import { EvmServerAccount } from "@coinbase/cdp-sdk";
import { publicClient } from "./constants";

export async function faucet(account: EvmServerAccount) {
  console.log(
    `\nRequesting ETH and USDC from faucet for account ${account.address}...`
  );
  const [ethFaucetTx, usdcFaucetTx] = await Promise.all([
    account.requestFaucet({
      network: "base-sepolia",
      token: "eth",
    }),
    account.requestFaucet({
      network: "base-sepolia",
      token: "usdc",
    }),
  ]);

  console.log("Waiting for faucet transactions to be confirmed...");
  await Promise.all([
    publicClient.waitForTransactionReceipt({
      hash: ethFaucetTx.transactionHash,
    }),
    publicClient.waitForTransactionReceipt({
      hash: usdcFaucetTx.transactionHash,
    }),
  ]);

  console.log("Faucet transactions confirmed!");
}
