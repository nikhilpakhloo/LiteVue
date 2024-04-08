<template>
  <v-layout column class="flex-grow-0 flex-shrink-0">
    <span v-if="label" class="txt-label">{{ label }}</span>
    <v-text-field
      v-model="lazyValue"
      class="txt-input"
      :color="bColor"
      :placeholder="hint"
      :type="type"
      hide-details="auto"
      @input="
        (e) => {
          $emit('update:value', e);
        }
      "
      :class="[errorMsg ? 'error-msg' : '']"
      :error="errorMsg ? true : false"
      :error-messages="errorMsg"
      :readonly="readonly"
    >
      <template slot="prepend-inner">
        <slot name="prepend-inner" />
      </template>
      <template slot="prepend">
        <slot name="prepend" />
      </template>
      <template slot="append-outer">
        <slot name="append-outer" />
      </template>
      <template slot="append">
        <slot name="append" />
      </template>
    </v-text-field>
  </v-layout>
</template>

<script>
export default {
  components: {},
  props: {
    value: {
      default: null,
    },
    hint: {
      default: "",
    },
    bColor: {
      default: "rgba(21, 212, 224, 0.3)",
    },
    label: {
      default: null,
    },
    type: {
      default: "text",
    },
    errorMsg: {
      default: null,
    },
    readonly: {
      default: false,
    },
  },
  data() {
    return {
      lazyValue: null,
    };
  },
  computed: {},
  watch: {
    value: {
      deep: true,
      immediate: true,
      handler(val) {
        this.lazyValue = val;
      },
    },
  },
  created() {},
  mounted() {},
  destroyed() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
@import "@/sass/app.scss";
.txt-label {
  font-style: normal;
  font-weight: 400;
  font-size: pxToRem(14px);
  line-height: pxToRem(16px);
  letter-spacing: -0.022em;
  color: #000000;
}
.txt-input {
  margin-top: pxToRem(10px);
  flex: none;
  ::v-deep input {
    font-weight: 400 !important;
    font-size: pxToRem(18px) !important;
    line-height: pxToRem(28px) !important;
    letter-spacing: -0.02em !important;
    color: #212529 !important;
  }
}
.error-msg {
  ::v-deep .v-input__slot:before {
    border-color: #ff0000 !important;
  }
}
</style>
