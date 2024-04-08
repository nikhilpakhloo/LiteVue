<template>
  <v-footer
    fixed
    :app="!absolute"
    padless
    :elevation="elevation"
    class="lay-footer d-flex align-center justify-space-between"
    :height="height"
    :absolute="absolute"
  >
    <slot>
      <v-layout
        v-ripple
        column
        align-center
        justify-center
        class="lay-footer-menu"
        @click.prevent.stop="
          () => {
            pushRouter({ name: 'main' });
          }
        "
      >
        <img
          :src="
            require(`@/assets/images/ic-menu-dive${
              $route.path.startsWith('/main') ? '-on' : '-off'
            }.svg`)
          "
        />
        <span :class="[$route.path.startsWith('/main') ? 'select' : '']"
          >{{ $t('footer.dive') }}</span
        >
      </v-layout>
      <v-layout
        v-ripple
        column
        align-center
        justify-center
        class="lay-footer-menu"
        @click.prevent.stop="
          () => {
            pushRouter({ name: 'gallery' });
          }
        "
      >
        <img
          :src="
            require(`@/assets/images/ic-menu-logbook${
              $route.path.startsWith('/logbook') ? '-on' : '-off'
            }.svg`)
          "
        />
        <span :class="[$route.path.startsWith('/logbook') ? 'select' : '']"
          >{{ $t('footer.logbook') }}</span
        >
      </v-layout>
      <v-layout
        v-ripple
        column
        align-center
        justify-center
        class="lay-footer-menu"
        @click.prevent.stop="
          () => {
            pushRouter({ name: 'mypage' });
          }
        "
      >
        <img
          :src="
            require(`@/assets/images/ic-menu-mypage${
              $route.path.startsWith('/mypage') ? '-on' : '-off'
            }.svg`)
          "
        />
        <span :class="[$route.path.startsWith('/mypage') ? 'select' : '']"
          >{{ $t('footer.mypage') }}</span
        >
      </v-layout>
    </slot>
  </v-footer>
</template>

<script>
export default {
  components: {},
  props: {
    height: {
      default: 60
    },
    elevation: {
      default: 6
    },
    absolute: {
      default: false
    }
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
.lay-footer {
  .lay-footer-menu {
    flex: none;
    width: pxToRem(98px);
    max-width: 33%;
    height: 100%;
    img {
      width: pxToRem(24px);
      height: pxToRem(24px);
    }
    span {
      margin-top: pxToRem(3px);
      font-style: normal;
      font-weight: 400;
      font-size: pxToRem(9px);
      line-height: pxToRem(10px);
      text-align: center;
      color: #adb5bd;
      &.select {
        // font-weight: 700;
        color: #008389;
      }
    }
  }
}
</style>
