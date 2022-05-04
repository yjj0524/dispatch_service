<template>
	<view class="statistics_container">
		<Navbar title="预约调度统计" icon_color="#ffffff" title_color="#ffffff" border_bottom_color="transparent" />
		<view class="tabs_container">
			<text class="statistics_type" :class="[statistics_type_select_index == index ? 'select' : '']"
				v-for="(item, index) of 4" :key="index" @click="ChangeStatisticsType(index)">统计类型</text>
		</view>
		<view class="information_container">
			<canvas canvas-id="JjjddMljoQxuUyfliJFrbJJKckcUnYOo" id="JjjddMljoQxuUyfliJFrbJJKckcUnYOo" class="charts"
				@touchend="tap" />
		</view>
	</view>
</template>

<script>
	import Navbar from '@/components/navbar/navbar.vue';
	import uCharts from '@/node_modules/@qiun/ucharts/u-charts.js';
	var uChartsInstance = {};

	export default {
		components: {
			Navbar,
		},
		data() {
			return {
				statistics_type_select_index: 0,
				cWidth: 0,
				cHeight: 0
			}
		},
		onLoad() {

		},
		onShow: function() {},
		onReady() {
			// //这里的 750 对应 css .charts 的 width
			// this.cWidth = uni.upx2px(750);
			// //这里的 500 对应 css .charts 的 height
			// this.cHeight = uni.upx2px(500);

			// 获取屏幕高度
			let self = this;
			uni.getSystemInfo({
				success(res) {
					console.log(res.screenHeight); //屏幕高度  注意这里获得的高度宽度都是px 需要转换rpx
					console.log(res.windowWidth); //可使用窗口宽度
					console.log(res.windowHeight); //可使用窗口高度
					console.log(res.screenWidth); //屏幕宽度
					self.cWidth = res.windowWidth / 1.03;
					self.cHeight = res.windowHeight / 1.2;
				}
			});

			this.getServerData();
		},
		mounted() {

		},
		methods: {
			ChangeStatisticsType(index) {
				this.statistics_type_select_index = index;
			},

			getServerData() {
				let res = {
					categories: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月",
						"12月"
					],
					series: [{
						name: "目标值",
						data: [55, 26, 81, 33, 13, 34, 22, 53, 91, 12, 63, 23]
					}, ]
				};
				this.drawCharts('JjjddMljoQxuUyfliJFrbJJKckcUnYOo', res);
			},
			drawCharts(id, data) {
				const ctx = uni.createCanvasContext(id, this);
				uChartsInstance[id] = new uCharts({
					type: "column",
					context: ctx,
					width: this.cWidth,
					height: this.cHeight,
					categories: data.categories,
					series: data.series,
					animation: true,
					background: "#FFFFFF",
					// color: ["#FAC858", "#EE6666", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4",
					// 	"#ea7ccc"
					// ],
					padding: [15, 15, 0, 5],
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
			height: 84vh;
			margin: 2vh 0 0 2vw;
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
