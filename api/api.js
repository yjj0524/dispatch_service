import Vue from 'vue'
import http from '../utils/http';

const user = {
	// 登录
	Login(data) {
		let params = {
			method: 'POST',
			url: '/login',
			data: data
		}
		return http(params);
	},
	
	// 镇村
	TownVillage(pid) {
		let params = {
			method: 'GET',
			url: `/data/areas/${pid}`,
			data: {}
		}
		return http(params);
	},

	// 农机驾驶员(分页获取)
	NongJiJiaShiYuanPage(data) {
		let params = {
			method: 'GET',
			url: '/nONGJIFramework/nongJiJiaShiYuan/page',
			data: data
		}
		return http(params);
	},

	// 农机驾驶员(更新)
	NongJiJiaShiYuan(f_id, data) {
		let params = {
			method: 'PUT',
			url: `/nONGJIFramework/nongJiJiaShiYuan/${f_id}`,
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
	},

	// 农机机器
	NongJiJiQi(data) {
		let params = {
			method: 'GET',
			url: '/nONGJIFramework/nongJiJiQi/page',
			data: data
		}
		return http(params);
	},
	
	// 提交预约
	ReservationService(data) {
		let params = {
			method: 'POST',
			url: '/nONGJIFramework/reservationService',
			data: data
		}
		return http(params);
	},
	
	// 预约服务列表
	ServicePageList(data) {
		let params = {
			method: 'GET',
			url: '/nONGJIFramework/GetServicePageList',
			data: data
		}
		return http(params);
	},
	
	// 提交调度
	DspatchService(f_id, data) {
		let params = {
			method: 'PUT',
			url: `/nONGJIFramework/reservationService/${f_id}`,
			data: data
		}
		return http(params);
	},
	
	// 操作时间
	WorkTime(data) {
		let params = {
			method: 'GET',
			url: '/nONGJIFramework/nJZYLXYSBZs/gettimes',
			data: data
		}
		return http(params);
	},
}
export default user;
