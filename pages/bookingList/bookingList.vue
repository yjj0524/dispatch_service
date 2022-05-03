<template>
	<view class="booking_container">
		<Navbar title="农机预约列表" background="#FFFFFF" icon_color="black" title_color="black" />
		<view class="search_container">
			<view class="search_item">
				<view class="search">
					<image class="search_img" src="@/static/images/booking/search.png" mode=""></image>
					<input class="search_input" type="text" value="" placeholder="输入姓名" />
				</view>
				<button class="search_btn" type="default">搜索</button>
			</view>
			<view class="select_item">
				<view class="item" @click="village_show = true">
					<view class="title">{{ village_value }}</view>
					<image class="img" src="@/static/images/booking/arrow.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="information_container">
			<scroll-view scroll-y="true" style="height: 80vh;">
				<view class="information_item" v-for="(item, index) in service_list" :key="index">
					<view class="information">
						<image class="portrait" src="@/static/images/booking/portrait.png" mode=""></image>
						<text class="title">{{ item.xingming }}</text>
						<button class="booking_btn" type="default" @click="JumpToDispatchService(item)">调度</button>
					</view>
					<view class="item state">
						<text class="title">状态 :</text>
						<text class="result allow">可执行</text>
					</view>
					<view class="item villages_town">
						<text class="title">村镇 :</text>
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
						<text class="title">操作农机 :</text>
						<view class="result machine_type">{{ item.suoyouren }} <span>({{ item.jixieleixing }})</span></view>
					</view>
					<view class="healthy_prove">
						<text class="title">健康证明 :</text>
						<view class="photo_container">
							<image class="photo" src="@/static/images/booking/photo.png" mode=""></image>
							<image class="photo" src="@/static/images/booking/photo.png" mode=""></image>
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
				village_default_index: [0],
				// 预约服务列表
				service_list: [],
			}
		},
		mounted() {
			this.GetServicePageList(this.page_index);
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
					console.log(res);
					self.show_loading = false;

					if (res.data.code == 200) {
						let datas = res.data.data.rows;

						datas = datas.filter((item) => {
							return item.f_id != 'string' && item.f_id != '123';
						})
						
						for (let i = 0; i < datas.length; i++) {
							let stime = datas[i].stime;
							
							if (stime) {
								let index = stime.indexOf('T');
								
								stime = stime.slice(0, index);
								
								datas[i].stime = stime;
							}
						}

						self.service_list = self.service_list.concat(datas);
						if (res.data.data.rows.length == rows) {
							self.page_index++;
						}
					}
				})
			},
			// 加载更多
			LoadingMore() {
				this.GetServicePageList(this.page_index);
			},
			// 选择村
			SelectVillage(e) {
				// console.log(e);
				this.village_value = e.value[0];
				this.village_default_index = e.indexs;
				this.village_show = false;
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
					border-radius: 60rpx;
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
					width: 50vw;
					display: flex;
					align-items: center;

					.title {
						width: 20vw;
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

					.photo {
						width: 15vw;
						height: 10vw;
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
