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
import { Lazyload } from 'vant';

Vue.config.productionTip = false
Vue.use(Vant);
Vue.use(Lazyload);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
