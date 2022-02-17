import { getCoinList, getDayCandle } from '../api/coin';
import timer from '../utils/timer'
import { dbConnect, dbInit } from '../database/databases'
import { getTodayCoinList, insertCoinList } from '../database/coinDatabase';

const K = 0.6;


export default async function checkCoinList() {
    const conn = dbInit();
    dbConnect(conn);

    let coinList: Array<any> = await getCoinList();
    for (const coin of coinList) {
        await timer(0.25);
        let candles = await getDayCandle(coin.market, 2);
        if (candles.length !== 2) continue;

        let [todayCoinCandle, coinCandle] = candles;
        let volume = coinCandle.high_price - coinCandle.low_price;
        let targetPrice = todayCoinCandle.opening_price + volume * K;
        let rangePer = coinCandle.change_rate;

        insertCoinList(
            conn,
            coinCandle.candle_date_time_kst + coinCandle?.market,
            coinCandle.candle_date_time_kst,
            coinCandle.market,
            volume,
            targetPrice,
            rangePer
        )

    }
    const CoinList = await getTodayCoinList(conn, 11);
    
    conn.end();

    return CoinList;
};

