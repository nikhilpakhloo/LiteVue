<template>
  <lay-header
    :showBack="!isEditMode"
    :showX="isEditMode"
    tBarColor="#FFFFFF"
    :onBack="
      () => {
        if (isEditMode) {
          isEditMode = false;
        } else {
          $router.go(-1);
        }
      }
    "
  >
    <template slot="right">
      <span
        v-if="items && items.length"
        class="txt-right"
        @click.prevent.stop="onClickActionEdit"
        >{{ isEditMode ? (items.length == selectItems.length ? $t("common.select-none") : $t("common.select-all")) : $t("common.select") }}</span
      >
      <span
        v-if="!isEditMode && cInfo && cInfo.favorite != 1"
        class="txt-right ml-6"
        @click.prevent.stop="
          () => pushRouter({ name: 'collEdit', params: { seq: seq } })
        "
      >
        {{ $t("common.update") }}
      </span>
    </template>
    <v-layout column class="pt-1 lay-body" v-if="cInfo">
      <span class="txt-sub">
        {{
          cInfo && cInfo.favorite == 1
            ? $t("collection.like")
            : cInfo.collectionName
        }}
      </span>
      <v-layout class="txt-cnt">
        <span>{{ $t("collection.info.pic-cnt", { count: allCount }) }}</span>
        <v-spacer />
        <span
          v-show="!isEditMode"
          class="txt-add"
          @click.prevent.stop="
            () =>
              pushRouter({
                name: 'collPic',
                params: { seq: seq },
              })
          "
        >
          {{ $t("common.add") }}
        </span>
      </v-layout>
      <v-layout wrap row class="flex-grow-0 pb-5 pt-6">
        <c-pic
          v-for="(item, index) in items"
          :editMode="isEditMode"
          :key="index"
          :src="item.thumbName + `?${filterVer}`"
          :isVideo="item.fileType == 'VIDEO'"
          :duration="item.videoTime"
          :select="
            selectItems.indexOf(item) > -1
              ? selectItems.indexOf(item) + 1
              : null
          "
          :isLike="item.likeYn == 'Y'"
          :isFilter="item.filterd == '1'"
          :isMemo="item.memo.title || item.memo.memo"
          :onClick="() => onClickActionSelect(item)"
          :mediaId="item.mediaId"
        />
      </v-layout>
      <transition name="slide-y-reverse-transition">
        <c-footer v-if="isEditMode" height="80" elevation="0">
          <v-layout
            v-ripple
            column
            align-center
            justify-center
            class="lay-footer-menu"
            :class="[selectItems.length ? 'select' : '']"
            @click.prevent.stop="onClickActionSave"
          >
            <img src="@/assets/images/ic-menu-down.svg" />
            <span>{{ $t("common.save") }}</span>
          </v-layout>
          <v-layout
            v-ripple
            column
            align-center
            justify-center
            class="lay-footer-menu"
            :class="[selectItems.length ? 'select' : '']"
            @click.prevent.stop="onClickActionFilter"
          >
            <img src="@/assets/images/ic-menu-filter.svg" />
            <span>{{ $t("common.filter") }}</span>
          </v-layout>
          <v-layout
            v-ripple
            column
            align-center
            justify-center
            class="lay-footer-menu"
            :class="[selectItems.length ? 'select' : '']"
            @click.prevent.stop="onClickActionDel"
          >
            <img src="@/assets/images/ic-menu-del.svg" />
            <span>{{ $t("common.delete") }}</span>
          </v-layout>
        </c-footer>
      </transition>
    </v-layout>
  </lay-header>
</template>

