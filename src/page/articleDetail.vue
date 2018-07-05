<template>
	<div class="articleDetail">
		<div class="article-title">{{article.title}}</div>
		<div class="article-date">
			<div class="van-ellipsis news-title fl">发布时间: {{article.time}}</div>
			<div class="companycreditCode fl">来自:  {{article.sources}}</div>
		</div>
		<div class="hr"></div>
		<div class="article-content" v-html="article.content"></div>
	</div>
</template>

<script>
	export default {
		data(){
			return{
				id:"",
				article:{
					title:'',
					content:'',
					sources:'',
					time:''
				}
			}
		},
		mounted(){
			this.id=this.$route.query.id;
			this.getArtDetail();
		},
		methods:{
			getArtDetail:async function(){
				let params = { id:this.id };
				const res = await this.$http.post("/webApp/credit/articleDetail", params);
				if (res.data.resultCode == "0000") {
					this.article.title=res.data.resultData.title;
					this.article.content=res.data.resultData.content;
					this.article.sources=res.data.resultData.infoSources;
					this.article.time=res.data.resultData.publishTime;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
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
			border-bottom: 1px solid #EBEBEB;
		}
		.article-content {
			padding: 10px;
			font-size: 14px;
			color: rgba(0,0,0,0.8);
			p{
				line-height: 20px;
				margin-bottom: 20px;
			}
		}
	}
</style>