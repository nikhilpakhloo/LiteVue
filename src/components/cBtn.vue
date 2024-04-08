<template>
  <v-layout
    align-center
    justify-center
    class="btn"
    :style="{
      paddingLeft: mx ? pxToRem(mx) : null,
      paddingRight: mx ? pxToRem(mx) : null,
    }"
  >
    <span
      :class="[`thema-${thema}`, 'cursor']"
      v-ripple="!readOnly"
      @click.prevent.stop="onClick && !readOnly ? onClick() : ''"
      :style="{
        fontSize: pxToRem(fontSize),
        fontWeight: fontWeight ? fontWeight : null,
        borderRadius: borderRadius ? pxToRem(borderRadius) : null,
        color: color ? color : null,
        minHeight: height ? pxToRem(height) : null,
        height: height ? pxToRem(height) : null,
        width: !isNaN(width) ? pxToRem(width) : width,
        paddingLeft: px ? pxToRem(px) : null,
        paddingRight: px ? pxToRem(px) : null,
        paddingTop: py ? pxToRem(py) : null,
        paddingBottom: py ? pxToRem(py) : null,
      }"
      ><slot>{{ txtBtn }}</slot></span
    >
  </v-layout>
</template>

<script>
export default {
  components: {},
  props: {
    thema: {
      default: "default",
    },
    onClick: {
      default: () => {},
    },
    readOnly: {
      default: false,
    },
    mx: {
      default: null,
    },
    px: {
      default: null,
    },
    py: {
      default: null,
    },
    fontSize: {
      default: 16,
    },
    fontWeight: {
      default: null,
    },
    borderRadius: {
      default: 8,
    },
    color: {
      default: null,
    },
    height: {
      default: null,
    },
    width: {
      default: null,
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
.btn {
  width: 100%;
  flex: none;
  span {
    width: 100%;
    height: 100%;
    align-items: center;
    text-align: center;
    font-weight: 500;
    font-style: normal;
    font-size: pxToRem(16px);
    padding: pxToRem(14px) pxToRem(24px);
    display: flex;
    justify-content: center;
  }
}
.thema- {
  &default {
    background: #ffffff;
    border: pxToRem(1px) solid #15d4e0;
    color: #15d4e0;
  }
  &default-bg {
    background: #15d4e0;
    color: #ffffff;
  }
  &default-bg-disable {
    color: #ffffff;
    background: #15d4e0;
    opacity: 0.3;
  }
  &gray {
    background: #ffffff;
    border: 1px solid #979797;
    color: #000000;
  }
  &disable {
    background: #ffffff;
    border: 1px solid #E8E8E8;
    color: #000000;
  }
}
</style>
