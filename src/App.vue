<template>
  <v-app>
    <v-main>
      <transition name="slide-x-transition" mode="out-in">
        <keep-alive include="KeepAlive">
          <router-view :key="$route.fullPath" />
        </keep-alive>
      </transition>
    </v-main>
    <p-toast
      v-model="toast.isShow"
      :msg="toast.msg"
      :timeout="toast.time"
      :isIc="toast.isIc"
      :callback="
        (isShow) => {
          toast.isShow = isShow;
        }
      "
      :style="{
        marginBottom: `${footerHeight}px`,
      }"
      :showClose="toast.showClose"
    />
    <v-dialog
      :persistent="pop.persistent"
      v-model="pop.isShow"
      :width="pxToRem(334)"
    >
      <p-base
        :title="typeof pop.title === 'undefined' ? '알림' : pop.title"
        :okTxt="pop.okTxt"
        :cancelTxt="pop.cancelTxt"
        :onOk="
          () => {
            if (typeof pop.okAction !== 'undefined') {
              pop.okAction();
            }
            onClosePopupAction(pop);
          }
        "
        :onCancel="
          () => {
            if (typeof pop.cancelAction !== 'undefined') {
              pop.cancelAction();
            }
            onClosePopupAction(pop);
          }
        "
        :thema="typeof pop.thema === 'undefined' ? 'default' : pop.thema"
      >
        <template v-for="(msg, index) in pop.msg.split('\n')">
          {{ msg }} <br :key="index" />
        </template>
      </p-base>
    </v-dialog>
    <transition name="fade-transition" mode="out-in">
      <!-- slide-y-reverse-transition -->
      <c-footer v-if="$route.meta.footer" />
    </transition>
  </v-app>
</template>
<script>
import CFooter from "./components/cFooter.vue";
import CookieUtil from "./plugins/CookieUtil";
import PToast from "./popup/pToast.vue";
export default {
  name: "App",
  components: { PToast, CFooter },
  data() {
    return {
      toast: {
        isShow: false,
        msg: "",
        time: 3000,
        isIc: false,
        showClose: true,
      },
      pop: {
        isCreate: false,
        isShow: false,
        msg: "",
        persistent: true,
      },
      footerHeight: 0,
    };
  },
  watch: {},
  created() {},
  mounted() {
    CookieUtil.get("PREF_LANG_SETTING").then((val) => {
      this.$i18n.locale = val ? val : this.$i18n.locale;
    });

    if (
      !this.$store.getters.userInfo ||
      !this.$store.getters.userInfo.deviceInfo
    ) {
      CookieUtil.get("PREF_USER_INFO").then((data) => {
        this.$store.commit("SET_USER", data);
      });
    }

    setTimeout(() => {
      this.nativeBridge.hideIntro();
    }, 500);

    window.goTest = () => {
      this.pushRouter("test");
    };
    window.onOrientationChange = (val) => {
      this.$store.commit("orientation", val);
    };
    window.backRouter = () => {
      var popupList = this.$store.getters.popupList;
      if (popupList && popupList.length > 0) {
        if (popupList[popupList.length - 1].route == this.$route.fullPath) {
          this.onClosePopupAction(popupList[popupList.length - 1]);
          return;
        }
      }
      if (
        !(
          window.backRouterAction &&
          typeof window.backRouterAction === "function" &&
          window.backRouterAction()
        )
      ) {
        this.$router.go(-1);
      }
    };

    this.eventOn("SHOW_TOAST", (msg, isIc, showClose, time) => {
      if (this.$el.querySelector("footer")) {
        this.footerHeight = this.$el.querySelector("footer").offsetHeight;
      }
      this.toast.msg = msg;
      if (time) {
        this.toast.time = time;
      }
      if (isIc) {
        this.toast.isIc = isIc;
      }
      this.toast.showClose = showClose;
      this.toast.isShow = true;
    });
    this.eventOn("SHOW_POPUP", (msg) => {
      if (typeof msg == "object") {
        this.pop.msg = msg.msg;
        this.pop.title = msg.title;
        this.pop.okTxt = msg.okTxt;
        this.pop.cancelTxt = msg.cancelTxt;
        this.pop.okAction = msg.okAction;
        this.pop.cancelAction = msg.cancelAction;
        if (typeof msg.persistent != "undefined" && msg.persistent != null) {
          this.pop.persistent = msg.persistent;
        }
        if (msg.thema) {
          this.pop.thema = msg.thema;
        }
      } else if (typeof msg == "string") {
        this.pop = {
          isCreate: false,
          isShow: false,
          msg: msg,
        };
      }
      this.onShowPopupAction(this.pop);
    });
  },
  activated() {},
  deactivated() {},
  destroyed() {
    delete window.goTest;
    delete window.backRouter;
    delete window.onConfigurationChange;
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
@import "@/sass/app.scss";
</style>
