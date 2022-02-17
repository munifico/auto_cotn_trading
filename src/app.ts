import express from 'express';
import CronJob from 'cron';
import checkCoinList from './checkCoinList';
import tradingCoin from './tradingCoin';
import sellingCoin from './sellingCoin';


const app = express();

let buyCoinName: string = '';
let candidateCoinsBuy: any = [
    {
      id: '2022-02-16T09:00:00USDT-ZRX',
      coinDate: '2022-02-16T00:00:00.000Z',
      coinMarket: 'USDT-ZRX',
      volume: 0.07291506000000003,
      targetPrice: 0.197974066,
      rangePer: 0.144958
    },
    {
      id: '2022-02-16T09:00:00KRW-NEO',
      coinDate: '2022-02-16T00:00:00.000Z',
      coinMarket: 'KRW-NEO',
      volume: 4520,
      targetPrice: 33982,
      rangePer: 0.142962
    },
    {
      id: '2022-02-16T09:00:00BTC-RLY',
      coinDate: '2022-02-16T00:00:00.000Z',
      coinMarket: 'BTC-RLY',
      volume: 0.000004920000000000001,
      targetPrice: 0.000011262000000000002,
      rangePer: 0.0941176
    },
    {
      id: '2022-02-16T09:00:00BTC-RNDR',
      coinDate: '2022-02-16T00:00:00.000Z',
      coinMarket: 'BTC-RNDR',
      volume: 0.000010189999999999996,
      targetPrice: 0.000078464,
      rangePer: 0.092006
    },
    {
      id: '2022-02-16T09:00:00BTC-KAVA',
      coinDate: '2022-02-16T00:00:00.000Z',
      coinMarket: 'BTC-KAVA',
      volume: 0.000004830000000000006,
      targetPrice: 0.000085568,
      rangePer: 0.0720592
    },
    {
      id: '2022-02-16T09:00:00BTC-GO',
      coinDate: '2022-02-16T00:00:00.000Z',
      coinMarket: 'BTC-GO',
      volume: 4.000000000000004e-8,
      targetPrice: 6.44e-7,
      rangePer: 0.0677966
    },
    {
      id: '2022-02-16T09:00:00BTC-CTC',
      coinDate: '2022-02-16T00:00:00.000Z',
      coinMarket: 'BTC-CTC',
      volume: 0.000007359999999999997,
      targetPrice: 0.000038986,
      rangePer: 0.0630188
    },
    {
      id: '2022-02-16T09:00:00BTC-ZRX',
      coinDate: '2022-02-16T00:00:00.000Z',
      coinMarket: 'BTC-ZRX',
      volume: 9.79999999999999e-7,
      targetPrice: 0.000015967999999999997,
      rangePer: 0.0628887
    },
    {
      id: '2022-02-16T09:00:00BTC-AVAX',
      coinDate: '2022-02-16T00:00:00.000Z',
      coinMarket: 'BTC-AVAX',
      volume: 0.00011202999999999994,
      targetPrice: 0.002250458,
      rangePer: 0.0613869
    },
    {
      id: '2022-02-16T09:00:00KRW-ZRX',
      coinDate: '2022-02-16T00:00:00.000Z',
      coinMarket: 'KRW-ZRX',
      volume: 82,
      targetPrice: 875.2,
      rangePer: 0.056701
    },
    {
      id: '2022-02-16T09:00:00KRW-KNC',
      coinDate: '2022-02-16T00:00:00.000Z',
      coinMarket: 'KRW-KNC',
      volume: 295,
      targetPrice: 2942,
      rangePer: 0.0552381
    }
  ];

let checkCoinListJob = new CronJob.CronJob('50 24 22 * * *', async () => {
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
}, null, true)

