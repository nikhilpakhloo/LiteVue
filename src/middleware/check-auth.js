import store from "@/store";
import { getDeviceUuid, getNativeOS } from "@/plugins/Const";
import { getToken } from "@/utils/auth";

export default async (to, from, next) => {
    if (getToken()) {
        //leess 20220926 아이폰 텍스트표시 딜레이 수정(화면 전환시마다 호출되는 이부분 삭제시 해당 증상이 없어짐)
        //store.dispatch('fetchData')
    } else {
        store.dispatch('Login', {
            loginId: getDeviceUuid(),
            model: getNativeOS()
        }).then(() => {
            store.dispatch('fetchData')
        });
    }
    next();
};