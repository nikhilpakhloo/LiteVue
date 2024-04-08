import uuid from "uuid";
import nativeBridge from "@/plugins/nativeBridge";
const bridge = {
    request: (mediaId, title, memo) => {
        let retData = {
            isSuccess: false,
            errorMsg: '',
            data: null,
        };

        var memoObj = {
            title: title,
            memo: memo
        }
        
        let query =
        `
            UPDATE 
                TB_MEDIA
            SET
                memo = '${JSON.stringify(memoObj).replace(/"/gi, "\\\"")}'
            WHERE
                mediaId = '${mediaId}'
        `
        return new Promise((resolve, reject) => {
            const callbackUUID = `API_CALLBACK_${uuid().replace(/-/gi, "")}`;
            nativeBridge.sqlite(JSON.stringify({ cmd: "runQuery", query: query }), callbackUUID)
            window[`${callbackUUID}`] = (value) => {
                if (value) {
                    const ret = JSON.parse(value);
                    retData.isSuccess = ret.result
                    retData.errorMsg = ret.error
                    retData.data = ret.data
                    resolve(retData);
                } else {
                    reject();
                }
                delete window[`${callbackUUID}`];
            };
        });
    }
}
export default bridge