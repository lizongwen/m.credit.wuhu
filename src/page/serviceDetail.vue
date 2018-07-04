<template>
	<div class="serviceDetail">
		<div class="company-title">
			<div class="company-title-left">
				<p style="color:rgba(0,0,0,0.8)">{{detail.name}}</p>
				<p style="font-size: 12px; color: rgba(46,46,46,0.6);">统一社会信用代码：
					<span>{{detail.tyshxydm}}</span>
				</p>
				<p style="font-size: 12px; color: rgba(46,46,46,0.6);">{{detail.addr}}</p>
			</div>
		</div>
		<div class="tab">
			<van-tabs v-model="active">
				<van-tab title="信用动态">
					<div class="sub-tab">
						<van-tabs type="card">
							<van-tab title="企业基本信息" class="tab_subpage">
								<van-cell>
									<div class="van-ellipsis fl label">aaa</div>
									<div class="fr">bbbbbbbbbbbb</div>
								</van-cell>
							</van-tab>
							<van-tab title="行政许可信息" class="tab_subpage">
								<van-cell>
									<div class="van-ellipsis fl label">aaa</div>
									<div class="fr">bbbbbbbbbbbb</div>
								</van-cell>
							</van-tab>
						</van-tabs>
					</div>
				</van-tab>
				<van-tab title="良好信息">
					<van-cell>
						<div class="van-ellipsis fl label">aaa</div>
						<div class="fr">bbbbbbbbbbbb</div>
					</van-cell>
					<van-cell>
						<div class="van-ellipsis fl label">aaa</div>
						<div class="fr">bbbbbbbbbbbb</div>
					</van-cell>
				</van-tab>
				<van-tab title="不良信息">
					<van-cell>
						<div class="van-ellipsis fl label">aaa</div>
						<div class="fr">bbbbbbbbbbbb</div>
					</van-cell>
					<van-cell>
						<div class="van-ellipsis fl label">aaa</div>
						<div class="fr">bbbbbbbbbbbb</div>
					</van-cell>
				</van-tab>
			</van-tabs>
		</div>

	</div>
</template>

<script>
export default {
  data() {
    return {
      companyId: "",
      active: 0,
      detail: {
        name: "",
        code: "",
        addr: ""
      }
    };
  },
  mounted() {
    this.companyId = this.$route.query.id;
    this.getCompanyInfo();
    this.getXydtInfo(9);
    this.getXydtInfo(14);
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
    // 	企业基本信息 9
    // 行政许可信息 14
    // 表彰奖励信息 6
    // 行政处罚信息 21
    getXydtInfo: async function(id) {
      let params = { id: id, companyName: this.detail.name };
      const res = await this.$http.post(
        "/webApp/creditServer/getDynamicData",
        params
      );
      if (res.data.resultCode == "0000") {
        this.detail.name = res.data.resultData.qymc;
        this.detail.code = res.data.resultData.tyshxydm;
        this.detail.addr = res.data.resultData.qydz;
      }
    }
  }
};
</script>

<style lang="scss">
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
    .sub-tab {
      background: #fff;
      padding-top: 15px;
      .tab_subpage {
        padding: 20px 0px;
        background: #fff;
        .label {
          max-width: 160px;
        }
      }
    }
  }
}
</style>