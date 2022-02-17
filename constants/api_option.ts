import { v4 } from 'uuid'
const sign = require('jsonwebtoken').sign
import * as dotenv from 'dotenv';
dotenv.config();

export const server_url: string | undefined = process.env.UPBIT_OPEN_API_SERVER_URL
export const access_key: string | undefined = process.env.UPBIT_ACCESS_KEY
export const secret_key: string | undefined = process.env.UPBIT_SECRET_KEY



export const payload: object = {
    access_key: access_key,
    nonce: v4(),
}

export const token: string = sign(payload, secret_key)
