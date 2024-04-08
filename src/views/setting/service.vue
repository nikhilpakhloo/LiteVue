<template>
  <lay-header
    :showBack="true"
    :tBarColor="'#FFFFFF'"
    :txtTitle="$t('mypage.center.title')"
  >
    <v-layout column class="pa-6 lay-body">
      <c-set-list-item
        :icSrc="require('@/assets/images/ic-tutorial-24.svg')"
        :value="'mypage.center.btn.title'"
        :onClick="() => pushRouter({ name: 'tutorial' })"
      />
      <c-set-list-item
        :icSrc="require('@/assets/images/ic-manual.svg')"
        :value="'mypage.center.manual.title'"
        :onClick="() => pushRouter({ name: 'manual' })"
      />
      <c-set-list-item
        :icSrc="require('@/assets/images/ic-notice.svg')"
        :value="'mypage.center.notice.title'"
        :onClick="() => pushRouter({ name: 'notice' })"
      />
      <c-set-list-item
        :icSrc="require('@/assets/images/ic-faq.svg')"
        :value="'mypage.center.contact.title'"
        :onClick="() => pushRouter({ name: 'contract' })"
      />
    </v-layout>
  </lay-header>
</template>

<script>
import pLangChange from "@/popup/pLangChange.vue";
import CSetListItem from "@/components/cSetListItem.vue";
export default {
  components: { pLangChange, CSetListItem },
  data() {
    return {
      bPop: {
        isShow: false,
        isCreate: false,
      },
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
.lay-body {
  .lay-menu {
    padding: pxToRem(14px) 0;
    flex: none;
    border-bottom: 1px solid #ececec;
    .txt-title {
      font-family: "PP Pangram Sans";
      font-style: normal;
      font-weight: 400;
      font-size: pxToRem(15px);
      line-height: pxToRem(17px);
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
  }
}
</style>
