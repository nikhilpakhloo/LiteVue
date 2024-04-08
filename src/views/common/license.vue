<template>
  <lay-header
    :showBack="true"
    :tBarColor="'#FFFFFF'"
    :txtTitle="$t('mypage.appinfo.license')"
  >
    <v-layout column class="pa-5 lay-body" v-html="$t('license')">
    </v-layout>
  </lay-header>
</template>

<script>
export default {
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
.lay-body {
  font-style: normal;
  font-weight: 400;
  font-size: pxToRem(15px);
  line-height: pxToRem(24px);
  color: #343a40;
}
</style>
