<template>
  <lay-header
    :showBack="true"
    tBarColor="#FFFFFF"
    :txtTitle="$t('gallery.my-pic')"
    :onRight="onClickActionComp"
    :isGetingItems="isGetingItems"
  >
    <v-layout
      class="bar-right"
      slot="right"
      @click.prevent.stop="onClickActionFilter"
    >
      <img src="@/assets/images/ic-pen-b.svg" />
      <span class="txt-right">{{ $t("common.btn-filter") }}</span>
    </v-layout>
    <v-layout column class="lay-body">
      <template v-if="selectItems.length">
        <span class="px-5 my-2 txt-cnt">{{
          $t("gallery.sel-cnt", { count: selectItems.length })
        }}</span>
        <v-layout class="lay-select">
          <v-img
            class="img-select"
            v-for="(item, index) in selectItems"
            :key="index"
            :width="64"
            :height="64"
            :max-width="64"
            :max-height="64"
            :src="item.thumbName + `?${filterVer}`"
          >
            <img
              src="@/assets/images/ic-x-thumb.svg"
              class="ic-x"
              @click.prevent.stop="
                () => {
                  selectItems.splice(index, 1);
                }
              "
            />
          </v-img>
        </v-layout>
      </template>
      <v-layout wrap row class="flex-grow-0 pb-5 mt-3">
        <c-pic
          v-for="(item, index) in items"
          :editMode="true"
          :key="index"
          :src="(item.fileType == 'VIDEO' ? item.thumbName : item.fileName) + `?${filterVer}`"
          :isVideo="item.fileType == 'VIDEO'"
          :duration="item.videoTime"
          :select="
            selectItems.indexOf(item) > -1
              ? selectItems.indexOf(item) + 1
              : null
          "
          :onClick="() => onClickActionSelect(item)"
          :mediaId="item.mediaId"
          :isLike="item.likeYn == 'Y'"
          :isFilter="item.filterd == '1'"
          :isMemo="item.memo.title || item.memo.memo"
        />
      </v-layout>
    </v-layout>
  </lay-header>
</template>

<script>
import CPic from "../../components/cPic.vue";
import MEDIA_LIST from "@/bridge/media/list";
export default {
  props: ["title"],
  components: { CPic },
  data() {
    return {
      selectItems: [],
      items: [],
      pageNo: 1,
      allCount: 0,
      isGetingItems: false,
    };
  },
  computed: {},
  watch: {},
  created() {
    window.addEventListener("scroll", this.handleScroll);
    window.onFilterComplete = (res) => {
      if(res) {
        this.showToast(this.$t("error.filter-comp"), false, false);
        this.$store.commit("filterVer", this.filterVer + 1);
        this.$router.go(-1);
      }else{
        
      }
    };
  },
  mounted() {
    this.getItems();
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
    delete window.onFilterComplete;
  },
  methods: {
    async getItems(page = 1) {
      if (this.isGetingItems) {
        return;
      }
      this.isGetingItems = true;
      this.pageNo = page;
      await MEDIA_LIST.request(this.pageNo)
        .then((data) => {
          if (this.pageNo == 1) {
            this.items.splice(0, this.items.length);
          }
          this.items.push(...data.list);
          this.allCount = data.allCount;
          this.isGetingItems = false;

          this.items.forEach(element => {
            try {
              this.$set(element, 'memo', JSON.parse(element.memo.replace(/\n/g, "\\n")))
            } catch (error) {
            }
          });

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
    onClickActionComp() {
      this.showToast("준비중입니다.");
      this.pushRouter({
        name: "collList",
        params: {
          seq: 1,
        },
      });
    },
    onClickActionSelect(item) {
      if (this.selectItems.indexOf(item) > -1) {
        this.selectItems.splice(this.selectItems.indexOf(item), 1);
      } else {
        this.selectItems.push(item);
      }
    },
    onClickActionFilter() {
      if (this.selectItems.length > this.FILTER_MAX_SIZE) {
        this.showToast(
          this.$t("error.filter-cnt-error", { count: this.FILTER_MAX_SIZE }),
          false,
          false
        );
        return;
      }
      this.nativeBridge.showFilterView(this.selectItems, "onFilterComplete");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/sass/app.scss";
.bar-right {
  flex: none;
  z-index: 1;
  img {
    width: pxToRem(16px);
    height: pxToRem(16px);
  }
  .txt-right {
    margin-left: 2px;
    font-style: normal;
    font-weight: 700;
    font-size: pxToRem(16px);
    line-height: pxToRem(20px);
    text-align: center;
    letter-spacing: -0.022em;
    color: #000000;
  }
}
.lay-body {
  .txt-cnt {
    font-style: normal;
    font-weight: 400;
    font-size: pxToRem(14px);
    line-height: pxToRem(16px);
    letter-spacing: -0.022em;
    color: #000000;
  }
  .lay-select {
    overflow-x: auto;
    padding: pxToRem(4px) pxToRem(20px) pxToRem(20px);
    flex: none;
    .img-select {
      border-radius: 8px;
      position: relative;
      .ic-x {
        position: absolute;
        width: 28px;
        height: 28px;
        padding: 6px;
        right: 0;
      }
    }
    & > * + * {
      margin-left: 6px;
    }
  }
}
</style>
