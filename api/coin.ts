import { GET_COIN_LIST, GET_DAY_CANDLE, GET_MA_LINE, GET_NOW_PRICE } from '../constants/ubitAPIRoute';
import upbitAPIClient from './upbitAPIClient';
import { AxiosRequestConfig } from 'axios';

export interface Candle {
    market: string;
    candle_date_time_utc: Date;
    candle_date_time_kst: Date;
    opening_price: number;
    high_price: number;
    low_price: number;
    trade_price: number;
    timestamp: number;
    candle_acc_trade_price: number;
    candle_acc_trade_volume: number;
    unit: number;
}

export async function getCoinList() {
    const res = await upbitAPIClient.get(GET_COIN_LIST)
    return res.data;
}

export async function getDayCandle(market: string, count: number) {
    const config: AxiosRequestConfig = {
        params: {
            market,
            count,
            convertingPriceUnit: 'KRW'
        },
    };
    const res = await upbitAPIClient.get(GET_DAY_CANDLE, config);
    return res.data;
}

export async function getNowPrice(coinList: string[]) {
    const config: AxiosRequestConfig = {
        params: {
            markets: coinList.join("%2C%20")
        },
    };
    const res = await upbitAPIClient.get(GET_NOW_PRICE, config);
    return res.data;
}

export async function getMALine(market : string, count : number) {
    const config: AxiosRequestConfig = {
        params: {
            market,
            count
        },
    };
    const res = await upbitAPIClient.get(GET_MA_LINE, config);

    res.data
        .map((candle : Candle) => candle.opening_price)
        .reduce((pre : number, curr : number) => pre + curr,0)
    return res.data;
}