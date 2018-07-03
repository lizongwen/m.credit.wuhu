<template>
	<div class="serviceDetail">
		<div class="company-title">
			<div class="company-title-left">
				<p style="color:rgba(0,0,0,0.8)">安徽正元发展有限公司</p>
				<p style="font-size: 12px; color: rgba(46,46,46,0.6);">统一社会信用代码: <span>0000000000000000</span></p>
				<p style="font-size: 12px; color: rgba(46,46,46,0.6);">共有1条失信黑名单信息</p>
			</div>
		</div>
		<div class="tab">
			<van-tabs v-model="active">
				<van-tab title="信用动态">
					<div class="tab_1">
						<van-tabs type="card">
							<van-tab title="企业基本信息" class="tab_subpage">
								<van-collapse v-model="activeName" accordion>
									<van-collapse-item title="2018/06/21  来源: 市国税局" name="1" class="accordion">
										<div>
											<div class="message">
												<div class="message-left">主题类型</div>
												<div class="message-right">法人</div>
											</div>
											<div class="message">
												<div class="message-left">信息记录名称</div>
												<div class="message-right">法人</div>
											</div>
											<div class="message">
												<div class="message-left">行政相对人名称</div>
												<div class="message-right">安徽正元发展有限公司</div>
											</div>
											<div class="message">
												<div class="message-left">身份证号码</div>
												<div class="message-right">00000000000000000</div>
											</div>
											<div class="message">
												<div class="message-left">统一社会信用代码</div>
												<div class="message-right">00000000000000000</div>
											</div>
											<div class="message">
												<div class="message-left">发布部门全称</div>
												<div class="message-right">芜湖市镜湖区人民法院</div>
											</div>
											<div class="message">
												<div class="message-left">发布部门简称</div>
												<div class="message-right">芜湖市镜 湖区人民法院</div>
											</div>
											<div class="message">
												<div class="message-left">发布名称</div>
												<div class="message-right">失信被执行人</div>
											</div>
											<div class="message">
												<div class="message-left">主要内容</div>
												<div class="message-right">失信被执行人失信被执行人失信被执行人</div>
											</div>
										</div>

									</van-collapse-item>
									<div class="interspace"></div>
									<van-collapse-item title="2018/06/21  来源: 市国税局" name="2">
										网店吸粉获客、会员分层营销、一机多种收款，告别经营低效和客户流失
									</van-collapse-item>
									<van-collapse-item title="2018/06/21  来源: 市国税局" name="3">
										线上拓客，随时预约，贴心顺手的开单收银
									</van-collapse-item>
								</van-collapse>
							</van-tab>
							<van-tab title="行政许可信息" class="tab_subpage">
								<van-collapse v-model="activeName" accordion>
									<van-collapse-item title="2018/06/21  来源: 市国税局" name="1" class="accordion">
										<div>
											<div class="message">
												<div class="message-left">主题类型</div>
												<div class="message-right">法人</div>
											</div>
											<div class="message">
												<div class="message-left">信息记录名称</div>
												<div class="message-right">法人</div>
											</div>
											<div class="message">
												<div class="message-left">行政相对人名称</div>
												<div class="message-right">安徽正元发展有限公司</div>
											</div>
											<div class="message">
												<div class="message-left">身份证号码</div>
												<div class="message-right">00000000000000000</div>
											</div>
											<div class="message">
												<div class="message-left">统一社会信用代码</div>
												<div class="message-right">00000000000000000</div>
											</div>
											<div class="message">
												<div class="message-left">发布部门全称</div>
												<div class="message-right">芜湖市镜湖区人民法院</div>
											</div>
											<div class="message">
												<div class="message-left">发布部门简称</div>
												<div class="message-right">芜湖市镜 湖区人民法院</div>
											</div>
											<div class="message">
												<div class="message-left">发布名称</div>
												<div class="message-right">失信被执行人</div>
											</div>
											<div class="message">
												<div class="message-left">主要内容</div>
												<div class="message-right">失信被执行人失信被执行人失信被执行人</div>
											</div>
										</div>

									</van-collapse-item>
									<div class="interspace"></div>
									<van-collapse-item title="2018/06/21  来源: 市国税局" name="2">
										网店吸粉获客、会员分层营销、一机多种收款，告别经营低效和客户流失
									</van-collapse-item>
									<van-collapse-item title="2018/06/21  来源: 市国税局" name="3">
										线上拓客，随时预约，贴心顺手的开单收银
									</van-collapse-item>
								</van-collapse>
							</van-tab>

						</van-tabs>
					</div>
				</van-tab>
				<van-tab title="政策法规">
					<div>2</div>
				</van-tab>
				<van-tab title="县区信用监测">
					<div>3</div>
				</van-tab>
			</van-tabs>
		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				activeName: '1',
				active: 0
			};
		}
	};
</script>

<style lang="scss" scoped>
	.serviceDetail {
		font-size: 16px;
		background: #f6f6f6;
		.company-title {
			height: 98px;
			margin-top: 10px;
			background: #fff;
			.company-title-left {
				float: left;
				padding: 15px 10px;
				p {
					margin-bottom: 6px;
				}
			}
		}
		.tab {
			.tab_1 {
				height: 54px;
				background: #fff;
				padding: 15px 0px;
				.tab_subpage {
					padding: 20px 0px;
					background: #fff;
					/*color: #E23B41;*/
				}
			}
		}
		.van-collapse {
			.van-collapse-item__content {
				padding: 0px;
				.message {
					font-size: 14px;
					width: 100%;
					border-bottom: 1px solid #EBEBEB;
					padding: 10px 0;
					.message-left{
						float: left;
						width: 40%;
					}
					.message-right{
						margin-left: 40%;
					}
				}
			}
		}
	}
</style>