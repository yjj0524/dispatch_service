<template>
	<view class="booking_container">
		<Navbar title="农民信息" background="#FFFFFF" icon_color="black" title_color="black" />
		<view class="search_container">
			<view class="search_item">
				<view class="search">
					<image class="search_img" src="@/static/booking/search.png" mode=""></image>
					<input class="search_input" type="text" value="" placeholder="输入姓名" />
				</view>
				<button class="search_btn" type="default">搜索</button>
			</view>
			<view class="select_item">
				<view class="item" @click="village_show = true">
					<text class="title">{{ village_value }}</text>
					<image class="img" src="@/static/booking/arrow.png" mode=""></image>
				</view>

				<view class="item" @click="farmer_show = true">
					<text class="title">{{ farmer_value }}</text>
					<image class="img" src="@/static/booking/arrow.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="information_container">
			<scroll-view scroll-y="true" style="height: 80vh;">
				<view class="information_item" v-for="(item, index) in farmer_datas" :key="index">
					<view class="information">
						<image class="portrait" src="@/static/booking/portrait.png" mode=""></image>
						<text class="title">{{ item.xingMing }}</text>
						<button class="booking_btn" type="default" @click="JumpToBookingArrange">预约</button>
					</view>
					<view class="item state">
						<text class="title">状态 :</text>
						<text class="result">可执行</text>
					</view>
					<view class="item villages_town">
						<text class="title">村镇 :</text>
						<text class="result">{{ item.zhuZhi }}</text>
					</view>
					<view class="item machine">
						<text class="title">农机持有 :</text>
						<text class="result">{{ item.zhunJiaJiXing }}</text>
					</view>
					<view class="healthy_prove">
						<text class="title">健康证明 :</text>
						<view class="photo_container">
							<image class="photo" src="@/static/booking/photo.png" mode=""></image>
						</view>
						<image class="arrow" src="@/static/index/arrow.png" mode=""></image>
					</view>
				</view>
				<view class="more" v-if="farmer_datas.length">更多</view>
			</scroll-view>
		</view>
		<!-- 村选项 -->
		<u-picker :show="village_show" :columns="village_columns" :closeOnClickOverlay="true"
			@close="village_show = false" @cancel="village_show = false" :defaultIndex="village_default_index">
		</u-picker>
		<!-- 农民选项 -->
		<u-picker :show="farmer_show" :columns="farmer_columns" :closeOnClickOverlay="true" @close="farmer_show = false"
			@cancel="farmer_show = false" :defaultIndex="farmer_default_index"></u-picker>
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
				village_default_index: [5],
				farmer_show: false,
				farmer_value: '农民状态',
				farmer_columns: [
					[
						'状态一',
						'状态二',
						'状态三',
						'状态四',
						'状态五',
						'状态六',
						'状态七',
						'状态八',
						'状态九',
						'状态十',
					],
				],
				farmer_default_index: [2],
				// 农机驾驶员数据
				farmer_datas: [],
			}
		},
		onLoad() {
			this.GetNongJiJiaShiYuanPage(10, 1);
		},
		mounted() {

		},
		methods: {
			// 获取农机驾驶员(分页获取)
			GetNongJiJiaShiYuanPage(rows, page) {
				let self = this;
				
				user.nongJiJiaShiYuanPage({
					'rows': rows,
					'page': page,
				}).then(res => {
					console.log(res);
					
					if (res.data.code == 200) {
						this.farmer_datas = res.data.data.rows;
					}
				})
			},
			// 获取农机准驾车型代号
			// GetNJZJCXDH(f_id) {
			// 	user.NJZJCXDH(f_id).then((res) => {
			// 		console.log(res);
			// 	})
			// },
			// 跳转到农机预约安排页
			JumpToBookingArrange() {
				uni.navigateTo({
					url: '../bookingArrange/bookingArrange'
				});
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

					.booking_btn {
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

			.healthy_prove {
				height: 120rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 3vw;
				border-bottom: 1rpx solid #e5e5e5;

				.title {
					font-size: 35rpx;
				}

				.photo_container {
					width: 65vw;

					.photo {
						width: 15vw;
						height: 10vw;
						margin-left: 1vw;
					}
				}

				.arrow {
					width: 20rpx;
					height: 30rpx;
				}
			}
			
			.more {
				width: 10vw;
				height: 50rpx;
				line-height: 50rpx;
				font-size: 35rpx;
				margin: 1vh 0 0 45vw;
				text-align: center;
				color: red;
			}
		}
	}
</style>
