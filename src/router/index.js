import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: '',
			component: () => import('@/components/layout.vue'),
			children: [{
				path: '',
				name: 'index',//首页
				meta:{
					index:0
				},
				component: () => import('@/page/home.vue'),
			},{
				path: 'home',
				name: 'home',//首页
				meta:{
					index:0
				},
				component: () => import('@/page/home.vue'),
			},{
				path: 'dynamic',
				name: 'dynamic',//信用动态
				meta:{
					index:1
				},
				component: () => import('@/page/dynamic.vue'),
			},{
				path: 'publicity',
				name: 'publicity',//信用公示
				meta:{
					index:2
				},
				component: () => import('@/page/publicity.vue'),
			},{
				path: 'service',
				name: 'service',//信用服务
				meta:{
					index:3
				},
				component: () => import('@/page/service.vue'),
			},{
				path: 'serviceDetail',
				name: 'serviceDetail',//信用服务详情
				meta:{
					index:4
				},
				component: () => import('@/page/serviceDetail.vue'),
			},{
				path: 'article',
				name: 'article',//全文检索文章
				meta:{
					index:5
				},
				component: () => import('@/page/article.vue'),
			},{
				path: 'articleDetail',
				name: 'articleDetail',//全文检索文章详情
				meta:{
					index:6
				},
				component: () => import('@/page/articleDetail.vue'),
			},{
				path: 'publicityCompany',
				name: 'publicityCompany',//信用公示企业
				meta:{
					index:7
				},
				component: () => import('@/page/publicityCompany.vue'),
			}]
		}
	]
})
