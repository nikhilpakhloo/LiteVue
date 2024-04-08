import router from './router'
import store from './store'
import {getToken,removeToken} from '@/utils/auth' 
import CookieUtil from "@/plugins/CookieUtil";
const whiteList = [
  '/login',
  '/fpw',
  '/join',
  '/pass',
  '/repass',
  '/complete',
  '/terms',
  '/license',
  '/privacy',
  '/device',
  '/scan',
  '/perm',
  '/perm',

  '/logbook/gallery',
  '/logbook/gallery/more',
  '/logbook/gallery/list',
  '/logbook/coll',
  '/logbook/coll/more',
  '/logbook/coll/list/:seq',
  '/logbook/coll/reg',
  '/logbook/coll/edit/:seq',
  '/logbook/coll/pics',

  '/media',
  '/mypage',
  '/myinfo',
  '/setting',
  '/service',
  '/appinfo',
  '/account',

  '/tutorial',
  '/pchange',
  '/notice',
  '/notice/detail',
  '/faq',
  '/faq/list',
  '/faq/detail',
  '/qna',
  '/qna/detail',
  '/qna/reg',
  '/contract',
  '/sugg/reg',
  '/test',

  '/404'
]
// router.beforeEach((to, from, next) => {
//   if (getToken()) {
//     if (to.path === '/login' || to.path === '/join') {
//       next({path: '/'})
//     } else if (!store.getters.userInfo) {
//       store.dispatch('fetchData').then(() => {
//         next({...to})
//       })
//     } else {
//       next()
//     }
//   } else if (whiteList.indexOf(to.path) !== -1) {
//     next()
//   } else {
//     //허용되지 않은 화면 이면 로그인화면으로
//     store.commit('RESET_USER')
//     next('/login')
//   }
// })
// router.beforeEach((to, from, next) => {
//   CookieUtil.get("loginId").then((loginId) => {
//     let init = false;
//     if(!loginId || loginId == ''){
//         var temp = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
//             var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
//             return v.toString(16);
//         });
//         loginId = temp;
//         CookieUtil.set("loginId", loginId);
//         init = true;
//     }
//     if (!init && getToken()) {
//       if (!store.getters.userInfo) {
//         store.dispatch('fetchData').then(() => {
//           next({...to})
//         }).catch(() => {
//           next()
//         });
//       } else {
//         next()
//       }
//     } else {
//       store.dispatch('Login', {
//           loginId: loginId, 
//           model: 'Galaxy S20 ultra (gray) (R3CN30BZB2P)'
//       }).then(() =>{
//         store.dispatch('fetchData').then(()=>{
//             next({...to})
//         });
//       }).catch(() => {
//         removeToken();
//         next()
//       });
//     }
//   });
// })
