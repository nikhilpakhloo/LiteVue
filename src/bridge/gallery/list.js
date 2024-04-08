import uuid from "uuid";
import nativeBridge from "@/plugins/nativeBridge";
import allCount from "../count";

const bridge = {
    request: async (pageNo = 1, pageSize = 5) => {
        let retData = {
            isSuccess: false,
            errorMsg: '',
            list: null,
            allCount: 0
        };
        try {
            retData.allCount = await allCount.request("SELECT COUNT(*) AS cnt FROM TB_LOG", "cnt")
        } catch (error) {
            throw error
        }
        let query = `   
            SELECT 
                *
            FROM 
                TB_LOG 
            ORDER BY
                startDate DESC 
            LIMIT ${pageSize} OFFSET ${pageSize * (pageNo - 1)}
        `
        // " SELECT " +
        // "   l.*," +
        // "   GROUP_CONCAT(m.fileName, ', ') as uris " +
        // " FROM " +
        // "   TB_LOG as l " +
        // " LEFT JOIN " +
        // "   TB_MEDIA as m " +
        // " ON " +
        // "   l.logId = m.logId " +
        // " GROUP BY " +
        // "   l.logId" +
        // " ORDER BY " +
        // "   l.startDate DESC"
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