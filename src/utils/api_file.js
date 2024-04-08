import { API_URL } from '@/plugins/Const'
import { getToken } from '@/utils/auth'
import EventBus from '@/plugins/EventBus';
import store from '../store'

const api_file = {
  submit: (config) => {
    return new Promise((resolve, reject) => {
      var formData = new FormData();
      for (var index = 0; index < config.files.length; index++) {
        formData.append("files", config.files[index].file);
      }
      var json = JSON.stringify(config.data);
      var blob = new Blob([json], {
        type: 'application/json'
      });
      formData.append('requestJson', blob);
      var xhr = new XMLHttpRequest();
      xhr.open(config.method, API_URL + config.url);
      let token = getToken();
      if (token) {
        xhr.setRequestHeader('token', token);
      }
      xhr.onload = function () {
        var res = JSON.parse(xhr.responseText);
        if (res.code === '200') {
          resolve(res.info)
          // return res.info;
        } else if (res.code === "20011") {
          //EventBus.emit('SHOW_TOAST', res.msg);
          setTimeout(() => {
            store.dispatch('FedLogout').then(() => {
              location.reload()
            })
          }, 1000)
          reject("로그인이 필요합니다.")
        } else {
          EventBus.emit('SHOW_TOAST', res.msg);
          reject(res)
        }
      }
      
      // <-- mjpark 에러 관련 콜백 정의
      xhr.onerror = () => {
        reject({
          msg: 'Network Error'
        })
      }
      // -->
      
      xhr.send(formData);
      // resolve()
    });
  }
}

export { api_file };
