import { getCoinList, getDayCandle } from './lib/coin';
import timer from './utils/timer'
import { dbConnect, dbInit } from './utils/databases'


async function main() {
    const conn = dbInit();
    dbConnect(conn);


    const sql = `INSERT INTO coinAutoTrading.coinList (id, coinDate, coinMarket, k) VALUES (?, ?, ?, ?);`
    let params : Array<string>;

    let coinList: Array<any> = await getCoinList();
    for (const coin of coinList) {
        await timer(0.3);
        let [, coinCandle] = await getDayCandle(coin.market, 2);

        params = [
            coinCandle.candle_date_time_kst + coinCandle.market,
            coinCandle.candle_date_time_kst,
            coinCandle.market,
            coinCandle.trade_price - coinCandle.opening_price
        ]

        conn.query(sql, params, (err) => {
            if(err) console.log('query is not excuted. insert fail...\n' + err);
            else console.log(`insert ${params.join(', ')} success`);
        })

    }
}

main();