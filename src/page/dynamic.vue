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
			<van-tabs v-model="active" @click="onTabClick">
				<van-tab title="信用动态">
					<div>
						<van-list v-model="loading" @load="onLoad" :offset='10' :immediate-check="false" :finished="finished">
							<van-cell v-for="(item,index) in xydtlist" :key="index" :border="false" is-link :to="{ path: 'articleDetail', query: { id: item.id }}">
								<template slot="title">
									<div class="van-ellipsis fl news-title">{{item.title}}</div>
									<div class="fr">{{item.publishTime}}</div>
								</template>
							</van-cell>
						</van-list>
					</div>
				</van-tab>
				<van-tab title="政策法规">
					<div>
						<van-list v-model="loading1" @load="onLoad1" :offset='10' :immediate-check="false" :finished="finished1">
							<van-cell v-for="(item,index) in zcfgList" :key="index" :border="false" is-link :to="{ path: 'articleDetail', query: { id: item.id }}">
								<template slot="title">
									<div class="van-ellipsis fl news-title">{{item.title}}</div>
									<div class="fr">{{item.publishTime}}</div>
								</template>
							</van-cell>
						</van-list>
					</div>
				</van-tab>
				<van-tab title="县区信用监测">
					<div>
						<van-list v-model="loading2" @load="onLoad2" :offset='10' :immediate-check="false" :finished="finished2">
							<van-cell v-for="(item,index) in qxjcList" :key="index" :border="false" is-link :to="{ path: 'articleDetail', query: { id: item.id }}">
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
      active: 0,
      pageNo_xydt: 1,
      pageNo_zcfg: 1,
      pageNo_qxjc: 1,
      loading: false,
      loading1: false,
      loading2: false,
      finished: false,
      finished1: false,
      finished2: false,
      xydtlist: [],
      zcfgList: [],
      qxjcList: []
    };
  },
  mounted() {
    this.getXytdList();
    this.getZcfgList();
    this.getqxjcList();
  },
  methods: {
    onSearch() {
      console.log("搜素");
      this.$router.push({
        path: "article",
        query: { searchValue: this.searchValue }
      });
    },
    getXytdList: async function() {
      let params = {
        columnName: "信用动态",
        pageNo: this.pageNo_xydt,
        pageSize: 10
      };
      const res = await this.$http.post("/webApp/credit/searchArticle", params);
      if (res.data.resultCode == "0000") {
        if (res.data.resultData.rows.length < 10) {
          this.finished = true;
        }
        this.xydtlist = this.xydtlist.concat(res.data.resultData.rows);
        ++this.pageNo_xydt;
        this.loading = false;
      }
    },
    getZcfgList: async function() {
      let params = {
        columnName: "政策法规",
        pageNo: this.pageNo_zcfg,
        pageSize: 10
      };
      const res = await this.$http.post("/webApp/credit/searchArticle", params);
      if (res.data.resultCode == "0000") {
        if (res.data.resultData.rows.length < 10) {
          this.finished1 = true;
        }
        this.zcfgList = this.zcfgList.concat(res.data.resultData.rows);
        ++this.pageNo_zcfg;
        this.loading1 = false;
      }
    },
    getqxjcList: async function() {
      let params = {
        columnName: "县区信用监测",
        pageNo: this.pageNo_qxjc,
        pageSize: 10
      };
      const res = await this.$http.post("/webApp/credit/searchArticle", params);
      if (res.data.resultCode == "0000") {
        if (res.data.resultData.rows.length < 10) {
          this.finished2 = true;
        }
        this.qxjcList = this.qxjcList.concat(res.data.resultData.rows);
        ++this.pageNo_qxjc;
        this.loading2 = false;
      }
    },
    onLoad() {
      this.getXytdList();
    },
    onLoad1() {
      this.getZcfgList();
    },
    onLoad2() {
      this.getqxjcList();
    },
    onTabClick(index, title) {
      if (index == 0) {
        if (this.xydtlist.length % 10 != 0) {
          this.finished = true;
        } else {
          this.finished = false;
        }
        this.finished1 = true;
        this.finished2 = true;
      } else if (index == 1) {
        if (this.zcfgList.length % 10 != 0) {
          this.finished1 = true;
        } else {
          this.finished1 = false;
        }
        this.finished = true;
        this.finished2 = true;
      } else if (index == 2) {
        if (this.qxjcList.length % 10 != 0) {
          this.finished2 = true;
        } else {
          this.finished2 = false;
        }
        this.finished = true;
        this.finished1 = true;
      }
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

