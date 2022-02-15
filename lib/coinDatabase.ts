import { Connection, Query } from "mysql2";

export async function getTodayCoinList(conn: Connection, limit: number) {
    const sql = `SELECT t.*
    FROM coinAutoTrading.coinList t
    WHERE coinDate = "2022-02-14T09:00:00"
    ORDER BY rangePer DESC
    LIMIT ?`

    const promisePoll = conn.promise();

    const [rows,fields] = await promisePoll.query(sql, [limit]);
    return rows;
}