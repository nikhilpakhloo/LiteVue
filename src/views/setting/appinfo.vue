<template>
  <lay-header
    :showBack="true"
    :tBarColor="'#FFFFFF'"
    :txtTitle="$t('mypage.appinfo.title')"
  >
    <v-layout column class="pa-6 lay-body">
      <c-set-list-item
        :value="'mypage.appinfo.privacy'"
        :onClick="() => pushRouter({ name: 'privacy' })"
      />
      <c-set-list-item
        :value="'mypage.appinfo.license'"
        :onClick="() => pushRouter({ name: 'license' }) /*nativeBridge.showLicense()*/"
      />
      <c-set-list-item
        :value="'mypage.appinfo.version'"
        :txtRight="verName"
      />
    </v-layout>
  </lay-header>
</template>

<script>
import { getVerName } from "@/plugins/Const";
import CSetListItem from "@/components/cSetListItem.vue";
export default {
  components: { CSetListItem },
  data() {
    return {
      bPop: {
        isShow: false,
        isCreate: false,
      },
    };
  },
  computed: {
    verName() {
      return getVerName();
    },
  },
  watch: {},
  created() {},
  mounted() {},
  destroyed() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
@import "@/sass/app.scss";
</style>
