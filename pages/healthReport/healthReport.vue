<template>
	<view class="health_report_container">
		<Navbar title="每日健康申报" background="#FFFFFF" icon_color="black" title_color="black" />
		<view class="search_container">
			<view class="search_item">
				<view class="search">
					<image class="search_img" src="@/static/images/booking/search.png" mode=""></image>
					<input class="search_input" type="text" v-model="search_message" placeholder="输入姓名" />
				</view>
				<button class="search_btn" type="default" @click="FilterField">搜索</button>
			</view>
			<view class="select_item">
				<!-- 镇 -->
				<view class="item" @click="town_show = true">
					<text class="title">{{ town_value }}</text>
					<image class="img" src="@/static/images/booking/arrow.png" mode=""></image>
				</view>
				<!-- 村 -->
				<view class="item" @click="village_show = true">
					<text class="title">{{ village_value }}</text>
					<image class="img" src="@/static/images/booking/arrow.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="information_container">
			<scroll-view scroll-y="true" style="height: 78vh;">
				<view class="item" v-for="(item, index) in driver_datas" :key="index" v-show="item.is_show">
					<image class="portrait_img" src="@/static/images/booking/portrait.png" mode=""></image>
					<view class="message">
						<text class="title">{{ item.xingMing }}</text>
						<text class="villages_town">{{ item.zhuZhi }}</text>
					</view>
					<u-button class="report_btn" :ripple="true" @click="JumpToUploadReport(item)">申报</u-button>
				</view>
				<view class="more_container">
					<u-loadmore class="loading_icon" status="loading" loadingText="加载中" loadingIcon="spinner"
						v-show="show_loading" />
					<view class="more" v-show="!show_loading" @click="LoadingMore">加载更多</view>
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
				// 农机驾驶员数据
				driver_datas: [],
				indexList: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S",
					"T", "U", "V", "W", "X", "Y", "Z"
				],
				itemArr: [
					['人员A1', '人员A2', '人员A3'],
					['人员B1', '人员B2', '人员B3'],
					['人员C1', '人员C2', '人员C3'],
					['人员D1', '人员D2', '人员D3'],
					['人员E1', '人员E2', '人员E3'],
					['人员F1', '人员F2', '人员F3'],
					['人员G1', '人员G2', '人员G3'],
					['人员H1', '人员H2', '人员H3'],
					['人员I1', '人员I2', '人员I3'],
					['人员J1', '人员J2', '人员J3'],
					['人员K1', '人员K2', '人员K3'],
					['人员L1', '人员L2', '人员L3'],
					['人员M1', '人员M2', '人员M3'],
					['人员N1', '人员N2', '人员N3'],
					['人员O1', '人员O2', '人员O3'],
					['人员P1', '人员P2', '人员P3'],
					['人员Q1', '人员Q2', '人员Q3'],
					['人员R1', '人员R2', '人员R3'],
					['人员S1', '人员S2', '人员S3'],
					['人员T1', '人员T2', '人员T3'],
					['人员U1', '人员U2', '人员U3'],
					['人员V1', '人员V2', '人员V3'],
					['人员W1', '人员W2', '人员W3'],
					['人员X1', '人员X2', '人员X3'],
					['人员Y1', '人员Y2', '人员Y3'],
					['人员Z1', '人员Z2', '人员Z3'],
				],
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
			}
		},
		mounted() {
			this.GetNongJiJiaShiYuanPage(this.page_index);
			const town_data = uni.getStorageSync('town_data');
			this.town_complete_data = town_data;

			for (let i = 0; i < town_data.length; i++) {
				this.town_columns[0].push(town_data[i].f_AreaName);
			}
		},
		methods: {
			// 获取农机驾驶员(分页获取)
			GetNongJiJiaShiYuanPage(page, rows = 100) {
				let self = this;
				self.show_loading = true;

				user.NongJiJiaShiYuanPage({
					'rows': rows,
					'page': page,
				}).then(res => {
					console.log('驾驶员：');
					console.log(res);
					self.show_loading = false;
					if (res.data.code == 200) {
						let data = res.data.data.rows;
						data.map(item => {
							item.is_show = true
						});
						self.driver_datas = self.driver_datas.concat(data);
						self.driver_datas = self.RemoveDuplicateObj(self.driver_datas);
						if (data.length == rows) {
							self.page_index++;
						}
					}
				})
			},
			// 加载更多
			LoadingMore() {
				let self = this;
				self.search_message = '';
				self.town_value = '所在镇';
				self.town_default_index = [0];
				self.village_value = '所在村';
				self.village_default_index = [0];
				self.village_columns.splice(0);
				
				self.driver_datas.map(item => {
					item.is_show = true;
				})
				self.GetNongJiJiaShiYuanPage(self.page_index);
			},
			// 过滤
			FilterField() {
				let self = this;
				let name = self.search_message;
				
				self.driver_datas.map(item => {
					item.is_show = true;
				})

				// 过滤姓名
				self.driver_datas.map(item => {
					let index = item.xingMing.indexOf(name);
					if (index == -1) {
						item.is_show = false;
					} else {
						item.is_show = true;
					}
				})
				
				// 过滤镇
				self.driver_datas.map(item => {
					if (item.is_show && self.town_value != '所在镇') {
						let index = item.zhuZhi.indexOf(self.town_value);
						if (index == -1) {
							item.is_show = false;
						} else {
							item.is_show = true;
						}
					}
				})
				
				// 过滤村
				self.driver_datas.map(item => {
					if (item.is_show && self.village_value != '所在村') {
						let index = item.zhuZhi.indexOf(self.village_value);
						if (index == -1) {
							item.is_show = false;
						} else {
							item.is_show = true;
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
			// 数组对象去重
			RemoveDuplicateObj(arr) {
				let obj = {};
				arr = arr.reduce((newArr, next) => {
					obj[next.f_Id] ? "" : (obj[next.f_Id] = true && newArr.push(next));
					return newArr;
				}, []);
				return arr;
			},
			// 申报
			JumpToUploadReport(data) {
				uni.navigateTo({
					url: '../uploadReport/uploadReport?data=' + JSON.stringify(data)
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.health_report_container {
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
			height: 76vh;

			.item {
				display: flex;
				align-items: center;
				justify-content: space-between;
				box-sizing: border-box;
				width: 100%;
				padding: 0 3vw;
				height: 150rpx;
				font-size: 35rpx;
				overflow: hidden;
				color: #323233;
				background-color: #fff;
				border-bottom: 2rpx solid #e5e5e5;

				.portrait_img {
					width: 100rpx;
					height: 100rpx;
				}

				.message {
					width: 50vw;
					display: flex;
					align-items: flex-start;
					flex-direction: column;

					.title {
						font-size: 40rpx;
					}

					.villages_town {
						color: #aeaeae;
						font-size: 25rpx;
					}
				}

				.report_btn {
					width: 25vw;
					height: 4.5vh;
					line-height: 4.5vh;
					border-radius: 40rpx;
					font-size: 35rpx;
					color: white;
					background-image: linear-gradient(#3dbffc, #4a71fc);
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
