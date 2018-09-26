<template>
	<div>
		<div class="search-bar-wrap">
			<form action="/">
				<van-search v-model="searchValue" placeholder="请输入企业名称或者统一信用代码" show-action @search="onSearch">
					<div slot="action" @click="onSearch" class="search-btn">搜索</div>
				</van-search>
			</form>
		</div>
		<div class="search-content">
			<div v-if="isEmpty" class="empty">
				<img src="../img/xyfw_empty.png" alt="" srcset="">
				<p>企业信用报告查询</p>
			</div>
			<van-list v-model="loading" @load="onLoad" :offset='1' :immediate-check="false" v-else :finished="finished">
				<van-cell v-for="(item,index) in list" :key="index" class="list-item" :to="{ path: 'serviceDetail', query: { id: item.id,companyName:item.qymc }}">
					<template slot="title">
						<div class="van-ellipsis news-title">{{item.qymc}}</div>
						<div class="companycreditCode">统一社会信用代码:
							<span>{{item.tyshxydm}}</span>
						</div>
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
      isEmpty: true,
      loading: false,
      finished: false,
      searchValue: "",
      pageNo: 1,
      columns: ["法人", "自然人"],
      active: 0,
      list: []
    };
  },
  methods: {
    onSearch: async function() {
      this.pageNo = 1;
      this.list = [];
      this.getList();
    },
    getList: async function() {
      let params = {
        searchText: this.searchValue,
        pageNo: this.pageNo,
        pageSize: 10
      };
      const res = await this.$http.post(
        "/webApp/creditServer/searchCompanyList",
        params
      );
      if (res.data.resultCode == "0000") {
        if (res.data.resultData.rows.length < 10) {
          this.finished = true;
        }
        this.list = this.list.concat(res.data.resultData.rows);
        ++this.pageNo;
        this.loading = false;
        this.isEmpty = false;
      }
    },
    onLoad() {
      this.getList();
    }
  }
};
</script>

<style lang="scss" scoped>
.search-bar-wrap {
  .search-btn {
    padding: 0 0.5rem;
  }
}
.search-content {
  height: calc(100% - 2.3rem);
  .empty {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p {
      font-family: PingFangSC-Regular;
      font-size: 0.7rem;
      color: rgba(46, 46, 46, 0.25);
    }
  }
}
</style>