<script>
import cFooter from "@/components/cFooter.vue";
import CPic from "@/components/cPic.vue";
import COLL_INFO from "@/bridge/collection/info";
import MEDIA_LIST from "@/bridge/media/collections";
import MEDIA_DELETE from "@/bridge/media/out";
export default {
  components: { cFooter, CPic },
  props: ["seq"],
  data() {
    return {
      isGetingItems: false,
      isEditMode: false,
      selectItems: [],
      items: [],
      pageNo: 1,
      allCount: 0,
      cInfo: null,
    };
  },
  computed: {},
  watch: {
    isEditMode() {
      this.selectItems.splice(0, this.selectItems.length);
    },
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  mounted() {
    this.getData();
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
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
        this.getItems();
      } else {
        this.showToast(this.$t("error.error"), false, false);
      }
    },
    async getItems(page = 1) {
      if (this.isGetingItems) {
        return;
      }
      this.isGetingItems = true;
      var eq = [];
      if (this.seq) {
        eq.push({ key: "collectionId", val: this.seq });
      }
      await MEDIA_LIST.request(page, 20, eq)
        .then((data) => {
          this.pageNo = page;
          if (page == 1) {
            this.items.splice(0, this.items.length);
          }
          this.allCount = data.allCount;
          this.items.push(...data.list);
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
    checkSelect() {
      if (!this.selectItems.length) {
        return false;
      }
      return true;
    },
    onClickActionEdit() {
      if (!this.isEditMode) {
        this.isEditMode = true;
      } else {
        if(this.items.length == this.selectItems.length) {
          this.selectItems.splice(0, this.selectItems.length)
        } else {
          this.items.forEach((element) => {
            if (this.selectItems.indexOf(element) < 0) {
              this.selectItems.push(element);
            }
          });
        }
      }
    },
    onClickActionSelect(item) {
      if (this.isEditMode) {
        if (this.selectItems.indexOf(item) > -1) {
          this.selectItems.splice(this.selectItems.indexOf(item), 1);
        } else {
          this.selectItems.push(item);
        }
      } else {
        this.pushRouter({
          name: "media",
          params: { seq: item.mediaId, collId: item.collectionId },
        });
      }
    },
    onClickActionSave() {
      if (this.checkSelect()) {
        if (this.isGetingItems) {
          return;
        }
        this.isGetingItems = true;
        window.onSaveComplete = (res) => {
          this.isEditMode = false;
          this.isGetingItems = false;
          if (res == "success") {
            this.showToast(this.$t("error.save-comp"));
          } else {
            this.showToast(this.$t("error.error"), false, false);
          }
          delete window.onSaveComplete;
        };
        this.nativeBridge.fileDownload(this.selectItems, "onSaveComplete");
      }
    },
    onClickActionFilter() {
      if (this.selectItems.length > this.FILTER_MAX_SIZE) {
        this.showToast(
          this.$t("error.filter-cnt-error", { count: this.FILTER_MAX_SIZE }),
          false,
          false
        );
        return false;
      }
      if (this.checkSelect()) {
        window.onFilterComplete = (res) => {
          if(res) {
            this.showToast(this.$t("error.filter-comp"), false, false);
            this.$store.commit("filterVer", this.filterVer + 1);
            this.getItems();
          }
          this.isEditMode = false;
          delete window.onFilterComplete;
        };
        this.nativeBridge.showFilterView(this.selectItems, "onFilterComplete");
      }
    },
    onClickActionDel() {
      this.showPopup({
        title: this.$t("gallery.edit.select", {
          count: this.selectItems.length,
        }),
        msg: this.$t("collection.media.delete-collection"),
        okTxt: this.$t("collection.media.btn-delect-all"),
        cancelTxt: this.$t("collection.media.btn-delect"),
        persistent: false,
        okAction: () => {
          window.onDeleteComplete = () => {
            this.isEditMode = false;
            this.getItems();
            this.showToast(this.$t("error.del-comp"), false, false);
            delete window.onDeleteComplete;
          };
          this.nativeBridge.fileDelete(this.selectItems, "onDeleteComplete");
        },
        cancelAction: () => {
          if (this.isGetingItems) {
            return;
          }
          this.isGetingItems = true;
          var ids = [];
          this.selectItems.forEach((element) => {
            ids.push(element.collectionMediaId);
          });
          MEDIA_DELETE.request(ids)
            .then((data) => {
              this.isGetingItems = false;
              if (data.isSuccess) {
                this.isEditMode = false;
                this.getItems();
                this.showToast(this.$t("error.del-comp"), false, false);
              } else {
                this.showToast(this.$t("error.error"), false, false);
              }
            })
            .catch(() => {
              this.isGetingItems = false;
            });
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/sass/app.scss";
.txt-right {
  font-style: normal;
  font-weight: 500;
  font-size: pxToRem(16px);
  line-height: pxToRem(18px);
  text-align: right;
  letter-spacing: -0.02em;
  color: #000000;
  z-index: 1;
}
.lay-body {
  .lay-footer-menu {
    flex: none;
    width: pxToRem(98px);
    max-width: 33%;
    height: 100%;
    opacity: 0.3;
    &.select {
      opacity: 1;
    }
    img {
      width: pxToRem(24px);
      height: pxToRem(24px);
    }
    span {
      margin-top: pxToRem(8px);
      font-style: normal;
      font-weight: 400;
      font-size: pxToRem(9px);
      line-height: pxToRem(10px);
      text-align: center;
      color: #000;
    }
  }
  .txt-sub {
    font-family: "PP Pangram Sans";
    font-style: normal;
    font-weight: 600;
    font-size: pxToRem(28px);
    line-height: pxToRem(32px);
    letter-spacing: -0.022em;
    color: #000000;
    padding: 0 pxToRem(20px);
    margin-top: pxToRem(24px);
  }
  .txt-cnt {
    margin-top: pxToRem(8px);
    flex: none;
    span {
      font-family: "PP Pangram Sans";
      font-style: normal;
      font-weight: 500;
      font-size: pxToRem(14px);
      line-height: pxToRem(16px);
      letter-spacing: -0.022em;
      color: #000000;
      padding: 0 pxToRem(20px);
      &.txt-add {
        color: #15d4e0;
      }
    }
  }
}
</style>
