/*
 *  description: 把对象转换成数组(浅转换)
 *  param {object} obj
 *  return: array{key:key,value:value}
 */
export function lowObjToArray(obj) {
	let array = [];
	Object.keys(obj).map((key) => {
		array.push({
			key: key,
			value: obj[key],
		});
	});
	return array;
}

//DataType("young"); // "string"
//DataType(20190214); // "number"
//DataType(true); // "boolean"
//DataType([], "array"); // true
//DataType({}, "array"); // false
export function DataType(tgt, type) {
	const dataType = Object.prototype.toString
		.call(tgt)
		.replace(/\[object (\w+)\]/, "$1")
		.toLowerCase();
	return type ? dataType === type : dataType;
}


export const setStorage = (key, data) => {
	uni.setStorageSync(key, data);
}

export const getStorage = (key) => {
	try {
		const value = uni.getStorageSync(key);
		if (value) {
			return value
		} else {
			return ""
		}
	} catch (e) {
		return ""
	}
}

export const removeStorage = (key) => {
	uni.removeStorageSync(key);
}

export const showToast = ({
	type,
	msg,
	mask,
}) => {
	var image = ''
	switch (type) {
		case 'error':
			image = '/static/err.png'
			break;
		case 'success':
			image = '/static/suc.png'
			break;
	}
	setTimeout(function() {
		uni.showToast({
			icon: 'none',
			title: msg,
			image: image,
			mask: (typeof mask !== "undefined") ? mask : false,
			duration: 2000
		});
	}, 500)
}

export const showLoading = (title) => {
	uni.showLoading({
		title: title ? title : '加载中'
	});
}

export const hideLoading = () => {
	uni.hideLoading()
}

export const getTime = () => {
	var date = new Date(),
		year = date.getFullYear(),
		month = date.getMonth() + 1,
		day = date.getDate(),
		hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
		minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
		second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
	month >= 1 && month <= 9 ? (month = "0" + month) : "";
	day >= 0 && day <= 9 ? (day = "0" + day) : "";
	var timer = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
	return timer;
}

export const getToday = t => {
	var today = new Date(t * 1000)
	today.setTime(today.getTime());
	var year = today.getFullYear()
	var month = (today.getMonth() + 1)
	var day = today.getDate()
	if (month < 10) {
		month = "0" + month
	}
	if (day < 10) {
		day = "0" + day
	}
	var date = year + "-" + month + "-" + day
	return date
}

export const isPhone = (num) => {
	var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
	if (!myreg.test(num)) {
		return false;
	} else {
		return true;
	}
}

export const formatTime = t => {
	t = new Date(t * 1000)
	const n = t.getFullYear(),
		o = t.getMonth() + 1,
		r = t.getDate(),
		a = t.getHours(),
		g = t.getMinutes(),
		u = t.getSeconds();
	return [n, o, r].map(e).join("-") + " " + [a, g].map(e).join(":");
}

export const getWeek = (number) => {
	var date = new Date(number * 1000);
	return date.getDay();
}

export const getDate = (number) => {
	var date = new Date(number * 1000);
	return date.getDate();
}

export const getDay = (number) => {
	var date = new Date(number * 1000);
	var month = date.getMonth() + 1;
	var day = date.getDate();
	var data = [month, day].map(e)
	return data[0] + "月" + data[1] + "日"
}
