<template>
  <lay-header :showBack="false" :tBarColor="'#FFFFFF'">
    <v-layout class="lay-bar" slot="bar-root" align-center>
      <span
        class="txt-tab mt-3"
        @click.prevent.stop="() => pushRouter({ name: 'gallery' })"
        >{{ $t("gallery.title") }}</span
      >
      <span class="txt-tab ml-4 mt-3 select">{{ $t("collection.title") }}</span>
    </v-layout>
    <v-layout column class="px-5 pt-3 pb-5 lay-body">
      <v-layout class="mt-3 flex-grow-0" justify-space-between align-center>
        <span class="txt-sub">{{ $t("collection.my-pic") }}</span>
        <span
          v-if="items.length > 0"
          class="txt-more"
          @click.prevent.stop="() => pushRouter({ name: 'collMore' })"
          >{{ $t("gallery.more") }}</span
        >
      </v-layout>
      <v-layout row wrap class="lay-pics" v-if="items.length > 0">
        <c-coll
          v-for="(item, index) in items"
          :key="index"
          :name="
            item.favorite == 1 ? $t('collection.like') : item.collectionName
          "
          :src="item.thumbName + `?${filterVer}`"
          :seq="item.collectionId"
        >
          <img
            v-if="item.favorite == 1"
            class="ic-heart"
            src="@/assets/images/ic-heart-w.svg"
          />
        </c-coll>
      </v-layout>
      <v-layout
        v-else
        class="pt-8 pb-8 flex-grow-0 lay-empty"
        column
        align-center
        justify-center
      >
        <div class="px-4 py-6 img-empty rounded-circle">
          <img src="@/assets/images/ic-def-box.svg" />
        </div>
        <span class="txt-empty">{{ $t("collection.empty") }}</span>
        <span class="txt-desc" v-html="$t('collection.empty-desc')" />
        <span
          class="txt-btn"
          @click.passive.stop="() => pushRouter({ name: 'collReg' })"
          >{{ $t("collection.btn-reg") }}</span
        >
      </v-layout>
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
import cColl from "@/components/cColl.vue";
import COLL_LIST from "@/bridge/collection/list";
export default {
  components: { cColl },
  data() {
    return {
      isGetingItems: false,
      items: [],
      allCount: 0,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getItems();
  },
  destroyed() {},
  methods: {
    async getItems() {
      if (this.isGetingItems) {
        return;
      }
      this.isGetingItems = true;
      await COLL_LIST.request(1, 4)
        .then((data) => {
          this.isGetingItems = false;
          this.items.splice(0, this.items.length);
          this.allCount = 0;
          if (
            data.list &&
            data.list.length == 1 &&
            data.list[0].favorite == "1" &&
            !data.list[0].mediaId
          ) {
            return;
          }
          this.allCount = data.allCount;
          this.items.push(...data.list);
        })
        .catch(() => {
          this.isGetingItems = false;
        });
    },
  },
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
  .lay-pics {
    margin: 0 -4px;
    flex: none;
    & > * {
      padding: 0 4px;
      margin-top: pxToRem(18px);
      flex: none;
      .ic-heart {
        width: 24px;
        height: 24px;
        position: absolute;
        left: 12px;
        bottom: 12px;
      }
    }
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
  .lay-empty {
    .img-empty {
      width: pxToRem(80px);
      height: pxToRem(80px);
      background: #dee2e6;
      border-radius: 50%;
      img {
        width: pxToRem(48px);
        height: pxToRem(31px);
      }
    }
    .txt-empty {
      margin-top: pxToRem(24px);
      font-style: normal;
      font-weight: 700;
      font-size: 18px;
      text-align: center;
      letter-spacing: -0.02em;
      color: #000000;
    }
    .txt-desc {
      margin-top: pxToRem(8px);
      font-style: normal;
      font-weight: 400;
      line-height: 20px;
      text-align: center;
      letter-spacing: -0.01em;
      color: #868e96;
    }
    .txt-btn {
      margin-top: pxToRem(11px);
      font-family: "PP Pangram Sans";
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      text-align: right;
      letter-spacing: -0.022em;
      color: #15d4e0;
    }
  }
}
</style>
