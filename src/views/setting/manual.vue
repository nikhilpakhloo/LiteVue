<template>
  <lay-header
    :showBack="true"
    :tBarColor="'#FFFFFF'"
    :txtTitle="$t('mypage.center.manual.title')"
  >
    <VuePdfEmbed
      :source="require(`@/assets/manual/manual_${$i18n.locale}.pdf`)"
    />
  </lay-header>
</template>
<script>
import VuePdfEmbed from "vue-pdf-embed/dist/vue2-pdf-embed";
export default {
  components: { VuePdfEmbed },
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
::v-deep .vue-pdf-embed {
  margin: pxToRem(12px) 0;
  & > div {
    margin-bottom: pxToRem(12px);
    box-shadow: 0px pxToRem(6px) pxToRem(20px) rgba(8, 16, 30, 0.14);
  }
}
</style>
