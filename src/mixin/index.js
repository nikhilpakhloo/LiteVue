import dayjs from 'dayjs';
import { baseRemSize, FILTER_MAX_SIZE, IMAGE_MAX_SIZE, VIDEO_MAX_SIZE } from '../plugins/Const';

import AppUtil from '../plugins/AppUtil';
import EventBus from '../plugins/EventBus';
import FileUtil from '../plugins/FileUtil';

import nativeBridge from "../plugins/nativeBridge";

export default {
    components: {
        // components
        layHeader: () => import("../layout/layHeader.vue"),
        cBtn: () => import("../components/cBtn.vue"),
        cInput: () => import("../components/cInput.vue"),

        // popup
        Loading: () => import("../popup/loading.vue"),
        pBase: () => import("../popup/pBase.vue"),
    },
    props: {},
    data() {
        return {
            dayjs: dayjs,
            FileUtil: FileUtil,
            IMAGE_MAX_SIZE: IMAGE_MAX_SIZE,
            VIDEO_MAX_SIZE: VIDEO_MAX_SIZE,
            FILTER_MAX_SIZE: FILTER_MAX_SIZE,
            nativeBridge: nativeBridge,
        };
    },
    computed: {
        isMobileSize() {
            return window.thisVue.$vuetify.breakpoint.name === 'sm' || window.thisVue.$vuetify.breakpoint.name === 'xs';
        },
        isLogin() {
            return true //this.$store.getters['auth/isLogin'];
        },
        isIE() {
            return AppUtil.isIE()
        },
        sBarHeight() {
            return this.isLandscape ? 0 : AppUtil.sBarHeight()
        },
        userInfo() {
            return this.$store.getters.userInfo
        },
        isLandscape() {
            return this.$store.getters.orientation == 2
        },
        filterVer() {
            return this.$store.getters.filterVer
        }
    },
    watch: {},
    created() { },
    mounted() { },
    destroyed() { },
    methods: {
        numberWithCommas: AppUtil.numberWithCommas,
        getDurationFormat: AppUtil.getDurationFormat,
        replaceLnToBr: AppUtil.replaceLnToBr,
        getUrlForm: AppUtil.getUrlForm,
        eventOn: AppUtil.eventOn,
        eventOff: AppUtil.eventOff,
        eventEmit: AppUtil.eventEmit,
        sleep: AppUtil.sleep,

        validateEmail: AppUtil.validateEmail,
        validatePassword: AppUtil.validatePassword,
        validatePhone: AppUtil.validatePhone,
        validateUrl: AppUtil.validateUrl,
        validateNumber: AppUtil.validateNumber,

        pxToRem(pxSize) {
            let retRem = `${(parseInt(pxSize) / baseRemSize)}rem`;
            return retRem;
        },
        calCreatedDate(val) {
            // ~지금 / 2초~59초 전 / 1분~59분 전 / 1시간~23시간 전 / 1일~6일 전 / 1주 전 / 당해일 경우 월,일만 표시(2월 9일) / 년도 바뀐경우 년,월,일 표시(2020년 2월 9일)
            let nowDate = dayjs()
            let getDate = dayjs(val)

            let diff = Math.floor(nowDate.diff(getDate) / 1000)
            if (diff < 2) {
                return '지금'
            } else if (diff < 60) {
                return `${diff}초 전`
            } else if (diff < (60 * 60)) {
                return `${Math.floor(diff / 60)}분 전`
            } else if (diff < (60 * 60 * 24)) {
                return `${Math.floor(diff / 60 / 60)}시간 전`
            } else if (diff < (60 * 60 * 24 * 7)) {
                return `${Math.floor(diff / 60 / 60 / 24)}일 전`
            } else if (Math.floor(diff / 60 / 60 / 24) == 7) {
                return `1주 전`
            } else {
                return dayjs(val).format('YYYY. MM. DD')
            }
        },
        /**
         * 페이지 전환에 사용할 공통 함수
         * 
         * @param {*}
        */
        pushRouter(obj) {
            this.$route.meta.internalNavigation = true;
            this.$router.push(obj, () => {
                this.$route.meta.internalNavigation = false;
            })
            // .catch(error => {
            //     if (error.name != "NavigationDuplicated") {
            //         throw error;
            //     }
            // })
        },

        /**
         * 페이지 전환에 사용할 공통 함수
         * 
         * @param {*} path /로 시작할 경우 해당 페이지로 /없이 시작할 경우 common 페이지로 라우팅함
         * @param {*} query 페이지 이동시 같이 전달할 쿼리
        */
        goToPage(path, query = {}) {
            this.$route.meta.internalNavigation = true;
            this.$router.push({
                path: path,
                query: query
            }, () => {
                this.$route.meta.internalNavigation = false;
            })
            // .catch(error => {
            //     if (error.name != "NavigationDuplicated") {
            //         throw error;
            //     }
            // })
        },

        /**
         * 페이지 전환에 사용할 공통 함수
         * 
         * @param {*} name 페이지명으로 공통 화면의 경우는 앞에 생략하고 페이지명 입력하면됨
         * @param {*} query 페이지 이동시 같이 전달할 쿼리
         * @param {*} params 페이지 이동시 같이 전달할 파라미터
        */
        goToPageName(name, query = {}, params = {}) {
            this.$route.meta.internalNavigation = true;
            this.$router.push({
                name: name,
                query: query,
                params: params
            }, () => {
                this.$route.meta.internalNavigation = false;
            })
            // .catch(error => {
            //     if (error.name != "NavigationDuplicated") {
            //         throw error;
            //     }
            // })
        },

        showToast(msg, isIc, showClose, time) {
            if (msg) {
                EventBus.emit('SHOW_TOAST', msg, isIc, showClose, time)
            }
        },

        showLoginPopup() {
            EventBus.emit('SHOW_LOGIN_POPUP')
        },

        getDateFormat(val, format = "YYYY. MM. DD") {
            let nowTime = val ? dayjs(val) : dayjs()
            let time = nowTime.format(format)
            return time
        },

        showPopup(msg) {
            if (msg) {
                EventBus.emit('SHOW_POPUP', msg)
            }
        },

        onShowPopupAction(popup, callback = null) {
            popup.route = this.$route.fullPath
            this.$store.dispatch("addPopup", popup);
            if (popup.isCreate) {
                popup.isShow = true;
                if (callback != null) {
                    callback();
                }
            } else {
                popup.isCreate = true;
                window.thisVue.$nextTick(() => {
                    popup.isShow = true;
                    if (callback != null) {
                        callback();
                    }
                });
            }
        },

        onClosePopupAction(popup, isDestroy = false) {
            this.$store.dispatch("removePopup", popup);
            popup.isShow = false;
            if (isDestroy) {
                window.thisVue.$nextTick(() => {
                    popup.isCreate = false;
                });
            }
        },

        log: (msg) => {
            console.log('zz', msg)
        }
    },
};
