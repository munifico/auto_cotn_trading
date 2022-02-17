import { getDayCandle, getMinuteCandle } from '../api/coin';


export default async function sellingCoin(coin : string){
    const dayCandle = await getMinuteCandle(coin, 10)
    const MALine = dayCandle.reduce((pre,curr) => pre += curr.trade_price , 0) / 10;

    console.log(MALine);



    return coin;
}

