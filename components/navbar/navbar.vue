<template>
	<view class="navbar" :style="navbarStyle" @click="Back">
		<u-icon class="back_img" name="arrow-left" :color="icon_color"></u-icon>
		<text class="title" :style="titleStyle">{{ title }}</text>
	</view>
</template>

<script>
	export default {
		props: [
			'title',
			'background',
			'border_bottom_color',
			'icon_color',
			'title_color',
		],
		data() {
			return {}
		},
		mounted() {

		},
		methods: {
			Back() {
				uni.navigateBack();
			},
		},
		computed: {
			navbarStyle: function() {
				return {
					background: this.background,
					borderBottom: `1rpx solid ${this.border_bottom_color}`
				}

			},
			titleStyle: function() {
				return {
					color: this.title_color
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	.navbar {
		height: 9vh;
		display: flex;
		align-items: flex-end;
		border-bottom: 1rpx solid #e5e5e5;
		
		.back_img {
			margin: 0 0 2vh 1vw;
		}

		.title {
			height: 35rpx;
			line-height: 35rpx;
			color: white;
			font-size: 35rpx;
			margin: 0 0 2vh 1vw;
			letter-spacing: 5rpx
		}
	}
	
	/deep/ .u-icon__icon.uicon-arrow-left {
		height: 30rpx;
		line-height: 30rpx !important;
		font-size: 35rpx !important;
		font-weight: bold !important;
	}
</style>
