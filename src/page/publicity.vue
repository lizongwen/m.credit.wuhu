<template>
	<div>
		<van-actionsheet v-model="issheetShow" class="dialog">
			<van-picker :columns="columns" show-toolbar @confirm="onConfirm" @cancel="onCancel" />
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
							<van-cell v-for="(item,index) in redlist" :key="index" :border="false" is-link :to="{path:'publicityCompany',query:{mc:item.xzxdrmc,ztlx:item.ztlx,gslb:'0',sfz:item.tyshxydm}}">
								<template slot="title">
									<div class="van-ellipsis news-title">{{item.xzxdrmc}}</div>
									<div class="companycreditCode">
										<template v-if='item.ztlx==2'>
											统一社会信用代码:
											<span>{{item.tyshxydm}}</span>
										</template>
										<template v-else>
											身份证号码:
											<span>{{item.tyshxydm | formatTyshxydm}}</span>
										</template>
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
							<van-cell v-for="(item,index) in blacklist" :key="index" :border="false" is-link :to="{path:'publicityCompany',query:{mc:item.xzxdrmc,ztlx:item.ztlx,gslb:'1',sfz:item.tyshxydm}}">
								<template slot="title">
									<div class="van-ellipsis news-title">{{item.xzxdrmc}}</div>
									<div class="companycreditCode">

										<template v-if='item.ztlx==2'>
											统一社会信用代码:
											<span>{{item.tyshxydm}}</span>
										</template>
										<template v-else>
											身份证号码:
											<span>{{item.tyshxydm | formatTyshxydm}}</span>
										</template>
									</div>
									<div class="quantity">
										黑名单记录
										<span>{{item.unTotalCount | formatTyshxydm}}</span>
									</div>
								</template>
							</van-cell>
						</van-list>
					</div>
				</van-tab>
				<van-tab title="失信被执行人">
					<div>
						<van-list v-model="loading2" @load="onLoad2" :offset='10' :immediate-check="false" :finished="finished2">
							<van-cell v-for="(item,index) in loseCreditList" :key="index" :border="false" is-link :to="{path:'publicityCompany',query:{mc:item.sxbzxrmc,ztlx:item.ztlx,gslb:'2',sfz:item.tyshxydm}}">
								<template slot="title">
									<div class="van-ellipsis news-title">{{item.sxbzxrmc}}</div>
									<div class="companycreditCode">
										<template v-if='item.ztlx==2'>
											统一社会信用代码:
											<span>{{item.tyshxydm}}</span>
										</template>
										<template v-else>
											身份证号码:
											<span>{{item.tyshxydm | formatTyshxydm}}</span>
										</template>
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
      type: "请选择",
      placeholder: "请输入姓名或身份证号",
      searchValue: "",
      searchType: "",
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
  filters: {
    formatTyshxydm(val) {
      return val.replace(/(\w)/g, function(a, b, c, d) {
        return c > 5 && c < 14 ? "*" : a;
      });
    }
  },
  methods: {
    getRedList: async function() {
      let params = {
        ztlx: this.searchType,
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
        ztlx: this.searchType,
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
        ztlx: this.searchType,
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
          this.pageNo_red = 1;
          this.redlist = [];
          this.getRedList();
          break;
        case 1:
          this.pageNo_black = 1;
          this.blacklist = [];
          this.getBlackList();
          break;
        case 2:
          this.pageNo_bzxr = 1;
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
        this.placeholder = "请输入企业名称或统一社会信用代码";
      }
      this.issheetShow = false;
    },
    onCancel() {
      this.issheetShow = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.search-bar-wrap {
  .search-top {
    display: flex;
    align-items: center;
    .search-type {
      line-height: 2.3rem;
      padding-left: 0.4rem;
      font-size: 0.7rem;
      background-color: rgb(242, 242, 242);
    }
    .search-input-wrap {
      flex: 1;
      .search-btn {
        padding: 0 0.5rem;
      }
    }
  }
}
.tab {
  .van-tab__pane {
    background: #f6f6f6;
    .van-cell {
      height: 5.2rem;
      margin-bottom: 0.5rem;
      .van-cell__title {
        .news-title {
          max-width: 11rem;
          font-size: 0.7rem;
        }
        .companycreditCode {
          font-size: 0.6rem;
          margin-bottom: 0.5rem;
        }
        .quantity {
          text-align: center;
          height: 1.2rem;
          width: 4.5rem;
          font-size: 0.6rem;
          border: 1px solid #e23b41;
        }
      }
    }
  }
}
.dialog {
  font-size: 0.7rem;
}
</style>