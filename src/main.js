import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import mixin from './mixin'
import dayjs from 'dayjs'
import '../src/plugins'
import i18n from './i18n'
import {default as api} from './utils/api'
import directives from "@/directives";
import '@/permission'
import {hasPermission} from "./utils/hasPermission";

Vue.use(dayjs)
Vue.mixin(mixin)
Vue.config.productionTip = false
Vue.prototype.api = api
Vue.prototype.hasPerm = hasPermission
Vue.use(directives);

const vue = new Vue({
  vuetify,
  store,
  router,
  i18n,
  render: h => h(App)
})
vue.$mount('#app')
window.thisVue = vue
