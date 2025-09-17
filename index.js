import express from 'express';
import mongoose from 'mongoose';
import { config } from 'dotenv';

config();

const PORT = process.env.PORT || '3000';
const MONGO_URL = process.env.MONGO_URL;

const app = express();
app.use(express.json());

app.use('/', (req, res) => {
    res.send('Hello');
});

const start = async function start() {
    try {
        await mongoose.connect(MONGO_URL);
        console.log('Database connected');
    } catch (error) {
        console.log('Error:', error);
        process.exit(1);
    }

    app.listen(PORT, () => {
        console.log(`Server listen http://localhost:${PORT}`);
    });
}

start();