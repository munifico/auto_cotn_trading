import { Connection, Query } from "mysql2";

export async function getTodayCoinList(conn: Connection, limit: number) {
    const sql = `SELECT t.*
    FROM coinAutoTrading.coinList t
    WHERE coinDate = "?-?-?T09:00:00"
    ORDER BY rangePer DESC
    LIMIT ?`

    const promisePoll = conn.promise();
    const date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate() - 1;


    const [rows, fields] = await promisePoll.query(sql, [year, month, day, limit]);
    return rows;
}

export async function insertCoinList(
    conn: Connection,
    primary_key: string,
    date: Date,
    market: string,
    volume: number,
    targetPrice: number,
    rangePer: number
) {

    const params = [
        primary_key, date, market, volume, targetPrice, rangePer
    ]
    const sql = `INSERT 
        INTO coinAutoTrading.coinList 
        (id, coinDate, coinMarket, volume, targetPrice, rangePer) VALUES 
        (?, ?, ?, ?, ?, ?);`
    conn.query(sql, params, (err) => {
        if (err) console.error('query is not excuted. insert fail...\n' + err);
        else console.log(`insert ${params.join(', ')} success`);
    })

}