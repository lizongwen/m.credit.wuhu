<template>
	<div class="serviceDetail">
		<div class="company-title">
			<div class="company-title-left">
				<p style="color:rgba(0,0,0,0.8)">{{detail.name}}</p>
				<p style="font-size: 0.6rem; color: rgba(46,46,46,0.6);">统一社会信用代码：
					<span>{{detail.code}}</span>
				</p>
				<p style="font-size: 0.6rem; color: rgba(46,46,46,0.6);">{{detail.addr}}</p>
			</div>
		</div>
		<div class="tab">
			<van-tabs v-model="active">
				<van-tab title="基本信息">
					<div class="sub-tab">
						<van-tabs type="card" v-model="subactive">
							<van-tab title="企业基本信息" class="tab_subpage">
								<van-collapse v-model="activeName">
									<van-collapse-item title="企业基本信息" name="1">
										<div>
											<div class="message" v-for="(item,index) in detailBase" :key="index">
												<div class="message-left">{{item.tempTableNote}}</div>
												<div class="message-right">{{item.dynamicValue}}</div>
											</div>
										</div>
									</van-collapse-item>
								</van-collapse>
							</van-tab>
							<van-tab title="行政许可信息" class="tab_subpage">
								<van-collapse v-model="activeName">
									<van-collapse-item v-for="(item,index) in detailXzxx" :key="index" :title="`行政许可信息${index+1}`" :name="`${index+1}`">
										<div>
											<div class="message" v-for="(value,key) in item" :key="key">
												<div class="message-left">{{value.tempTableNote}}</div>
												<div class="message-right">{{value.dynamicValue}}</div>
											</div>
										</div>
									</van-collapse-item>
								</van-collapse>
							</van-tab>
						</van-tabs>
					</div>
				</van-tab>
				<van-tab title="良好信息">
					<div class="sub-tab">
						<van-tabs type="card" v-model="subactive1">
							<van-tab title="表彰奖励信息" class="tab_subpage">
								<van-collapse v-model="activeName">
									<van-collapse-item v-for="(item,index) in detailBzjl" :key="index" :title="`表彰奖励信息${index+1}`" :name="`${index+1}`">
										<div>
											<div class="message" v-for="(value,key) in item" :key="key">
												<div class="message-left">{{value.tempTableNote}}</div>
												<div class="message-right">{{value.dynamicValue}}</div>
											</div>
										</div>
									</van-collapse-item>
								</van-collapse>
							</van-tab>
						</van-tabs>
					</div>
				</van-tab>
				<van-tab title="不良信息">
					<div class="sub-tab">
						<van-tabs type="card" v-model="subactive2">
							<van-tab title="行政处罚信息" class="tab_subpage">
								<van-collapse v-model="activeName">
									<van-collapse-item v-for="(item,index) in detailCFxx" :key="index" :title="`行政处罚信息${index+1}`" :name="`${index+1}`">
										<div>
											<div class="message" v-for="(value,key) in item" :key="key">
												<div class="message-left">{{value.tempTableNote}}</div>
												<div class="message-right">{{value.dynamicValue}}</div>
											</div>
										</div>
									</van-collapse-item>
								</van-collapse>
							</van-tab>
						</van-tabs>
					</div>
				</van-tab>
			</van-tabs>
		</div>

	</div>
</template>

<script>
export default {
  data() {
    return {
      activeName: ['1'],
      companyId: "",
      companyName: "",
      active: 0,
      subactive: 0,
      subactive1: 0,
      subactive2: 0,
      detail: {
        name: "",
        code: "",
        addr: ""
      },
      detailBase: [],
      detailXzxx: [],
      detailBzjl: [],
      detailCFxx: []
    };
  },
  mounted() {
    this.companyId = this.$route.query.id;
    this.companyName = this.$route.query.companyName;
    this.getCompanyInfo();
    this.getDtInfo(9); // 企业基本信息 9
    this.getDtInfo(14); // 行政许可信息 14
    this.getDtInfo(6); // 表彰奖励信息 6
    this.getDtInfo(21); // 行政处罚信息 21
  },
  methods: {
    getCompanyInfo: async function() {
      let params = { id: this.companyId };
      const res = await this.$http.post(
        "/webApp/creditServer/creditServerDetail",
        params
      );
      if (res.data.resultCode == "0000") {
        this.detail.name = res.data.resultData.qymc;
        this.detail.code = res.data.resultData.tyshxydm;
        this.detail.addr = res.data.resultData.qydz;
      }
    },

    getDtInfo: async function(id) {
      let params = { categoryId: id, companyName: this.companyName };
      const res = await this.$http.post(
        "/webApp/creditServer/getDynamicData",
        params
      );
      if (res.data.resultCode == "0000" && res.data.resultData.length > 0) {
        if (id == 9) {
          this.detailBase = res.data.resultData[0];
        }
        if (id == 14) {
          this.detailXzxx = res.data.resultData;
        }
        if (id == 6) {
          this.detailBzjl = res.data.resultData;
        }
        if (id == 21) {
          this.detailCFxx = res.data.resultData;
        }
      }
    }
  }
};
</script>

<style lang="scss">
.serviceDetail {
  font-size: 0.8rem;
  background: #f6f6f6;
  .company-title {
    min-height: 4.9rem;
    margin-top: 0.5rem;
    background: #fff;
    .company-title-left {
      float: left;
      padding: 0.75rem 0.5rem;
      p {
        margin-bottom: 0.3rem;
      }
    }
  }
  .tab {
    .sub-tab {
      background: #fff;
      padding-top: 0.75rem;
      .tab_subpage {
        padding: 1rem 0rem;
        background: #fff;
        .label {
          max-width: 8rem;
        }
      }
    }
  }
  .van-collapse {
    .van-collapse-item__content {
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