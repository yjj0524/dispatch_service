<template>
	<view class="booking_arrange_container">
		<Navbar title="农机预约安排" icon_color="#ffffff" title_color="#ffffff" border_bottom_color="transparent" />
		<view class="information_container">
			<view class="information">
				<image class="portrait" src="@/static/images/booking/portrait.png" mode=""></image>
				<text class="title">{{ driver_data.xingMing }}</text>
			</view>
			<view class="item state" @click="JumpToDispatchFarmer">
				<text class="title">派遣农户 :</text>
				<text class="result">{{ farmer }}</text>
				<image class="img" src="@/static/images/index/arrow.png" mode=""></image>
			</view>
			<view class="item task_type" @click="task_type_show = true">
				<text class="title">作业类型 :</text>
				<text class="result">{{ task_type_value }}</text>
				<image class="img" src="@/static/images/index/arrow.png" mode=""></image>
			</view>
			<view class="item villages_town" @click="show_datetime = true">
				<text class="title">操作时间 :</text>
				<text class="result">{{ select_datetime }}</text>
				<image class="img" src="@/static/images/index/arrow.png" mode=""></image>
			</view>
			<view class="item villages_town">
				<text class="title">预计工作时间 :</text>
				<text class="result">{{ work_time }}天</text>
			</view>
			<view class="item machine" @click="JumpToDispatchMachine">
				<text class="title">作业农机 :</text>
				<text class="result">{{ machine }}</text>
				<image class="img" src="@/static/images/index/arrow.png" mode=""></image>
			</view>
		</view>
		<button class="submit_booking_btn" type="default" @click="ShowConfirmationBox">提 交 预 约</button>
		<!-- 作业类型 -->
		<u-picker :show="task_type_show" :columns="task_type_columns" :closeOnClickOverlay="true"
			@close="task_type_show = false" @cancel="task_type_show = false" @confirm="SelectTaskType"
			:defaultIndex="task_type_default_index">
		</u-picker>
		<!-- 日期选择 -->
		<u-datetime-picker :show="show_datetime" :closeOnClickOverlay="true" v-model="current_date" mode="date"
			@close="show_datetime = false" @cancel="show_datetime = false" @confirm="SelectDatetime">
		</u-datetime-picker>
		<!-- 确认框 -->
		<u-modal :show="show_confirmation_box" :showCancelButton="true" title="确认要预约吗？" :closeOnClickOverlay="true"
			@cancel="show_confirmation_box = false" @confirm="SubmitBooking" @close="show_confirmation_box = false">
		</u-modal>
		<!-- loading容器 -->
		<view class="loading_container" v-show="show_loading">
			<u-loadmore class="loading_icon" status="loading" loadingText="预约中" loadingIcon="spinner" />
		</view>
		<!-- 预约成功模态框 -->
		<view class="booking_success_container" v-show="show_success_container">
			<view class="item_1"></view>
			<view class="item_2"></view>
			<view class="item_3">
				<image class="success_img" src="@/static/images/booking/success.png" mode=""></image>
				<text class="success_title">预约成功</text>
				<u-button class="back_btn" :ripple="true" @click="BackToIndex">返 回 首 页</u-button>
			</view>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import Navbar from '@/components/navbar/navbar.vue';
	import user from '@/api/api.js'

	export default {
		components: {
			Navbar,
		},
		data() {
			return {
				// 驾驶员数据
				driver_data: null,
				// 农户数据
				farmer_data: null,
				farmer: '',
				task_type_show: false,
				task_type_value: '',
				task_type_columns: [
					[
						'绿肥耕翻',
						'机械耕田',
						'播种',
					],
				],
				task_type_default_index: [0],
				// 操作时间
				select_datetime: '',
				// 工作时间
				work_time: 1,
				// 操作农机
				machine_data: null,
				machine: '',
				show_datetime: false,
				current_date: Number(new Date()),
				// 预约确认框
				show_confirmation_box: false,
				// 预约成功容器
				show_success_container: false,
				// loading容器
				show_loading: false,
			}
		},
		onLoad(data) {
			if (JSON.stringify(data) != "{}") {
				this.driver_data = JSON.parse(data.data);
			}
		},
		onShow: function() {
			let self = this;
			uni.$once('farmer', (query) => {
				self.farmer_data = query;
				self.farmer = `${query.farmer_data.ztmc} (${query.farmer_data.zmj}亩)`;
				
				this.GetWorkTime();
			});
			uni.$once('machine', (query) => {
				self.machine_data = query;
				self.machine = `${query.machine_data.suoYouRen} (${query.machine_data.jiXieLeiXing})`;
				
				this.GetWorkTime();
			});
		},
		mounted() {

		},
		methods: {
			// 返回预约页面
			BackToBooking() {
				uni.navigateBack();
			},
			// 跳转到派遣农户页
			JumpToDispatchFarmer() {
				uni.navigateTo({
					url: '../dispatchFarmer/dispatchFarmer'
				});
			},
			// 选择作业类型
			SelectTaskType(e) {
				// console.log(e);
				this.task_type_value = e.value[0];
				this.task_type_default_index = e.indexs;
				this.task_type_show = false;
				
				this.GetWorkTime();
			},
			// 选择日期
			SelectDatetime(e) {
				let date = new Date(e.value);
				let y = date.getFullYear();
				let MM = date.getMonth() + 1;
				MM = MM < 10 ? ('0' + MM) : MM; //月补0
				let d = date.getDate();
				d = d < 10 ? ('0' + d) : d; //天补0
				let datetiem = y + '-' + MM + '-' + d;

				this.show_datetime = false;
				this.select_datetime = datetiem;
			},
			// 跳转到派遣农机页
			JumpToDispatchMachine() {
				uni.navigateTo({
					url: '../dispatchMachine/dispatchMachine'
				});
			},
			// 显示预约确认框
			ShowConfirmationBox() {
				let self = this;

				if (!self.farmer_data) {
					self.$refs.uToast.show({
						type: 'error',
						position: 'bottom',
						duration: 1500,
						message: '请选择派遣农户',
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png',
					})
					return;
				}

				if (!self.task_type_value) {
					self.$refs.uToast.show({
						type: 'error',
						position: 'bottom',
						duration: 1500,
						message: '请选择作业类型',
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png',
					})
					return;
				}

				if (!self.select_datetime) {
					self.$refs.uToast.show({
						type: 'error',
						position: 'bottom',
						duration: 1500,
						message: '请选择操作时间',
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png',
					})
					return;
				}

				if (!self.machine_data) {
					self.$refs.uToast.show({
						type: 'error',
						position: 'bottom',
						duration: 1500,
						message: '请选择操作农机',
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png',
					})
					return;
				}

				self.show_confirmation_box = true;
			},
			// 获取工作时间
			GetWorkTime() {
				let self = this;
				
				if (self.farmer_data && self.task_type_value && self.machine_data) {
					self.work_time = '计算中...';
					user.WorkTime({
						'JXLX': self.machine_data.machine_data.jiXieLeiXing,
						'ZYLX': self.task_type_value,
						'mj': self.farmer_data.farmer_data.zmj,
					}).then(res => {
						// console.log(res);
						if (res.data.code == 200) {
							self.work_time = res.data.data;
						} else {
							self.work_time = 1;
						}
					})
				}
			},
			// 提交预约
			SubmitBooking() {
				let self = this;
				self.show_confirmation_box = false;
				self.show_loading = true;
				// console.log(self.driver_data.f_Id);
				// console.log(self.farmer_data.farmer_data.f_Id);
				// console.log(self.task_type_value);
				// console.log(self.machine_data.machine_data.f_Id);
				// console.log(self.select_datetime);
				// console.log(self.work_time);

				user.ReservationService({
					'driver_Id': self.driver_data.f_Id, // 驾驶员id
					'company_Id': self.farmer_data.farmer_data.f_Id, // 农户id
					'type': self.task_type_value, // 作业类型
					'machine_Id': self.machine_data.machine_data.f_Id, // 农机id
					'stime': self.select_datetime, // 操作时间
					'times': self.work_time, // 预计工作时间
				}).then(res => {
					console.log(res);
					self.show_loading = false;

					if (res.data.code == 200) {
						self.show_success_container = true;
					} else {
						self.$refs.uToast.show({
							type: 'error',
							position: 'bottom',
							duration: 2000,
							message: '预约失败',
							iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png',
						})
					}
				})

			},
			// 返回首页
			BackToIndex() {
				uni.redirectTo({
					url: '../index/index'
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.booking_arrange_container {
		width: 100vw;
		height: 100vh;
		background: #f0f0f0;
		background-image: url("@/static/images/index/bg.png");
		background-size: 100vw 23vh;
		background-position: top center;
		background-repeat: no-repeat;
		display: flex;
		flex-direction: column;
		position: relative;



		.information_container {
			width: 94vw;
			height: 71vh;
			margin: 6.6vh 0 0 3vw;
			background: white;
			border-radius: 10rpx;
			box-shadow: 0rpx 10rpx 10rpx #d6daea;

			.information {
				height: 170rpx;
				border-bottom: 1rpx solid #e5e5e5;
				display: flex;
				align-items: center;
				justify-content: space-around;

				.portrait {
					width: 80rpx;
					height: 80rpx;
				}

				.title {
					width: 75vw;
					font-size: 40rpx;
				}
			}

			.item {
				height: 100rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 3vw;
				font-size: 30rpx;
				border-bottom: 1rpx solid #e5e5e5;

				.result {
					width: 57vw;
					text-align: right;
					color: #999999;
				}

				.img {
					width: 20rpx;
					height: 30rpx;
				}
			}
		}

		.submit_booking_btn {
			width: 94vw;
			height: 8vh;
			line-height: 8vh;
			color: white;
			font-size: 45rpx;
			margin: 3vh 0 0 3vw;
			background: white;
			border-radius: 10rpx;
			background-image: linear-gradient(#3dbffc, #4a71fc);
		}

		.loading_container {
			width: 100vw;
			height: 100vh;
			background: rgba(102, 102, 102, .2);
			position: absolute;
			top: 0;
			left: 0;

			.loading_icon {
				position: absolute;
				top: 50%;
				left: 0;
				right: 0;
				border: 0;
				margin: auto;
			}
		}

		.booking_success_container {
			position: absolute;
			top: 0;
			left: 0;
			width: 100vw;
			height: 100vh;
			background: rgba(4, 4, 4, .6);

			.item_1 {
				width: 86vw;
				height: 70vh;
				background: #858485;
				position: absolute;
				top: 14vh;
				left: 0;
				right: 0;
				bottom: 0;
				margin: 0 auto;
			}

			.item_2 {
				width: 90vw;
				height: 70vh;
				background: #b6b4b6;
				position: absolute;
				top: 13vh;
				left: 0;
				right: 0;
				bottom: 0;
				margin: 0 auto;
				opacity: .7;
			}

			.item_3 {
				width: 94vw;
				height: 70vh;
				background: white;
				position: absolute;
				top: 12vh;
				left: 0;
				right: 0;
				bottom: 0;
				margin: 0 auto;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-evenly;

				.success_img {
					width: 500rpx;
					height: 550rpx;
				}

				.success_title {
					font-size: 50rpx;
				}

				.back_btn {
					width: 80vw;
					height: 140rpx;
					color: white;
					font-size: 50rpx;
					border-radius: 70rpx;
					background-image: linear-gradient(#3dbffc, #4a71fc);

				}
			}
		}
	}
</style>
