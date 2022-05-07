<template>
	<view class="booking_container">
		<Navbar title="主体信息" background="white" icon_color="black" title_color="black" />
		<view class="search_container">
			<view class="search_item">
				<view class="search">
					<image class="search_img" src="@/static/images/booking/search.png" mode=""></image>
					<input class="search_input" type="text" v-model="search_message" placeholder="输入姓名" />
				</view>
				<button class="search_btn" type="default" @click="FilterField">搜索</button>
			</view>
			<view class="select_item">
				<!-- 选择镇 -->
				<view class="item" @click="town_show = true">
					<view class="title">{{ town_value }}</view>
					<image class="img" src="@/static/images/booking/arrow.png" mode=""></image>
				</view>
				<!-- 选择村 -->
				<view class="item" @click="village_show = true">
					<view class="title">{{ village_value }}</view>
					<image class="img" src="@/static/images/booking/arrow.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="information_container">
			<scroll-view scroll-y="true" style="height: 78vh;">
				<view class="information_item" v-for="(item, index) in peasant_household_datas" :key="index"
					v-show="item.is_show">
					<view class="information">
						<image class="portrait" src="@/static/images/booking/portrait.png" mode=""></image>
						<text class="title">{{ item.ztmc }}</text>
						<button class="dispatch_btn" type="default" @click="ShowConfirmationBox(item)">派遣</button>
					</view>
					<view class="item state">
						<text class="title">耕作面积 :</text>
						<text class="result">{{ item.zmj }}亩</text>
					</view>
					<view class="item villages_town">
						<text class="title">村镇 :</text>
						<text class="result">{{ item.zb }}</text>
					</view>
					<view class="item phone">
						<text class="title">电话 :</text>
						<text class="result">{{ item.lxdh }}</text>
					</view>
				</view>
				<view class="more_container">
					<u-loadmore class="loading_icon" status="loading" loadingText="加载中" loadingIcon="spinner"
						v-show="show_loading" />
					<view class="more" v-show="!show_loading" @click="loading_more">加载更多</view>
				</view>
			</scroll-view>
		</view>
		<!-- 镇选项 -->
		<u-picker :show="town_show" :columns="town_columns" :closeOnClickOverlay="true" @close="town_show = false"
			@cancel="town_show = false" @confirm="SelectTown" :defaultIndex="town_default_index">
		</u-picker>
		<!-- 村选项 -->
		<u-picker :show="village_show" :columns="village_columns" :closeOnClickOverlay="true"
			@close="village_show = false" @cancel="village_show = false" @confirm="SelectVillage"
			:defaultIndex="village_default_index">
		</u-picker>
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
				search_message: '',
				show_loading: false,
				page_index: 1,
				town_complete_data: [],
				town_show: false,
				town_value: '所在镇',
				town_columns: [
					[],
				],
				town_default_index: [0],
				village_show: false,
				village_value: '所在村',
				village_columns: [],
				village_default_index: [0],
				show_confirmation_box: false,
				// 农户数据
				peasant_household_datas: [],
				dispatch_Object_data: null,
			}
		},
		onLoad() {
			this.GetJingYingZhuTiPage(this.page_index);
			const town_data = uni.getStorageSync('town_data');
			this.town_complete_data = town_data;

			for (let i = 0; i < town_data.length; i++) {
				this.town_columns[0].push(town_data[i].f_AreaName);
			}
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
					console.log('经营主体：');
					console.log(res);
					self.show_loading = false;
					if (res.data.code == 200) {
						let data = res.data.data.rows;
						data.map(item => {
							item.is_show = true
						});
						self.peasant_household_datas = self.peasant_household_datas.concat(data);
						self.peasant_household_datas = self.RemoveDuplicateObj(self.peasant_household_datas);
						if (data.length == rows) {
							self.page_index++;
						}
					}
				})
			},
			// 获取村
			GetVillage(pid) {
				let self = this;

				user.TownVillage(pid).then(res => {
					console.log('村：');
					console.log(res);
					if (res.data.code == 200) {
						let data = res.data.data;
						let temp = [];
						for (let i = 0; i < data.length; i++) {
							temp.push(data[i].f_AreaName);
						}

						self.village_columns.push(temp);
					}
				})
			},
			// 加载更多
			loading_more() {
				let self = this;
				self.search_message = '';
				self.town_value = '所在镇';
				self.town_default_index = [0];
				self.village_value = '所在村';
				self.village_default_index = [0];
				self.village_columns.splice(0);
				
				self.peasant_household_datas.map(item => {
					item.is_show = true;
				})
				self.GetJingYingZhuTiPage(self.page_index);
			},
			// 过滤名称
			FilterField() {
				let self = this;
				let name = self.search_message;
				
				self.peasant_household_datas.map(item => {
					item.is_show = true;
				})

				self.peasant_household_datas.map(item => {
					let index = item.ztmc.indexOf(name);
					if (index == -1) {
						item.is_show = false;
					} else {
						item.is_show = true;
					}
				})
				
				// 过滤镇
				self.peasant_household_datas.map(item => {
					if (item.is_show && self.town_value != '所在镇') {
						let index = item.zb.indexOf(self.town_value);
						if (index == -1) {
							item.is_show = false;
						} else {
							item.is_show = true;
						}
					}
				})
				
				// 过滤村
				self.peasant_household_datas.map(item => {
					if (item.is_show && self.village_value != '所在村') {
						let index = item.zb.indexOf(self.village_value);
						if (index == -1) {
							item.is_show = false;
						} else {
							item.is_show = true;
						}
					}
				})
			},
			// 数组对象去重
			RemoveDuplicateObj(arr) {
				let obj = {};
				arr = arr.reduce((newArr, next) => {
					obj[next.f_Id] ? "" : (obj[next.f_Id] = true && newArr.push(next));
					return newArr;
				}, []);
				return arr;
			},
			// 选择镇
			SelectTown(e) {
				// console.log(e);
				if (this.town_columns[0].length) {
					this.town_value = e.value[0];
					this.town_default_index = e.indexs;
					this.village_columns.splice(0);
					this.village_value = '所在村';
					this.village_default_index = [0];
					this.FilterField();
					this.GetVillage(this.town_complete_data[e.indexs[0]].f_AreaCode);
				}
				this.town_show = false;
			},
			// 选择村
			SelectVillage(e) {
				// console.log(e);
				if (this.village_columns.length) {
					this.village_value = e.value[0];
					this.village_default_index = e.indexs;
					this.FilterField();
				}
				this.village_show = false;
			},
			// 显示确认框
			ShowConfirmationBox(data) {
				this.show_confirmation_box = true;
				this.dispatch_Object_data = data;
			},
			// 返回上一页
			BackToBookingArrange() {
				let self = this;
				self.show_confirmation_box = false;
				uni.$emit('farmer', {
					farmer_data: self.dispatch_Object_data
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
			height: 12vh;
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
					border-radius: 60rpx;
					font-size: 35rpx;
					color: white;
					background-image: linear-gradient(#3dbffc, #4a71fc);
				}
			}

			.select_item {
				width: 100vw;
				height: 7.5vh;
				display: flex;
				align-items: center;

				.item {
					width: 50vw;
					display: flex;
					align-items: center;

					.title {
						width: 20vw;
						height: 40rpx;
						line-height: 40rpx;
						font-size: 30rpx;
						overflow: hidden;
						margin-left: 5vw;
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
			height: 78vh;

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
