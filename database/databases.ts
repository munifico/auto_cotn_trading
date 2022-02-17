import mysql from 'mysql2';
import * as dotenv from 'dotenv';
dotenv.config();

const db_info: Object = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: process.env.DATABASE_PW,
    database: 'coinAutoTrading'
}

export function dbInit() {
    return mysql.createConnection(db_info);
}

export function dbConnect(conn: mysql.Connection) {
    conn.connect((err) => {
        if (err) console.error('mysql connection error : ' + err);
        else console.log('mysql is connected successfully!');
    })

}