<template>
  <v-layout
    fill-height
    column
    style="background-color: #9fb2d7"
    :style="{
      paddingTop: `${sBarHeight}px`,
    }"
  >
    <v-layout column class="lay-top">
      <span class="d-flex align-end txt-title" :class="$i18n.locale">{{
        $t("device.device-title")
      }}</span>
      <span
        class="mt-2 txt-sub"
        v-html="replaceLnToBr($t('device.device-desc'))"
      />
    </v-layout>
    <v-img
      class="flex-grow-0"
      src="@/assets/images/img-device-bg.png"
      contain
      max-width="100%"
      :aspect-ratio="390 / 265"
    />
    <v-layout
      style="flex: none"
      class="flex-grow-0 white pa-7"
      column
      align-center
    >
      <c-btn
        :onClick="() => pushRouter('scan')"
        :fontWeight="700"
        :thema="`default-bg`"
        :height="54"
        :width="'auto'"
        :fontSize="16"
        :borderRadius="300"
        class="mt-4"
        >{{ $t("device.btn-start") }}</c-btn
      >
      <span
        class="text-decoration-underline mt-5"
        @click.prevent.stop="() => onClickActionLater()"
        >{{ $t("device.btn-later") }}</span
      >
    </v-layout>
  </v-layout>
</template>

<script>
export default {
  middleware: "auth",
  components: {},
  data() {
    return {};
  },
  watch: {},
  created() {},
  mounted() {},
  activated() {},
  deactivated() {},
  destroyed() {},
  methods: {
    onClickActionLater() {
      // if(window.history.length > 1) {
      //   this.$router.go(-1)
      // } else {
      this.$router.replace("main");
      // }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/sass/app.scss";
.lay-top {
  color: #ffffff;
  padding: pxToRem(20px);
  flex: 1;
  .txt-title {
    font-style: normal;
    font-weight: 700;
    font-size: pxToRem(30px);
    line-height: pxToRem(41px);
    flex: 1;
    &.en {
      font-size: pxToRem(24px);
    }
  }
  .txt-sub {
    font-style: normal;
    font-weight: 400;
    font-size: pxToRem(16px);
    line-height: pxToRem(20px);
    letter-spacing: -0.022em;
    color: #ffffff;
    flex: 1.5;
  }
}
</style>
