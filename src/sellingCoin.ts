import { getDayCandle, getMinuteCandle, getMyAccount } from '../api/coin';


export default async function sellingCoin(coin : string){
    const dayCandle = await getMinuteCandle(coin, 10);
    const MALine = dayCandle.reduce((pre,curr) => pre += curr.trade_price , 0) / 10;
    const myAccount = await getMyAccount();

    console.log(myAccount);
    console.log(MALine);



    return coin;
}

