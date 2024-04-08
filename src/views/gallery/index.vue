<template>
  <lay-header :showBack="false" :tBarColor="'#FFFFFF'">
    <v-layout class="lay-bar" slot="bar-root" align-center>
      <span class="txt-tab mt-3 select">{{ $t("gallery.title") }}</span>
      <span
        class="txt-tab ml-4 mt-3"
        @click.prevent.stop="() => pushRouter({ name: 'coll' })"
        >{{ $t("collection.title") }}</span
      >
    </v-layout>
    <v-layout column class="px-5 pt-3 pb-5 lay-body">
      <v-layout class="mt-3 flex-grow-0" justify-space-between align-center>
        <span class="txt-sub">{{ $t("gallery.my-pic") }}</span>
          <!-- v-if="items && items.length" -->
        <span
          class="txt-more"
          @click.prevent.stop="() => pushRouter({ name: 'gallMore' })"
          >{{ $t("gallery.more") }}</span
        >
      </v-layout>
      <c-pic-group :maxImg="6" class="lay-pic" :pics.sync="items"/>
      <v-layout class="lay-filter pa-5 mt-10" column>
        <img class="img-bg" src="@/assets/images/img_banner-filter.svg" />
        <span class="txt-desc" v-html="$t('gallery.filter-desc')" />
        <span
          class="txt-btn"
          v-ripple
          @click.prevent.stop="() => pushRouter({ name: 'filterPic' })"
          >{{ $t("gallery.filter") }}</span
        >
      </v-layout>
    </v-layout>
  </lay-header>
</template>

<script>
import cPicGroup from '@/components/cPicGroup.vue';
export default {
  components: { cPicGroup },
  data() {
    return {
      items: [],
    };
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
.lay-bar {
  padding: pxToRem(20px);
  .txt-tab {
    font-style: normal;
    font-weight: 700;
    font-size: pxToRem(26px);
    line-height: pxToRem(33px);
    letter-spacing: -0.02em;
    color: rgba(0, 0, 0, 0.25);
    &.select {
      color: #000000;
    }
  }
}
.lay-body {
  .lay-pic {
    margin-top: pxToRem(20px);
    margin-bottom: 0px;
    overflow: hidden;
  }
  .txt-sub {
    font-style: normal;
    font-weight: 400;
    font-size: pxToRem(22px);
    line-height: pxToRem(25px);
    letter-spacing: -0.022em;
    color: #000000;
  }
  .txt-more {
    font-style: normal;
    font-weight: 400;
    font-size: pxToRem(16px);
    line-height: pxToRem(18px);
    text-align: right;
    letter-spacing: -0.022em;
    color: #868e96;
  }
  .lay-filter {
    background: url("@/assets/images/img-banner-bg.svg") no-repeat center /
      cover;
    background-color: rgba(21, 212, 224, 0.15);
    border-radius: pxToRem(8px);
    flex: none;
    position: relative;
    padding: pxToRem(20px);
    .txt-desc {
      font-style: normal;
      font-weight: 700;
      font-size: pxToRem(16px);
      line-height: pxToRem(22px);
      letter-spacing: -0.02em;
      color: #ffffff;
      z-index: 1;
    }
    .txt-btn {
      margin-top: pxToRem(20px);
      padding: pxToRem(8px) pxToRem(18px);
      background: #ffffff;
      border-radius: pxToRem(8px);
      width: min-content;
      font-weight: 400;
      font-size: pxToRem(13px);
      letter-spacing: -0.01em;
      color: #0f82f8;
      z-index: 1;
      white-space: nowrap;
    }
    .img-bg {
      width: pxToRem(132px);
      height: pxToRem(105px);
      position: absolute;
      right: pxToRem(20px);
    }
  }
}
</style>
