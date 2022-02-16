import express from 'express';
import CronJob from 'cron';
import checkCoinList from './checkCoinList';
import tradingCoin from './tradingCoin';
import sellingCoin from './sellingCoin';


const app = express();

let buyCoinName : string | boolean = false;
let candidateCoinsBuy = [];

let checkCoinListJob = new CronJob.CronJob('* 0 23 * * *', () => {
    checkCoinList();
}, null, true)

let tradingSellingCoinJob = new CronJob.CronJob('* * 10-23,0-8 * * *', async () => {
    if(!buyCoinName){
        buyCoinName = await tradingCoin();
    }else{
        buyCoinName = await sellingCoin();
    }
    
}, null, true)

