import uuid from "uuid";
import nativeBridge from "@/plugins/nativeBridge";

const bridge = {
    request: async (equals) => {
        let retData = {
            isSuccess: false,
            errorMsg: '',
            data: null,
        };
        let query = `
            SELECT 
                COUNT(logId) as cnt,
                SUM(
                    Cast(
                        (JulianDay(substr(endDate, 1, 4) || '-' || substr(endDate, 5, 2) || '-' || substr(endDate, 7, 2) || ' ' || substr(endDate, 9, 2) || ':' || substr(endDate, 11, 2) || ':' || substr(endDate, 13, 2))
                            - JulianDay(substr(startDate, 1, 4) || '-' || substr(startDate, 5, 2) || '-' || substr(startDate, 7, 2) || ' ' || substr(startDate, 9, 2) || ':' || substr(startDate, 11, 2) || ':' || substr(startDate, 13, 2))
                        ) * 24 * 60 * 60 as INTEGER
                    )
                ) AS sum
            FROM 
                TB_LOG
            WHERE 
                deleted = 0
        `
        if (equals && equals.length) {
            equals.forEach(element => {
                query += ` AND ${element.key} = '${element.val}' `
            });
        }
        return new Promise((resolve, reject) => {
            const callbackUUID = `API_GETINFO_CALLBACK_${uuid().replace(/-/gi, "")}`;
            nativeBridge.sqlite(JSON.stringify({ cmd: "selectQuery", query: query }), callbackUUID)
            window[`${callbackUUID}`] = (value) => {
                try {
                    if (value) {
                        const ret = JSON.parse(value);
                        retData.isSuccess = ret.result
                        retData.errorMsg = ret.error
                        retData.data = ret.data && ret.data.length ? ret.data[0] : null
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