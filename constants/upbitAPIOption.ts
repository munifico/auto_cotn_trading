import { v4 } from 'uuid'
import { sign } from 'jsonwebtoken'
import * as dotenv from 'dotenv';
dotenv.config();

export const server_url: string | undefined = process.env.UPBIT_OPEN_API_SERVER_URL
const access_key: string | undefined = process.env.UPBIT_ACCESS_KEY
const secret_key: string | undefined = process.env.UPBIT_SECRET_KEY


export function makeToken() {
    const payload: object = {
        access_key,
        nonce: v4(),
    }
    const token: string = sign(payload, secret_key as string)

    return token
}