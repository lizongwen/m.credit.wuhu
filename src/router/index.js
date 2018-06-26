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
			}]
		}
	]
})
