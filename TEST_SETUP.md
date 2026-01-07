# Bot Testing Guide

## Prerequisites

Before testing the bot, ensure you have:

1. **Node.js** (v18+) and **npm** installed
2. **MongoDB** running and accessible
3. **Environment variables** configured in `.env` file

## Setup Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Create `.env` File

Create a `.env` file in the root directory with the following variables:

```env
# Target user wallet address to copy trades from
USER_ADDRESS=0xYourTargetWalletAddress

# Your wallet address (proxy wallet) that will execute trades
PROXY_WALLET=0xYourProxyWalletAddress

# Private key of your proxy wallet (without 0x prefix)
PRIVATE_KEY=your_private_key_here

# Polymarket CLOB API URLs
CLOB_HTTP_URL=https://clob.polymarket.com
CLOB_WS_URL=wss://clob-ws.polymarket.com

# MongoDB connection string
MONGO_URI=mongodb://localhost:27017/polymarket_copytrading

# Polygon RPC URL (for checking balances)
RPC_URL=https://polygon-rpc.com

# USDC contract address on Polygon
USDC_CONTRACT_ADDRESS=0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174

# Optional: Configuration defaults
FETCH_INTERVAL=1
TOO_OLD_TIMESTAMP=24
RETRY_LIMIT=3
```

### 3. Start MongoDB

Make sure MongoDB is running:

```bash
# Windows (if installed as service)
net start MongoDB

# Or start MongoDB manually
mongod
```

## Testing the Bot

### Option 1: Development Mode (with ts-node)

```bash
npm run dev
```

### Option 2: Build and Run

```bash
# Compile TypeScript
npm run build

# Run compiled JavaScript
npm start
```

## What to Expect

When the bot starts successfully, you should see:

1. ✅ `MongoDB connected`
2. ✅ `Target User Wallet address is: 0x...`
3. ✅ `My Wallet address is: 0x...`
4. ✅ `API Key created` or `API Key derived`
5. ✅ `Trade Monitor is running every X seconds`
6. ✅ `Executing Copy Trading`
7. ✅ Spinner showing "Waiting for new transactions"

## Testing Trade Execution

The bot will:

1. **Monitor** - Continuously fetch new trades from the target user
2. **Detect** - Save new trades to MongoDB
3. **Execute** - Copy trades based on:
   - User's BUY → Bot BUY
   - User's SELL → Bot SELL
   - Position mismatches → Bot MERGE

## Common Issues

### Issue: "USER_ADDRESS is not defined"
**Solution**: Check your `.env` file exists and has all required variables

### Issue: "MongoDB connection error"
**Solution**: Ensure MongoDB is running and `MONGO_URI` is correct

### Issue: "Cannot find module '@polymarket/clob-client'"
**Solution**: Run `npm install` to install dependencies

### Issue: "API Key creation failed"
**Solution**: Check your `PRIVATE_KEY` and `PROXY_WALLET` are correct

## Monitoring

The bot logs:
- New trades detected
- Trade execution attempts
- Balance checks
- Position comparisons
- Order placement results

Watch the console output to see the bot's activity in real-time.

