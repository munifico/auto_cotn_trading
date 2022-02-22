import express from 'express';
import CronJob from 'cron';
import checkCoinList from './checkCoinList';
import tradingCoin from './tradingCoin';
import sellingCoin from './sellingCoin';


const app = express();

let buyCoinName: string = '';
let candidateCoinsBuy: any = [
    {
      id: '2022-02-21T09:00:00BTC-STPT',
      coinDate: '2022-02-21T00:00:00.000Z',
      coinMarket: 'BTC-STPT',
      volume: 6.799999999999998e-7,
      targetPrice: 0.000002808,
      rangePer: 0.181395
    },
    {
      id: '2022-02-21T09:00:00BTC-MLK',
      coinDate: '2022-02-21T00:00:00.000Z',
      coinMarket: 'BTC-MLK',
      volume: 0.000003099999999999997,
      targetPrice: 0.00002365,
      rangePer: 0.093861
    },
    {
      id: '2022-02-21T09:00:00KRW-STPT',
      coinDate: '2022-02-21T00:00:00.000Z',
      coinMarket: 'KRW-STPT',
      volume: 30,
      targetPrice: 127,
      rangePer: 0.0891089
    },
    {
      id: '2022-02-21T09:00:00BTC-STRK',
      coinDate: '2022-02-21T00:00:00.000Z',
      coinMarket: 'BTC-STRK',
      volume: 0.00037021,
      targetPrice: 0.001403706,
      rangePer: 0.0762996
    },
    {
      id: '2022-02-21T09:00:00BTC-LUNA',
      coinDate: '2022-02-21T00:00:00.000Z',
      coinMarket: 'BTC-LUNA',
      volume: 0.00014723999999999987,
      targetPrice: 0.001436264,
      rangePer: 0.0575219
    },
    {
      id: '2022-02-21T09:00:00BTC-DAI',
      coinDate: '2022-02-21T00:00:00.000Z',
      coinMarket: 'BTC-DAI',
      volume: 0.0000018399999999999995,
      targetPrice: 0.000028064,
      rangePer: 0.049922
    },
    {
      id: '2022-02-21T09:00:00BTC-TUSD',
      coinDate: '2022-02-21T00:00:00.000Z',
      coinMarket: 'BTC-TUSD',
      volume: 0.00000212,
      targetPrice: 0.000028212,
      rangePer: 0.0494208
    },
    {
      id: '2022-02-21T09:00:00KRW-LSK',
      coinDate: '2022-02-21T00:00:00.000Z',
      coinMarket: 'KRW-LSK',
      volume: 600,
      targetPrice: 3250,
      rangePer: 0.0491803
    },
    {
      id: '2022-02-21T09:00:00BTC-USDP',
      coinDate: '2022-02-21T00:00:00.000Z',
      coinMarket: 'BTC-USDP',
      volume: 0.000002180000000000003,
      targetPrice: 0.000027588,
      rangePer: 0.037431
    },
    {
      id: '2022-02-21T09:00:00BTC-HBD',
      coinDate: '2022-02-21T00:00:00.000Z',
      coinMarket: 'BTC-HBD',
      volume: 0.00000159,
      targetPrice: 0.000026754,
      rangePer: 0.0344828
    },
    {
      id: '2022-02-21T09:00:00KRW-STRK',
      coinDate: '2022-02-21T00:00:00.000Z',
      coinMarket: 'KRW-STRK',
      volume: 16940,
      targetPrice: 62074,
      rangePer: 0.033969
    }
  ];

let checkCoinListJob = new CronJob.CronJob('0 10 20 * * *', async () => {
    try {
        candidateCoinsBuy = await checkCoinList();
        console.log("today Coin List :", candidateCoinsBuy)
    } catch (e) {
        console.error(e)
    }
}, null, true)

let tradingSellingCoinJob = new CronJob.CronJob('* * 10-23,0-9 * * *', async () => {
    try {
        if (buyCoinName === '') {
            buyCoinName = await tradingCoin(candidateCoinsBuy);
        } else {
            buyCoinName = await sellingCoin(buyCoinName);
        }
    } catch (e) {
        console.error(e)
    }
}, null, true);

app.get('/todayCoinList', (req, res) => {
    res.send(candidateCoinsBuy);
    console.log('/todayCoinList 호출');
})

app.get('/buyCoin', (req, res) => {
    res.send(buyCoinName);
    console.log('buyCoin 호출');
})


app.listen(9999, () => console.log("승재 코인 API시작 :)"));