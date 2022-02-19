import { getMyAccount, getNowPrice } from '../api/coin';
import { makeMALine } from '../utils/coinUtil';


export default async function sellingCoin(coin: string) {
    const MALine = await makeMALine(coin);
    const sellLine = MALine - (MALine * 0.1);
    const myAccount = await getMyAccount();
    const [{opening_price : nowPrice}] = await getNowPrice([coin]);

    console.log(myAccount.find(val => val.currency === 'XRP'));
    console.log(MALine);
    console.log(nowPrice)

    // if()



    return coin;
}

