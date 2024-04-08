<template>
  <lay-header :showBack="true" :tBarColor="'#FFFFFF'" :txtTitle="'기본 설정'">
    <v-layout column class="pa-6">
      <c-set-list-item
        :value="`언어`"
        :onClick="() => onShowPopupAction(bPop)"
        :txtRight="'한국어'"
      >
        <img
          slot="slot-ic"
          class="img-lang mr-4 my-n2"
          src="@/assets/images/ic-lang-change.png"
        />
      </c-set-list-item>
    </v-layout>
    <v-bottom-sheet inset v-model="bPop.isShow">
      <p-lang-change :onClose="() => onClosePopupAction(bPop)" />
    </v-bottom-sheet>
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
</style>
