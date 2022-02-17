import { NowPrice, MarketInfo } from './../types/upbitResposeType';
import { GET_COIN_LIST, GET_DAY_CANDLE, GET_MINUTE_CANDLE, GET_NOW_PRICE } from '../constants/ubitAPIRoute';
import upbitAPIClient from './upbitAPIClient';
import { AxiosRequestConfig } from 'axios';
import { MinuteCandle, DayCandle } from '../types/upbitResposeType';


export async function getCoinList(): Promise<MarketInfo> {
    const res = await upbitAPIClient.get(GET_COIN_LIST)
    return res.data;
}

export async function getDayCandle(market: string, count: number): Promise<DayCandle[]> {
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

export async function getNowPrice(coinList: string[]): Promise<NowPrice> {
    const config: AxiosRequestConfig = {
        params: {
            markets: coinList.join("%2C%20")
        },
    };
    const res = await upbitAPIClient.get(GET_NOW_PRICE, config);
    return res.data;
}

export async function getMinuteCandle(market: string, count: number): Promise<MinuteCandle[]> {
    const config: AxiosRequestConfig = {
        params: {
            market,
            count
        },
    };
    const res = await upbitAPIClient.get(GET_MINUTE_CANDLE, config);

    // const MALine = res.data
    //     .map((candle : Candle) => candle.opening_price)
    //     .reduce((pre : number, curr : number) => pre + curr,0) / count
    return res.data;
}