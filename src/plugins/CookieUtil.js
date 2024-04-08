import uuid from "uuid";
import Cookie from "js-cookie";
import { IS_HYBRID } from "./Const";
import AppUtil from "./AppUtil";
import nativeBridge from "./nativeBridge";
import dayjs from 'dayjs';

const CookieUtil = {
    async get(key) {
        if (IS_HYBRID) {
            let data = null;
            const callbackUUID = `COOKIE_CALLBACK_${uuid().replace(/-/gi, "")}`;
            window[`${callbackUUID}`] = (value) => {
                if (value) {
                    data = value;
                } else {
                    data = "";
                }
                delete window[`${callbackUUID}`];
            };

            nativeBridge.getPrefData(key, callbackUUID);
            while (data == null) {
                await AppUtil.sleep(100);
            }
            let obj = {
                value: "",
                expires: ""
            };
            try {
                obj = JSON.parse(data);
            } catch (error) {
                obj = {
                    value: "",
                    expires: ""
                };
            }
            if (obj.expires && dayjs(obj.expires).isValid() && dayjs().diff(dayjs(obj.expires)) > 0) {
                nativeBridge.removePrefData(key);
                obj.value = "";
            }
            return obj.value;
        } else {
            return Cookie.get(key);
        }
    },
    set(key, value, option = { expires: null }) {
        if (IS_HYBRID) {
            let obj = {
                value: value,
                expires: ""
            };
            if (option && option.expires) {
                let expireDate = null;
                if (typeof option.expires === "number") {
                    expireDate = dayjs()
                    expireDate.add(option.expires, 'days');
                } else {
                    expireDate = dayjs(option.expires)
                }
                if (expireDate && expireDate.isValid()) {
                    obj.expires = expireDate.format("YYYY-MM-DD HH:mm:ss")
                }
            }
            nativeBridge.setPrefData(key, JSON.stringify(obj));
        } else {
            Cookie.set(key, value, option);
        }
    },
    remove(key) {
        if (IS_HYBRID) {
            nativeBridge.removePrefData(key);
        } else {
            Cookie.remove(key);
        }
    }
};

export default CookieUtil;