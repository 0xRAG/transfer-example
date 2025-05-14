import { type EvmServerAccount } from "@coinbase/cdp-sdk";
import { formatEther, formatUnits } from "viem";
import { publicClient, usdcContractAddress } from "./constants";

export async function printBalances(
  sender: EvmServerAccount,
  receiver: EvmServerAccount
) {
  const [senderEthBalance, receiverEthBalance] = await Promise.all([
    publicClient.getBalance({
      address: sender.address,
    }),
    publicClient.getBalance({
      address: receiver.address,
    }),
  ]);

  const [senderBalances, receiverBalances] = await Promise.all([
    sender.listTokenBalances({ network: "base-sepolia" }),
    receiver.listTokenBalances({ network: "base-sepolia" }),
  ]);

  const senderUsdcBalance = senderBalances.balances.find(
    (balance) => balance.token.contractAddress === usdcContractAddress
  );

  const receiverUsdcBalance = receiverBalances.balances.find(
    (balance) => balance.token.contractAddress === usdcContractAddress
  );

  console.log("Sender ETH Balance:", formatEther(senderEthBalance));
  console.log(
    "Sender USDC Balance:",
    senderUsdcBalance
      ? formatUnits(
          senderUsdcBalance.amount.amount,
          Number(senderUsdcBalance.amount.decimals)
        )
      : "0"
  );

  console.log("Receiver ETH Balance:", formatEther(receiverEthBalance));
  console.log(
    "Receiver USDC Balance:",
    receiverUsdcBalance
      ? formatUnits(
          receiverUsdcBalance.amount.amount,
          Number(receiverUsdcBalance.amount.decimals)
        )
      : "0"
  );
}
