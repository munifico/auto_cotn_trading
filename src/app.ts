import { TODAY_COIN_LENGTH } from './../constants/coinConstants';
import { TodayCoinList } from './../types/dbResposeType';
import express from 'express';
import CronJob from 'cron';
import checkCoinList from './checkCoinList';
import tradingCoin from './tradingCoin';
import sellingCoin from './sellingCoin';
import { getNowPrice, postBuyCoin } from '../api/coin';
import { slackSend } from '../api/slack';
import { dbConnect, dbInit } from '../database/databases';
import { getNowBuyCoin, getTodayCoinList, insertTradingList, updateTargetPrice, updateTradingList } from '../database/coinDatabase';
import { RowDataPacket } from 'mysql2';



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const conn = dbInit();
dbConnect(conn)

let checkCoinListJob = new CronJob.CronJob('0 0 9 * * *', async () => {
    try {
        await checkCoinList(conn);
    } catch (e) {
        console.error(e)
        slackSend(`[checkCoinListJob] ${e}`);
    }
}, null, true)



let tradingSellingCoinJob = new CronJob.CronJob('* * 10-23,0-9 * * *', async () => {
    try {
        const candidateCoinsBuy = await getTodayCoinList(conn, TODAY_COIN_LENGTH);
        let buyCoin = await getNowBuyCoin(conn) as RowDataPacket[];
        if (buyCoin.length === 0) {
            tradingCoin(conn, candidateCoinsBuy as TodayCoinList[]);
        } else {
            buyCoin.forEach(coin => {
                sellingCoin(conn, coin.market);
            })
        }
    } catch (e) {
        console.error(e)
        slackSend(`[tradingSellingCoinJob] ${e}`);
    }
}, null, true);


app.get('/todayCoinList', async (req, res) => {
    const candidateCoinsBuy = await getTodayCoinList(conn, TODAY_COIN_LENGTH)
    res.send(candidateCoinsBuy);
    console.log('/todayCoinList 호출');
})

app.get('/buyCoin', async (req, res) => {
    let buyCoin = await getNowBuyCoin(conn) as RowDataPacket[];
    if(buyCoin.length === 0){
        res.send("구매한 코인 없습니다.");
    }else{
        res.send(buyCoin.map(coin => coin.market).join(', '));
    }
});

app.get('/coinState', async (req, res) => {
    try {
        const candidateCoinsBuy = await getTodayCoinList(conn, TODAY_COIN_LENGTH);
        const market = req.query.market;


        const coinInfo = (candidateCoinsBuy as TodayCoinList[]).find((coin: TodayCoinList) => coin.coinMarket === market);

        const [nowPrice] = await getNowPrice([market as string]);

        console.log(coinInfo);

        if (!coinInfo?.targetPrice) {
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


app.patch('/ResettingK', async (res, req) => {
    const { k } = res.body;
    const candidateCoinsBuy = await getTodayCoinList(conn, TODAY_COIN_LENGTH);
    (candidateCoinsBuy as TodayCoinList[]).forEach(coin => {
        const targetPrice = coin.openingPrice + coin.volume * k;
        updateTargetPrice(conn, coin.id, targetPrice);
    })
    req.send('k값 설정 완료하였습니다.');
    slackSend(`K값 변경 ${k}`)
})

app.listen(9999, () => console.log("승재 코인 API시작 :)"));