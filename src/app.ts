import { TodayCoinList } from './../types/dbResposeType';
import express from 'express';
import CronJob from 'cron';
import checkCoinList from './checkCoinList';
import tradingCoin from './tradingCoin';
import sellingCoin from './sellingCoin';
import { getNowPrice } from '../api/coin';
import { slackSend } from '../api/slack';
import { dbConnect, dbInit } from '../database/databases';
import { getTodayCoinList } from '../database/coinDatabase';
import { RowDataPacket } from 'mysql2';



const app = express();
const conn = dbInit();
dbConnect(conn)

let buyCoinName: string = '';

let checkCoinListJob = new CronJob.CronJob('0 0 9 * * *', async () => {
    try {
        await checkCoinList(conn);
    } catch (e) {
        console.error(e)
    }
}, null, true)

let tradingSellingCoinJob = new CronJob.CronJob('* * 10-23,0-9 * * *', async () => {
    try {
        const candidateCoinsBuy = await getTodayCoinList(conn, 11)
        if (buyCoinName === '') {
            buyCoinName = await tradingCoin(candidateCoinsBuy as TodayCoinList[]);
        } else {
            buyCoinName = await sellingCoin(buyCoinName);
        }
    } catch (e) {
        console.error(e)
    }
}, null, true);

app.get('/todayCoinList', async (req, res) => {
    const candidateCoinsBuy = await getTodayCoinList(conn, 11)
    res.send(candidateCoinsBuy);
    console.log('/todayCoinList 호출');
})

app.get('/buyCoin', (req, res) => {
    res.send(buyCoinName);
    console.log('buyCoin 호출');
});

app.get('/coinList/:market', async (req, res) => {
    try {
        const candidateCoinsBuy = await getTodayCoinList(conn, 11);
        const market = req.params.market;
        const coinInfo = (candidateCoinsBuy as TodayCoinList[]).find((coin: TodayCoinList) => coin.coinMarket === market);

        const [nowPrice] = await getNowPrice([market]);

        if(coinInfo?.targetPrice){
            res.send("오늘의 코인에는 포함되지 않는 코인입니다");
            return;
        }

        const moneyRise = (coinInfo as TodayCoinList)?.targetPrice - nowPrice.trade_price;
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