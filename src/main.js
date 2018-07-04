// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vant from 'vant';
import 'vant/lib/vant-css/index.css';
import './style/font/iconfont.css';
import './style/reset.scss';
import './style/base.scss';
import App from './App'
import router from './router'
import http from './utils/http';
import { Lazyload } from 'vant';


Vue.config.productionTip = false
Vue.use(Vant);
Vue.use(Lazyload);
Vue.prototype.$http = http;

// Vue.filter('datafmt',function (input,fmtstring) {
// 	// 使用momentjs这个日期格式化类库实现日期的格式化功能
// 	return moment(input).format(fmtstring);
//   });
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
 
})
