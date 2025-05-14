import { CdpClient } from "@coinbase/cdp-sdk";
import { printBalances } from "./print-balances";
import { parseUnits } from "viem";
import { publicClient } from "./constants";
import "dotenv/config";

const cdp = new CdpClient();

const sender = await cdp.evm.getOrCreateAccount({
  name: "Transfer-Example-Sender",
});
const receiver = await cdp.evm.getOrCreateAccount({
  name: "Transfer-Example-Receiver",
});

console.log("Sender:", JSON.stringify(sender, null, 2));
console.log("Receiver:", JSON.stringify(receiver, null, 2));

console.log("\nStarting Balances:");
await printBalances(sender, receiver);

console.log(
  `\nTransferring 0.01 USDC from ${sender.address} to ${receiver.address}...`
);
const { transactionHash } = await sender.transfer({
  to: receiver.address,
  amount: parseUnits("0.01", 6), // USDC uses 6 decimals
  token: "usdc",
  network: "base-sepolia",
});

console.log("Waiting for transaction to be confirmed...");
await publicClient.waitForTransactionReceipt({
  hash: transactionHash,
});
console.log(
  `Transaction confirmed! Link: ${publicClient.chain.blockExplorers.default.url}/tx/${transactionHash}`
);

console.log("\nEnding Balances:");
await printBalances(sender, receiver);
