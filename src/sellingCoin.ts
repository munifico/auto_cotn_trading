import { dbConnect, dbInit } from '../database/databases'
import { getTodayCoinList } from '../database/coinDatabase';

interface coinType {
    id: string,
    coinDate: Date,
    coinMarket: string,
    volume: number,
    targetPrice: number
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

