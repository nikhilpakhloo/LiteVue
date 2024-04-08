import uuid from "uuid";
import nativeBridge from "@/plugins/nativeBridge";
import allCount from "../count";

const bridge = {
    request: async (pageNo = 1, pageSize = 20, equals) => {
        let retData = {
            isSuccess: false,
            errorMsg: '',
            list: null,
            allCount: 0
        };
        let cq = `
            SELECT 
                COUNT(cm.collectionId) AS cnt 
            FROM 
                TB_COLLECTION_MEDIA cm
            LEFT JOIN
                TB_MEDIA m
            ON
                m.mediaId = cm.mediaId AND m.deleted = 0
            WHERE 
                m.deleted = 0
            AND 
                cm.deleted = 0
        ` 
        let query = `
            SELECT 
               *
            FROM 
                TB_COLLECTION_MEDIA cm
            LEFT JOIN
                (
                    SELECT 
                        mm.*,
                        CASE WHEN(COUNT(cmm.collectionMediaId) > 0) THEN 'Y' ELSE 'N' END as likeYn
                    FROM 
                        TB_MEDIA mm
                    LEFT JOIN
                        TB_COLLECTION_MEDIA cmm
                    ON
                        mm.mediaId = cmm.mediaId 
                        AND cmm.collectionId = 1 
                        AND cmm.deleted = 0
                    GROUP BY 
                        mm.mediaId
                ) m
            ON
                m.mediaId = cm.mediaId AND m.deleted = 0
            WHERE 
                m.deleted = 0
            AND 
                cm.deleted = 0
        `
        if (equals && equals.length) {
            equals.forEach(element => {
                query += ` AND ${element.key} = '${element.val}' `
                cq += ` AND ${element.key} = '${element.val}' `
            });
        }
        query += `   
            ORDER BY 
                cm.createDate DESC
            LIMIT ${pageSize} OFFSET ${pageSize * (pageNo - 1)}
        `
        try {
            retData.allCount = await allCount.request(cq, "cnt")
        } catch (error) {
            throw error
        }
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