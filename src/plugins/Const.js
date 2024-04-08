export const baseRemSize = 16
export const FILE_MAX_SIZE = 10 // MB
export const IMAGE_MAX_SIZE = 2 // MB
export const VIDEO_MAX_SIZE = 3 //GB
export const FILTER_MAX_SIZE = 10 // 한번에 보정할 수 있는 갯수

export const API_URL = 'http://ec2-3-95-29-128.compute-1.amazonaws.com:8887'

const getAgentData = (key) => {
    let parserKey = `,${key}:`;
    let retData = "";
    if (navigator.userAgent.search(parserKey) != -1) {
        retData = navigator.userAgent.substring(
            navigator.userAgent.indexOf(parserKey) + parserKey.length
        );
        retData = retData.substring(0, retData.indexOf(","));
    }
    return retData;
}
export const getNativeOS = () => {
    // ios 인지 android 인지 알려줌
    return getAgentData("os");
};
// export const getAndVer = () => {
//     return getAgentData("andver");
// };
export const getVerCode = () => {
    return getAgentData("versionCode");
};
export const getVerName = () => {
    return getAgentData("versionName");
};
export const getStatusBarHeight = () => {
    return getAgentData("sBarHeight");
};
export const getDeviceUuid = () => {
    return getAgentData("device_uuid");
};

const NativeOS = getNativeOS().toLowerCase();
export const IS_HYBRID = (NativeOS == 'ios' || NativeOS == 'android') ? true : false;
