<template>
	<div class="dynamic">
		<van-actionsheet v-model="issheetShow">
			<van-picker :columns="columns" show-toolbar @cancel="onCancel" @confirm="onConfirm" />
		</van-actionsheet>
		<div class="search-bar-wrap">
			<div class="search-top">
				<div class="search-type" @click="showPicker">{{type}}</div>
				<div class="search-input-wrap">
					<van-search v-model="searchValue" :placeholder="placeholder" show-action @search="onSearch" >
						<div slot="action" @click="onSearch" class="search-btn">搜索</div> -->
					</van-search>
				</div>
			</div>
		</div>
		<div class="tab">
			<van-tabs v-model="active">
				<van-tab title="红名单">
					<!--<div>-->
					<!--<van-list v-model="loading" @load="onLoad" :offset='1' :immediate-check="false">-->
					<van-cell v-for="(item,index) in redlist" :key="index" :border="false" is-link :to="{path:'publicityCompany',query:{mc:item.xzxdrmc,ztlx:item.ztlx,gslb:'0'}}">
						<template slot="title">
							<div class="van-ellipsis news-title">{{item.xzxdrmc}}</div>
							<div class="companycreditCode">统一社会信用代码:
								<span>{{item.tyshxydm}}</span>
							</div>
							<div class="quantity">
								失信记录
								<span>{{item.unTotalCount}}</span>
							</div>
						</template>

					</van-cell>
					<!--<div style="height: 10px; background: #2E2E2E;"></div>-->
					<!--</van-list>-->

					<!--</div>-->
				</van-tab>
				<van-tab title="黑名单">
					<div>
						<van-cell v-for="(item,index) in blacklist" :key="index" :border="false" is-link :to="{path:'publicityCompany',query:{mc:item.xzxdrmc,ztlx:item.ztlx,gslb:'1'}}">
							<template slot="title">
								<div class="van-ellipsis news-title">{{item.xzxdrmc}}</div>
								<div class="companycreditCode">统一社会信用代码:
									<span>{{item.tyshxydm}}</span>
								</div>
								<div class="quantity">
									失信记录
									<span>{{item.unTotalCount}}</span>
								</div>
							</template>
						</van-cell>
					</div>
				</van-tab>
				<van-tab title="失信被执行人">
					<div>
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
      loading: false,
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
      let params = { ztlx: "", xzxdrmc: this.searchValue };
      const res = await this.$http.post("/webApp/credit/getRedLists", params);
      if (res.data.resultCode == "0000") {
        this.redlist = this.redlist.concat(res.data.resultData.rows);
      }
    },
    getBlackList: async function() {
      let params = { ztlx: "", xzxdrmc: this.searchValue };
      const res = await this.$http.post("/webApp/credit/getBlackLists", params);
      if (res.data.resultCode == "0000") {
        this.blacklist = this.blacklist.concat(res.data.resultData.rows);
      }
    },
    getLoseCreditList: async function() {
      let params = { ztlx: "", sxbzxrmc: this.searchValue };
      const res = await this.$http.post(
        "/webApp/credit/getDiscreditLists",
        params
      );
      if (res.data.resultCode == "0000") {
        this.loseCreditList = this.loseCreditList.concat(
          res.data.resultData.rows
        );
      }
    },
    onSearch() {
      console.log("搜索类型:", this.searchType);
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
      console.log(123);
    },
    showPicker() {
      this.issheetShow = !this.issheetShow;
    },
    onConfirm(value, index) {
      this.type = value;
      this.searchType = index;
      this.issheetShow = false;
    },
    onCancel() {
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
  .search-top{
	  display: flex;
	  align-items: center;
	  .search-type{
		 line-height: 46px;
		  padding-left:8px;
		  font-size: 14px;
		  background-color: rgb(242, 242, 242);
	  }
	  .search-input-wrap{
		  flex:1
	  }
  }
}
</style>