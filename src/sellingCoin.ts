import { kMaxLength } from 'buffer';
import { Connection } from 'mysql2';
import { getMyAccount, getNowPrice, postSellCoin } from '../api/coin';
import { slackSend } from '../api/slack';
import { updateTradingList } from '../database/coinDatabase';
import { makeMALine } from '../utils/coinUtil';


export default async function sellingCoin(conn : Connection,coin: string) {
    const MALine = await makeMALine(coin);
    const sellLine = MALine - (MALine * 0.01);
    const myAccount = await getMyAccount();
    const buyCoinInfo = myAccount.find(val => val.currency === coin.split('-')[1]);
    const lowerLimit = Number(buyCoinInfo?.avg_buy_price) - Number(buyCoinInfo?.avg_buy_price) * 0.01;
    const upperLimit = Number(buyCoinInfo?.avg_buy_price) + Number(buyCoinInfo?.avg_buy_price) * 0.03;

    
    const [{ trade_price: nowPrice }] = await getNowPrice([coin]);

    if (nowPrice < sellLine ||
        nowPrice < lowerLimit ||
        nowPrice > upperLimit) {
            //매수 코드 작성
            if(buyCoinInfo?.balance){
                const [,coinName] = coin.split('-');
                console.log(coinName, buyCoinInfo?.balance);
                const res = await postSellCoin(coin, buyCoinInfo?.balance);
                updateTradingList(conn, coin , res.created_at.split("+")[0], nowPrice);
            }else{
                throw new Error('내 계좌에서 해당 코인을 찾을 수 없습니다. 빨리 확인해 주세요');
            }
            
            slackSend(`[매도]${coin} 을(를) ${nowPrice}에 매매 하였습니다.`);
            console.log(`[매도]${coin} 을(를) ${nowPrice}에 매매 하였습니다.`);
    }


    return coin;
}

