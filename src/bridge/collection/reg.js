import uuid from "uuid";
import nativeBridge from "@/plugins/nativeBridge";
import { getDeviceUuid } from "@/plugins/Const";
const bridge = {
    request: async (title) => {
        let retData = {
            isSuccess: false,
            errorMsg: '',
            data: null,
        };
        let query = `   
            INSERT INTO 
                TB_COLLECTION
            VALUES (
                NULL,
                '${getDeviceUuid()}',
                '${title}',
                0,
                0,
                strftime('%Y%m%d%H%M%S', 'now', 'localtime'),
                0
            ) 
        `
        try {
            var res = await new Promise((resolve, reject) => {
                const callbackUUID = `API_GETINFO_CALLBACK_${uuid().replace(/-/gi, "")}`;
                nativeBridge.sqlite(JSON.stringify({ cmd: "runQuery", query: query }), callbackUUID)
                window[`${callbackUUID}`] = (value) => {
                    try {
                        if (value) {
                            resolve(value);
                        } else {
                            reject();
                        }
                    } catch (error) {
                        reject(error);
                    }
                    delete window[`${callbackUUID}`];
                };
            });
            if(JSON.parse(res).result) {
                return new Promise((resolve, reject) => {
                    let q = `
                        SELECT 
                            collectionId 
                        FROM 
                            TB_COLLECTION 
                        WHERE 
                            deleted = 0 
                        ORDER BY 
                            collectionId DESC 
                        LIMIT 1
                    `
                    const callbackUUID = `API_GETID_CALLBACK_${uuid().replace(/-/gi, "")}`;
                    nativeBridge.sqlite(JSON.stringify({ cmd: "selectQuery", query: q }), callbackUUID)
                    window[`${callbackUUID}`] = (value) => {
                        try {
                            if (value) {
                                const ret = JSON.parse(value);
                                retData.isSuccess = ret.result
                                retData.errorMsg = ret.error
                                retData.data = ret.data && ret.data.length > 0 ? ret.data[0] : ret.data
                                resolve(retData);
                            } else {
                                reject();
                            }
                        } catch (error) {
                            reject(error);
                        }
                        delete window[`${callbackUUID}`];
                    };
                })
            } else {
                throw 'error'
            }
        } catch (error) {
            throw error
        }
    }
}
export default bridge