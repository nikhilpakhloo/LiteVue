import uuid from "uuid";
import nativeBridge from "@/plugins/nativeBridge";

const bridge = {
    request: (mediaId) => {
        let retData = {
            isSuccess: false,
            errorMsg: '',
            data: null,
        };
        let query = `
            SELECT 
                m.*,
                CASE WHEN(COUNT(cm.collectionMediaId) > 0) THEN 'Y' ELSE 'N' END as likeYn
            FROM 
                TB_MEDIA m
            LEFT JOIN
                TB_COLLECTION_MEDIA cm
            ON
                m.mediaId = cm.mediaId 
                AND cm.collectionId = 1 
                AND cm.deleted = 0
            WHERE
                m.mediaId = ${mediaId}
        `
        return new Promise((resolve, reject) => {
            const callbackUUID = `API_CALLBACK_${uuid().replace(/-/gi, "")}`;
            nativeBridge.sqlite(JSON.stringify({ cmd: "selectQuery", query: query }), callbackUUID)
            window[`${callbackUUID}`] = (value) => {
                if (value) {
                    const ret = JSON.parse(value);
                    retData.isSuccess = ret.result
                    retData.errorMsg = ret.error
                    retData.data = ret.data && ret.data.length ? ret.data[0] : null
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