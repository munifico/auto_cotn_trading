import axios from 'axios';
import { server_url } from '../constants/api_option';


export async function getCoinList() {
    try {
        const options: object = {
            method: "GET",
            url: server_url + "/v1/market/all",
        };
        const res = await axios(options);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export async function getDayCandle(market: string, count: number) {
    try {
        const options: object = {
            method: 'GET',
            headers: { Accept: 'application/json' },
            url: server_url + `/v1/candles/days/?market=${market}&count=${count}&convertingPriceUnit=KRW`
        };
        const res = await axios(options);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export async function getNowPrice(coinList: string[]) {
    try {
        const options: object = {
            method: 'GET',
            headers: { Accept: 'application/json' },
            url: server_url + `/v1/ticker?markets=${coinList.join("%2C%20")}`
        };
        const res = await axios(options);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}