import { getNowPrice } from '../api/coin';

interface coinType {
    id: string,
    coinDate: Date,
    coinMarket: string,
    volume: number,
    targetPrice: number
}

export default async function tradingCoin(coinList: coinType[]) {
    const coinName = coinList.map(coin => coin.coinMarket);
    const nowPrice = await getNowPrice(coinName);
    let buyCoin: boolean | string = false;

    coinList.forEach((coin: coinType, index: number) => {
        if (nowPrice[index].opening_price >= coin.targetPrice) {
            //매수코드
            console.log(coin.coinMarket, ':', nowPrice[index].opening_price, ' buy $.$')
            buyCoin = coin.coinMarket;
            return buyCoin;
        }

    })
    return false;
}

