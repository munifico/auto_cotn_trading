import { getMinuteCandle, getNowPrice } from '../api/coin';
import { makeMALine } from '../utils/coinUtil';

interface coinType {
    id: string,
    coinDate: Date,
    coinMarket: string,
    volume: number,
    targetPrice: number
}

export default async function tradingCoin(coinList: coinType[]) {
    if (coinList.length === 0) throw new Error('CoinList is not update!');
    const coinName = coinList.map(coin => coin.coinMarket);
    const nowPrice = await getNowPrice(coinName);

    let buyCoin: string = '';

    for (let [index, coin] of coinList.entries()) {
        if (nowPrice[index].opening_price >= coin.targetPrice &&
            await makeMALine(coin.coinMarket) < nowPrice[index].opening_price) {
            console.log(coin.coinMarket, ':', nowPrice[index].opening_price, ' buy $.$')
            buyCoin = coin.coinMarket;
            return buyCoin;
        }
    }
    console.log('notbuy')
    return '';
}

