<template>
	<view class="index_container">
		<view class="item_img">
			<image class="img" src="@/static/images/login/tractor.png" mode=""></image>
			<text class="title">农机预约调度服务</text>
		</view>
		<view class="item" @click="JumpToBooking">
			<view class="item_container">
				<image class="img_1" src="@/static/images/index/booking.png" mode=""></image>
				<text class="title">农机预约安排</text>
				<image class="img_2" src="@/static/images/index/arrow.png" mode=""></image>
			</view>
		</view>
		<view class="item" @click="JumpToBookingList">
			<view class="item_container">
				<image class="img_1" src="@/static/images/index/dispatch.png" mode=""></image>
				<text class="title">农机调度服务</text>
				<image class="img_2" src="@/static/images/index/arrow.png" mode=""></image>
			</view>
		</view>
		<view class="item" @click="JumpToHealthReport">
			<view class="item_container">
				<image class="img_1" src="@/static/images/index/healthy.png" mode=""></image>
				<text class="title">每日健康申报</text>
				<image class="img_2" src="@/static/images/index/arrow.png" mode=""></image>
			</view>
		</view>
		<view class="item" @click="JumpToStatistics">
			<view class="item_container">
				<image class="img_1" src="@/static/images/index/statistics.png" mode=""></image>
				<text class="title">预约调度统计</text>
				<image class="img_2" src="@/static/images/index/arrow.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		mounted() {

		},
		methods: {
			// 跳转到预约页
			JumpToBooking() {
				uni.navigateTo({
					url: '../booking/booking'
				});
			},
			JumpToBookingList() {
				uni.navigateTo({
					url: '../bookingList/bookingList'
				});
			},
			JumpToHealthReport() {
				uni.navigateTo({
					url: '../healthReport/healthReport'
				});
			},
			JumpToStatistics() {
				uni.navigateTo({
					url: '../statistics/statistics'
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.index_container {
		width: 100vw;
		height: 100vh;
		background: #f0f0f0;
		background-image: url("@/static/images/index/index_bg.png");
		background-size: 100vw 30vh;
		background-position: top center;
		background-repeat: no-repeat;

		.item_img {
			height: 22vh;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			.img {
				width: 190rpx;
				height: 150rpx;
			}

			.title {
				margin-top: 2vh;
				color: white;
				font-size: 35rpx;
			}
		}

		.item {
			margin-bottom: 2.5vh;
			height: 17vh;
			display: flex;
			justify-content: center;

			.item_container {
				width: 90vw;
				display: flex;
				justify-content: space-around;
				align-items: center;
				background: white;
				border-radius: 10rpx;
				box-shadow: 0rpx 20rpx 20rpx #d6daea;

				.img_1 {
					width: 220rpx;
					height: 220rpx;
				}

				.title {
					width: 45vw;
					font-size: 50rpx;
				}

				.img_2 {
					width: 20rpx;
					height: 30rpx;
				}
			}
		}
	}
</style>
