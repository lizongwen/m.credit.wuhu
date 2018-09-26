<template>
	<div>
		<div class="articleDetail" v-for="(item,index) in articleArr" :key="index">
			<div class="article-title">{{item.title}}</div>
			<div class="article-date">
				<div class="van-ellipsis news-title fl">发布时间: {{item.publishTime}}</div>
				<div class="companycreditCode fl">来自: {{item.infoSources}}</div>
			</div>
			<div class="hr"></div>
			<div class="article-content" v-html="item.content">

			</div>
			<a class="article-attach" download :href="`/webApp/credit/download?fileId=${item.id}`" v-if="item.resourcePath">附件：{{item.resourceName}}</a>
		</div>
	</div>

</template>

<script>
export default {
  data() {
    return {
      id: "",
      articleArr: []
    };
  },
  mounted() {
    this.id = this.$route.query.id;
    this.getArtDetail();
  },
  methods: {
    getArtDetail: async function() {
      let params = { id: this.id };
      const res = await this.$http.post("/webApp/credit/articleDetail", params);
      if (res.data.resultCode == "0000") {
        console.log(res.data.resultData);
        this.articleArr = res.data.resultData;
      }
    }
  }
};
</script>

<style lang="scss">
.articleDetail {
  .article-title {
    margin: 0.5rem;
  }
  .article-date {
    overflow: hidden;
    padding: 0rem 0.5rem;
    font-size: 0.6rem;
    color: rgba(46, 46, 46, 0.4);
    .companycreditCode {
      margin: 0 0 0.75rem 1rem;
    }
  }
  .hr {
    border-bottom: 0.05rem solid #ebebeb;
  }
  .article-content {
    padding: 0.5rem;
    font-size: 0.7rem;
    color: rgba(0, 0, 0, 0.8);
    p {
      line-height: 1rem;
      margin-bottom: 1rem;
    }
    img {
      max-width: 100%;
    }
  }
  .article-attach {
    padding: 0.5rem;
    font-size: 0.6rem;
    color: #2ba7fd;
  }
}
</style>