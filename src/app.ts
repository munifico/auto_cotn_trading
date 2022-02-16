import express from 'express';
import CronJob from 'cron';
import checkCoinList from '../lib/checkCoinList';
import tradingCoin from '../lib/tradingCoin';


const app = express();

let checkCoinListJob = new CronJob.CronJob('* 0 9 * * *', () => {
    checkCoinList();
}, null, true)

let tradingCoinJob = new CronJob.CronJob('* * 9-23,0-8 * * *', () => {
    console.log("testing!")
}, null, true)

