import moment from 'moment';
import { Router } from 'express';

import { fetchData } from './util/fetch.js';

const router = Router();

const BinanceURL = 'https://api.binance.com/api/v3';

router.get('/getHistoricalTrades/:symbol/:from/:to', async (req, res) => {
    const { symbol, from, to } = req.params;
    if(!symbol || !from || !to) {
        res.json({
            error: 'Lack of params'
        })
    }

    const response = await fetchData(`${BinanceURL}/historicalTrades`, {
        symbol,
        limit: 10
    });

    let dateFrom;
    let dateTo;

    try {
        dateFrom = moment(from).format('L');
        dateTo = moment(to).format('L');
    } catch (error) {
        res.json('Wrong time format')
    }

    const data = response.data.map((item) => {
        const date = moment(item.time).format('L');

        if (date => dateFrom && date <= dateTo) {
            return item;
        }
    }).filter(val => val !== null);

    const prices = data.map(item => parseFloat(item.price));

    const max = Math.max(...prices);
    const min = Math.min(...prices);

    const avg = data.reduce((sum, item) => {
        return sum + Number(item.price) / data.length;
    }, 0);

    
    res.json({
        avg, max, min
    })
});

export default router;