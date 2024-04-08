import CookieUtil from '@/plugins/CookieUtil'
import { removeToken, setToken } from '@/utils/auth'
import { default as api } from '../../utils/api'

const user = {
  state: {
    userInfo: null,
    roleIds: [],
    menus: [],
    permissions: [],
  },
  mutations: {
    SET_USER: (state, userData) => {
      state.userInfo = {
        userId: userData.userId,
        loginId: userData.loginId,
        model: userData.model,
        deviceInfo: userData.deviceInfo,
      };
      state.roleIds = userData.roleIds;
      state.menus = userData.menuList;
      state.permissions = userData.permissionList;
    },
    RESET_USER: (state) => {
      state.userInfo = null;
      state.roleIds = [];
      state.menus = [];
      state.permissions = [];
    },
  },
  actions: {
    /* Login({commit, state}, loginForm) {
      return new Promise((resolve, reject) => {
        api({
          url: "login/auth",
          method: "post",
          data: loginForm
        }).then(data => {
          setToken(data);
          resolve(data);
        }).catch(err => {
          reject(err)
        })
      })
    }, */
    Login({ commit, state }, loginForm) {
      return new Promise((resolve, reject) => {
        api({
          url: "device/auth",
          method: "post",
          data: loginForm,
          noPop: true,
        }).then(data => {
          setToken(data);
          resolve(data);
        }).catch(err => {
          reject(err)
        })
      })
    },
    /* fetchData({commit, state}) {
      return new Promise((resolve, reject) => {
        api({
          url: '/login/myInfo',
          method: 'post'
        }).then(data => {
          commit('SET_USER', data);
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    }, */
    fetchData({ commit, state }) {
      return new Promise((resolve, reject) => {
        api({
          url: '/device/myInfo',
          method: 'post',
          noPop: true,
        }).then(data => {
          commit('SET_USER', data);
          CookieUtil.set("PREF_USER_INFO", data)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    Logout({ commit }) {
      return new Promise((resolve) => {
        api({
          url: "login/logout",
          method: "post"
        }).then(data => {
          commit('RESET_USER')
          removeToken()
          resolve(data);
        }).catch(() => {
          commit('RESET_USER')
          removeToken()
        })
      })
    },
    FedLogout({ commit }) {
      return new Promise(resolve => {
        commit('RESET_USER')
        removeToken()
        resolve()
      })
    },
  }
}
export default user
