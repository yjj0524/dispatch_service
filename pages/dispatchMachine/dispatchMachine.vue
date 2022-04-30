<template>
	<view class="booking_container">
		<Navbar title="派遣农机" background="white" icon_color="black" title_color="black" />
		<view class="search_container">
			<view class="search_item">
				<view class="search">
					<image class="search_img" src="@/static/booking/search.png" mode=""></image>
					<input class="search_input" type="text" value="" placeholder="输入姓名或农机类型" />
				</view>
				<button class="search_btn" type="default">搜索</button>
			</view>
			<view class="select_item">
				<view class="item" @click="village_show = true">
					<text class="title">{{ village_value }}</text>
					<image class="img" src="@/static/booking/arrow.png" mode=""></image>
				</view>

				<view class="item" @click="machine_show = true">
					<text class="title">{{ machine_value }}</text>
					<image class="img" src="@/static/booking/arrow.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="information_container">
			<scroll-view scroll-y="true" style="height: 80vh;">
				<view class="information_item" v-for="(item, index) of 10" :key="index">
					<view class="information">
						<image class="portrait" src="@/static/booking/portrait.png" mode=""></image>
						<text class="title">周老六</text>
						<button class="dispatch_btn" type="default" @click="show_confirmation_box = true">派遣</button>
					</view>
					<view class="item state">
						<text class="title">状态 :</text>
						<text class="result">可执行</text>
					</view>
					<view class="item villages_town">
						<text class="title">村镇 :</text>
						<text class="result">村镇</text>
					</view>
					<view class="machine">
						<text class="title">农机持有 :</text>
						<view class="machine_container">
							<view class="machine_item">
								<view class="have"></view>
								<text class="machine_title">插秧机</text>
							</view>
							<view class="machine_item">
								<view class="no_have"></view>
								<text class="machine_title">插秧机</text>
							</view>
							<view class="machine_item">
								<view class="no_have"></view>
								<text class="machine_title">插秧机</text>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 村选项 -->
		<u-picker :show="village_show" :columns="village_columns" :closeOnClickOverlay="true"
			@close="village_show = false" @cancel="village_show = false" :defaultIndex="village_default_index">
		</u-picker>
		<!-- 农机选项 -->
		<u-picker :show="machine_show" :columns="machine_columns" :closeOnClickOverlay="true"
			@close="machine_show = false" @cancel="machine_show = false" :defaultIndex="machine_default_index">
		</u-picker>
		<!-- 确认框 -->
		<u-modal :show="show_confirmation_box" :showCancelButton="true" title="确认要派遣吗？" :closeOnClickOverlay="true"
			@cancel="show_confirmation_box = false" @confirm="BackToBookingArrange"
			@close="show_confirmation_box = false"></u-modal>
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
				village_show: false,
				village_value: '选择村',
				village_columns: [
					[
						'村一',
						'村二',
						'村三',
						'村四',
						'村五',
						'村六',
						'村七',
						'村八',
						'村九',
						'村十',
					],
				],
				village_default_index: [0],
				machine_show: false,
				machine_value: '农机类型',
				machine_columns: [
					[
						'农机一',
						'农机二',
						'农机三',
					],
				],
				machine_default_index: [0],
				show_confirmation_box: false,
			}
		},
		mounted() {

		},
		methods: {
			// 显示确认框
			ShowConfirmationBox() {
				this.show_confirmation_box = true;
			},
			// 返回上一页
			BackToBookingArrange() {
				this.show_confirmation_box = false;
				uni.$emit('machine', {
					machine_data: '周老七 (插秧机)'
				});
				uni.navigateBack();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.booking_container {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		background: white;

		.search_container {
			width: 100vw;
			height: 10vh;
			display: flex;
			flex-direction: column;
			background: white;
			border-bottom: 1rpx solid #e5e5e5;

			.search_item {
				width: 100vw;
				height: 4.5vh;
				display: flex;
				margin-top: 1vh;
				justify-content: space-evenly;

				.search {
					width: 65vw;
					height: 4.5vh;
					background: #f0f0f0;
					display: flex;
					justify-content: space-around;
					align-items: center;
					border-radius: 40rpx;

					.search_img {
						width: 40rpx;
						height: 40rpx;
					}

					.search_input {
						width: 50vw;
						font-size: 30rpx;
						color: #999999;
					}
				}

				.search_btn {
					width: 25vw;
					height: 4.5vh;
					line-height: 4.5vh;
					border-radius: 40rpx;
					font-size: 35rpx;
					color: white;
					background-image: linear-gradient(#3dbffc, #4a71fc);
				}
			}

			.select_item {
				width: 100vw;
				height: 5.5vh;
				display: flex;
				align-items: center;

				.item {
					margin: 0 20vw 0 5vw;

					.title {
						margin-right: 3vw;
					}

					.img {
						width: 30rpx;
						height: 20rpx;
					}
				}
			}
		}

		.information_container {
			width: 100vw;
			height: 80vh;

			.information_item {
				border-top: 1.5vh solid #f0f0f0;
				background: white;

				.information {
					height: 120rpx;
					border-bottom: 1rpx solid #e5e5e5;
					display: flex;
					align-items: center;
					justify-content: space-around;

					.portrait {
						width: 80rpx;
						height: 80rpx;
					}

					.title {
						width: 50vw;
						font-size: 40rpx;
					}

					.dispatch_btn {
						width: 25vw;
						height: 70rpx;
						line-height: 70rpx;
						border-radius: 40rpx;
						font-size: 35rpx;
						color: white;
						background-image: linear-gradient(#3dbffc, #4a71fc);
					}
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
					font-size: 30rpx;
					color: #999999;
				}
			}


			.machine {
				min-height: 100rpx;
				display: flex;
				justify-content: space-between;
				align-items: flex-start;
				padding: 0 3vw;
				font-size: 35rpx;
				border-bottom: 1rpx solid #e5e5e5;

				.title {
					margin-top: 10rpx;
				}

				.machine_container {
					display: flex;
					flex-direction: column;

					.machine_item {
						height: 70rpx;
						display: flex;
						align-items: center;

						.have {
							width: 20rpx;
							height: 20rpx;
							background: #00ffa2;
							border-radius: 50%;
							border: 5rpx solid #e5e5e5;
							margin-right: 30rpx;
						}

						.no_have {
							width: 20rpx;
							height: 20rpx;
							background: white;
							border-radius: 50%;
							border: 5rpx solid #e5e5e5;
							margin-right: 30rpx;
						}
					}
				}
			}

		}
	}
</style>
