<template>
	<div>
		<div class="search-bar-wrap">
			<form action="/">
				<van-search v-model="searchValue" placeholder="请输入关键字" show-action @search="onSearch">
					<div slot="action" @click="onSearch" class="search-btn">搜索</div>
				</van-search>
			</form>
		</div>
		<div class="tab">
			<van-tabs v-model="active" @click="onTabClick">
				<van-tab title="失信联合惩戒">
					<div>
						<van-list v-model="loading" @load="onLoad" :offset='10' :immediate-check="false" :finished="finished">
							<van-cell v-for="(item,index) in sxcjlist" :key="index" :border="false" is-link :to="{ path: 'articleDetail', query: { id: item.id }}">
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
						<van-list v-model="loading1" @load="onLoad1" :offset='10' :immediate-check="false" :finished="finished1">
							<van-cell v-for="(item,index) in sxjlList" :key="index" :border="false" is-link :to="{ path: 'articleDetail', query: { id: item.id }}">
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
      pageNo_sxcj: 1,
      pageNo_sxjl: 1,
      loading: false,
      loading1: false,
      finished: false,
      finished1: false,
      active: 0,
      sxcjlist: [],
      sxjlList: []
    };
  },
  mounted() {
    this.active = this.$route.query.active;
    this.getSxcjList();
    this.getSxjlList();
  },
  methods: {
    onSearch() {
      this.$router.push({
        path: "article",
        query: { searchValue: this.searchValue }
      });
    },
    getSxcjList: async function() {
      let params = {
        columnName: "失信联合惩戒",
        pageNo: this.pageNo_sxcj,
        pageSize: 10
      };
      const res = await this.$http.post("/webApp/credit/searchArticle", params);
      if (res.data.resultCode == "0000") {
        if (res.data.resultData.rows.length < 10) {
          this.finished = true;
        }
        this.sxcjlist = this.sxcjlist.concat(res.data.resultData.rows);
        ++this.pageNo_sxcj;
        this.loading = false;
      }
    },
    getSxjlList: async function() {
      let params = {
        columnName: "守信正向激励",
        pageNo: this.pageNo_sxjl,
        pageSize: 10
      };
      const res = await this.$http.post("/webApp/credit/searchArticle", params);
      if (res.data.resultCode == "0000") {
        if (res.data.resultData.rows.length < 10) {
          this.finished1 = true;
        }
        this.sxjlList = this.sxjlList.concat(res.data.resultData.rows);
        ++this.pageNo_sxjl;
        this.loading1 = false;
      }
    },
    onLoad() {
      this.getSxcjList();
    },
    onLoad1() {
      this.getSxjlList();
    },
    onTabClick(index, title) {
      if (index == 0) {
        if (this.sxcjlist.length % 10 != 0) {
          this.finished = true;
        } else {
          this.finished = false;
        }
        this.finished1 = true;
      } else if (index == 1) {
        if (this.sxjlList.length % 10 != 0) {
          this.finished1 = true;
        } else {
          this.finished1 = false;
        }
        this.finished = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.search-btn {
  padding: 0 0.25rem;
}
.tab {
  .van-tab__pane {
    padding: 0.5rem;
    .van-cell__title {
      .news-title {
        max-width: 11rem;
      }
    }
  }
}
</style>

