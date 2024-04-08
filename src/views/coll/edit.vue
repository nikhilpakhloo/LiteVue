<template>
  <lay-header
    :showBack="false"
    :showX="true"
    tBarColor="#FFFFFF"
    :txtTitle="$t('collection.edit.title')"
    :txtRight="$t('common.done')"
    :onRight="onClickActionDone"
  >
    <v-layout column class="pa-6 lay-body">
      <c-input
        :label="$t('collection.reg-title')"
        :hint="$t('collection.reg-hint')"
        :value.sync="inputName"
        maxlength="5"
      />
      <v-layout
        class="flex-grow-0 mt-14"
        align-center
        @click.prevent.stop="() => onShowPopupAction(pop)"
      >
        <img class="ic-del" src="@/assets/images/ic-menu-del.svg" />
        <span class="txt-del">{{ $t("collection.edit.delete") }}</span>
      </v-layout>
      <span class="txt-desc">{{ $t("collection.edit.del-desc") }}</span>
    </v-layout>
    <v-dialog persistent v-if="cInfo" v-model="pop.isShow" :width="pxToRem(322)">
      <p-del-coll
        :onCancel="() => onClosePopupAction(pop)"
        :onOk="onClickActionDel"
        :coll="cInfo.collectionName"
      />
    </v-dialog>
  </lay-header>
</template>

<script>
import pDelColl from "@/popup/pDelColl.vue";
import COLL_INFO from "@/bridge/collection/info";
import COLL_EDIT from "@/bridge/collection/edit";
import COLL_DEL from "@/bridge/collection/delete";
export default {
  components: { pDelColl },
  props: ["seq"],
  data() {
    return {
      isGetingItems: false,
      inputName: null,
      pop: {
        isCreate: false,
        isShow: false,
      },
      cInfo: null,
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
      let res = await COLL_INFO.request(this.seq);
      this.isGetingItems = false;
      if (res.isSuccess) {
        this.cInfo = res.data;
        this.inputName = this.cInfo.collectionName
      } else {
        this.showToast(this.$t("error.error"), false, false);
      }
    },
    async onClickActionDone() {
      if (!this.inputName) {
        this.showToast(this.$t("collection.reg-hint"));
        return;
      }
      if (this.isGetingItems) {
        return;
      }
      this.isGetingItems = true;
      let res = await COLL_EDIT.request(this.seq, this.inputName);
      this.isGetingItems = false;
      if (res.isSuccess) {
        this.showToast(this.$t("error.save-comp"))
        this.$router.go(-1)
      } else {
        this.showToast(this.$t("error.error"), false, false);
      }
    },
    async onClickActionDel() {
      if (this.isGetingItems) {
        return;
      }
      this.isGetingItems = true;
      this.onClosePopupAction(this.pop);
      let res = await COLL_DEL.request([this.seq]);
      this.isGetingItems = false;
      if (res.isSuccess) {
        this.showToast(this.$t("error.del-comp"))
        this.$router.go(-2)
      } else {
        this.showToast(this.$t("error.error"), false, false);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/sass/app.scss";
.lay-body {
  .ic-del {
    width: pxToRem(20px);
    height: pxToRem(20px);
    margin-right: pxToRem(6px);
  }
  .txt-del {
    font-style: normal;
    font-weight: 400;
    font-size: pxToRem(16px);
    letter-spacing: -0.02em;
    color: #000000;
  }
  .txt-desc {
    margin-top: pxToRem(10px);
    font-style: normal;
    font-weight: 400;
    font-size: pxToRem(13px);
    letter-spacing: -0.01em;
    color: #868e96;
  }
}
</style>
