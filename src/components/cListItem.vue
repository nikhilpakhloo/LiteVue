<template>
  <v-layout
    class="lay-menu"
    v-ripple
    @click.prevent.stop="
      () => {
        onClick ? onClick() : null;
      }
    "
    :class="[!date ? 'align-center' : '']"
  >
    <v-layout column>
      <span class="txt-title">{{ value }}</span>
      <span v-if="date" class="txt-date mt-1">{{ date }}</span>
    </v-layout>
    <v-spacer />
    <img
      class="img-arr"
      :class="[date ? 'mt-1' : '']"
      src="@/assets/images/ic-arrow-r-b-16.svg"
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
    date: {
      default: null,
    },
    onClick: {
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
  methods: {},
};
</script>

<style lang="scss" scoped>
@import "@/sass/app.scss";
.lay-menu {
  padding: pxToRem(16px) 0 pxToRem(12px);
  flex: none;
  border-bottom: 1px solid #ececec;
  .txt-title {
    font-style: normal;
    font-weight: 400;
    font-size: pxToRem(15px);
    line-height: pxToRem(20px);
    letter-spacing: -0.01em;
    color: #000000;
  }
  .txt-date {
    font-style: normal;
    font-weight: 400;
    font-size: pxToRem(12px);
    line-height: pxToRem(16px);
    letter-spacing: -0.01em;
    color: #868e96;
  }
  .img-arr {
    width: pxToRem(16px);
    height: pxToRem(16px);
  }
}
</style>
