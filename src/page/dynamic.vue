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
				<van-tab title="信用动态">
					<div>
						<van-list v-model="loading" @load="onLoad" :offset='2' :immediate-check="false">
							<van-cell v-for="(item,index) in list" :key="index" :border="false" is-link>
								<template slot="title">
									<div class="van-ellipsis fl news-title">标题一标题一标题一标题一标题一标题一</div>
									<div class="fr">2018/02/01</div>
								</template>
							</van-cell>
						</van-list>
					</div>
				</van-tab>
				<van-tab title="政策法规">
					<div>2</div>
				</van-tab>
				<van-tab title="县区信用监测">
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
      list: [
        {
          title: "标题一标题一标题一标题一标题一标题一标题一",
          content: "标题内容一",
          date: "2018/01/05"
        },
        {
          title: "标题二",
          content: "标题内容二",
          date: "2018/01/05"
        },
        {
          title: "标题三",
          content: "标题内容三",
          date: "2018/01/05"
        },
        {
          title: "标题四",
          content: "标题内容四",
          date: "2018/01/05"
        },
        {
          title: "标题五",
          content: "标题内容五",
          date: "2018/01/05"
        },
        {
          title: "标题五",
          content: "标题内容五",
          date: "2018/01/05"
        },
        {
          title: "标题五",
          content: "标题内容五",
          date: "2018/01/05"
        },
        {
          title: "标题五",
          content: "标题内容五",
          date: "2018/01/05"
        },
        {
          title: "标题五",
          content: "标题内容五",
          date: "2018/01/05"
        },
        {
          title: "标题五",
          content: "标题内容五",
          date: "2018/01/05"
        },
        {
          title: "标题五",
          content: "标题内容五",
          date: "2018/01/05"
        },
        {
          title: "标题五",
          content: "标题内容五",
          date: "2018/01/05"
        },
        {
          title: "标题五",
          content: "标题内容五",
          date: "2018/01/05"
        },
        {
          title: "标题五",
          content: "标题内容五",
          date: "2018/01/05"
        }
      ]
    };
  },
  methods: {
    onSearch() {
	  console.log("搜素");
	  this.$router.push({ path: "article",query: { searchValue: this.searchValue } })
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

