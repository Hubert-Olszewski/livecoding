import express from 'express';
import { config } from 'dotenv';

import routes from './src/routes.js';

config();

const PORT = process.env.PORT || '3000';

const app = express();
app.use(express.json());

app.use('/api', routes);

app.use('/', (req, res) => {
    res.send('Hello');
});

app.listen(PORT, () => {
    console.log(`Server listen http://localhost:${PORT}`);
});