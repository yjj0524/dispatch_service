<template>
	<view class="health_report_container">
		<Navbar title="申报" background="#FFFFFF" icon_color="black" title_color="black" />
		<view class="container">
			<view class="information_container">
				<view class="item head_portrait">
					<image class="head_portrait_img" src="@/static/images/booking/portrait.png" mode=""></image>
					<text class="head_portrait_title">{{ driver_data.xingMing }}</text>
				</view>
				<view class="item">
					<text class="item_title_1">性别 :</text>
					<text class="item_title_2">{{ driver_data.xingBie }}</text>
				</view>
				<view class="item">
					<text class="item_title_1">地址 :</text>
					<text class="item_title_2">{{ driver_data.zhuZhi }}</text>
				</view>
				<view class="prove_container">
					<view class="prove">健康证明 :</view>
					<view class="prove_img_container">
						<view class="img_item" v-for="(item, index) in mark_file" :key="index">
							<image src="@/static/images/booking/delete.png" mode="" class="img_delete"
								@click="DeleteImage(index, index)"></image>
							<image class="img" :src="item" mode="" @click="PreviewImage(index)"></image>
						</view>
						<image class="prove_img" @click="ChooseImage" src="@/static/images/booking/add_photo.png"
							mode=""></image>
					</view>
				</view>
			</view>
			<button class="submit_btn" type="default" @click="SubmitMarkFile">提交</button>
		</view>
		<!-- loading容器 -->
		<view class="loading_container" v-show="show_loading">
			<u-loadmore class="loading_icon" status="loading" loadingText="提交中" loadingIcon="spinner" />
		</view>
		<u-toast ref="uToast"></u-toast>
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
				// 驾驶员数据
				driver_data: null,
				prove_img_data: [],
				// 健康证明
				mark_file: [],
				show_loading: false,
			}
		},
		onLoad(data) {
			// console.log(data.data);
			if (JSON.stringify(data) != "{}") {
				this.driver_data = JSON.parse(data.data);
				console.log(this.driver_data);
			}
		},
		mounted() {},
		methods: {
			// 拍照/选择图片
			ChooseImage() {
				const self = this;
				uni.chooseImage({
					sizeType: ['original', 'compressed'],
					sourceType: ['camera', 'album'],
					success: (res) => {
						let temp_file_paths = res.tempFilePaths;
						// temp_file_paths.map(item => {
						// 	self.prove_img_data.push(item);
						// })

						// 上传图片
						let upUrl = "http://www.shsninfo.com:1238";
						temp_file_paths.map(item => {
							uni.uploadFile({
								url: upUrl + '/system/annexesfile/Upload',
								filePath: item,
								file: temp_file_paths,
								name: 'file',
								success: (res) => {
									var data = JSON.parse(res.data);
									if (data.code == 200) {
										var url = upUrl + data.data;
										console.log('上传图片成功:');
										// console.log(res);
										console.log(url);
										self.mark_file.push(url);
									}
								},
								fail: (err) => {
									console.log('上传图片失败:');
									console.log(err)
								}
							})
						})
					}
				});
			},
			// 预览图片
			PreviewImage(index) {
				let self = this;
				uni.previewImage({
					urls: self.mark_file,
					current: index,
					loop: true
				});
			},
			// 删除图片
			DeleteImage(key) {
				this.mark_file.splice(key, 1);
			},
			// 提交健康证明
			SubmitMarkFile() {
				let self = this;
				let mark_file = [];
				
				if (!self.mark_file.length) {
					self.$refs.uToast.show({
						type: 'error',
						position: 'bottom',
						duration: 1200,
						message: "请上传健康证明",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png',
					})
					
					return;
				}
				
				self.show_loading = true;
				
				self.mark_file.map(item => {
					mark_file.push(item.replace(/\\/g, '/'));
				})
				debugger
				return
				
				user.DriverMark({
					"driver_Id": self.driver_data.f_Id,
					"markFile": mark_file.join(),
				}).then(res => {
					console.log(res);
					self.show_loading = false;
					if (res.data.code == 200) {
						self.$refs.uToast.show({
							type: 'success',
							position: 'bottom',
							duration: 1000,
							message: "提交成功",
							iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png',
							complete() {
								uni.navigateBack();
							}
						})
					}
				})
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

		.container {
			width: 100vw;
			height: 85vh;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-between;

			.information_container {
				width: 100vw;

				.item {
					width: 100vw;
					height: 6vh;
					font-size: 30rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					border-bottom: 1rpx solid #e5e5e5;
				}

				.head_portrait {
					width: 100vw;
					height: 10vh;
					justify-content: flex-start;

					.head_portrait_img {
						width: 100rpx;
						height: 100rpx;
						margin: 0 5vw 0 3vw;
					}

					.head_portrait_title {
						font-size: 40rpx;
					}
				}

				.item_title_1 {
					margin-left: 3vw;
				}

				.item_title_2 {
					margin-right: 3vw;
					color: #9a9a9a;
				}

				.prove_container {
					width: 100vw;
					height: 15vh;
					border-bottom: 1rpx solid #e5e5e5;

					.prove {
						height: 5vh;
						line-height: 5vh;
						font-size: 30rpx;
						margin-left: 3vw;
					}

					.prove_img_container {
						width: 97vw;
						height: 10vh;
						display: flex;
						align-items: center;

						.img_item {
							display: inline-block;
							position: relative;
							height: 100rpx;
							margin-left: 3vw;

							.img_delete {
								width: 30rpx;
								height: 30rpx;
								z-index: 9;
								position: absolute;
								top: -10rpx;
								right: -10rpx;
							}

							.img {
								width: 80rpx;
								height: 100rpx;
							}
						}

						.prove_img {
							width: 100rpx;
							height: 80rpx;
							margin-left: 5vw;
						}
					}
				}
			}

			.submit_btn {
				width: 94vw;
				height: 7vh;
				line-height: 7vh;
				font-size: 45rpx;
				border-radius: 100rpx;
				color: white;
				letter-spacing: 5rpx;
				background-image: linear-gradient(#01bff9, #015eea);
			}
		}

		.loading_container {
			width: 100vw;
			height: 100vh;
			background: rgba(102, 102, 102, .2);
			position: absolute;
			top: 0;
			left: 0;

			.loading_icon {
				position: absolute;
				top: 50%;
				left: 0;
				right: 0;
				border: 0;
				margin: auto;
			}
		}
	}
</style>
