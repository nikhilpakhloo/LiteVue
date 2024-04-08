<template>
    <v-overlay :value="lazyValue" :opacity="opacity">
        <v-progress-circular
            class="align-self-center ma-3"
            indeterminate
            size="50"
            width="5"
            color="#008389"
        />
        <slot></slot>
    </v-overlay>
</template>

<script>
export default {
  components: {},
  props: {
      value: {
          default: false
      },
      fullscreen: {
          default: false
      },
      opacity:{
          default: 0.2
      }
  },
  data() {
      return {
          lazyValue: this.value
      };
  },
  computed: {},
  watch: {
      value() {
          this.lazyValue = this.value
      }
  },
  created() {},
  mounted() {},
  destroyed() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
@import "../sass/app.scss";
</style>
