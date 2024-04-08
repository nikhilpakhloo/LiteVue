import EventBus from "./EventBus";
import { getStatusBarHeight } from './Const'

const AppUtil = {
    sleep: (ms) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve()
            }, ms)
        });
    },
    // 천단위 콤마 처리
    numberWithCommas: (x) => {
        try {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        } catch (e) {
            return x ? x : '0';
        }
    },
    getDurationFormat: (x) => {
        try {
            // var sec_num = parseInt(x, 10);
            // if (!sec_num) {
            //     throw 'error'
            // }
            // var hours = Math.floor(sec_num / 3600);
            // var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
            // var seconds = sec_num - (hours * 3600) - (minutes * 60);
            // if (hours < 10) { hours = "0" + hours; }
            // if (minutes < 10) { minutes = "0" + minutes; }
            // if (seconds < 10) { seconds = "0" + seconds; }
            // return hours + ':' + minutes + ':' + seconds;
            var sec_num = parseInt(x, 10);
            if (!sec_num) {
                throw 'error'
            }
            var minutes = Math.floor((sec_num) / 60);
            var seconds = sec_num - (minutes * 60);
            if (minutes < 10) { minutes = "0" + minutes; }
            if (seconds < 10) { seconds = "0" + seconds; }
            return minutes + ':' + seconds;
        } catch (e) {
            return '00:00';
        }
    },
    // 줄바꿈 문자열 <br>로 치환 처리
    replaceLnToBr: (str) => {
        let text = str
        try {
            text = text.replace(/&/g, "&amp;")
            text = text.replace(/</g, "&lt;")
            text = text.replace(/>/g, "&gt;")
            text = text.replace(/"/g, "&quot;")
            text = text.replace(/'/g, "&apos;")
            text = text.replace(/\r\n/g, "<br>")
            text = text.replace(/\\r\\n/g, "<br>")
            text = text.replace(/\n/g, "<br>")
            text = text.replace(/\\n/g, "<br>")
        } catch (error) {
        }
        return text
    },
    eventOn(id, func) {
        EventBus.on(id, func);
    },
    eventOff(id, func = null) {
        EventBus.off(id, func);
    },
    eventEmit(id, data = null) {
        EventBus.emit(id, data);
    },
    getUrlForm(strUrl) {
        var expUrl = /^http[s]?:\/\//i;
        if (!expUrl.test(strUrl)) {
            return 'https://' + strUrl
        }
        return strUrl;
    },
    validateEmail(email) {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(email);
    },
    validatePhone(phone) {
        var args = phone.replace(/-/gi, "")
        if (/^[0-9]{2,3}[0-9]{3,4}[0-9]{4}/.test(args)) {
            return true;
        }
        return false;
    },
    validateUrl(url) {
        let regex = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
        return regex.test(url)
    },
    validateNumber(num) {
        return /^\d+$/.test(num);
    },
    validatePassword(url) {
        let regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
        return regex.test(url)
    },
    sBarHeight: () => {
        return Number(getStatusBarHeight())
    },
};

export default AppUtil;