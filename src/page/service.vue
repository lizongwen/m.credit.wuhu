<template>
	<div class="dynamic">
		<div class="search-bar-wrap">
			<form action="/">
				<van-search v-model="searchValue" placeholder="请输入企业名称或者统一信用代码" show-action @search="onSearch" @cancel="onCancel">
					<div slot="action" @click="onSearch" class="search-btn">搜索</div>
				</van-search>
			</form>
		</div>
		<div>
			<van-cell v-for="(item,index) in list" :key="index"  :to="{ path: 'serviceDetail', query: { id: item.id }}">
				<template slot="title">
                    <div class="van-ellipsis news-title">惠国征信服务股份有限公司</div>
					<div class="companycreditCode">统一社会信用代码:<span>9135020570540817X8</span></div>
				</template>
			</van-cell>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				searchValue: "",
				loading: false,
				columns: ['法人', '自然人'],
				active: 0,
				list: [{
						id:1,
						title: "标题一标题一标题一标题一标题一标题一标题一",
						content: "标题内容一",
						date: "2018/01/05"
					},
					{
						id:2,
						title: "标题二",
						content: "标题内容二",
						date: "2018/01/05"
					},
					{
						id:3,
						title: "标题三",
						content: "标题内容三",
						date: "2018/01/05"
					},
					{
						id:4,
						title: "标题四",
						content: "标题内容四",
						date: "2018/01/05"
					},
					{
						id:5,
						title: "标题五",
						content: "标题内容五",
						date: "2018/01/05"
					},
					{
						id:6,
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
			},
			onChange(picker, value, index) {

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
			/*.van-tab__pane {*/
				padding: 10px 0;
				.van-cell {
					border: 1px solid #EBEBEB !important;
					height: 104px;
					margin-bottom: 10px;
					.van-cell__title {
						.news-title {
							max-width: 230px;
							font-size: 14px;
						}
						.companycreditCode {
							font-size: 12px;
							color: #2E2E2E;
							margin-bottom: 10px;
						}
					}
				}
			/*}*/
		}
	}
</style>