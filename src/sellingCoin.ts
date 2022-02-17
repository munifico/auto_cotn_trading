import { dbConnect, dbInit } from '../database/databases'
import { getTodayCoinList } from '../database/coinDatabase';

interface coinType {
    id: string,
    coinDate: Date,
    coinMarket: string,
    volume: number,
    targetPrice: number
}

export default async function sellingCoin(){
    console.log("selling")

    return true;
}

