import Vue from 'vue';
import Vuex from 'vuex';
import common from './modules/common'
import user from './modules/user'
import permission from './modules/permission'
import getters from './getters'

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
      common,
      user,
      permission,
    },
    getters
})
  
export default store
