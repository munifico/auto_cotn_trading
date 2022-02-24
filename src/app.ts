import { TodayCoinList } from './../types/dbResposeType';
import express from 'express';
import CronJob from 'cron';
import checkCoinList from './checkCoinList';
import tradingCoin from './tradingCoin';
import sellingCoin from './sellingCoin';
import { getMyAccount, getNowPrice, postBuyCoin, postSellCoin } from '../api/coin';


const app = express();

let buyCoinName: string = '';
let candidateCoinsBuy: any = [];

let checkCoinListJob = new CronJob.CronJob('0 0 9 * * *', async () => {
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
});

app.get('/coinList/:market', async (req, res) => {
    try {
        const market = req.params.market;
        const coinInfo = candidateCoinsBuy.find((coin: TodayCoinList) => coin.coinMarket === market);

        const [nowPrice] = await getNowPrice([market]);
        
        const moneyRise = coinInfo.targetPrice - nowPrice.trade_price;
        const perRise = moneyRise / nowPrice.trade_price * 100;
        res.send({
            coinInfo,
            moneyRise,
            perRise
        })
    } catch (error) {
        console.log(error);
        res.send(error);
    }
})


app.listen(9999, () => console.log("승재 코인 API시작 :)"));