import { getMyAccount } from '../api/coin';
import { makeMALine } from '../utils/coinUtil';


export default async function sellingCoin(coin : string){
    const MALine = await makeMALine(coin)
    const myAccount = await getMyAccount();

    console.log(myAccount);
    console.log(MALine);



    return coin;
}

