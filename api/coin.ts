import { makePostToken, makeToken } from './../constants/upbitAPIOption';
import { POST_OERDER_COIN, GET_COIN_LIST, GET_DAY_CANDLE, GET_MINUTE_CANDLE, GET_MY_ACCOUNT, GET_NOW_PRICE } from '../constants/ubitAPIRoute';
import upbitAPIClient from './upbitAPIClient';
import { AxiosRequestConfig } from 'axios';
import { NowPrice, MarketInfo, AccountInfo, MinuteCandle, DayCandle } from '../types/upbitResposeType';


export async function getCoinList(): Promise<MarketInfo[]> {
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

export async function getNowPrice(coinList: string[]): Promise<NowPrice[]> {
    const config: AxiosRequestConfig = {
        params: {
            markets: coinList.join(",")
        },
    };
    const res = await upbitAPIClient.get(GET_NOW_PRICE, config);
    return res.data;
}

export async function getMinuteCandle(market: string, count: number): Promise<MinuteCandle[]> {
    const config: AxiosRequestConfig = {
        params: {
            market,
            count,
        },
    };
    const res = await upbitAPIClient.get(GET_MINUTE_CANDLE, config);

    return res.data;
}

export async function getMyAccount(): Promise<AccountInfo[]> {
    const config = {
        headers: { Authorization: `Bearer ${makeToken()}` },
    }

    const res = await upbitAPIClient.get(GET_MY_ACCOUNT, config);
    return res.data
}

export async function postBuyCoin(market: string, price: string) {
    const data = {
        market,
        side: 'bid',
        price,
        ord_type: 'price',
    }
    const config: AxiosRequestConfig = {
        headers: { Authorization: `Bearer ${makePostToken(data)}` },
    }
    const res = await upbitAPIClient.post(POST_OERDER_COIN, data, config);
    return res.data
}

export async function postSellCoin(market: string, volume: string | undefined) {
    const data = {
        market,
        side: 'ask',
        volume,
        ord_type: 'market',
    }
    const config: AxiosRequestConfig = {
        headers: { Authorization: `Bearer ${makePostToken(data)}` },
    }
    const res = await upbitAPIClient.post(POST_OERDER_COIN, data, config);
    return res.data
}