<template>
  <lay-header
    :showBack="true"
    :tBarColor="'#FFFFFF'"
    :txtTitle="$t('mypage.center.notice.title')"
    :isGetingItems="isGetingItems"
  >
    <v-layout column class="pt-2 px-5 pb-6 lay-body">
      <c-list-item
        v-for="(notice, index) in items"
        :key="index"
        :value="notice.title"
        :date="notice.createTime"
        :onClick="
          () => {
            pushRouter({
              name: 'noticeDetail',
              query: { noticeId: notice.id },
            });
          }
        "
      />
    </v-layout>
  </lay-header>
</template>

<script>
import cListItem from "@/components/cListItem.vue";
export default {
  components: { cListItem },
  data() {
    return {
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

      await this.api({
        url: "/notice/list",
        method: "post",
        data: { pageNum: page, pageRow: 10 },
      })
        .then((data) => {
          this.pageNo = page;
          if (page == 1) {
            this.items.splice(0, this.items.length);
          }
          this.allCount = data.allCount;
          this.items.push(...data.list);
          setTimeout(() => {
            var target = document.children[0];
            this.checkNext(target);
          }, 300);
        })
        .catch((err) => {
          this.$router.go(-1);
          this.showToast(err.msg, false, false);
        });
      this.isGetingItems = false;
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
</style>
