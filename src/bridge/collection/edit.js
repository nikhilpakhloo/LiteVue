import uuid from "uuid";
import nativeBridge from "@/plugins/nativeBridge";
const bridge = {
    request: async (seq, title) => {
        let retData = {
            isSuccess: false,
            errorMsg: '',
            data: null,
        };
        let query = `   
            UPDATE 
                TB_COLLECTION
            SET 
                collectionName = '${title}'
            WHERE
                collectionId = '${seq}'
        `
        try {
            return await new Promise((resolve, reject) => {
                const callbackUUID = `API_GETINFO_CALLBACK_${uuid().replace(/-/gi, "")}`;
                nativeBridge.sqlite(JSON.stringify({ cmd: "runQuery", query: query }), callbackUUID)
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
            });
        } catch (error) {
            throw error
        }
    }
}
export default bridge