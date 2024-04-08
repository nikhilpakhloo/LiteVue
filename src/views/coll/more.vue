<template>
  <lay-header
    :showBack="!isEditMode"
    :showX="isEditMode"
    tBarColor="#FFFFFF"
    :txtRight="isEditMode ? $t('common.done') : $t('common.edit')"
    :txtTitle="$t('collection.title')"
    :onBack="
      () => {
        if (isEditMode) {
          isEditMode = false;
        } else {
          $router.go(-1);
        }
      }
    "
    :onRight="onClickActionEdit"
  >
    <v-layout column class="pt-1 px-5 pb-13 lay-body">
      <v-layout row wrap class="lay-pics">
        <c-coll
          v-for="(item, index) in items"
          :key="index"
          :name="
            item.favorite == 1 ? $t('collection.like') : item.collectionName
          "
          :src="item.thumbName + `?${filterVer}`"
          :isEditMode="item.favorite == 1 ? false : isEditMode"
          :onDel="() => onClickActionDel(item)"
          :onClick="
            () => {
              if (!isEditMode)
                pushRouter({
                  name: 'collList',
                  params: { seq: item.collectionId },
                });
            }
          "
        >
          <img
            v-if="item.favorite == 1"
            class="ic-heart"
            src="@/assets/images/ic-heart-w.svg"
          />
        </c-coll>
        <c-coll
          v-show="!isEditMode"
          :name="$t('collection.reg')"
          :onClick="() => pushRouter({ name: 'collReg' })"
          :empty="true"
        >
          <v-layout class="lay-add" align-center justify-center v-ripple>
            <img src="@/assets/images/ic-plus-g.svg" />
          </v-layout>
        </c-coll>
      </v-layout>
    </v-layout>
  </lay-header>
</template>

<script>
import CColl from "@/components/cColl.vue";
import COLL_LIST from "@/bridge/collection/list";
import COLL_DEL from "@/bridge/collection/delete";
export default {
  components: { CColl },
  data() {
    return {
      isEditMode: false,
      isGetingItems: false,
      items: [],
      pageNo: 1,
      allCount: 0,
    };
  },
  computed: {},
  watch: {},
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  mounted() {
    this.getItems();
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    async getItems(page = 1) {
      if (this.isGetingItems) {
        return;
      }
      this.isGetingItems = true;
      await COLL_LIST.request(page)
        .then((data) => {
          this.isGetingItems = false;
          this.pageNo = page;
          if (page == 1) {
            this.items.splice(0, this.items.length);
            this.allCount = 0;
            if (
              data.list &&
              data.list.length == 1 &&
              data.list[0].favorite == "1" &&
              !data.list[0].mediaId
            ) {
              return;
            }
          }
          this.allCount = data.allCount;
          this.items.push(...data.list);
          setTimeout(() => {
            var target = document.children[0];
            this.checkNext(target);
          }, 300);
        })
        .catch(() => {
          this.isGetingItems = false;
        });
    },
    handleScroll(event) {
      let target = event.target.children[0];
      this.checkNext(target);
    },
    checkNext(target) {
      if (
        this.items.length < this.allCount &&
        target &&
        target.scrollHeight - target.clientHeight - 80 < target.scrollTop
      ) {
        this.getItems(this.pageNo + 1);
      }
    },

    onClickActionEdit() {
      this.isEditMode = !this.isEditMode;
      if (!this.isEditMode) {
        this.getItems();
      }
    },

    async onClickActionDel(item) {
      if (this.isGetingItems) {
        return;
      }
      this.isGetingItems = true;
      let res = await COLL_DEL.request([item.collectionId]);
      this.isGetingItems = false;
      if (res.isSuccess) {
        this.items.splice(this.items.indexOf(item), 1);
        this.showToast(this.$t("error.del-comp"));
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
  .lay-pics {
    margin: 0 -4px;
    flex: none;
    & > * {
      padding: 0 4px;
      margin-top: pxToRem(18px);
      flex: none;
      .ic-heart {
        width: 24px;
        height: 24px;
        position: absolute;
        left: 12px;
        bottom: 12px;
      }
    }
    .lay-add {
      width: 100%;
      height: 100%;
      background: white;
      border: 1px solid #ced4da;
      border-radius: pxToRem(8px);
      img {
        width: pxToRem(32px);
        height: pxToRem(32px);
      }
    }
  }
}
</style>
