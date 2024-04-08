<template>
  <lay-header
    v-if="active"
    :showBack="false"
    :showX="true"
    tBarColor="#FFFFFF"
    :txtTitle="$t('collection.reg')"
    :txtRight="$t('collection.next')"
    :onRight="onClickActionNext"
  >
    <v-layout column class="pa-6 lay-body">
      <!-- <c-input
        :label="$t('collection.reg-title')"
        :hint="$t('collection.reg-hint')"
        :value.sync="inputName"
        maxlength="5"
        
        
       
      /> -->
      <label>{{ $t('collection.reg-title') }}</label>
      <input type="text" v-model="inputName" :maxlength="40" :placeholder="$t('collection.reg-hint')"  style="border-bottom: 1px solid lightgray; padding-top: 4px; padding-bottom: 4px;"/>

    </v-layout>
  </lay-header>
</template>

<script>
export default {
  name: "KeepAlive",
  data() {
    return {
      active: false,
      inputName: null,
    };
  },
  computed: {},
  watch: {},
  created() {},
  activated() {
    this.active = true;
    if (!this.$route.meta.internalNavigation) {
      // 새로 들어왔을 경우
      this.inputName = null;
    } else {
      // 데이터만 갱신 (backkey 로 화면진입시)
    }
    this.$route.meta.internalNavigation = true;
  },
  deactivated() {},
  mounted() {},
  destroyed() {},
  methods: {
    onClickActionNext() {
      if (!this.inputName) {
        this.showToast(this.$t("collection.reg-hint"));
        return;
      }
      this.pushRouter({ name: "collPic", params: { title: this.inputName } });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/sass/app.scss";
</style>
