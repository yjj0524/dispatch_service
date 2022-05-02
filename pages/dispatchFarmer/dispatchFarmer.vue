<template>
	<view class="booking_container">
		<Navbar title="农户信息" background="white" icon_color="black" title_color="black" />
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

				<view class="item" @click="area_show = true">
					<text class="title">{{ area_value }}</text>
					<image class="img" src="@/static/booking/arrow.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="information_container">
			<scroll-view scroll-y="true" style="height: 80vh;">
				<view class="information_item" v-for="(item, index) in peasant_household_datas" :key="index">
					<view class="information">
						<image class="portrait" src="@/static/booking/portrait.png" mode=""></image>
						<text class="title">{{ item.ztmc }}</text>
						<button class="dispatch_btn" type="default" @click="show_confirmation_box = true">派遣</button>
					</view>
					<view class="item state">
						<text class="title">耕作面积 :</text>
						<text class="result">{{ item.zmj }}亩</text>
					</view>
					<view class="item villages_town">
						<text class="title">村镇 :</text>
						<text class="result">{{ item.zb }}</text>
					</view>
				</view>
				<view class="more_container">
					<u-loading-icon class="loading_icon" timing-function="linear" mode="circle" :vertical="true"
						:show="show_loading"></u-loading-icon>
					<view class="more" v-show="!show_loading" @click="loading_more">更多</view>
				</view>
			</scroll-view>
		</view>
		<!-- 村选项 -->
		<u-picker :show="village_show" :columns="village_columns" :closeOnClickOverlay="true"
			@close="village_show = false" @cancel="village_show = false" :defaultIndex="village_default_index">
		</u-picker>
		<!-- 面积选项 -->
		<u-picker :show="area_show" :columns="area_columns" :closeOnClickOverlay="true" @close="area_show = false"
			@cancel="area_show = false" :defaultIndex="area_default_index"></u-picker>
		<!-- 确认框 -->
		<u-modal :show="show_confirmation_box" :showCancelButton="true" title="确认要派遣吗？" :closeOnClickOverlay="true"
			@cancel="show_confirmation_box = false" @confirm="BackToBookingArrange"
			@close="show_confirmation_box = false"></u-modal>
	</view>
</template>

<script>
	import Navbar from '@/components/navbar/navbar.vue';
	import user from '@/api/api.js';

	export default {
		components: {
			Navbar,
		},
		data() {
			return {
				show_loading: false,
				page_index: 1,
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
				area_show: false,
				area_value: '耕作面积',
				area_columns: [
					[
						'面积一',
						'面积二',
						'面积三',
						'面积四',
						'面积五',
						'面积六',
						'面积七',
						'面积八',
						'面积九',
						'面积十',
					],
				],
				area_default_index: [2],
				show_confirmation_box: false,
				peasant_household_datas: [],
			}
		},
		onLoad() {
			this.GetJingYingZhuTiPage(this.page_index);
		},
		mounted() {

		},
		methods: {
			// 获取经营主体(分页获取)
			GetJingYingZhuTiPage(page, rows = 20) {
				let self = this;
				self.show_loading = true;
				
				user.JingYingZhuTi({
					'rows': rows,
					'page': page,
				}).then(res => {
					// console.log(res);
					self.show_loading = false;
					if (res.data.code == 200) {
						self.peasant_household_datas = self.peasant_household_datas.concat(res.data.data.rows);
						if (res.data.data.rows.length == rows) {
							self.page_index++;
						}
					}
				})
			},
			loading_more() {
				this.GetJingYingZhuTiPage(this.page_index);
			},
			// 显示确认框
			ShowConfirmationBox() {
				this.show_confirmation_box = true;
			},
			// 返回上一页
			BackToBookingArrange() {
				this.show_confirmation_box = false;
				uni.$emit('farmer', {
					farmer_data: '王老五 (100亩)'
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
			
			.more_container {
				width: 100vw;
				height: 100rpx;
				margin-top: 1vh;
				display: flex;
				justify-content: center;
			
				.more {
					height: 100rpx;
					line-height: 100rpx;
					font-size: 35rpx;
					text-align: center;
					color: red;
				}
			}
		}
	}
</style>
