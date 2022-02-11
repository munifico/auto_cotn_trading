import axios from 'axios';
import { server_url } from './api_option';


export async function getCoinList(): Array<any> {
    const options: object = {
        method: "GET",
        url: server_url + "/v1/market/all",
    };
    const res = await axios(options);
    return res.data;

}