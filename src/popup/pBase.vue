<template>
  <v-layout column class="popup-root">
    <span class="txt-title pt-1 pb-2" :class="[titleAlign ? `text-${titleAlign}` : '']" v-html="replaceLnToBr(title)"/>
    <div ref="dSlot" class="popup-body pt-1 pb-2" v-show="hasSlot">
      <slot />
    </div>
    <v-layout align-center class="lay-btn mt-6" v-if="okTxt || cancelTxt">
      <c-btn
        v-if="cancelTxt"
        :fontWeight="700"
        :height="44"
        :fontSize="15"
        :px="12"
        :thema="`${thema}`"
        :onClick="() => (onCancel ? onCancel() : '')"
        :class="[okTxt ? 'mr-2' : '']"
        >{{ cancelTxt }}</c-btn
      >
      <c-btn
        v-if="okTxt"
        :onClick="() => (onOk ? onOk() : '')"
        :fontWeight="700"
        :thema="`${thema}-bg`"
        :height="44"
        :px="12"
        :fontSize="btnFontSize"
        >{{ okTxt }}</c-btn
      >
    </v-layout>
  </v-layout>
</template>

<script>
export default {
  props: {
    title: {
      default: null,
    },
    titleAlign: {
      default: null
    },
    okTxt: {
      default: null,
    },
    cancelTxt: {
      default: null,
    },
    onOk: {
      default: () => {},
    },
    onCancel: {
      default: () => {},
    },
    thema: {
      default: "default",
    },
    btnFontSize: {
      default: 15
    }
  },
  data() {
    return {
      hasSlot: false
    };
  },
  computed: {
    // hasSlot(){
		// 	// return !!this.$slots.default;
    //   return this.$refs.dSlot && this.$refs.dSlot.innerHTML ? true : false
		// }
  },
  watch: {},
  created() {},
  mounted() {
    this.$nextTick(()=>{
      this.hasSlot = this.$refs.dSlot && this.$refs.dSlot.innerHTML
    })
  },
  destroyed() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
@import "@/sass/app.scss";
.popup-root {
  border-radius: pxToRem(16px);
  box-shadow: 0px pxToRem(6px) pxToRem(20px) rgba(8, 16, 30, 0.14);
  background-color: #fff;
  max-height: 90vh;
  padding: pxToRem(20px);
  .txt-title {
    font-style: normal;
    font-weight: 700;
    font-size: pxToRem(18px);
    line-height: pxToRem(28px);
    letter-spacing: -0.02em;
    color: #000000;
  }
  .popup-body {
    overflow-y: auto;
    flex: 1;
    font-style: normal;
    font-weight: 400;
    font-size: pxToRem(15px);
    line-height: pxToRem(20px);
    letter-spacing: -0.01em;
    color: #000000;
  }
  .lay-btn {
    flex: none;
    > div {
      flex: 1;
    }
  }
}
</style>
