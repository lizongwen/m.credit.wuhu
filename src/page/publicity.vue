<template>
	<div class="dynamic">
		<div class="search-bar-wrap">
			<form action="/">
				<van-search v-model="searchValue" placeholder="请输入商品名称" show-action @search="onSearch" @cancel="onCancel">
					<div slot="action" @click="onSearch" class="search-btn">搜索</div>
				</van-search>
			</form>
		</div>
		<div class="tab">
			<van-tabs v-model="active">
				<van-tab title="红名单">
					<!--<div>-->
					<!--<van-list v-model="loading" @load="onLoad" :offset='1' :immediate-check="false">-->
					<van-cell v-for="(item,index) in list" :key="index" :border="false" is-link :to="{path:'publicityCompany',query:{id:item.id}}">
						<template slot="title">
							<div class="van-ellipsis news-title">惠国征信服务股份有限公司</div>
							<div class="companycreditCode">统一社会信用代码:
								<span>9135020570540817X8</span>
							</div>
							<div class="quantity">
								失信记录
								<span>2</span>
							</div>
						</template>

					</van-cell>
					<!--<div style="height: 10px; background: #2E2E2E;"></div>-->
					<!--</van-list>-->

					<!--</div>-->
				</van-tab>
				<van-tab title="黑名单">
					<div>2</div>
				</van-tab>
				<van-tab title="失信被执行人">
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
      searchValue: "",
      loading: false,
      active: 0,
	  list: [],
	  
    };
  },
  mounted() {
   //this.getRedList();
  },
  methods: {
    getRedList: async function() {
      let params = { ztlx: "",searchValue:this.searchValue };
      const res = await this.$http.post("/webApp/credit/getRedLists", params);
      if (res.data.resultCode == "0000") {
        this.xydtlist = res.data.resultData.rows;
      }
    },
    onSearch() {
      console.log("搜素");
    },
    onCancel() {
      console.log("取消");
    },
    onLoad() {
      console.log(123);
      setTimeout(() => {
        this.list.push({
          title: "标题一",
          content: "标题内容一"
        });
        this.loading = false;
      }, 2000);
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
      padding: 10px 0;
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
}
</style>