import { getCoinList, getDayCandle } from './lib/coin';
import timer from './utils/timer'
import { dbConnect, dbInit } from './utils/databases'
import { exit } from 'node:process';


const K = 0.6;


(async () => {
    const conn = dbInit();
    dbConnect(conn);


    const sql = `INSERT INTO coinAutoTrading.coinList (id, coinDate, coinMarket, volume, targetPrice, rangePer) VALUES (?, ?, ?, ?, ?, ?);`
    let params: Array<string>;

    let coinList: Array<any> = await getCoinList();
    for (const coin of coinList) {
        await timer(0.25);
        let [, coinCandle] = await getDayCandle(coin.market, 2);


        let volume = coinCandle.high_price - coinCandle.low_price;
        let rangePer = volume / coinCandle.low_price;
        let targetPrice = coinCandle.trade_price + volume * K;

        params = [
            coinCandle.candle_date_time_kst + coinCandle.market,
            coinCandle.candle_date_time_kst,
            coinCandle.market,
            volume,
            targetPrice,
            rangePer
        ]
        conn.query(sql, params, (err) => {
            if (err) console.log('query is not excuted. insert fail...\n' + err);
            else console.log(`insert ${params.join(', ')} success`);
        })
    }
    exit();
})();

