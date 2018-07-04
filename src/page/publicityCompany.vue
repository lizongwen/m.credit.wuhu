<template>
	<div class="publicityCompany">
		<div class="company-title">
			<div class="company-title-left">
				<p style="color:rgba(0,0,0,0.8)">{{detail.name}}</p>
				<p style="font-size: 12px; color: rgba(46,46,46,0.6);">{{detail.desc}}：
					<span>{{detail.tyshxydm}}</span>
				</p>
				<p style="font-size: 12px; color: rgba(46,46,46,0.6);">共有{{detail.total}}条{{detail.label}}信息</p>
			</div>
			<img src="../img/black.png" />
		</div>
		<div class="content-title">
			<p style="margin-left: 10px;">{{detail.label}}公示</p>
		</div>
		<div>
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
		</div>

	</div>
</template>

<script>
export default {
  data() {
    return {
      ztlx: "",
      mc: "",
      activeName: "1",
      gslb: null,
      detail: {
        name: "",
        desc: "",
        total: "",
        label: "",
        tyshxydm: ""
      }
    };
  },
  mounted() {
    this.ztlx = this.$route.query.ztlx;
    this.mc = this.$route.query.mc;
    this.gslb = this.$route.query.gslb;
    switch (this.ztlx) {
      case "1":
        this.detail.desc = "身份证号码";
        break;
      case "2":
        this.detail.desc = "统一社会信用代码";
        break;
    }
    switch (this.gslb) {
      case "0":
        this.detail.label = "红名单";
        break;
      case "1":
        this.detail.label = "黑名单";
        break;
      case "2":
        this.detail.label = "失信被执行人";
        break;
    }
    this.getHeadInfo();
  },
  methods: {
    getHeadInfo: async function() {
      let params = { ztlx: this.ztlx, xzxdrmc: this.mc };
      const res = await this.$http.post(
        "/webApp/credit/infoRedHeadResult",
        params
      );
      if (res.data.resultCode == "0000") {
        console.log(res.data.resultData);
        this.detail.name = res.data.resultData.xzxdrmc;
        this.detail.tyshxydm = res.data.resultData.tyshxydm;
        this.detail.total = res.data.resultData.unTotalCount;
        // this.blacklist = this.blacklist.concat(res.data.resultData.rows);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.publicityCompany {
  font-size: 16px;
  background: #f6f6f6;
  .company-title {
    height: 98px;
    margin: 10px 0;
    background: #fff;
    .company-title-left {
      float: left;
      padding: 15px 10px;
      p {
        margin-bottom: 6px;
      }
    }
    img {
      float: right;
    }
  }
  .content-title {
    margin: 15px 10px;
    border-left: 4px solid #e23b41;
  }
  .van-collapse {
    .van-collapse-item__content {
      padding: 0px;
      .message {
        font-size: 14px;
        width: 100%;
        border-bottom: 1px solid #ebebeb;
        padding: 10px 0;
        .message-left {
          float: left;
          width: 40%;
        }
        .message-right {
          margin-left: 40%;
        }
      }
    }
  }
}
</style>