<template>
	<div class="dynamic">
		<div class="search-bar-wrap">
			<form action="/">
				<van-search v-model="searchValue" placeholder="请输入商品名称" show-action @search="onSearch">
					<div slot="action" @click="onSearch" class="search-btn">搜索</div>
				</van-search>
			</form>
		</div>
		<div class="tab">
			<van-tabs v-model="active">
				<van-tab title="失信联合惩戒">
					<div>
						<van-list v-model="loading" @load="onLoad" :offset='2' :immediate-check="false">
							<van-cell v-for="(item,index) in sxcjlist" :key="index" :border="false" is-link>
								<template slot="title">
									<div class="van-ellipsis fl news-title">{{item.title}}</div>
									<div class="fr">{{item.publishTime}}</div>
								</template>
							</van-cell>
						</van-list>
					</div>
				</van-tab>
				
				<van-tab title="守信正向激励">
					<div>
						<van-list v-model="loading" @load="onLoad" :offset='2' :immediate-check="false">
							<van-cell v-for="(item,index) in sxjlList" :key="index" :border="false" is-link>
								<template slot="title">
									<div class="van-ellipsis fl news-title">{{item.title}}</div>
									<div class="fr">{{item.publishTime}}</div>
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
      searchValue: "",
      loading: false,
      active: 0,
	  sxcjlist: [],
	  sxjlList:[]
    };
  },
  mounted(){
	  this.active=this.$route.query.active
	  this.getSxcjList();
	  this.getSxjlList();
  },
  beforeRouteUpdate(to, from, next) {
	  console.log(to)
	//    this.active = to.meta.index;
	   next();
  },
  methods: {
    onSearch() {
	  this.$router.push({ path: "article",query: { searchValue: this.searchValue } })
	},
	getSxcjList: async function() {
      let params = { columnName: "失信联合惩戒" };
      const res = await this.$http.post("/webApp/credit/searchArticle", params);
      if (res.data.resultCode == "0000") {
		  
        this.sxcjlist = res.data.resultData.rows;
      }
	},
	getSxjlList: async function() {
      let params = { columnName: "守信正向激励" };
      const res = await this.$http.post("/webApp/credit/searchArticle", params);
      if (res.data.resultCode == "0000") {
		  
        this.sxjlList = res.data.resultData.rows;
      }
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
      padding: 10px;
      .van-cell__title {
        .news-title {
          max-width: 230px;
        }
      }
    }
  }
}
</style>

