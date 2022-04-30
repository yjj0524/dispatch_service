<template>
	<view class="booking_arrange_container">
		<Navbar title="农机预约安排" icon_color="#ffffff" title_color="#ffffff" border_bottom_color="transparent" />
		<view class="information_container">
			<view class="information">
				<image class="portrait" src="@/static/booking/portrait.png" mode=""></image>
				<text class="title">李小四</text>
			</view>
			<view class="item state" @click="JumpToDispatchFarmer">
				<text class="title">派遣农户 :</text>
				<text class="result">{{ farmer_data }}</text>
				<image class="img" src="@/static/index/arrow.png" mode=""></image>
			</view>
			<view class="item villages_town" @click="show_datetime = true">
				<text class="title">操作时间 :</text>
				<text class="result">{{ select_datetime }}</text>
				<image class="img" src="@/static/index/arrow.png" mode=""></image>
			</view>
			<view class="item villages_town">
				<text class="title">预计工作时间 :</text>
				<text class="result">3天</text>
			</view>
			<view class="item machine" @click="JumpToDispatchMachine">
				<text class="title">操作农机 :</text>
				<text class="result">{{ machine_data }}</text>
				<image class="img" src="@/static/index/arrow.png" mode=""></image>
			</view>
		</view>
		<button class="submit_booking_btn" type="default" @click="SubmitBooking">提 交 预 约</button>
		<!-- 日期选择 -->
		<u-datetime-picker :show="show_datetime" :closeOnClickOverlay="true" v-model="current_date" mode="date"
			@close="show_datetime = false" @cancel="show_datetime = false" @confirm="SelectDatetime">
		</u-datetime-picker>
		<!-- 预约成功模态框 -->
		<view class="booking_success_container" v-show="show_success_container">
			<view class="item_1"></view>
			<view class="item_2"></view>
			<view class="item_3">
				<image class="success_img" src="@/static/success.png" mode=""></image>
				<text class="success_title">预约成功</text>
				<u-button class="back_btn" :ripple="true" @click="BackToIndex">返 回 首 页</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import Navbar from '@/components/navbar/navbar.vue';

	export default {
		components: {
			Navbar,
		},
		data() {
			return {
				farmer_data: '',
				select_datetime: '',
				machine_data: '',
				show_datetime: false,
				current_date: Number(new Date()),
				show_success_container: false,
			}
		},
		onShow: function() {
			let self = this;
			uni.$once('farmer', (query) => {
				// console.log('上一页的参数：', query)
				self.farmer_data = query.farmer_data;
			});
			uni.$once('machine', (query) => {
				// console.log('上一页的参数：', query)
				self.machine_data = query.machine_data;
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
			// 选择日期
			SelectDatetime(e) {
				let date = new Date(e.value);
				let y = date.getFullYear();
				let MM = date.getMonth() + 1;
				MM = MM < 10 ? ('0' + MM) : MM; //月补0
				let d = date.getDate();
				d = d < 10 ? ('0' + d) : d; //天补0
				let datetiem = y + '/' + MM + '/' + d;

				this.show_datetime = false;
				this.select_datetime = datetiem;
			},
			// 跳转到派遣农机页
			JumpToDispatchMachine() {
				uni.navigateTo({
					url: '../dispatchMachine/dispatchMachine'
				});
			},
			// 提交预约
			SubmitBooking() {
				let self = this;

				self.show_success_container = true;
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
		background-image: url("@/static/index/bg.png");
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
				font-size: 35rpx;
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
