<template>
  <v-layout column class="pt-8 pb-12 px-6 popup-root">
    <span class="txt-title">{{ $t("mypage.lang-select") }}</span>
    <v-layout
      v-ripple
      class="lay-item"
      column
      @click.prevent.stop="() => onClickActionLang('ko')"
    >
      <span class="txt-lang">한국어</span>
      <span class="txt-lang-sub">{{ $t("ko") }}</span>
    </v-layout>
    <v-layout
      v-ripple
      class="lay-item"
      column
      @click.prevent.stop="
        () => {
          onClickActionLang('en');
        }
      "
    >
      <span class="txt-lang">English</span>
      <span class="txt-lang-sub">{{ $t("en") }}</span>
    </v-layout>
  </v-layout>
</template>

<script>
import CookieUtil from "@/plugins/CookieUtil";
export default {
  props: {
    onClose: {
      default: () => {},
    },
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  destroyed() {},
  methods: {
    onClickActionLang(lang) {
      CookieUtil.set("PREF_LANG_SETTING", lang);
      this.$i18n.locale = lang;
      this.onClose ? this.onClose() : null;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/sass/app.scss";
.popup-root {
  border-radius: pxToRem(20px) pxToRem(20px) 0 0;
  box-shadow: 0px pxToRem(6px) pxToRem(20px) rgba(8, 16, 30, 0.14);
  background-color: #fff;
  .txt-title {
    font-style: normal;
    font-weight: 700;
    font-size: pxToRem(16px);
    line-height: pxToRem(20px);
    color: #000000;
    margin-bottom: pxToRem(20px);
  }
  .lay-item {
    padding: pxToRem(8px) 0;
    .txt-lang {
      font-style: normal;
      font-weight: 400;
      font-size: pxToRem(15px);
      line-height: pxToRem(20px);
      color: #000000;
    }
    .txt-lang-sub {
      font-style: normal;
      font-weight: 400;
      font-size: pxToRem(10px);
      line-height: pxToRem(16px);
      color: #898a8d;
    }
  }
}
</style>
