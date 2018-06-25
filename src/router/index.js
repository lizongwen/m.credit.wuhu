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
				name: 'home',
				component: () => import('@/page/index.vue'),
			}]
		}
	]
})
