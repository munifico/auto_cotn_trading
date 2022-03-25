import { Connection } from 'mysql2';
import { TodayCoinList } from './../types/dbResposeType';
import { getNowPrice, postBuyCoin } from '../api/coin';
import { getNowKRW, makeMALine } from '../utils/coinUtil';
import { slackSend } from '../api/slack';
import { insertTradingList } from '../database/coinDatabase';


export default async function tradingCoin(conn : Connection,coinList: TodayCoinList[]) {
    if (coinList.length === 0) throw new Error('CoinList is not update!');
    const coinName = coinList.map(coin => coin.coinMarket);
    const nowPrice = await getNowPrice(coinName);

    let buyCoin: string = '';

    for (let [index, coin] of coinList.entries()) {
        if (nowPrice[index].trade_price >= coin.targetPrice &&
            nowPrice[index].trade_price <= coin.targetPrice + coin.targetPrice * 0.02) {
            const MALine = await makeMALine(coin.coinMarket);
            if (MALine < nowPrice[index].trade_price) {
                const nowBalance = await getNowKRW();
                const resData = await postBuyCoin(coin.coinMarket, '10000');
                console.log(resData);
                console.log(`[매수]${coin.coinMarket} 을(를) ${nowPrice[index].trade_price}원에 매수 하였습니다.`);
                insertTradingList(
                    conn, 
                    coin.id ,
                    resData.created_at.split('+')[0] , 
                    resData.market, 
                    nowPrice[index].trade_price,
                    nowBalance
                );
                slackSend(`[매수]${coin.coinMarket} 을(를) ${nowPrice[index].trade_price}원에 매수 하였습니다.`);
                

                buyCoin = coin.coinMarket;
                return buyCoin;
            }
        }
    }
    return '';
}

