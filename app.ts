import { getCoinList, getDayCandle } from './lib/coin';

var timer = function (time : number) {
	return new Promise(function (resolve, reject) {
		setTimeout(function () {
            resolve(`${time} sleep!`);
		}, time * 1000);
	});
};


async function main() {
    let coinList : Array<any> = await getCoinList();
    for(const coin of coinList){
        await timer(1);
        let [,coinCandle] = await getDayCandle(coin.market, 2);
        console.log(`
            코인 이름 : ${coinCandle.market}
            코인 날짜 : ${coinCandle.candle_date_time_kst}
            전날 시가 : ${coinCandle.opening_price}
            전날 저가 : ${coinCandle.low_price}
            전날 고가 : ${coinCandle.high_price}
            전날 종가 : ${coinCandle.trade_price}
            종가 - 시가 : ${coinCandle.trade_price - coinCandle.opening_price}
            ******************************
            
        `);
    }
}

main();