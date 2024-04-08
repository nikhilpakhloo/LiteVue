<template>
  <lay-header
    :showBack="true"
    tBarColor="#FFFFFF"
    :txtTitle="$t('gallery.my-pic')"
    :isGetingItems="isGetingItems"
  >
    <v-layout column class="pt-9 px-5 lay-body">
      <v-layout column v-for="(item, index) in items" :key="index">
        <span
          class="txt-month"
          v-if="
            index == 0 ||
            items[index - 1].startDate.substring(0, 6) !==
              items[index].startDate.substring(0, 6)
          "
          >{{
            $t("common.yyyyMM", {
              year: item.startDate.substring(0, 4),
              month: item.startDate.substring(4, 6),
            })
          }}</span
        >
        <v-layout class="lay-date" align-center>
          <span class="txt-num">#{{ item.logId }}</span>
          <span class="txt-date">{{ getDateFormat(item.startDate) }}</span>
          <v-layout v-if="item.majorLocation">
            <img class="ml-2" src="@/assets/images/ic-location-g.svg" />
            <span class="txt-loc">{{ $i18n.locale == 'en' ? item.majorLocationEn : item.majorLocation }}</span>
            <!-- <span class="txt-loc">{{ item.majorLocation.split(",")[1] }}</span> -->
          </v-layout>
          <v-spacer />
          <span
            v-if="item.pics && item.pics.length"
            class="txt-more"
            @click.prevent.stop="
              () => {
                pushRouter({ name: 'gallList', params: { seq: item.logId } });
              }
            "
            >{{ $t("gallery.more") }}
          </span>
        </v-layout>
        <c-pic-group :maxImg="3" :logId="item.logId" :pics.sync="item.pics" />
      </v-layout>
    </v-layout>
  </lay-header>
</template>

<script>
import cPicGroup from "@/components/cPicGroup.vue";
import GALLERY_LIST from "@/bridge/gallery/list";
export default {
  components: { cPicGroup },
  data() {
    return {
      pageNo: 1,
      allCount: 0,
      items: [],
      isGetingItems: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
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
      await GALLERY_LIST.request(page)
        .then((v) => {
          this.pageNo = page;
          if (page == 1) {
            this.items.splice(0, this.items.length);
          }
          this.allCount = v.allCount;
          this.items.push(...v.list);
          this.isGetingItems = false;

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
  },
};
</script>

<style lang="scss" scoped>
@import "@/sass/app.scss";
.lay-body {
  .txt-month {
    font-family: "PP Pangram Sans";
    font-style: normal;
    font-weight: 400;
    font-size: 28px;
    line-height: 32px;
    letter-spacing: -0.022em;
    color: #000000;
    margin-bottom: pxToRem(20px);
  }
  .lay-pic {
    overflow: hidden;
    margin-bottom: pxToRem(48px);
  }
  .lay-date {
    flex: none;
    .txt-num {
      font-family: "PP Pangram Sans";
      font-style: normal;
      font-weight: 400;
      font-size: pxToRem(18px);
      line-height: pxToRem(28px);
      color: #64dee4;
    }
    .txt-date {
      font-family: "PP Pangram Sans";
      font-style: normal;
      font-weight: 400;
      font-size: pxToRem(18px);
      line-height: pxToRem(28px);
      color: #000000;
      margin-left: 6px;
    }
    .txt-loc {
      font-style: normal;
      font-weight: 400;
      font-size: pxToRem(13px);
      line-height: pxToRem(18px);
      letter-spacing: -0.01em;
      color: #868e96;
    }
    .txt-more {
      font-family: "PP Pangram Sans";
      font-style: normal;
      font-weight: 400;
      font-size: pxToRem(13px);
      line-height: pxToRem(15px);
      text-align: right;
      letter-spacing: -0.022em;
      color: #868e96;
    }
  }
}
</style>
