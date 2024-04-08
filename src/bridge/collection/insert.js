import uuid from "uuid";
import nativeBridge from "@/plugins/nativeBridge";
const bridge = {
    request: async (collectionId, mediaIds) => {
        let retData = {
            isSuccess: false,
            errorMsg: '',
            data: null,
        };
        let insert = ``
        mediaIds.forEach(element => {
            if (insert) {
                insert += ` UNION `
            }
            insert += `
                SELECT
                    NULL,
                    ${collectionId},
                    ${element},
                    0,
                    strftime('%Y%m%d%H%M%S', 'now', 'localtime'),
                    0
            `
        });

        let query = `   
            INSERT INTO 
                TB_COLLECTION_MEDIA
            ${insert}
        `
        return new Promise((resolve, reject) => {
            const callbackUUID = `API_GETINFO_CALLBACK_${uuid().replace(/-/gi, "")}`;
            nativeBridge.sqlite(JSON.stringify({ cmd: "runQuery", query: query }), callbackUUID)
            window[`${callbackUUID}`] = (value) => {
                try {
                    if (value) {
                        const ret = JSON.parse(value);
                        retData.isSuccess = ret.result
                        retData.errorMsg = ret.error
                        retData.data = ret.data
                        resolve(retData);
                    } else {
                        reject();
                    }
                } catch (error) {
                    reject(error);
                }
                delete window[`${callbackUUID}`];
            };
        });
    }
}
export default bridge