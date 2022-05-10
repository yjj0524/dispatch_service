<template>
	<view class="booking_container">
		<Navbar title="农机预约列表" background="#FFFFFF" icon_color="black" title_color="black" />
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
				<view class="information_item" v-for="(item, index) in service_list" :key="index" v-show="item.is_show">
					<view class="information">
						<image class="portrait" src="@/static/images/booking/portrait.png" mode=""></image>
						<text class="title">{{ item.xingming }}</text>
						<button class="booking_btn" type="default" @click="JumpToDispatchService(item)">调度</button>
					</view>
					<view class="item state">
						<text class="title">状态 :</text>
						<text class="result allow">{{ item.servicemark }}</text>
					</view>
					<view class="item villages_town">
						<text class="title">地址 :</text>
						<text class="result">{{ item.zhuzhi }}</text>
					</view>
					<view class="item state">
						<text class="title">派遣农户 :</text>
						<text class="result">{{ item.ztmc }}<span>({{ item.zmj }}亩)</span></text>
					</view>
					<view class="item state">
						<text class="title">作业类型 :</text>
						<text class="result">{{ item.type }}</span></text>
					</view>
					<view class="item date_time">
						<text class="title">操作时间 :</text>
						<text class="result">{{ item.stime }}</text>
					</view>
					<view class="item work_time">
						<text class="title">预计工作时间 :</text>
						<text class="result">{{ item.times }}天</text>
					</view>
					<view class="item machine">
						<text class="title">作业农机 :</text>
						<view class="result machine_type">{{ item.suoyouren }} <span>({{ item.jixieleixing }})</span>
						</view>
					</view>
					<view class="healthy_prove">
						<text class="title">健康证明 :</text>
						<view class="photo_container">
							<image class="photo" v-for="(value, key) in item.drivermarkfile" :key="key" :src="value"
								mode="" @click="PreviewImage(item.drivermarkfile, key)"></image>
						</view>
					</view>
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
	import user from '@/api/api.js'

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
				// 预约服务列表
				service_list: [],
			}
		},
		mounted() {
			this.GetServicePageList(this.page_index);
			const town_data = uni.getStorageSync('town_data');
			this.town_complete_data = town_data;

			for (let i = 0; i < town_data.length; i++) {
				this.town_columns[0].push(town_data[i].f_AreaName);
			}
		},
		methods: {
			// 获取预约列表(分页获取)
			GetServicePageList(page, rows = 20) {
				let self = this;
				self.show_loading = true;

				user.ServicePageList({
					'rows': rows,
					'page': page,
				}).then(res => {
					console.log('预约数据：');
					console.log(res);
					self.show_loading = false;

					if (res.data.code == 200) {
						let data = res.data.data.rows;

						data.map(item => {
							item.is_show = true;

							if (item.drivermarkfile) {
								item.drivermarkfile = item.drivermarkfile.split(',')
							} else {
								item.drivermarkfile = [];
							}

							if (item.stime) {
								item.stime = item.stime.slice(0, item.stime.indexOf('T'));
							}
						})

						self.service_list = self.service_list.concat(data);
						self.service_list = self.RemoveDuplicateObj(self.service_list);
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

				self.service_list.map(item => {
					item.is_show = true;
				})
				this.GetServicePageList(this.page_index);
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
			// 过滤
			FilterField() {
				let self = this;
				let name = self.search_message;

				self.service_list.map(item => {
					let index = item.xingming.indexOf(name);
					if (index == -1) {
						item.is_show = false;
					} else {
						item.is_show = true;
					}
				})

				// 过滤镇
				self.service_list.map(item => {
					if (item.is_show && self.town_value != '所在镇') {
						let index = item.zhuzhi.indexOf(self.town_value);
						if (index == -1) {
							item.is_show = false;
						} else {
							item.is_show = true;
						}
					}
				})

				// 过滤村
				self.service_list.map(item => {
					if (item.is_show && self.village_value != '所在村') {
						let index = item.zhuzhi.indexOf(self.village_value);
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
					obj[next.f_id] ? "" : (obj[next.f_id] = true && newArr.push(next));
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
			// 选择驾驶员状态
			SelectState(e) {
				// console.log(e);
				this.state_value = e.value[0];
				this.state_default_index = e.indexs;
				this.state_show = false;
				this.FilterField();
			},
			// 预览图片
			PreviewImage(urls, index) {
				let self = this;
				uni.previewImage({
					urls: urls,
					current: index,
					loop: true
				});
			},
			// 跳转到调度服务页
			JumpToDispatchService(data) {
				uni.navigateTo({
					url: '../dispatchService/dispatchService?data=' + JSON.stringify(data)
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

				.allow {
					color: #05a310;
				}
			}

			.machine_type {
				width: 62vw;
				text-align: right;
			}

			.healthy_prove {
				height: 120rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 3vw;

				.title {
					font-size: 35rpx;
				}

				.photo_container {
					width: 65vw;
					display: flex;
					align-items: center;
					justify-content: flex-end;

					.photo {
						width: 80rpx;
						height: 100rpx;
						margin-left: 1vw;
					}
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
