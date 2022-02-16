import { dbConnect, dbInit } from '../utils/databases'
import { getTodayCoinList } from '../lib/coinDatabase';

interface coinType {
    id: string,
    coinDate: Date,
    coinMarket: string,
    volume: Number,
    targetPrice: Number
}

export default async function sellingCoin(){
    const conn = dbInit();
    dbConnect(conn);

    const CoinList: any = await getTodayCoinList(conn, 11);

    const coinNameList = CoinList.map((coin: coinType) => coin.coinMarket);



    console.log(coinNameList);

    conn.end();

    return false;
}

