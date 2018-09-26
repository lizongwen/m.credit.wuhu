<template>
	<div class="article">
		<div class="article-header">站内检索</div>
		<div class="information">共搜索到
			<span>{{total}}</span>条结果</div>
		<div>
			<van-list v-model="loading" @load="onLoad" :offset='10' :immediate-check="false" :finished="finished">
				<van-cell v-for="(item,index) in list" :key="index" :to="{ path: 'articleDetail', query: { id: item.id }}">
					<template slot="title">
						<div class="van-ellipsis news-title fl" v-html="item.title"></div>
						<div class="companycreditCode fr">{{item.cPublishTime}}</div>
					</template>
				</van-cell>
			</van-list>
		</div>
	</div>
</template>

<script>
export default {
  data() {
    return {
      searchValue: "",
      pageNo: 1,
      total: "",
      loading: false,
      finished: false,
      list: []
    };
  },
  mounted() {
    this.searchValue = this.$route.query.searchValue;
    this.fetchAllArt();
  },
  methods: {
    fetchAllArt: async function() {
      let params = {
        searchText: this.searchValue,
        pageNo: this.pageNo,
        pageSize: 20
      };
      const res = await this.$http.post("/webApp/credit/searchResult", params);
      if (res.data.resultCode == "0000") {
        if (res.data.resultData.rows.length < 20) {
          this.finished = true;
        }
        this.total = res.data.resultData.total;
        this.list = this.list.concat(res.data.resultData.rows);
        ++this.pageNo;
        this.loading = false;
      }
    },
    onLoad() {
      this.fetchAllArt();
    }
  }
};
</script>

<style lang="scss" scoped>
.article {
     font-size: 0.7rem;
     .article-header {
         margin: 0.75rem auto;
         font-size: 0.8rem;
         color: #e23b41;
		 text-align: center;
    }
     .van-cell__title {
         .news-title {
             max-width: 11rem;
        }
    }
     .information {
         padding: 0 0 0.5rem 0.5rem;
         font-size: 0.6rem;
         color: rgba(46, 46, 46, 0.4);
    }
}
</style>