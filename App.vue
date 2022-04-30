<script>
	export default {
		onLaunch: function() {
			// #ifdef APP-PLUS
			// 关闭程序启动界面
			plus.navigator.closeSplashscreen();
			// #endif
			// console.log('App Launch')
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "@/components/uview-ui/index.scss";

	/*每个页面公共css */
	html,
	body,
	page {
		margin: 0;
		padding: 0;
		font-size: 30rpx;

		uni-button {
			margin: 0;
		}

		// 提示框
		/deep/ .u-transition.u-fade-enter-to.u-fade-enter-active .u-toast__content {
			height: 45rpx;
		}

		/deep/ .u-transition.u-fade-enter-to.u-fade-enter-active .u-icon__icon {
			margin-right: 15rpx !important;
			font-size: 45rpx !important;
		}

		/deep/ .u-transition.u-fade-enter-to.u-fade-enter-active .u-toast__content__text {
			font-size: 45rpx !important;
		}

		// picker
		/deep/ .u-popup .u-toolbar {
			height: 100rpx !important;
			border-bottom: 1rpx solid #e5e5e5;
		}

		/deep/ .u-popup .u-picker__view {
			height: 350rpx !important;
		}

		/deep/ .u-popup .u-toolbar__wrapper__cancel {
			font-size: 35rpx;
		}

		/deep/ .u-popup .u-toolbar__wrapper__confirm {
			font-size: 35rpx;
		}

		/deep/ .u-popup .uni-picker-view-indicator {
			height: 70rpx !important;
		}

		/deep/ .u-popup .u-picker__view__column__item {
			font-size: 40rpx;
			height: 70rpx !important;
			line-height: 70rpx !important;
			font-weight: initial !important;
		}

		// 确认框
		/deep/ .u-popup__content .u-modal__title {
			font-size: 40rpx;
		}

		/deep/ .u-popup__content .u-modal__button-group__wrapper__text {
			font-size: 40rpx;
		}

		/deep/ .u-popup__content .u-modal__button-group__wrapper {
			height: 100rpx;
		}
		
		// List索引列表
		/deep/ .u-index-list .u-index-anchor.u-border-bottom {
			height: 50rpx !important;
		}
		
		/deep/ .u-index-list .u-index-anchor__text {
			font-size: 35rpx !important;
		}
		
		/deep/ .u-index-list .u-index-list__letter__item {
			width: 35rpx !important;
			height: 35rpx !important;
		}
		
		/deep/ .u-index-list .u-index-list__letter__item__index {
			font-size: 28rpx !important;
			line-height: 50rpx !important;
		}
		
		/deep/ .u-index-list .u-transition.u-fade-enter-to.u-fade-enter-active {
			display: none !important;
		}
	}
</style>
