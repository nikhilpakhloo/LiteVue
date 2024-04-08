<template>
  <v-layout fill-height align-center justify-center column>
    <v-layout
      class="lay-padding top"
      :style="{
        paddingTop: `${sBarHeight}px`,
      }"
    />
    <v-carousel
      v-model="sIdx"
      class="lay-splash"
      height="auto"
      :show-arrows="false"
      hide-delimiters
      continuous
      cycle
    >
      <v-carousel-item
        v-for="item in items"
        :key="item.src"
        style="width: 100vw"
        eager
      >
        <v-layout align-center justify-center column>
          <v-img
            contain
            max-height="320"
            max-width="320"
            class="img-splash"
            :src="item.src"
            eager
          />
          <v-img contain eager class="img-title" :src="item.title" />
          <span
            v-html="replaceLnToBr($t(item.txt))"
            class="text-center txt-sub"
          />
        </v-layout>
      </v-carousel-item>
    </v-carousel>
    <v-layout
      justify-center
      class="lay-spot"
      v-touch="{
        left: () => (sIdx < items.length - 1 ? sIdx++ : null),
        right: () => (sIdx > 0 ? sIdx-- : null),
      }"
    >
      <span
        v-for="index in items.length"
        :key="index"
        class="spot rounded-circle"
        :class="[sIdx == index - 1 ? 'select' : 'disable']"
      />
    </v-layout>
    <c-btn
      class="btn-join mt-9"
      :height="58"
      :fontWeight="700"
      :fontSize="20"
      :mx="37"
      :thema="'default-bg'"
      :onClick="onClickActionStart"
      >{{ $t("splash.btn") }}</c-btn
    >
    <v-layout class="lay-padding bottom" />
  </v-layout>
</template>

<script>
export default {
  name: "splash",
  data() {
    return {
      sIdx: 0,
      items: [
        {
          src: require("@/assets/images/img-splash-1.png"),
          title: require("@/assets/images/txt-splash-1.svg"),
          txt: "splash.desc1",
        },
        {
          src: require("@/assets/images/img-splash-2.png"),
          title: require("@/assets/images/txt-splash-2.svg"),
          txt: "splash.desc2",
        },
        {
          src: require("@/assets/images/img-splash-3.png"),
          title: require("@/assets/images/txt-splash-3.svg"),
          txt: "splash.desc3",
        },
      ],
    };
  },
  watch: {
    checkDevice() {
      if (this.checkDevice) {
        this.$router.replace("main");
      }
    },
  },
  computed: {
    checkDevice() {
      return (
        this.userInfo &&
        this.userInfo.deviceInfo &&
        this.userInfo.deviceInfo.serialNumber
      );
    },
  },
  created() {},
  mounted() {
    window.backRouterAction = () => {
      this.nativeBridge.exitApp();
      return true;
    };
  },
  activated() {},
  deactivated() {},
  destroyed() {
    delete window.backRouterAction;
  },
  methods: {
    onClickActionStart() {
      if (this.checkDevice) {
        this.$router.replace("main");
      } else {
        this.$router.replace("device");
      }
    },
  },
  // beforeRouteEnter(to, from, next) {
  //   if (
  //     thisVue.userInfo &&
  //     thisVue.userInfo.deviceInfo &&
  //     thisVue.userInfo.deviceInfo.serialNumber
  //   ) {
  //     next("main");
  //   } else {
  //     next();
  //   }
  // },
};
</script>
<style lang="scss" scoped>
@import "@/sass/app.scss";
.lay-padding {
  min-height: pxToRem(20px);
  &.top {
    max-height: pxToRem(74px);
  }
  &.bottom {
    max-height: pxToRem(46px);
  }
}
.img-splash {
  width: 80%;
}
.img-title {
  max-height: pxToRem(60px);
  width: auto;
  z-index: 1;
  margin-top: pxToRem(-18px);
}
.txt-sub {
  font-style: normal;
  height: pxToRem(60px);
  font-weight: 400;
  font-size: pxToRem(20px);
  line-height: pxToRem(30px);
  text-align: center;
  letter-spacing: -0.022em;
  color: #948d8d;
  margin-top: pxToRem(2px);
}
.lay-spot {
  width: 100%;
  flex: 1;
  margin-top: pxToRem(14px);
  .spot {
    margin: 0 pxToRem(5px);
    width: pxToRem(8px);
    height: pxToRem(8px);
    &.select {
      background: #15d4e0;
    }
    &.disable {
      background: #c4c4c4;
    }
  }
}
.btn-join {
  width: 100%;
}
.lay-login {
  flex: none;
  width: 100%;
  margin-top: pxToRem(40px);
  padding-bottom: pxToRem(10px);
  span {
    font-style: normal;
    font-weight: 400;
    font-size: pxToRem(13px);
    line-height: pxToRem(16px);
    display: flex;
    align-items: center;
    text-align: center;
    color: #15d4e0;
    padding: pxToRem(6px) 0;
  }
}
</style>
