import { Connection, Query } from "mysql2";

export async function getTodayCoinList(conn: Connection, limit: number) {
    const sql = `SELECT t.*
    FROM coinAutoTrading.coinList t WHERE coinMarket LIKE 'KRW-%'
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
    openingPrice: number
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

export function updateTargetPrice(
    conn: Connection,
    id: string,
    targetPrice: number
) {
    const params = [
        targetPrice, id
    ]
    const sql = `UPDATE coinAutoTrading.coinList t SET t.targetPrice = ? WHERE t.id = ?;`
    conn.query(sql, params, (err) => {
        if (err) console.error('[updateTargetPrice] err\n' + err);
        else console.log('[updateTargetPrice] update')
    })
}

export function insertTradingList(
    conn: Connection,
    id : string,
    buyDate : string,
    market : string,
    buyPrice : number
){

    const params = [
        id, buyDate, market, buyPrice
    ];
    const sql = `INSERT INTO 
        coinAutoTrading.tradingList (c_id, buyDate, market, buyPrice) 
        VALUES (? ,?, ?, ?)`;
    conn.query(sql,params, (err) => {
        if (err) console.error('[insertTradingList] err\n' + err);
        else console.log('[insertTradingList] update')
    })
}

export function updateTradingList(
    conn: Connection,
    id : string,
    sellDate : string,
    sellPrice : number
){

    const params = [
        sellDate, sellPrice
    ];
    const sql = `UPDATE coinAutoTrading.tradingList t 
                 SET t.sellDate = ? , t.sellPrice = ? 
                 WHERE c_id LIKE '%${id}' AND sellPrice IS NULL`;
    conn.query(sql,params, (err) => {
        if (err) console.error('[updateTradingList] err\n' + err);
        else console.log('[updateTradingList] update')
    })
}

export async function getNowBuyCoin(
    conn: Connection
){
    const sql = `SELECT * from coinAutoTrading.tradingList t WHERE sellPrice is NULL`
    const promisePoll = conn.promise();


    const [rows, fields] = await promisePoll.query(sql);
    return rows;
}