<template>
	<div class="article">
		<div class="article-header">站内检索</div>
		<div class="information">共搜索到<span>5</span>条结果</div>
		<div>
			<van-cell v-for="(item,index) in list" :key="index"  :to="{ path: 'articleDetail', query: { id: item.id }}">
				<template slot="title">
                    <div class="van-ellipsis news-title fl">惠国征信服务股份有限公司</div>
					<div class="companycreditCode fr">2018/02/01</div>
				</template>
			</van-cell>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				loading: false,
				list: [{
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
			onLoad() {
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
</script>

<style lang="scss" scoped>
	.article {
		font-size: 14px;
		.article-header {
			width: 64px;
			margin: 15px auto;
			font-size: 16px;
			color: #E23B41;
		}
		.information {
			padding: 0 0 10px 10px;
			font-size: 12px;
			color: rgba(46, 46, 46, 0.4);
		}
	}
</style>