import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import uView from '@/components/uview-ui'
import md5 from 'js-md5'

Vue.prototype.$md5 = md5
Vue.prototype.$utils = require("@/utils/common.js")
Vue.use(uView)

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
