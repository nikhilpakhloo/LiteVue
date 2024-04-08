import uuid from "uuid";
import nativeBridge from "@/plugins/nativeBridge";

const bridge = {
    request: async (seq) => {
        let retData = {
            isSuccess: false,
            errorMsg: '',
            data: null,
        };
        let query = `   
            SELECT 
                *
            FROM 
                TB_COLLECTION 
            WHERE
                collectionId = ${seq}
        `
        return new Promise((resolve, reject) => {
            const callbackUUID = `API_GETINFO_CALLBACK_${uuid().replace(/-/gi, "")}`;
            nativeBridge.sqlite(JSON.stringify({ cmd: "selectQuery", query: query }), callbackUUID)
            window[`${callbackUUID}`] = (value) => {
                try {
                    if (value) {
                        const ret = JSON.parse(value);
                        retData.isSuccess = ret.result
                        retData.errorMsg = ret.error
                        retData.data = ret.data && ret.data.length > 0 ? ret.data[0] : null
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