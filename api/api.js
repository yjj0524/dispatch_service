import Vue from 'vue'
import http from '../utils/http';

const user = {
	// 登录
	login(data) {
		let params = {
			method: 'POST',
			url: '/login',
			data: data
		}
		return http(params);
	},
	
	// 农机驾驶员(全部获取)
	nongJiJiaShiYuans(data) {
		let params = {
			method: 'GET',
			url: '/nONGJIFramework/nongJiJiaShiYuans',
			data: data
		}
		return http(params);
	},
	
	// 农机驾驶员(分页获取)
	nongJiJiaShiYuanPage(data) {
		let params = {
			method: 'GET',
			url: '/nONGJIFramework/nongJiJiaShiYuan/page',
			data: data
		}
		return http(params);
	},
	
	// 农机准驾车型代号
	NJZJCXDH(f_id) {
		let params = {
			method: 'GET',
			url: `/nONGJIFramework/nJZJCXDH/${f_id}`,
			data: {}
		}
		return http(params);
	},
	
	// 经营主体(分页获取)
	JingYingZhuTi(data) {
		let params = {
			method: 'GET',
			url: '/nONGJIFramework/jingYingZhuTi/page',
			data: data
		}
		return http(params);
	}
}
export default user;
