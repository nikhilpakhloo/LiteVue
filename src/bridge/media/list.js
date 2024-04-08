import uuid from "uuid";
import nativeBridge from "@/plugins/nativeBridge";
import allCount from "../count";

const bridge = {
    request: async (pageNo = 1, pageSize = 20, equals, excColId) => {
        let retData = {
            isSuccess: false,
            errorMsg: '',
            list: null,
            allCount: 0
        };
        let cq = `
            SELECT 
                COUNT(*) AS cnt 
            FROM 
                TB_MEDIA 
            WHERE 
                deleted = 0
        `
        let query = `
            SELECT 
               *
            FROM 
               (
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
                    GROUP BY
                        m.mediaId
                )
            WHERE 
                deleted = 0
        `

        if (equals && equals.length) {
            equals.forEach(element => {
                query += ` AND ${element.key} = '${element.val}' `
                cq += ` AND ${element.key} = '${element.val}' `
            });
        }

        if (excColId) {
            let eq = `
                AND mediaId NOT IN (
                    SELECT 
                        mediaId
                    FROM
                        TB_COLLECTION_MEDIA
                    WHERE 
                        deleted = 0
                    AND 
                        collectionId = ${excColId}
                )
            `
            query += eq;
            cq += eq;
        }
        query += `   
            ORDER BY 
                createDate DESC
            LIMIT ${pageSize} OFFSET ${pageSize * (pageNo - 1)}
        `
        try {
            retData.allCount = await allCount.request(cq, "cnt")
        } catch (error) {
            return Promise.reject(error)
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