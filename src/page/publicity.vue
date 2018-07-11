<template>
	<div class="dynamic">
		<van-actionsheet v-model="issheetShow">
			<van-picker :columns="columns" show-toolbar @confirm="onConfirm" />
		</van-actionsheet>
		<div class="search-bar-wrap">
			<div class="search-top">
				<div class="search-type" @click="showPicker">{{type}}</div>
				<div class="search-input-wrap">
					<van-search v-model="searchValue" :placeholder="placeholder" show-action @search="onSearch">
						<div slot="action" @click="onSearch" class="search-btn">搜索</div> -->
					</van-search>
				</div>
			</div>
		</div>
		<div class="tab">
			<van-tabs v-model="active" @click="onTabClick">
				<van-tab title="红名单">
					<div>
						<van-list v-model="loading" @load="onLoad" :offset='10' :immediate-check="false" :finished="finished">
							<van-cell v-for="(item,index) in redlist" :key="index" :border="false" is-link :to="{path:'publicityCompany',query:{mc:item.xzxdrmc,ztlx:item.ztlx,gslb:'0'}}">
								<template slot="title">
									<div class="van-ellipsis news-title">{{item.xzxdrmc}}</div>
									<div class="companycreditCode">统一社会信用代码:
										<span>{{item.tyshxydm}}</span>
									</div>
									<div class="quantity">
										守信记录
										<span>{{item.unTotalCount}}</span>
									</div>
								</template>
							</van-cell>
						</van-list>
					</div>
				</van-tab>
				<van-tab title="黑名单">
					<div>
						<van-list v-model="loading1" @load="onLoad1" :offset='10' :immediate-check="false" :finished="finished1">
							<van-cell v-for="(item,index) in blacklist" :key="index" :border="false" is-link :to="{path:'publicityCompany',query:{mc:item.xzxdrmc,ztlx:item.ztlx,gslb:'1'}}">
								<template slot="title">
									<div class="van-ellipsis news-title">{{item.xzxdrmc}}</div>
									<div class="companycreditCode">统一社会信用代码:
										<span>{{item.tyshxydm}}</span>
									</div>
									<div class="quantity">
										黑名单记录
										<span>{{item.unTotalCount}}</span>
									</div>
								</template>
							</van-cell>
						</van-list>
					</div>
				</van-tab>
				<van-tab title="失信被执行人">
					<div>
						<van-list v-model="loading2" @load="onLoad2" :offset='10' :immediate-check="false" :finished="finished2">
							<van-cell v-for="(item,index) in loseCreditList" :key="index" :border="false" is-link :to="{path:'publicityCompany',query:{mc:item.sxbzxrmc,ztlx:item.ztlx,gslb:'2'}}">
								<template slot="title">
									<div class="van-ellipsis news-title">{{item.sxbzxrmc}}</div>
									<div class="companycreditCode">统一社会信用代码:
										<span>{{item.tyshxydm}}</span>
									</div>
									<div class="quantity">
										失信记录
										<span>{{item.unTotalCount}}</span>
									</div>
								</template>
							</van-cell>
						</van-list>
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
      issheetShow: false,
      columns: ["自然人", "法人"],
      type: "自然人",
      placeholder: "请输入姓名或身份证号",
      searchValue: "",
      searchType: 0,
      pageNo_red: 1,
      pageNo_black: 1,
      pageNo_bzxr: 1,
      loading: false,
      loading1: false,
      loading2: false,
      finished: false,
      finished1: false,
      finished2: false,
      active: 0,
      redlist: [],
      blacklist: [],
      loseCreditList: []
    };
  },
  mounted() {
    this.active = this.$route.query.active;
    this.getRedList();
    this.getBlackList();
    this.getLoseCreditList();
  },
  methods: {
    getRedList: async function() {
      let params = {
        ztlx: "",
        xzxdrmc: this.searchValue,
        pageNo: this.pageNo_red,
        pageSize: 10
      };
      const res = await this.$http.post("/webApp/credit/getRedLists", params);
      if (res.data.resultCode == "0000") {
        if (res.data.resultData.rows.length < 10) {
          this.finished = true;
        }
        this.redlist = this.redlist.concat(res.data.resultData.rows);
        ++this.pageNo_red;
        this.loading = false;
      }
    },
    getBlackList: async function() {
      let params = {
        ztlx: "",
        xzxdrmc: this.searchValue,
        pageNo: this.pageNo_black,
        pageSize: 10
      };
      const res = await this.$http.post("/webApp/credit/getBlackLists", params);
      if (res.data.resultCode == "0000") {
        if (res.data.resultData.rows.length < 10) {
          this.finished1 = true;
        }
        this.blacklist = this.blacklist.concat(res.data.resultData.rows);
        ++this.pageNo_black;
        this.loading1 = false;
      }
    },
    getLoseCreditList: async function() {
      let params = {
        ztlx: "",
        sxbzxrmc: this.searchValue,
        pageNo: this.pageNo_bzxr,
        pageSize: 10
      };
      const res = await this.$http.post(
        "/webApp/credit/getDiscreditLists",
        params
      );
      if (res.data.resultCode == "0000") {
        if (res.data.resultData.rows.length < 10) {
          this.finished2 = true;
        }
        this.loseCreditList = this.loseCreditList.concat(
          res.data.resultData.rows
        );
        ++this.pageNo_bzxr;
        this.loading2 = false;
      }
    },
    onSearch() {
      switch (this.active) {
        case 0:
          this.redlist = [];
          this.getRedList();
          break;
        case 1:
          this.blacklist = [];
          this.getBlackList();
          break;
        case 2:
          this.loseCreditList = [];
          this.getLoseCreditList();
          break;
      }
    },
    onLoad() {
      this.getRedList();
    },
    onLoad1() {
      this.getBlackList();
    },
    onLoad2() {
      this.getLoseCreditList();
    },
    onTabClick(index, title) {
      if (index == 0) {
        if (this.redlist.length % 10 != 0) {
          this.finished = true;
        } else {
          this.finished = false;
        }
        this.finished1 = true;
        this.finished2 = true;
      } else if (index == 1) {
        if (this.blacklist.length % 10 != 0) {
          this.finished1 = true;
        } else {
          this.finished1 = false;
        }
        this.finished = true;
        this.finished2 = true;
      } else if (index == 2) {
        if (this.loseCreditList.length % 10 != 0) {
          this.finished2 = true;
        } else {
          this.finished2 = false;
        }
        this.finished = true;
        this.finished1 = true;
      }
    },
    showPicker() {
      this.issheetShow = !this.issheetShow;
    },
    onConfirm(value, index) {
      this.type = value;
      if (index == 0) {
        this.searchType = 1;
        this.placeholder = "请输入姓名或身份证号";
      } else {
        this.searchType = 2;
        this.placeholder = "请输入企业名称或者统一社会信用代码";
      }

      this.issheetShow = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.dynamic {
  .search-btn {
    padding: 0 5px;
  }
  .tab {
    .van-tab__pane {
      background: #f6f6f6;
      .van-cell {
        height: 104px;
        margin-bottom: 10px;
        .van-cell__title {
          .news-title {
            max-width: 230px;
            font-size: 14px;
          }
          .companycreditCode {
            font-size: 12px;
            margin-bottom: 10px;
          }
          .quantity {
            text-align: center;
            height: 24px;
            width: 90px;
            font-size: 12px;
            border: 1px solid #e23b41;
          }
        }
      }
    }
  }
  .search-top {
    display: flex;
    align-items: center;
    .search-type {
      line-height: 46px;
      padding-left: 8px;
      font-size: 14px;
      background-color: rgb(242, 242, 242);
    }
    .search-input-wrap {
      flex: 1;
    }
  }
}
</style>