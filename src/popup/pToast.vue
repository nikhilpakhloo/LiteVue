<template>
  <v-snackbar
    v-model="lazyValue"
    :timeout="timeout"
    :bottom="true"
    :width="`95%`"
    :max-width="pxToRem(600)"
    :min-width="`95%`"
    :style="{
      marginTop: sBarHeight ? pxToRem(sBarHeight) : '',
    }"
    color="rgba(0,0,0,0.8)"
    rounded="lg"
  >
    <v-layout align-center class="pa-1 ml-n2">
      <img v-if="isIc" class="ml-3" src="@/assets/images/ic-toast-check.svg" />
      <span class="txt-msg ml-3">{{ lazyMsg }}</span>
    </v-layout>
    <template v-if="showClose" v-slot:action="{ attrs }">
      <v-btn color="white" text v-bind="attrs" @click="lazyValue = false">
        {{ txtClose }}
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { $dataMetaSchema } from 'ajv';

export default {
  props: {
    value: {
      required: true,
      default: false,
    },
    timeout: {
      default: 10000,
    },
    msg: {
      default: "",
    },
    txtClose: {
      //leess 기본 영어로 적용
      default: "Close"//$t("common.close"),
      //default: this.$i18n.locale == 'en' ? "Close" : "닫기"
    },
    callback: {
      default: () => {},
    },
    isIc: {
      default: false,
    },
    showClose: {
      default: true,
    },
  },
  components: {},
  data() {
    return {
      lazyValue: this.value,
      lazyTime: this.timeout,
      lazyMsg: this.msg,
    };
  },
  computed: {},
  watch: {
    msg() {
      this.lazyMsg = this.msg;
    },
    timeout() {
      this.lazyTime = this.timeout;
    },
    value() {
      this.lazyValue = this.value;
    },
    lazyValue() {
      if (this.callback) {
        this.callback(this.lazyValue);
      }
    },
  },
  created() {},
  mounted() {},
  destroyed() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
@import "../sass/app.scss";
.txt-msg {
  font-style: normal;
  font-weight: 400;
  font-size: pxToRem(14px);
  line-height: pxToRem(18px);
  color: #ffffff;
}
</style>
