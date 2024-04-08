import axios from 'axios'
import { getToken } from '@/utils/auth'
import EventBus from '@/plugins/EventBus';
import store from '../store'
import CookieUtil from "../plugins/CookieUtil";
import { API_URL } from '@/plugins/Const'

let noPop = false;

const service = axios.create({
  baseURL: API_URL,
  timeout: 5000
})

service.interceptors.request.use(config => {
  if (config.noPop) {
    noPop = config.noPop;
  } else {
    noPop = false;
  }
  let token = getToken();
  if (token) {
    config.headers.token = token;
  } else if (config.url != 'device/auth') {
    throw "no token"
  }

  //leess 비동기로 인해 값이 세팅되지 않고 전달되는 듯
  // CookieUtil.get("PREF_LANG_SETTING").then((val) => {
  //   config.headers.lang = val ? val : thisVue.$i18n.locale; // to.유대리님 : thisVue가 맞아요 변경X
  // }).catch(() => {
  //   config.headers.lang = 'ko';
  // });
  config.headers.lang = thisVue.$i18n.locale;
  return config
}, error => {
  console.error(error)
  Promise.reject(error)
})
// respone
service.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.code === '200') {
      return res.info;
    } else if (res.code === "20011") {
      //EventBus.emit('SHOW_TOAST', res.msg);
      setTimeout(() => {
        store.dispatch('FedLogout').then(() => {
          location.reload()
        })
      }, 1000)
      return Promise.reject("로그인이 필요합니다.")
    } else {
      if (!noPop)
        EventBus.emit('SHOW_TOAST', res.msg);
      return Promise.reject(res)
    }
  },
  error => {
    console.error('err' + error)// for debug
    if (!noPop)
      EventBus.emit('SHOW_TOAST', error.message);
    return Promise.reject(error)
  }
)
export default service

