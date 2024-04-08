<template>
  <lay-header
    :showBack="true"
    tBarColor="#FFFFFF"
    :txtRight="$t('common.done')"
    :txtTitle="$t('collection.pics.title')"
    :onRight="onClickActionComp"
  >
    <v-layout column class="lay-body">
      <span class="txt-cnt pt-1 pb-4 px-5" style="overflow-wrap: 'everything';">{{
        $t("collection.pics.desc", { count: selectItems.length, title: title })
      }}</span>
      <v-layout wrap row class="flex-grow-0 pb-5">
        <c-pic
          v-for="(item, index) in items"
          :editMode="true"
          :key="index"
          :src="item.thumbName + `?${filterVer}`"
          :isVideo="item.fileType == 'VIDEO'"
          :duration="item.videoTime"
          :select="
            selectItems.indexOf(item.mediaId) > -1
              ? selectItems.indexOf(item.mediaId) + 1
              : null
          "
          :isLike="item.likeYn == 'Y'"
          :isFilter="item.filterd == '1'"
          :isMemo="item.memo.title || item.memo.memo"
          :onClick="() => onClickActionSelect(item.mediaId)"
        />
      </v-layout>
    </v-layout>
  </lay-header>
</template>

<script>
import CPic from "../../components/cPic.vue";
import MEDIA_LIST from "@/bridge/media/list";
import COLLECTION_REG from "@/bridge/collection/reg";
import COLLECTION_INSERT from "@/bridge/collection/insert";
import COLL_INFO from "@/bridge/collection/info";
export default {
  props: ["title", "seq"],
  data() {
    return {
      isGetingItems: false,
      isEditMode: false,
      selectItems: [],
      items: [],
      pageNo: 1,
      allCount: 0,
      gallInfo: null,
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
    if (this.seq) {
      this.getData();
    } else {
      this.getItems();
    }
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
        this.title =
          res.data.favorite == 1
            ? this.$t("collection.like")
            : res.data.collectionName;
        this.getItems();
      } else {
        this.showToast(this.$t("error.error"), false, false);
        this.$router.go(-1);
      }
    },
    async getItems(page = 1) {
      if (this.isGetingItems) {
        return;
      }
      this.isGetingItems = true;
      await MEDIA_LIST.request(page, 20, null, this.seq)
        .then((data) => {
          this.isGetingItems = false;
          this.pageNo = page;
          if (page == 1) {
            this.items.splice(0, this.items.length);
          }
          this.allCount = data.allCount;
          this.items.push(...data.list);

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
    async insertCollection(cId) {
      if (this.selectItems && this.selectItems.length) {
        await COLLECTION_INSERT.request(cId, this.selectItems)
          .then((data) => {
            this.isGetingItems = false;
            if (data.isSuccess) {
              this.showToast(this.$t("error.save-comp"), true, false);
              this.$router.go(this.seq ? -1 : -2);
            } else {
              this.showToast(this.$t("error.error"), false, false);
            }
          })
          .catch(() => {
            this.isGetingItems = false;
          });
      } else {
        this.isGetingItems = false;
        this.showToast(this.$t("error.save-comp"), true, false);
        this.$router.go(this.seq ? -1 : -2);
      }
    },
    async onClickActionComp() {
      if (this.isGetingItems) {
        return;
      }
      this.isGetingItems = true;
      if (this.seq) {
        this.insertCollection(this.seq);
      } else {
        await COLLECTION_REG.request(this.title)
          .then((data) => {
            if (data.isSuccess) {
              this.insertCollection(data.data.collectionId);
            } else {
              this.isGetingItems = false;
            }
          })
          .catch(() => {
            this.isGetingItems = false;
          });
      }
    },
    onClickActionSelect(mediaId) {
      if (this.selectItems.indexOf(mediaId) > -1) {
        this.selectItems.splice(this.selectItems.indexOf(mediaId), 1);
      } else {
        this.selectItems.push(mediaId);
      }
    },
  },
  components: { CPic },
};
</script>

<style lang="scss" scoped>
@import "@/sass/app.scss";
.lay-body {
  .txt-cnt {
    flex: none;
    font-style: normal;
    font-weight: 700;
    font-size: pxToRem(13px);
    letter-spacing: -0.01em;
    color: #000000;
  }
}
</style>
