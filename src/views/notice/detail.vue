<template>
  <lay-header
    :showBack="true"
    :tBarColor="'#FFFFFF'"
    :txtTitle="$t('mypage.center.notice.title')"
    :isGetingItems="isGetingItems"
  >
    <v-layout column class="lay-body pb-8" v-if="notice">
      <v-layout column class="lay-title">
        <span class="txt-title">{{ notice.title }}</span>
        <span class="mt-2 txt-date">{{ notice.createTime }}</span>
      </v-layout>
      <v-layout class="lay-cont" column>
        <div v-html="replaceLnToBr(notice.content)" />
        <img
          class="img-file"
          v-if="notice.path && notice.encFilename"
          :src="notice.path + notice.encFilename"
        />
      </v-layout>
      <span
        class="txt-all"
        v-if="notice.urlLink"
        @click.prevent.stop="onClickActionLink"
      >
        {{ $t("mypage.center.notice.more") }}
      </span>
    </v-layout>
  </lay-header>
</template>

<script>
export default {
  data() {
    return {
      isGetingItems: false,
      notice: null,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getData();
  },
  destroyed() {},
  methods: {
    async getData() {
      if (this.isGetingItems) {
        return;
      }
      this.isGetingItems = true;
      await this.api({
        url: "/notice/detail",
        method: "post",
        data: { noticeId: this.$route.query.noticeId },
      })
        .then((data) => {
          this.notice = data;
        })
        .catch((err) => {
          this.showToast(err.msg);
        });
      this.isGetingItems = false;
    },
    onClickActionLink() {
      window.open(this.notice.urlLink, "_blank");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/sass/app.scss";
.lay-title {
  padding: pxToRem(8px) pxToRem(20px) pxToRem(16px);
  border-bottom: 1px solid #dee2e6;
  flex: none;
  .txt-title {
    font-style: normal;
    font-weight: 400;
    font-size: pxToRem(18px);
    line-height: pxToRem(28px);
    letter-spacing: -0.02em;
    color: #000000;
  }
  .txt-date {
    font-style: normal;
    font-weight: 400;
    font-size: pxToRem(12px);
    line-height: pxToRem(16px);
    letter-spacing: -0.01em;
    color: #979797;
  }
}
.lay-cont {
  padding: pxToRem(32px) pxToRem(20px) pxToRem(16px);
  font-style: normal;
  font-weight: 400;
  font-size: pxToRem(15px);
  line-height: pxToRem(24px);
  color: #343a40;
  flex: none;
  img {
    max-width: 100%;
  }
}
.txt-all {
  padding: 0 pxToRem(20px);
  font-style: normal;
  font-weight: 700;
  font-size: pxToRem(14px);
  line-height: pxToRem(22px);
  letter-spacing: -0.01em;
  color: #000;
  text-decoration: none;
}
.img-file {
  margin: 16px 0;
}
</style>
