import { getMyAccount, getNowPrice, postSellCoin } from '../api/coin';
import { makeMALine } from '../utils/coinUtil';


export default async function sellingCoin(coin: string) {
    const MALine = await makeMALine(coin);
    const sellLine = MALine - (MALine * 0.1);
    const myAccount = await getMyAccount();
    const buyCoinInfo = myAccount.find(val => val.currency === coin);
    const lowerLimit = Number(buyCoinInfo?.avg_buy_price) - Number(buyCoinInfo?.avg_buy_price) * 0.2;


    const [{ trade_price: nowPrice }] = await getNowPrice([coin]);

    console.log();
    console.log(MALine);
    console.log(nowPrice)

    if (nowPrice < sellLine ||
        nowPrice < lowerLimit) {
            //매수 코드 작성
            if(buyCoinInfo?.balance){
                postSellCoin(coin, buyCoinInfo?.balance);
            }else{
                throw new Error('내 계좌에서 해당 코인을 찾을 수 없습니다. 빨리 확인해 주세요');
            }
            
            console.log(`[매도]${coin} 을(를) ${nowPrice}원에 매매 하였습니다.`);
    }


    return coin;
}

