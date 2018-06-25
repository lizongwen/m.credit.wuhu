import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'HelloWorld',
			component: () => import('@/components/layout.vue'),
			children: [{
				path: '',
				name: 'home',//首页
				component: () => import('@/page/home.vue'),
			},{
				path: '',
				name: 'dynamic',//信用动态
				component: () => import('@/page/dynamic.vue'),
			},{
				path: '',
				name: 'publicity',//信用公示
				component: () => import('@/page/publicity.vue'),
			},{
				path: '',
				name: 'service',//信用服务
				component: () => import('@/page/service.vue'),
			}]
		}
	]
})
