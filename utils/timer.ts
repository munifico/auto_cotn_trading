const timer = function (time : number) {
	return new Promise(function (resolve, reject) {
		setTimeout(function () {
            resolve(`${time} sleep!`);
		}, time * 1000);
	});
};



export default timer;