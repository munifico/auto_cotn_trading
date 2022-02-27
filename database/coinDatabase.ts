import { Connection, Query } from "mysql2";

export async function getTodayCoinList(conn: Connection, limit: number) {
    const sql = `SELECT t.*
    FROM coinAutoTrading.coinList t
    ORDER BY coinDate DESC, rangePer DESC
    LIMIT ?`

    const promisePoll = conn.promise();
    const date = new Date();


    const [rows, fields] = await promisePoll.query(sql, [limit]);
    return rows;
}


export async function insertCoinList(
    conn: Connection,
    id: string,
    coinDate: Date,
    coinMarket: string,
    volume: number,
    targetPrice: number,
    rangePer: number,
    openingPrice : number
) {

    const params = [
        id, coinDate, coinMarket, volume, targetPrice, rangePer, openingPrice
    ]
    const sql = `INSERT 
        INTO coinAutoTrading.coinList 
        (id, coinDate, coinMarket, volume, targetPrice, rangePer, openingPrice) VALUES 
        (?, ?, ?, ?, ?, ?, ?);`
    conn.query(sql, params, (err) => {
        if (err) console.error('[insertCoinList] err\n' + err);
        else console.log('[insertCoinList] insert')
    })
}