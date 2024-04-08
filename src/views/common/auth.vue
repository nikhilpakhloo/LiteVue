<template>
  <v-layout fill-height column class="px-5">
    <span
      :style="{
        paddingTop: `${sBarHeight}px`,
      }"
      v-html="$t('auth.sub')"
      class="txt-sub"
    />
    <span class="txt-desc py-2 mt-1">{{ $t("auth.desc") }}</span>
    <v-layout class="lay-item mx-1">
      <img class="ic mr-4" src="@/assets/images/ic-bluetooth-t-24.svg" />
      <v-layout column>
        <span class="txt-name">{{ $t("auth.bluetooth") }}</span>
        <span class="txt-description">{{ $t("auth.bluetooth-desc") }}</span>
      </v-layout>
    </v-layout>
    <v-layout class="lay-item mx-1">
      <img class="ic mr-4" src="@/assets/images/ic-camera-t-24.svg" />
      <v-layout column>
        <span class="txt-name">{{ $t("auth.camera") }}</span>
        <span class="txt-description">{{ $t("auth.camera-desc") }}</span>
      </v-layout>
    </v-layout>
    <v-layout class="lay-item mx-1">
      <img class="ic mr-4" src="@/assets/images/ic-mic-t-24.svg" />
      <v-layout column>
        <span class="txt-name">{{ $t("auth.mic") }}</span>
        <span class="txt-description">{{ $t("auth.mic-desc") }}</span>
      </v-layout>
    </v-layout>
    <v-layout class="lay-item mx-1">
      <img class="ic mr-4" src="@/assets/images/ic-location-t-24.svg" />
      <v-layout column>
        <span class="txt-name">{{ $t("auth.location") }}</span>
        <span class="txt-description">{{ $t("auth.location-desc") }}</span>
      </v-layout>
    </v-layout>
    <v-spacer />
    <c-btn
      thema="default-bg"
      height="54"
      width="110"
      class="my-5"
      borderRadius="300"
      :onClick="onClickActionOk"
    >
      {{ $t("common.ok") }}
    </c-btn>
  </v-layout>
</template>

<script>
export default {
  name: "splash",
  data() {
    return {};
  },
  watch: {},
  created() {
    window.backRouterAction = () => {
      this.nativeBridge.exitApp();
      return true;
    };
  },
  mounted() {},
  activated() {},
  deactivated() {},
  destroyed() {
    delete window.backRouterAction;
  },
  methods: {
    onClickActionOk() {
      window.showAuthCallBack = (res) => {
        if (res == "success") {
          this.$router.go(-1);
        }
        delete window.showAuthCallBack;
      };
      this.nativeBridge.showAuthView("showAuthCallBack");
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/sass/app.scss";
.txt-sub {
  margin-top: pxToRem(90px);
  font-style: normal;
  font-weight: 700;
  font-size: pxToRem(30px);
  line-height: pxToRem(41px);
  letter-spacing: -0.01em;
  color: #000000;
}
.txt-desc {
  font-family: "PP Pangram Sans";
  font-style: normal;
  font-weight: 500;
  font-size: pxToRem(15px);
  letter-spacing: -0.01em;
  color: #000000;
  margin-bottom: pxToRem(50px);
}
.lay-item {
  padding: pxToRem(20px) 0;
  &:not(:last-of-type) {
    border-bottom: 1px solid #ececec;
  }
  flex: none;
  .ic {
    width: pxToRem(24px);
    height: pxToRem(24px);
  }
  .txt-name {
    font-family: "PP Pangram Sans";
    font-style: normal;
    font-weight: 400;
    font-size: pxToRem(15px);
    line-height: pxToRem(17px);
    color: #000000;
  }
  .txt-description {
    margin-top: pxToRem(6px);
    font-family: "PP Pangram Sans";
    font-style: normal;
    font-weight: 400;
    font-size: pxToRem(11px);
    line-height: pxToRem(14px);
    color: #000000;
  }
}
</style>
