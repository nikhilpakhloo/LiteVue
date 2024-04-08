<template>
  <p-base
    :title="$t('collection.delete.check', { name: coll })"
    :okTxt="$t('common.delete')"
    :cancelTxt="$t('common.cancel')"
    :onOk="onOk"
    :onCancel="onCancel"
    :thema="'default'"
  >
    {{ $t("collection.delete.check-desc") }}
  </p-base>
</template>
<script>
export default {
  props: {
    onOk: {
      default: () => {},
    },
    onCancel: {
      default: () => {},
    },
    coll: {
      default: null,
    },
  },
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
</style>