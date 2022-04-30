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
}
export default user;
