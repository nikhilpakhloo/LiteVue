import uuid from "uuid";
import nativeBridge from "@/plugins/nativeBridge";
const bridge = {
    request: (mediaId, likeYn) => {
        let retData = {
            isSuccess: false,
            errorMsg: '',
            data: null,
        };
        let query = likeYn == 'Y' ?
        `
            INSERT INTO TB_COLLECTION_MEDIA VALUES (
                NULL,
                1,
                '${mediaId}',
                null,
                strftime('%Y%m%d%H%M%S', 'now', 'localtime'),
                0
            )
        ` :
        `
            DELETE FROM 
                TB_COLLECTION_MEDIA 
            WHERE 
                collectionId = 1
            AND 
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