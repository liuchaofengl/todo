import Vue from 'vue'
import App from './App.vue'
import store from './store'

import { Button,Input,List,Checkbox} from 'ant-design-vue';

import 'ant-design-vue/dist/antd.css'


Vue.config.productionTip = false
Vue.use(Button).use(Input).use(List).use(Checkbox)
new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
