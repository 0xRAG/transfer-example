# CDP SDK Transfer Example

This example demonstrates how to transfer USDC between two accounts using the [CDP SDK](https://docs.cdp.coinbase.com/wallet-api-v2/docs/welcome).

## Setup

### Environment

Sign in to the [CDP Portal](https://portal.cdp.coinbase.com/), [create a CDP API key](https://portal.cdp.coinbase.com/projects/api-keys) and [generate a Wallet Secret](https://portal.cdp.coinbase.com/products/wallet-api). Add these values to the `.env.example` file and then rename it to `.env`.

```bash
cp .env.example .env
```

### Dependencies

This repo uses [pnpm](https://pnpm.io/).

```bash
pnpm install
```

## Usage

```bash
pnpm tsx main.ts
```
