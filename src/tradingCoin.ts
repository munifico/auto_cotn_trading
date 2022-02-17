import { dbConnect, dbInit } from '../database/databases'
import { getTodayCoinList } from '../database/coinDatabase';
import { getNowPrice } from '../api/coin';

interface coinType {
    id: string,
    coinDate: Date,
    coinMarket: string,
    volume: Number,
    targetPrice: Number
}

export default async function tradingCoin(coinList : coinType[]){
    const coinName = coinList.map(coin => coin.coinMarket);
    const {trade_price : nowPrices} = await getNowPrice(coinName);
    const buyCoin = false;

    coinList.forEach((coin : coinType, index : Number) => {
        if(nowPrices >= coin.targetPrice){
            //매수코드
            console.log(coin.coinMarket, ':' ,nowPrices , ' buy $.$')
            return buyCoin;
        }

    })
    return false;
}

