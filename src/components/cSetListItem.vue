<template>
  <v-layout
    class="lay-menu"
    align-center
    v-ripple="onClick ? true : false"
    @click.prevent.stop="
      () => {
        onClick ? onClick() : null;
      }
    "
  >
    <slot name="slot-ic">
      <img v-if="icSrc" class="img-ic mr-4" :src="icSrc" />
    </slot>
    <span class="txt-title">{{ lazyValue }}</span>
    <v-spacer />
    <span class="txt-val" v-if="txtRight">{{ lazyTxtRight }}</span>
    <img
      class="img-arr ml-4"
      v-if="onClick"
      src="@/assets/images/ic-arr-r-b.svg"
    />
  </v-layout>
</template>

<script>
export default {
  components: {},
  props: {
    value: {
      default: null,
    },
    icSrc: {
      default: null,
    },
    txtRight: {
      default: null,
    },
    onClick: {
      default: () => {},
    },
  },
  data() {
    return {};
  },
  computed: {
    lazyValue() {
      return this.$t(this.value)
    },
    lazyTxtRight() {
      return this.$t(this.txtRight)
    }
  },
  watch: {},
  created() {},
  mounted() {},
  destroyed() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
@import "@/sass/app.scss";
.lay-menu {
  padding: pxToRem(14px) 0;
  flex: none;
  border-bottom: 1px solid #ececec;
  .txt-title {
    font-family: "PP Pangram Sans";
    font-style: normal;
    font-weight: 400;
    font-size: pxToRem(15px);
    color: #000000;
  }
  .img-ic {
    width: pxToRem(24px);
    height: pxToRem(24px);
  }
  .img-arr {
    width: pxToRem(7px);
    height: pxToRem(12px);
  }
  .txt-val {
    font-family: "PP Pangram Sans";
    font-style: normal;
    font-weight: 400;
    font-size: pxToRem(13px);
    text-align: right;
    color: #000000;
  }
}
</style>
