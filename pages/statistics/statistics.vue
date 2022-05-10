<template>
	<view class="statistics_container">
		<Navbar title="预约调度统计" icon_color="#ffffff" title_color="#ffffff" border_bottom_color="transparent" />
		<view class="tabs_container">
			<text class="statistics_type" :class="[statistics_type_select_index == index ? 'select' : '']"
				v-for="(item, index) in statistics_type_data" :key="index"
				@click="ChangeStatistics(item.type, index)">{{ item.title }}</text>
		</view>
		<view class="information_container">
			<canvas canvas-id="eCharts_el" id="eCharts_el" class="charts" @touchend="tap" />
		</view>
	</view>
</template>

<script>
	import Navbar from '@/components/navbar/navbar.vue';
	import uCharts from '@/node_modules/@qiun/ucharts/u-charts.js';
	import user from '@/api/api.js';
	var uChartsInstance = {};

	export default {
		components: {
			Navbar,
		},
		data() {
			return {
				statistics_type_data: [{
						type: 1,
						title: '月份统计',
					},
					{
						type: 2,
						title: '区域统计',
					}
				],
				statistics_type_select_index: 0,
				cWidth: 0,
				cHeight: 0
			}
		},
		onLoad() {

		},
		onShow: function() {},
		onReady() {
			// 获取屏幕高度
			let self = this;
			uni.getSystemInfo({
				success(res) {
					// console.log(res.screenWidth); //屏幕宽度
					// console.log(res.screenHeight); //屏幕高度  注意这里获得的高度宽度都是px 需要转换rpx
					console.log(res.windowWidth); //可使用窗口宽度
					console.log(res.windowHeight); //可使用窗口高度
					self.cWidth = res.windowWidth / 1.03;
					self.cHeight = res.windowHeight / 1.2;
				}
			});

			this.GetReportByTime();
		},
		mounted() {

		},
		methods: {
			ChangeStatistics(type, index = 0) {
				this.statistics_type_select_index = index;
				switch (type) {
					case 1:
						this.GetReportByTime();
						break;
					case 2:
						this.GetReportByArea();
						break;
					default:
						break;
				}
			},
			// 月份统计
			GetReportByTime() {
				let options = {
					categories: [],
					series: [{
						name: "月统计",
						data: []
					}]
				};

				user.StatisticsMonth().then(res => {
					console.log('月份统计：');
					console.log(res);
					self.show_loading = false;
					if (res.data.code == 200) {
						res.data.data.map(item => {
							options.categories.push(item.itemvalue);
							if (item.vcount) {
								options.series[0].data.push(item.vcount);
							} else {
								options.series[0].data.push(0);
							}
						})

						this.drawCharts('eCharts_el', options);
					}
				})
			},
			// 区域统计
			GetReportByArea() {
				let options = {
					categories: [],
					series: [{
						name: "区域统计",
						data: []
					}]
				};

				user.StatisticsArea().then(res => {
					console.log('区域统计：');
					console.log(res);
					self.show_loading = false;
					if (res.data.code == 200) {
						res.data.data.map(item => {
							options.categories.push(item.f_areaname);
							if (item.vcount) {
								options.series[0].data.push(item.vcount);
							} else {
								options.series[0].data.push(0);
							}
						})

						this.drawCharts('eCharts_el', options, true);
					}
				})
			},
			drawCharts(id, data, is_rotate = false) {
				const ctx = uni.createCanvasContext(id, this);
				uChartsInstance[id] = new uCharts({
					type: "column",
					context: ctx,
					width: this.cWidth,
					height: this.cHeight,
					categories: data.categories,
					series: data.series,
					animation: true,
					fontSize: 10,
					fontColor: '#5799fc',
					background: "#FFFFFF",
					// color: ["#FAC858", "#EE6666", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4",
					// 	"#ea7ccc"
					// ],
					padding: is_rotate ? [25, -10, 0, 0] : [25, 2, 0, 0],
					legend: {
						show: false,
					},
					xAxis: {
						disableGrid: true
					},
					yAxis: {
						data: [{
							min: 0
						}]
					},
					rotate: is_rotate,
					extra: {
						column: {
							type: "group",
							width: 15,
							activeBgColor: "#000000",
							activeBgOpacity: 0.08,
							linearType: "custom",
							seriesGap: 5,
							linearOpacity: 0.7,
							barBorderCircle: true,
							customColor: [
								"#4a70fc",
								"#3dbffc"
							]
						}
					}
				});
			},
			tap(e) {
				uChartsInstance[e.target.id].touchLegend(e);
				uChartsInstance[e.target.id].showToolTip(e);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.statistics_container {
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

		.tabs_container {
			width: 96vw;
			height: 3vh;
			margin-left: 2vw;
			display: flex;
			justify-content: space-around;

			.statistics_type {
				width: 16vw;
				height: 3vh;
				line-height: 3vh;
				text-align: center;
				color: white;
			}

			.select {
				font-weight: bold;
				border-bottom: 2rpx solid white;
			}
		}

		.information_container {
			width: 96vw;
			height: 86vh;
			margin: 1vh 0 0 2vw;
			background: white;
			border-radius: 10rpx;
			box-shadow: 0rpx 10rpx 10rpx #d6daea;

			.charts {
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
