import { getNowPrice } from '../api/coin';

interface coinType {
    id: string,
    coinDate: Date,
    coinMarket: string,
    volume: number,
    targetPrice: number
}

export default async function tradingCoin(coinList : coinType[]){
    const coinName = coinList.map(coin => coin.coinMarket);
    const {trade_price : nowPrices} = await getNowPrice(coinName);
    let buyCoin : boolean | string = false;

    coinList.forEach((coin : coinType, index : number) => {
        if(nowPrices >= coin.targetPrice){
            //매수코드
            console.log(coin.coinMarket, ':' ,nowPrices , ' buy $.$')
            buyCoin = coin.coinMarket;
            return buyCoin;
        }

    })
    return false;
}

