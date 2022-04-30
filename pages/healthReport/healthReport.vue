<template>
	<view class="health_report_container">
		<Navbar title="每日健康申报" background="#FFFFFF" icon_color="black" title_color="black" />
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
			</view>
		</view>
		<view class="information_container">
			<scroll-view scroll-y="true" style="height: 80vh;">
				<u-index-list :index-list="indexList" :sticky="false" customNavHeight="100">
					<template v-for="(item, index) in itemArr">
						<u-index-item>
							<!-- #ifndef APP-NVUE -->
							<u-index-anchor :text="indexList[index]"></u-index-anchor>
							<!-- #endif -->
							<view class="list_cell" v-for="(cell, index) in item" :key="index">
								<image class="portrait_img" src="@/static/booking/portrait.png" mode=""></image>
								<view class="message">
									<text class="title">{{ cell }}</text>
									<text class="villages_town">村镇</text>
								</view>
								<u-button class="report_btn" :ripple="true">申报</u-button>
							</view>
						</u-index-item>
					</template>
				</u-index-list>
			</scroll-view>
		</view>
		<!-- 村选项 -->
		<u-picker :show="village_show" :columns="village_columns" :closeOnClickOverlay="true"
			@close="village_show = false" @cancel="village_show = false" :defaultIndex="village_default_index">
		</u-picker>
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
				indexList: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
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
			}
		},
		mounted() {

		},
		methods: {}
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

			.list_cell {
				display: flex;
				align-items: center;
				justify-content: flex-start;
				box-sizing: border-box;
				width: 100%;
				padding: 0 24rpx;
				height: 150rpx;
				font-size: 35rpx;
				overflow: hidden;
				color: #323233;
				background-color: #fff;
				border-bottom: 2rpx solid #e5e5e5;

				.portrait_img {
					width: 100rpx;
					height: 100rpx;
					margin-right: 7vw;
				}

				.message {
					width: 40vw;
					display: flex;
					align-items: flex-start;
					flex-direction: column;

					.title {
						font-size: 40rpx;
					}
					
					.villages_town {
						color: #aeaeae;
						font-size: 30rpx;
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
		}
	}
</style>
