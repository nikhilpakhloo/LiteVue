<template>
  <lay-header
    :showBack="true"
    :tBarColor="'#FFFFFF'"
    :txtTitle="$t('mypage.center.btn.title')"
  >
    <v-layout column class="lay-body pa-5">
      <v-spacer style="max-height: 43px" />
      <v-img
        contain
        class="img"
        :src="require(`@/assets/images/img-tutorial-1-${$i18n.locale}.svg`)"
        max-width="100%"
        :aspect-ratio="354 / 230"
        :position="'0 center'"
      />
      <v-spacer style="max-height: 50px" />
      <v-spacer />
    </v-layout>
  </lay-header>
</template>

<script>
export default {
  components: {},
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
  .img {
    flex: none;
  }
}
</style>
