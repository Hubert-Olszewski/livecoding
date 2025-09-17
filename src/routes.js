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
        symbol
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
    }).filter(val => !!val);

    res.json({
        data
    })
});

export default router;