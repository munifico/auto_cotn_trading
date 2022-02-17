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


    const [rows,fields] = await promisePoll.query(sql, [year, month, day, limit]);
    return rows;
}