import express from 'express';
import CronJob from 'cron';
import checkCoinList from './checkCoinList';
import tradingCoin from './tradingCoin';
import sellingCoin from './sellingCoin';


const app = express();

let buyCoinName: string | boolean = false;
let candidateCoinsBuy: any = [];

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
        if (buyCoinName === false) {
            buyCoinName = await tradingCoin(candidateCoinsBuy);
        } else {
            buyCoinName = await sellingCoin();
        }
    } catch (e) {
        console.error(e)
    }
}, null, true)

