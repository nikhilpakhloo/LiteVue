import uuid from "uuid";
import nativeBridge from "@/plugins/nativeBridge";

const bridge = {
    request: (query, key = "count(*)") => {
        let retData = {
            isSuccess: false,
            errorMsg: '',
            list: null,
            allCount: 0
        };
        let promise = new Promise((resolve, reject) => {
            const callbackUUID = `API_CALLBACK_${uuid().replace(/-/gi, "")}`;
            try {
                nativeBridge.sqlite(JSON.stringify({ cmd: "selectQuery", query: query }), callbackUUID)
            } catch (error) {
                reject();
            }
            window[`${callbackUUID}`] = (value) => {
                try {
                    if (value) {
                        const ret = JSON.parse(value);
                        retData.isSuccess = ret.result
                        retData.errorMsg = ret.error
                        resolve(ret['data'][0][key]);
                    } else {
                        reject();
                    }
                } catch (error) {
                    reject();
                }
                delete window[`${callbackUUID}`];
            };
        });
        return promise
    }
}
export default bridge