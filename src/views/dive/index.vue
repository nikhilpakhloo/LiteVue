<template>
  <v-layout
    fill-height
    column
    class="lay-body"
    align-center
    :style="{ paddingTop: `${sBarHeight}px` }"
  >
    <v-spacer />
    <span class="txt-sub" v-html="$t('dive.start')" />
    <img
      :ripple="
        userInfo && userInfo.deviceInfo && userInfo.deviceInfo.serialNumber
          ? true
          : false
      "
      class="btn-start"
      :src="
        userInfo && userInfo.deviceInfo && userInfo.deviceInfo.serialNumber
          ? require('@/assets/images/btn-start.svg')
          : require('@/assets/images/btn-start-disable.svg')
      "
      @click.prevent.stop="onClickActionStart"
    />
    <v-layout
      class="lay-camera"
      align-center
      justify-center
      @click.prevent.stop="() => pushRouter({ name: 'camera' })"
    >
      <img src="@/assets/images/ic-setting-w-20.svg" />
      <span v-html="$t('dive.setting')" />
    </v-layout>
    <v-spacer />
    <v-img
      src="@/assets/images/img-main-bg.png"
      contain
      class="flex-grow-0"
      max-width="90%"
      min-width="60%"
      width="358px"
      :aspect-ratio="358 / 242"
    />
  </v-layout>
</template>

<script>
export default {
  name: "App",
  components: { },
  data() {
    return {
      sPop: {
        isShow: false,
        isCreate: false,
      },
    };
  },
  watch: {},
  created() {
    this.checkAuth(false);
  },
  mounted() {},
  activated() {},
  deactivated() {},
  destroyed() {},
  methods: {
    onClickActionStart() {
      if (
        this.userInfo &&
        this.userInfo.deviceInfo &&
        this.userInfo.deviceInfo.serialNumber
      ) {
        this.checkAuth(true);
      } else {
        this.showPopup({
          title: this.$t("dive.check-device"),
          okTxt: this.$t("dive.check-device-ok"),
          cancelTxt: this.$t("dive.check-device-cancel"),
          msg: this.$t("dive.check-device-desc"),
          okAction: () => {
            this.pushRouter({
              name: "device",
            });
          },
        });
      }
    },
    checkAuth(startDive = false) {
      window.checkAuthCallBack = (res) => {
        if (res == "success") {
          if (startDive) {
            this.nativeBridge.startDive();
          } else {
            this.$nextTick(async () => {
              await this.sleep(100);
              if (
                !this.userInfo ||
                !this.userInfo.deviceInfo ||
                !this.userInfo.deviceInfo.serialNumber
              ) {
                this.showPopup({
                  title: this.$t("dive.check-device"),
                  okTxt: this.$t("dive.check-device-ok"),
                  cancelTxt: this.$t("dive.check-device-cancel"),
                  msg: this.$t("dive.check-device-desc"),
                  okAction: () => {
                    this.pushRouter({
                      name: "device",
                    });
                  },
                });
              }
            });
          }
        } else {
          this.pushRouter("auth");
        }
        delete window.checkAuthCallBack;
      };
      this.nativeBridge.checkAuth("checkAuthCallBack");
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/sass/app.scss";
.lay-body {
  background-image: linear-gradient(
    to top,
    #fff -10%,
    #64dce4 19%,
    #11cbd7 37%,
    #11b3bd 61%,
    #007089 101%,
    rgba(69, 56, 200, 0) 133%
  );
  .txt-sub {
    margin-top: pxToRem(6px);
    font-style: normal;
    font-weight: 700;
    font-size: pxToRem(35px);
    line-height: pxToRem(42px);
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: -0.022em;
    color: #ffffff;
  }
  .btn-start {
    width: pxToRem(275px);
    height: pxToRem(119px);
    margin-top: pxToRem(25px);
    max-width: 90%;
  }
  .lay-camera {
    margin-top: pxToRem(25px);
    flex: none;
    width: auto;
    img {
      width: pxToRem(20px);
      height: pxToRem(20px);
    }
    span {
      margin-left: pxToRem(5px);
      font-style: normal;
      font-weight: 700;
      font-size: pxToRem(14px);
      display: flex;
      align-items: center;
      text-align: center;
      letter-spacing: -0.022em;
      color: #ffffff;
    }
  }
}
.spop-body {
  font-style: normal;
  font-weight: 700;
  font-size: pxToRem(16px);
  line-height: pxToRem(24px);
  text-align: center;
  letter-spacing: -0.022em;
  color: #000000;
  span {
    color: #15d4e0;
    font-style: normal;
    font-weight: 700;
    font-size: pxToRem(16px);
    line-height: pxToRem(24px);
    text-align: center;
    letter-spacing: -0.022em;
  }
}
</style>
