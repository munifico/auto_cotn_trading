import { dbConnect, dbInit } from '../utils/databases'
import { getTodayCoinList } from '../lib/coinDatabase';

interface coinType {
    id: string,
    coinDate: Date,
    coinMarket: string,
    volume: Number,
    targetPrice: Number
}

export default async function tradingCoin(){
    
    return false;
}

