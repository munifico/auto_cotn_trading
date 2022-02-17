import { GET_COIN_LIST, GET_DAY_CANDLE, GET_NOW_PRICE } from '../constants/ubitAPIRoute';
import upbitAPIClient from './upbitAPIClient';
import { AxiosRequestConfig } from 'axios';

export async function getCoinList() {
    try {
        const res = await upbitAPIClient.get(GET_COIN_LIST)
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export async function getDayCandle(market: string, count: number) {
    try {
        const config: AxiosRequestConfig = {
            params: {
                market,
                count,
                convertingPriceUnit : 'KRW'
            },
        };
        const res = await upbitAPIClient.get(GET_DAY_CANDLE, config);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export async function getNowPrice(coinList: string[]) {
    try {
        const config: AxiosRequestConfig = {
            params: {
                markets : coinList.join("%2C%20")
            },
        };
        const res = await upbitAPIClient.get(GET_NOW_PRICE, config);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}