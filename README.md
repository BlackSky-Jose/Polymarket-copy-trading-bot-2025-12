# Polymarket Copy Trading Bot

A **production-grade, real-time copy trading system** for **Polymarket**, designed to automatically mirror trades from selected wallets with high reliability, low latency, and robust risk controls. Built in **TypeScript** on **Bun**, the bot integrates directly with Polymarket’s **Central Limit Order Book (CLOB)** and real-time WebSocket feeds for institutional-level execution.

---

## Overview

The Polymarket Copy Trading Bot continuously monitors one or more target wallets and replicates their trading activity according to configurable risk parameters. It is designed for **professional deployment**, supporting automated redemptions, precise order handling, and comprehensive logging.

### Core Capabilities

* **Low-Latency Trade Copying** – Real-time WebSocket monitoring with millisecond-level execution
* **Automated Market Redemption** – Automatically redeems winning positions on market resolution
* **Advanced Risk Management** – Size multipliers, max order caps, and negative-risk controls
* **Flexible Order Execution** – Supports FAK (Fill-and-Kill) and FOK (Fill-or-Kill)
* **Local Holdings Accounting** – Persistent tracking of token balances for accurate redemptions
* **Multi-Outcome Compatibility** – Works seamlessly with binary and multi-outcome markets

---

## System Architecture

### Technology Stack

* **Runtime**: Bun (TypeScript-first runtime)
* **Language**: TypeScript (v5.9+)
* **Blockchain**: Polygon (Ethereum-compatible L2)
* **Web3**: Ethers.js v6
* **APIs**:

  * `@polymarket/clob-client`
  * `@polymarket/real-time-data-client`
* **Logging**: Structured, production-ready logger

### High-Level Flow

```
Real-Time Data Client (WebSocket)
        ↓
Trade Monitor (Wallet Filtering & Validation)
        ↓
Order Builder (Sizing, Risk, Tick Precision)
        ↓
CLOB Client (Execution & Allowances)
        ↓
Holdings Manager (Local State)
        ↓
Redemption Engine (Resolved Markets)
```

---

##  Installation

### Prerequisites

* **Bun** v1.0+
* **Node.js** 18+
* **Polygon Wallet** funded with USDC
* **Polymarket API Credentials**

### Setup Steps

```bash
git clone <repository-url>
cd polymarket-copytrading
bun install
```

Create environment configuration:

```bash
cp .env.example .env
```

Edit `.env`:

```env
PRIVATE_KEY=your_private_key
TARGET_WALLET=0xTargetWallet

SIZE_MULTIPLIER=1.0
MAX_ORDER_AMOUNT=100
ORDER_TYPE=FAK
TICK_SIZE=0.01
NEG_RISK=false
ENABLE_COPY_TRADING=true

REDEEM_DURATION=60

CHAIN_ID=137
CLOB_API_URL=https://clob.polymarket.com
```

Initialize and start the bot:

```bash
bun src/index.ts
```

On first launch, API credentials are generated and stored securely.

---

## ⚙️ Configuration Reference

| Variable              | Description                    |
| --------------------- | ------------------------------ |
| `PRIVATE_KEY`         | Trading wallet private key     |
| `TARGET_WALLET`       | Wallet address to mirror       |
| `SIZE_MULTIPLIER`     | Trade size scaling factor      |
| `MAX_ORDER_AMOUNT`    | Max USDC per trade             |
| `ORDER_TYPE`          | `FAK` or `FOK`                 |
| `TICK_SIZE`           | Market price precision         |
| `NEG_RISK`            | Allow negative balances        |
| `ENABLE_COPY_TRADING` | Master on/off switch           |
| `REDEEM_DURATION`     | Auto-redeem interval (minutes) |

---

##  Usage

### Start Copy Trading

```bash
bun src/index.ts
```

The bot will:

1. Establish WebSocket connection
2. Subscribe to Polymarket activity feeds
3. Detect trades from the target wallet
4. Mirror trades based on configured rules
5. Periodically redeem resolved markets

### Redemption Commands

```bash
bun src/auto-redeem.ts --dry-run
bun src/auto-redeem.ts --api --max 500
bun src/redeem.ts <conditionId>
```

---

##  Execution Logic

### Trade Lifecycle

1. Detect target wallet trade
2. Validate payload integrity
3. Apply sizing and risk limits
4. Normalize price to tick size
5. Check balances and allowances
6. Submit order to CLOB
7. Update local holdings
8. Log execution result

### Order Builder Highlights

* Buy and sell logic handled independently
* Partial fill support (FAK)
* Strict all-or-nothing enforcement (FOK)
* Precision-safe arithmetic
* Graceful failure handling

---

##  Project Structure

```
src/
 ├── index.ts
 ├── auto-redeem.ts
 ├── redeem.ts
 ├── data/
 ├── order-builder/
 ├── providers/
 ├── security/
 └── utils/
```

---

##  Logging & Monitoring

* Trade detection and execution
* Balance and allowance checks
* Redemption outcomes
* Structured logs for debugging and audits

Log levels: `info`, `success`, `warning`, `error`

---

##  Risk Disclosure

* Copy trading amplifies both profits and losses
* Liquidity and slippage risks apply
* Gas fees incurred on every transaction
* WebSocket or API outages may impact execution

**Best Practices**:

* Start with low multipliers
* Enforce strict max order sizes
* Monitor balances regularly
* Test using dry-run modes

---

## 🛠️ Development

```bash
bun run tsc --noEmit
bun --watch src/index.ts
```

---

##  Contact & Support

For deployment support, custom integrations, or professional inquiries:

 **Telegram**: [https://t.me/blacksky_jose](https://t.me/blacksky_jose)

---

## License

ISC

---

**Disclaimer**: This software is provided as-is without warranties. Trading prediction markets involves substantial risk. Use responsibly and only with capital you can afford to lose.
