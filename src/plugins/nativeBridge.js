import CookieUtil from "./CookieUtil";

// 네이티브 함수로 데이터 전달 처리
const sendNativeBridge = (cmd, data = null, callback = null) => {
    if (cmd) {
        if (navigator.userAgent.search('os:android') > 0) {
            Android.nativeBridge(cmd, data, callback)
        } else if (navigator.userAgent.search('os:ios') > 0) {
            webkit.messageHandlers.nativeBridge.postMessage({
                cmd: cmd,
                data: data,
                callback: callback
            });
        } else {
            throw "Not Native"
        }
    }
}

const nativeBridge = {
    // 테스트용 셈플 코드
    testLog: (data = null, callback = null) => {
        sendNativeBridge('testLog', data, callback);
    },
    testLog2: (data = null, callback = null) => {
        sendNativeBridge('testLog2', data, callback);
    },

    setPrefData: (key, value) => {
        let data = {
            key: key,
            value: value
        };
        sendNativeBridge('setPrefData', JSON.stringify(data));
    },
    getPrefData: (key, callback) => {
        sendNativeBridge('getPrefData', key, callback);
    },
    removePrefData: (key) => {
        sendNativeBridge('removePrefData', key);
    },
    hideIntro: (callback) => {
        sendNativeBridge('hideIntro', null, callback);
    },
    exitApp: () => {
        sendNativeBridge('exitApp');
    },
    getContact: (callback) => {
        sendNativeBridge('getContact', null, callback);
    },
    showFilterView: (data, callback) => {
        sendNativeBridge('showFilterView', JSON.stringify(data), callback);
    },
    sqlite: (data, callback) => {
        sendNativeBridge('sqlite', data, callback);
    },
    startDive: async (callback) => {
        await CookieUtil.get("PREF_CAMERA_SETTING_RATIO").then(v => {
            if (!v) {
                CookieUtil.set("PREF_CAMERA_SETTING_RATIO", "16:10");
            }
        })
        await CookieUtil.get("PREF_CAMERA_SETTING_RESOLUTION").then(v => {
            if (!v) {
                CookieUtil.set("PREF_CAMERA_SETTING_RESOLUTION", "FULLHD");
            }
        })
        sendNativeBridge('startDive', null, callback);
    },
    shareImage: (data, callback) => {
        sendNativeBridge('shareImage', JSON.stringify(data), callback);
    },
    setStatusBarFontColor: (data, callback) => {
        sendNativeBridge('setStatusBarFontColor', data, callback);
    },
    changeOrientation: (data, callback) => {
        sendNativeBridge('changeOrientation', data, callback);
    },
    checkAuth: (callback) => {
        sendNativeBridge('checkAuth', null, callback);
    },
    showAuthView: (callback) => {
        sendNativeBridge('showAuthView', null, callback);
    },
    fileDownload: (data, callback) => {
        sendNativeBridge('fileDownload', JSON.stringify(data), callback);
    },
    fileDelete: (data, callback) => {
        sendNativeBridge('fileDelete', JSON.stringify(data), callback);
    },
    showLicense: (callback) => {
        sendNativeBridge('showLicense', null, callback);
    },
    getSerialNumber: (callback) => {
        sendNativeBridge('getSerialNumber', null, callback);
    },
    test: (key, data, callback) => {
        sendNativeBridge(key, data, callback);
    },
};

export default nativeBridge;
