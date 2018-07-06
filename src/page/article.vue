<template>
	<div class="article">
		<div class="article-header">站内检索</div>
		<div class="information">共搜索到
			<span>{{total}}</span>条结果</div>
		<div>
			<van-list v-model="loading" @load="onLoad" :offset='10' :immediate-check="false">
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
	  pageNo:1,
	  total:"",
      loading: false,
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
		pageNo:this.pageNo,
		pageSize:20
      };
      const res = await this.$http.post("/webApp/credit/searchResult", params);
      if (res.data.resultCode == "0000") {
		  console.log(res.data)
		  this.total=res.data.resultData.total;
		  this.list=this.list.concat(res.data.resultData.rows);
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
  font-size: 14px;
  .article-header {
    width: 64px;
    margin: 15px auto;
    font-size: 16px;
    color: #e23b41;
  }
  .information {
    padding: 0 0 10px 10px;
    font-size: 12px;
    color: rgba(46, 46, 46, 0.4);
  }
}
</style>