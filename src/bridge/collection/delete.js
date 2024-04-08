import uuid from "uuid";
import nativeBridge from "@/plugins/nativeBridge";
const bridge = {
    request: async (seqs) => {
        let retData = {
            isSuccess: false,
            errorMsg: '',
            data: null,
        };

        if(!seqs.length) {
            throw 'no data'
        }

        let query = `   
            DELETE FROM 
                TB_COLLECTION
            WHERE
                collectionId IN (${seqs})
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
            if (JSON.parse(res).result) {
                return new Promise((resolve, reject) => {
                    let q = `
                        DELETE FROM 
                            TB_COLLECTION_MEDIA 
                        WHERE 
                            collectionId IN (${seqs})
                    `
                    const callbackUUID = `API_GETID_CALLBACK_${uuid().replace(/-/gi, "")}`;
                    nativeBridge.sqlite(JSON.stringify({ cmd: "runQuery", query: q }), callbackUUID)
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