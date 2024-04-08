import uuid from "uuid";
import nativeBridge from "@/plugins/nativeBridge";
import allCount from "../count";

const bridge = {
    request: async (pageNo = 1, pageSize = 10) => {
        let retData = {
            isSuccess: false,
            errorMsg: '',
            list: null,
            allCount: 0
        };

        let from = `
            FROM
                TB_COLLECTION c
            LEFT JOIN 
                TB_COLLECTION_MEDIA cm 
            ON (
                c.collectionId = cm.collectionId AND cm.deleted = 0
                AND NOT EXISTS (
                    SELECT 
                        1 
                    FROM 
                        TB_COLLECTION_MEDIA jcm
                    WHERE 
                        jcm.collectionId = c.collectionId
                    AND 
                        jcm.collectionMediaId > cm.collectionMediaId
                )
            )
            LEFT JOIN
                TB_MEDIA m
            ON 
                m.mediaId = cm.mediaId
        `
        let cq = `
            SELECT 
                COUNT(c.collectionId) as cnt
            ${from} 
        `
        try {
            retData.allCount = await allCount.request(cq, "cnt")
        } catch (error) {
            throw error
        }
        let query = `   
            SELECT 
                c.*, m.*
            ${from}
            ORDER BY
                c.favorite DESC, c.createDate DESC 
            LIMIT ${pageSize} OFFSET ${pageSize * (pageNo - 1)}
        `
        return new Promise((resolve, reject) => {
            const callbackUUID = `API_GETLIST_CALLBACK_${uuid().replace(/-/gi, "")}`;
            nativeBridge.sqlite(JSON.stringify({ cmd: "selectQuery", query: query }), callbackUUID)
            window[`${callbackUUID}`] = (value) => {
                try {
                    if (value) {
                        const ret = JSON.parse(value);
                        retData.isSuccess = ret.result
                        retData.errorMsg = ret.error
                        retData.list = ret.data
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