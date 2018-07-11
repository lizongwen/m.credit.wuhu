<template>
	<div>
		<div class="articleDetail" v-for="(item,index) in articleArr" :key="index">
			<div class="article-title">{{item.title}}</div>
			<div class="article-date">
				<div class="van-ellipsis news-title fl">发布时间: {{item.time}}</div>
				<div class="companycreditCode fl">来自: {{item.sources}}</div>
			</div>
			<div class="hr"></div>
			<div class="article-content" v-html="item.content">

			</div>
			<a class="article-attach" download href="item.resourcePath" v-if="item.resourcePath">附件：{{item.resourceName}}</a>
		</div>
	</div>

</template>

<script>
export default {
  data() {
    return {
      id: "",
      articleArr: [],
      article: {
        title: "",
        content: "",
        sources: "",
        time: ""
      }
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
    margin: 10px;
  }
  .article-date {
    overflow: hidden;
    padding: 0px 10px;
    font-size: 12px;
    color: rgba(46, 46, 46, 0.4);
    .companycreditCode {
      margin: 0 0 15px 20px;
    }
  }
  .hr {
    border-bottom: 1px solid #ebebeb;
  }
  .article-content {
    padding: 10px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.8);
    p {
      line-height: 20px;
      margin-bottom: 20px;
    }
    img {
      max-width: 100%;
    }
  }
  .article-attach {
    padding: 10px;
    font-size: 12px;
    color: #2ba7fd;
  }
}
</style>