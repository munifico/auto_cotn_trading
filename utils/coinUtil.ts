import { getMinuteCandle } from "../api/coin";

export async function makeMALine(market : string) {
    const dayCandle = await getMinuteCandle(market, 15);
    const MALine = dayCandle.reduce((pre, curr) => pre += curr.trade_price, 0) / 10;

    return MALine
}