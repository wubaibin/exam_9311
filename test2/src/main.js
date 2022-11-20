/*
 * @Description: 
 * @Version: 1.0.0
 * @Autor: wubaibin
 * @Date: 2022-11-20 16:55:57
 * @LastEditors: wubaibin
 * @LastEditTime: 2022-11-20 18:39:53
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'
import {
  Pagination,
  Table,
  TableColumn,
  Button,
  Dialog,
  Icon,
  Form,
  FormItem,
  Input,
  Loading,
  Tooltip,
} from 'element-ui'
Vue.use(Pagination)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Button)
Vue.use(Dialog)
Vue.use(Icon)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Tooltip)
Vue.use(Loading.directive)

Vue.prototype.$loading = Loading.service
Vue.config.productionTip = false

import axios from 'axios'
Vue.prototype.axios = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
