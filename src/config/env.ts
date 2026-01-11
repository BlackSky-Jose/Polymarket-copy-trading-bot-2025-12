import * as dotenv from 'dotenv';
dotenv.config();

if (!process.env.USER_ADDRESS) {
    throw new Error('USER_ADDRESS is not defined');
}
if (!process.env.PROXY_WALLET) {
    throw new Error('PROXY_WALLET is not defined');
}
if (!process.env.PRIVATE_KEY) {
    throw new Error('PRIVATE_KEY is not defined');
}

// Validate private key format
const validatePrivateKey = (privateKey: string): void => {
    // Remove 0x prefix if present
    const key = privateKey.startsWith('0x') ? privateKey.slice(2) : privateKey;
    
    // Check length (should be 64 hex characters)
    if (key.length !== 64) {
        throw new Error(
            `PRIVATE_KEY must be exactly 64 hex characters (without 0x prefix). Current length: ${key.length}. ` +
            `Please check your .env file and ensure PRIVATE_KEY is a valid 64-character hexadecimal string.`
        );
    }
    
    // Check if it's valid hexadecimal (only 0-9, a-f, A-F)
    const hexRegex = /^[0-9a-fA-F]+$/;
    if (!hexRegex.test(key)) {
        throw new Error(
            `PRIVATE_KEY contains invalid hexadecimal characters. ` +
            `Private key must only contain characters 0-9 and a-f (or A-F). ` +
            `Found invalid characters in: ${privateKey.substring(0, 20)}... ` +
            `Please check your .env file and ensure PRIVATE_KEY is a valid 64-character hexadecimal string (no 0x prefix).`
        );
    }
};

validatePrivateKey(process.env.PRIVATE_KEY);
if (!process.env.CLOB_HTTP_URL) {
    throw new Error('CLOB_HTTP_URL is not defined');
}
if (!process.env.CLOB_WS_URL) {
    throw new Error('CLOB_WS_URL is not defined');
}
if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not defined');
}
if (!process.env.RPC_URL) {
    throw new Error('RPC_URL is not defined');
}
if (!process.env.USDC_CONTRACT_ADDRESS) {
    throw new Error('USDC_CONTRACT_ADDRESS is not defined');
}

export const ENV = {
    USER_ADDRESS: process.env.USER_ADDRESS as string,
    PROXY_WALLET: process.env.PROXY_WALLET as string,
    PRIVATE_KEY: process.env.PRIVATE_KEY as string,
    CLOB_HTTP_URL: process.env.CLOB_HTTP_URL as string,
    CLOB_WS_URL: process.env.CLOB_WS_URL as string,
    FETCH_INTERVAL: parseInt(process.env.FETCH_INTERVAL || '1', 10),
    TOO_OLD_TIMESTAMP: parseInt(process.env.TOO_OLD_TIMESTAMP || '24', 10),
    RETRY_LIMIT: parseInt(process.env.RETRY_LIMIT || '3', 10),
    MONGO_URI: process.env.MONGO_URI as string,
    RPC_URL: process.env.RPC_URL as string,
    USDC_CONTRACT_ADDRESS: process.env.USDC_CONTRACT_ADDRESS as string,
};
