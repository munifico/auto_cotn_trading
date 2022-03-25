import { getMinuteCandle, getMyAccount } from "../api/coin";
import { AccountInfo } from "../types/upbitResposeType";

export async function makeMALine(market : string) {
    const dayCandle = await getMinuteCandle(market, 15);
    const MALine = dayCandle.reduce((pre, curr) => pre += curr.trade_price, 0) / 15;

    return MALine
}

export async function getNowKRW() {
    const myAccount = await getMyAccount();
    const nowKRW = myAccount.find(val => val.currency === "KRW");

    return +(nowKRW as AccountInfo).balance;
}