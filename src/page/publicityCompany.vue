<template>
	<div class="publicityCompany">
		<div class="company-title">
			<div class="company-title-left">
				<p style="color:rgba(0,0,0,0.8)">{{detail.name}}</p>
				<p style="font-size: 0.6rem; color: rgba(46,46,46,0.6);">{{detail.desc}}：
					<span>{{detail.tyshxydm}}</span>
				</p>
				<p style="font-size: 0.6rem; color: rgba(46,46,46,0.6);">共有{{detail.total}}条{{detail.label}}信息</p>
			</div>
			<template v-if="gslb==0">
				<div class="gs-label red">红名单</div>

			</template>
			<template v-if="gslb==1">
				<div class="gs-label black">黑名单</div>

			</template>
			<template v-if="gslb==2">
				<div class="gs-label bzxr">失信被执行人</div>
			</template>
		</div>
		<div class="content-title">
			<p style="margin-left: 0.5rem;">{{detail.label}}公示</p>
		</div>
		<div>
			<van-collapse v-model="activeName" accordion>
				<van-collapse-item v-if="gslb==0" v-for="(item,index) in redList" :title="`${item.zhgxsj==null?'':item.zhgxsj}  来源: ${item.fbbmjcSource==null?'':item.fbbmjcSource}`" :name="`${index+1}`" class="accordion" :key="index">
					<div>
						<div class="message">
							<div class="message-left">主体类型</div>
							<div class="message-right">{{item.ztlx=="1"?"自然人":"法人"}}</div>
						</div>
						<div class="message">
							<div class="message-left">信息记录名称</div>
							<div class="message-right">{{item.xxjlmc}}</div>
						</div>
						<div class="message">
							<div class="message-left">行政相对人名称</div>
							<div class="message-right">{{item.xzxdrmc}}</div>
						</div>
						<div class="message">
							<template v-if="item.ztlx==1">
								<div class="message-left">身份证号码</div>
								<div class="message-right">{{item.sfzhm}}</div>
							</template>
							<template v-else>
								<div class="message-left">统一社会信用代码</div>
								<div class="message-right tyshxydm">{{item.tyshxydm}}</div>
							</template>
						</div>
						<div class="message">
							<div class="message-left">发布部门全称</div>
							<div class="message-right">{{item.fbbmqc}}</div>
						</div>
						<div class="message">
							<div class="message-left">发布部门简称</div>
							<div class="message-right">{{item.fbbmjc}}</div>
						</div>
						<div class="message">
							<div class="message-left">发布名称</div>
							<div class="message-right">{{item.fbmc}}</div>
						</div>
						<div class="message">
							<div class="message-left">主要内容</div>
							<div class="message-right">{{item.zynr}}</div>
						</div>
						<div class="message">
							<div class="message-left">发生时间</div>
							<div class="message-right">{{item.fssj}}</div>
						</div>
						<div class="message">
							<div class="message-left">发布时间</div>
							<div class="message-right">{{item.fbsj}}</div>
						</div>
						<div class="message">
							<div class="message-left">行政区划</div>
							<div class="message-right">{{item.xzqh}}</div>
						</div>
					</div>
				</van-collapse-item>
				<van-collapse-item v-if="gslb==1" v-for="(item,index) in blackList" :title="`${item.zhgxsj==null?'':item.zhgxsj}  来源: ${item.fbbmjcSource==null?'':item.fbbmjcSource}`" :name="`${index+1}`" class="accordion" :key="index">
					<div>
						<div class="message">
							<div class="message-left">行政相对人名称</div>
							<div class="message-right">{{item.xzxdrmc}}</div>
						</div>
						<div class="message">
							<template v-if="item.ztlx==1">
								<div class="message-left">身份证号码</div>
								<div class="message-right">{{item.sfzhm}}</div>
							</template>
							<template v-else>
								<div class="message-left">统一社会信用代码</div>
								<div class="message-right tyshxydm">{{item.tyshxydm}}</div>
							</template>
						</div>
						<div class="message">
							<div class="message-left">发布部门全称</div>
							<div class="message-right">{{item.fbbmqc}}</div>
						</div>
						<div class="message">
							<div class="message-left">发布部门简称</div>
							<div class="message-right">{{item.fbbmjc}}</div>
						</div>
						<div class="message">
							<div class="message-left">发布名称</div>
							<div class="message-right">{{item.fbmc}}</div>
						</div>
						<div class="message">
							<div class="message-left">主要内容</div>
							<div class="message-right">{{item.zynr}}</div>
						</div>
						<div class="message">
							<div class="message-left">发生时间</div>
							<div class="message-right">{{item.fssj}}</div>
						</div>
					</div>
				</van-collapse-item>
				<van-collapse-item v-if="gslb==2" v-for="(item,index) in discreditList" :title="`${item.zhgxsj==null?'':item.zhgxsj}  来源: ${item.zxfySource==null?'':item.zxfySource}`" :name="`${index+1}`" class="accordion" :key="index">
					<div>
						<div class="message">
							<div class="message-left">主体类型</div>
							<div class="message-right">{{item.ztlx=="1"?"自然人":"法人"}}</div>
						</div>
						<div class="message">
							<div class="message-left">失信被执行人名称</div>
							<div class="message-right">{{item.sxbzxrmc}}</div>
						</div>
						<div class="message">
							<template v-if="item.ztlx==1">
								<div class="message-left">身份证号码</div>
								<div class="message-right">{{item.sfzhm}}</div>
							</template>
							<template v-else>
								<div class="message-left">统一社会信用代码</div>
								<div class="message-right tyshxydm">{{item.tyshxydm}}</div>
							</template>
						</div>
						<div class="message">
							<div class="message-left">企业法人名称</div>
							<div class="message-right">{{item.qyfrxm}}</div>
						</div>
						<div class="message">
							<div class="message-left">数据来源</div>
							<div class="message-right">{{item.sjly}}</div>
						</div>
						<div class="message">
							<div class="message-left">案号</div>
							<div class="message-right">{{item.ah}}</div>
						</div>
						<div class="message">
							<div class="message-left">执行法院</div>
							<div class="message-right">{{item.zxfySource}}</div>
						</div>
						<div class="message">
							<div class="message-left">地域名称</div>
							<div class="message-right">{{item.dymc}}</div>
						</div>
						<div class="message">
							<div class="message-left">执行依据文号</div>
							<div class="message-right">{{item.zxyjwh}}</div>
						</div>
						<div class="message">
							<div class="message-left">作出执行依据单位</div>
							<div class="message-right">{{item.zczxyjdw}}</div>
						</div>
						<div class="message">
							<div class="message-left">法律生效文书确定的义务</div>
							<div class="message-right">{{item.flwsyw}}</div>
						</div>
						<div class="message">
							<div class="message-left">被执行人的履行情况</div>
							<div class="message-right">{{item.bzxrlxqk}}</div>
						</div>
						<div class="message">
							<div class="message-left">失信被执行人具体情形</div>
							<div class="message-right">{{item.sxbzxrqx}}</div>
						</div>
						<div class="message">
							<div class="message-left">立案时间</div>
							<div class="message-right">{{item.lasj}}</div>
						</div>
						<div class="message">
							<div class="message-left">发布时间</div>
							<div class="message-right">{{item.fbsj}}</div>
						</div>
						<div class="message">
							<div class="message-left">行政区划</div>
							<div class="message-right">{{item.xzqh}}</div>
						</div>
					</div>
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
      },
      redList: [],
      blackList: [],
      discreditList: []
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
        this.getredHeadInfo();
        this.getredFootInfo();
        break;
      case "1":
        this.detail.label = "黑名单";
        this.getblackHeadInfo();
        this.getblackFootInfo();
        break;
      case "2":
        this.detail.label = "失信被执行人";
        this.getDiscreditHeadInfo();
        this.getDiscreditFootInfo();
        break;
    }
  },
  methods: {
    //红名单头部信息
    getredHeadInfo: async function() {
      let params = { ztlx: this.ztlx, xzxdrmc: this.mc };
      const res = await this.$http.post(
        "/webApp/credit/infoRedHeadResult",
        params
      );
      if (res.data.resultCode == "0000") {
        this.detail.name = res.data.resultData.xzxdrmc;
        this.detail.tyshxydm = res.data.resultData.tyshxydm;
        this.detail.total = res.data.resultData.unTotalCount;
      }
    },
    //红名单脚部信息
    getredFootInfo: async function() {
      let params = { xzxdrmc: this.mc,ztlx:this.ztlx };
      const res = await this.$http.post(
        "/webApp/credit/infoRedFootResult",
        params
      );
      if (res.data.resultCode == "0000") {
        this.redList = res.data.resultData;
      }
    },
    //黑名单头部信息
    getblackHeadInfo: async function() {
      let params = { ztlx: this.ztlx, xzxdrmc: this.mc };
      const res = await this.$http.post(
        "/webApp/credit/infoBlackHeadResult",
        params
      );
      if (res.data.resultCode == "0000") {
        this.detail.name = res.data.resultData.xzxdrmc;
        this.detail.tyshxydm = res.data.resultData.tyshxydm;
        this.detail.total = res.data.resultData.unTotalCount;
      }
    },
    //黑名单脚部信息
    getblackFootInfo: async function() {
      let params = { xzxdrmc: this.mc,ztlx:this.ztlx };
      const res = await this.$http.post(
        "/webApp/credit/infoBlackFootResult",
        params
      );
      if (res.data.resultCode == "0000") {
        this.blackList = res.data.resultData;
      }
    },
    //失信被执行人头部信息
    getDiscreditHeadInfo: async function() {
      let params = { ztlx: this.ztlx, sxbzxrmc: this.mc };
      const res = await this.$http.post(
        "/webApp/credit/infoDiscreditHeadResult",
        params
      );
      if (res.data.resultCode == "0000") {
        this.detail.name = res.data.resultData.sxbzxrmc;
        this.detail.tyshxydm = res.data.resultData.tyshxydm;
        this.detail.total = res.data.resultData.unTotalCount;
      }
    },
    //失信被执行人脚部信息
    getDiscreditFootInfo: async function() {
      let params = { sxbzxrmc: this.mc,ztlx:this.ztlx };
      const res = await this.$http.post(
        "/webApp/credit/infoDiscreditFootResult",
        params
      );
      if (res.data.resultCode == "0000") {
        this.discreditList = res.data.resultData;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.publicityCompany {
  font-size: 0.8rem;
  background: #f6f6f6;
  .company-title {
    position: relative;
    height: 4.9rem;
    margin: 0.5rem 0;
    background: #fff;
    .company-title-left {
      float: left;
      padding: 0.75rem 0.5rem;
      p {
        margin-bottom: 0.3rem;
      }
    }
    .gs-label {
      position: absolute;
      right: 0.6rem;
      top: 0.6rem;
      padding: 0.2rem 0.65rem;
      font-size: 0.6rem;
      &.red {
        background: #e23b41;
        color: #fff;
      }
      &.black {
        background: #000;
        color: #fff;
      }
      &.bzxr {
        border: 1px solid #e23b41;
        color: #e23b41;
      }
    }
    img {
      float: right;
    }
  }
  .content-title {
    margin: 0.75rem 0.5rem;
    border-left: 0.2rem solid #e23b41;
  }
  .van-collapse {
    .van-collapse-item__content {
      padding: 0rem;
      .message {
        font-size: 0.7rem;
        width: 100%;
        border-bottom: 0.05rem solid #ebebeb;
        padding: 0.5rem 0;
        ::after {
          content: "";
          display: table;
          clear: both;
        }
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