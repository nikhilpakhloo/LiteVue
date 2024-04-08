<template>
  <v-layout class="lay-preview" align-center justify-center>
    <img class="img-pic" :src="lazyValue" contain />
    <img class="ic-x" src="@/assets/images/ic-x-w-16.svg" @click="onClose" />
  </v-layout>
</template>
<script>
export default {
  components: {},
  props: {
    onClose: {
      default: () => {},
    },
    value: {
      default: null,
    },
  },

  data() {
    return {
      lazyValue: null,
    };
  },
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
  methods: {
    onClick() {},
  },
};
</script>
<style lang="scss" scoped>
@import "@/sass/app.scss";
.lay-preview {
  position: relative;
  .img-pic {
    width: 100%;
    height: auto;
    max-width: 100%;
    mix-blend-mode: normal;
    filter: drop-shadow(4px 4px 10px rgba(0, 0, 0, 0.25));
  }
  .ic-x {
    width: 20px;
    height: 20px;
    position: absolute;
    top: -26px;
    right: -2px;
  }
}
</style>