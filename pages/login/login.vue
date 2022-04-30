<template>
	<view class="login_container">
		<!-- logo -->
		<view class="logo_container">
			<image class="logo_img" src="@/static/login/tractor.png" mode="aspectFit"></image>
		</view>
		<!-- 登录 -->
		<u--form :model="form" ref="uForm" class="u_form">
			<u-form-item label="" prop="account">
				<view class="dev">
					<image src="@/static/login/account.png" mode="aspectFit"></image>
					<u-input border="false" class="input" v-model="form.account" placeholder="输入账号"
						placeholderStyle="color: #999999" />
				</view>
			</u-form-item>
			<u-form-item label="" prop="password">
				<view class="dev">
					<image src="@/static/login/password.png" mode="aspectFit"></image>
					<u--input border="false" v-show="!isShowPassword" class="input" type="password"
						v-model="form.password" placeholder="输入密码" placeholderStyle="color: #999999" />
					</u--input>
					<u--input border="false" v-show="isShowPassword" class="input" type="text" v-model="form.password"
						placeholder="输入密码" placeholderStyle="color: #999999" />
					</u--input>
					<image class="eye_img"
						:src="isShowPassword ? '../../static/login/show_password.png' : '../../static/login/hide_password.png'"
						mode="aspectFit" @click="isShowPasswordClick">
					</image>
				</view>
			</u-form-item>
		</u--form>
		<u-button class="submit_btn" :ripple="true" @click="submit">登 录</u-button>
		<u--text class="version" align="center" color="#999999" text="版本号: V.01.01"></u--text>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>
<script>
	import user from '@/api/login.js'
	export default {
		data() {
			return {
				form: {
					account: '',
					password: ''
				},
				rules: {
					account: [{
						required: false,
						message: '请输入账号',
						// 可以单个或者同时写两个触发验证方式
						trigger: ['change', 'blur']
					}],
					password: [{
						required: false,
						message: '请输入密码',
						// 可以单个或者同时写两个触发验证方式
						trigger: ['change', 'blur']
					}]
				},
				isShowPassword: false // 是否显示密码
			};
		},
		onLoad() {},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		created() {},
		methods: {
			// 显示密码
			isShowPasswordClick() {
				this.isShowPassword = !this.isShowPassword;
			},
			// 登录
			submit() {
				let self = this;

				user.login({
					"account": "xxzx001",
					"password": "e10adc3949ba59abbe56e057f20f883e"
				}).then(res => {
					// console.log(res);
					switch (res.data.code) {
						case 200:
							self.$refs.uToast.show({
								type: 'success',
								position: 'bottom',
								duration: 1000,
								message: "登录成功",
								iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png',
								complete() {
									uni.reLaunch({
										url: '/pages/index/index'
									});
								}
							})
							break;
						case 400:
							self.$refs.uToast.show({
								type: 'error',
								position: 'bottom',
								duration: 2000,
								message: "账号或密码错误",
								iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png',
							})
							break;
					}
				});

				// self.$refs.uForm.validate(valid => {
				// 	if (valid) {
				// 		self.$utils.showLoading('登录中...');
				// 		let username = self.form.account;
				// 		let password = self.$md5(self.form.password);
				// 	} else {
				// 		console.log('验证失败');
				// 	}
				// });
			}
		}
	};
</script>
<style lang="scss" scoped>
	.login_container {
		display: flex;
		flex-direction: column;
		align-items: center;

		.logo_container {
			width: 100vw;
			height: 50vh;
			display: flex;
			justify-content: center;
			align-items: flex-start;
			background-image: url('@/static/login/bg.png');
			background-size: 100% 100%;

			.logo_img {
				margin-top: 8vh;
				width: 350rpx;
				height: 350rpx;
			}
		}

		.u_form {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.dev {
				width: 80vw;
				height: 5.5vh;
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				border-bottom: 1rpx solid #999999;
				margin-bottom: 4vh;

				image {
					width: 45rpx;
					height: 45rpx;
				}

				.eye_img {
					width: 55rpx;
					height: 55rpx;
					margin-right: 40rpx;
				}

				.input {
					padding-left: 30rpx !important;

					/deep/ .u-input__content__field-wrapper__field {
						font-size: 42rpx !important;
					}

					/deep/ .uni-input-placeholder.input-placeholder {
						height: 100rpx;
						line-height: 100rpx;
					}
				}
			}
		}

		.submit_btn {
			margin-top: 9vh;
			width: 90vw;
			height: 7vh;
			font-size: 45rpx;
			border-radius: 100rpx;
			color: white;
			background: blue;
			background-image: linear-gradient(#3dbffc, #4a71fc);
		}

		/deep/ .u-text__value {
			margin-top: 3vh;
			font-size: 30rpx !important;
		}
	}
</style>
