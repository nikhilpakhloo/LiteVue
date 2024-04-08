<template>
  <v-layout fill-height column>
    <v-app-bar
      flat
      fixed
      class="lay-titlebar"
      :height="`auto`"
      :color="tBarColor"
      :class="{
        'on-scroll': onScroll,
      }"
    >
      <v-layout column id="lay-titlebar-body">
        <div :style="{ height: `${sBarHeight}px` }" />
        <slot name="bar-root">
          <v-layout class="lay-title-body" align-center>
            <img
              v-if="showX || showBack"
              class="img-back"
              @click.prevent.stop="onBack ? onBack() : $router.go(-1)"
              :src="
                showX
                  ? require('@/assets/images/ic-x.svg')
                  : showBack
                  ? require('@/assets/images/ic-back.svg')
                  : null
              "
            />
            <v-spacer />
            <span v-if="txtTitle" class="txt-title">{{ txtTitle }}</span>
            <slot name="right">
              <span
                v-if="txtRight"
                class="txt-right"
                @click.prevent.stop="onRight ? onRight() : ''"
                >{{ txtRight }}</span
              >
            </slot>
          </v-layout>
        </slot>
      </v-layout>
    </v-app-bar>
    <div
      v-if="!barTrans"
      :style="{
        height: `${tbHeight}px`,
        flex: 'none',
      }"
    />
    <slot />
    <loading v-model="isGetingItems" />
  </v-layout>
</template>
<script>
export default {
  components: {},
  props: {
    isGetingItems: {
      default: false,
    },
    canScroll: {
      default: true,
    },
    txtTitle: {
      default: null,
    },
    txtRight: {
      default: null,
    },
    showBack: {
      default: true,
    },
    showX: {
      default: false,
    },
    onRight: {
      default: () => {},
    },
    onBack: {
      default: () => {},
    },
    tBarColor: {
      default: "transparent",
    },
    barTrans: {
      default: false,
    },
  },
  data() {
    return {
      onScroll: false,
      tbHeight: null,
    };
  },
  computed: {},
  watch: {
    onScroll() {
      this.$emit("onScroll", this.onScroll);
    },
    tbHeight() {
      this.$emit("tbHeight", this.tbHeight);
    },
  },
  created() {},
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    this.$nextTick(() => {
      while (!this.tbHeight) {
        this.tbHeight =
          this.$el.querySelector("#lay-titlebar-body").offsetHeight;
      }
    });
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.$emit("pageYOffset", window.pageYOffset);
      if (window.pageYOffset > 20) {
        this.onScroll = true;
      } else {
        this.onScroll = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../sass/app.scss";
.lay-titlebar {
  // background-color: transparent !important;
  transition-duration: 0.5s;
  &.on-scroll {
    // background-color: #ffffff !important;
    color: #111111;
  }
  .lay-title-body {
    height: pxToRem(50px);
    padding: pxToRem(20px);
    position: relative;
    .img-back {
      z-index: 1;
    }
    .txt-title {
      position: absolute;
      left: 0;
      right: 0;
      text-align: center;
      padding: 0 pxToRem(90px);
      font-style: normal;
      font-weight: 700;
      font-size: pxToRem(16px);
      line-height: pxToRem(20px);
      text-align: center;
      color: #000000;
    }
    .txt-right {
      font-style: normal;
      font-weight: 500;
      font-size: pxToRem(16px);
      line-height: pxToRem(18px);
      text-align: right;
      letter-spacing: -0.02em;
      color: #000000;
      z-index: 1;
    }
  }
}
</style>