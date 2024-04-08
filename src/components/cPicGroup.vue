<template>
  <div
    class="rounded-lg lay-pic"
    :ripple="items && items.length"
  >
    <template v-if="items.length > 5">
      <v-row>
        <v-col cols="8">
          <v-img
            max-width="100%"
            aspect-ratio="1"
            :class="{ 'img-empty': imgErr.indexOf(0) > -1 }"
            :src="
              imgErr.indexOf(0) > -1
                ? require('@/assets/images/ic-def-box.svg')
                : (items[0].fileType == 'VIDEO' ? items[0].thumbName : items[0].fileName) + `?${filterVer}`
            "
            @error="
              (e) => {
                imgErr.push(0);
              }
            "
            @click.prevent.stop="() => onClickActionItem(0)"
          />
        </v-col>
        <v-row class="col-4 pl-1">
          <v-col cols="12" class="mb-1">
            <v-img
              max-width="100%"
              height="100%"
              aspect-ratio="1"
              :src="
                imgErr.indexOf(1) > -1
                  ? require('@/assets/images/ic-def-box.svg')
                  : (items[1].fileType == 'VIDEO' ? items[1].thumbName : items[1].fileName) + `?${filterVer}`
              "
              :class="{ 'img-empty': imgErr.indexOf(1) > -1 }"
              @error="
                (e) => {
                  imgErr.push(1);
                }
              "
              @click.prevent.stop="() => onClickActionItem(1)"
            />
          </v-col>
          <v-col cols="12">
            <v-img
              max-width="100%"
              height="100%"
              aspect-ratio="1"
              :src="
                imgErr.indexOf(2) > -1
                  ? require('@/assets/images/ic-def-box.svg')
                  : (items[2].fileType == 'VIDEO' ? items[2].thumbName : items[2].fileName) + `?${filterVer}`
              "
              :class="{ 'img-empty': imgErr.indexOf(2) > -1 }"
              @error="
                (e) => {
                  imgErr.push(2);
                }
              "
              @click.prevent.stop="() => onClickActionItem(2)"
            />
          </v-col>
        </v-row>
      </v-row>
      <v-row class="mt-1" style="height: min-content">
        <v-col cols="4" class="pr-1">
          <v-img
            max-width="100%"
            aspect-ratio="1"
            :class="{ 'img-empty': imgErr.indexOf(3) > -1 }"
            :src="
              imgErr.indexOf(3) > -1
                ? require('@/assets/images/ic-def-box.svg')
                : (items[3].fileType == 'VIDEO' ? items[3].thumbName : items[3].fileName) + `?${filterVer}`
            "
            @error="
              (e) => {
                imgErr.push(3);
              }
            "
            @click.prevent.stop="() => onClickActionItem(3)"
          />
        </v-col>
        <v-col cols="4">
          <v-img
            width="100%"
            height="100%"
            aspect-ratio="120/100"
            :class="{ 'img-empty': imgErr.indexOf(4) > -1 }"
            :src="
              imgErr.indexOf(4) > -1
                ? require('@/assets/images/ic-def-box.svg')
                : (items[4].fileType == 'VIDEO' ? items[4].thumbName : items[4].fileName) + `?${filterVer}`
            "
            @error="
              (e) => {
                imgErr.push(4);
              }
            "
            @click.prevent.stop="() => onClickActionItem(4)"
          />
        </v-col>
        <v-col cols="4" class="pl-1">
          <v-img
            max-width="100%"
            :class="{ 'img-empty': imgErr.indexOf(5) > -1 }"
            :src="
              imgErr.indexOf(5) > -1
                ? require('@/assets/images/ic-def-box.svg')
                : (items[5].fileType == 'VIDEO' ? items[5].thumbName : items[5].fileName) + `?${filterVer}`
            "
            @error="
              (e) => {
                imgErr.push(5);
              }
            "
            aspect-ratio="1"
            @click.prevent.stop="() => onClickActionItem(5)"
          />
        </v-col>
      </v-row>
    </template>
    <v-row v-else-if="items.length > 2">
      <v-col cols="8">
        <v-img
          max-width="100%"
          aspect-ratio="1"
          :class="{ 'img-empty': imgErr.indexOf(0) > -1 }"
          :src="
            imgErr.indexOf(0) > -1
              ? require('@/assets/images/ic-def-box.svg')
              : (items[0].fileType == 'VIDEO' ? items[0].thumbName : items[0].fileName) + `?${filterVer}`
          "
          @error="
            (e) => {
              imgErr.push(0);
            }
          "
          @click.prevent.stop="() => onClickActionItem(0)"
        />
      </v-col>
      <v-row class="col-4 pl-1">
        <v-col cols="12" class="mb-1">
          <v-img
            max-width="100%"
            height="100%"
            aspect-ratio="1"
            :src="
              imgErr.indexOf(1) > -1
                ? require('@/assets/images/ic-def-box.svg')
                : (items[1].fileType == 'VIDEO' ? items[1].thumbName : items[1].fileName) + `?${filterVer}`
            "
            :class="{ 'img-empty': imgErr.indexOf(1) > -1 }"
            @error="
              (e) => {
                imgErr.push(1);
              }
            "
            @click.prevent.stop="() => onClickActionItem(1)"
          />
        </v-col>
        <v-col cols="12">
          <v-img
            max-width="100%"
            height="100%"
            aspect-ratio="1"
            :src="
              imgErr.indexOf(2) > -1
                ? require('@/assets/images/ic-def-box.svg')
                : (items[2].fileType == 'VIDEO' ? items[2].thumbName : items[2].fileName) + `?${filterVer}`
            "
            :class="{ 'img-empty': imgErr.indexOf(2) > -1 }"
            @error="
              (e) => {
                imgErr.push(2);
              }
            "
            @click.prevent.stop="() => onClickActionItem(2)"
          />
        </v-col>
      </v-row>
    </v-row>
    <v-row v-else-if="items.length > 0">
      <v-col cols="12">
        <v-img
          width="100%"
          :aspect-ratio="350 / 230"
          :src="
            imgErr.indexOf(0) > -1
              ? require('@/assets/images/ic-def-box.svg')
              : (items[0].fileType == 'VIDEO' ? items[0].thumbName : items[0].fileName) + `?${filterVer}`
          "
          :class="{ 'img-empty': imgErr.indexOf(0) > -1 }"
          @error="
            (e) => {
              imgErr.push(0);
            }
          "
          @click.prevent.stop="() => onClickActionItem(0)"
        />
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12">
        <v-img
          width="100%"
          aspect-ratio="350/230"
          class="img-empty"
          :src="require('@/assets/images/ic-def-box.svg')"
        />
      </v-col>
    </v-row>

    <v-dialog
      v-model="prevPop.isShow"
      :width="'90%'"
    >
      <p-preview-vue
        :onClose="
          () => {
            onClosePopupAction(prevPop);
          }
        "
        v-model="prevPop.imgSrc"
      />
    </v-dialog>
  </div>
</template>

<script>
import MEDIA_LIST from "@/bridge/media/list";
import pPreviewVue from "@/popup/pPreview.vue";
export default {
  components: {pPreviewVue},
  props: {
    maxImg: {
      default: 3,
    },
    logId: {
      default: null,
    },
    pics: {
      default: null,
    },
    onClick: {
      default: () => {},
    },
  },
  data() {
    return {
      items: [],
      imgErr: [],
      prevPop: {
        isCreate: false,
        isShow: false,
        imgSrc: null
      }
    };
  },
  computed: {},
  watch: {
    logId: {
      immediate: true,
      deep: true,
      handler() {
        this.getItems();
      },
    },
    items: {
      immediate: true,
      deep: true,
      handler(val) {
        this.$emit("update:pics", val);
      },
    },
  },
  created() {},
  mounted() {},
  destroyed() {},
  methods: {
    async getItems() {
      var eq = [];
      if (this.logId) {
        eq.push({ key: "logId", val: this.logId });
      }
      await MEDIA_LIST.request(1, this.maxImg, eq).then((data) => {
        this.items.splice(0, this.items.length);
        this.imgErr.splice(0, this.imgErr.length);
        this.items.push(...data.list);
      });
    },
    onClickAction() {
      if (!this.items || !this.items.length) {
        return;
      }
      if (this.logId) {
        this.pushRouter({ name: "gallList", params: { seq: this.logId } });
      } else {
        this.pushRouter({ name: "gallMore" });
      }
    },
    onClickActionItem(index) {
      if (this.imgErr.indexOf(index) < 0) {
        this.prevPop.imgSrc = (this.items[index].fileType == 'VIDEO' ? this.items[index].thumbName : this.items[index].fileName) + `?${this.filterVer}`
        this.onShowPopupAction(this.prevPop)
      } 
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/sass/app.scss";
.lay-pic {
  overflow: hidden;
  margin-bottom: pxToRem(48px);
  .img-empty {
    background: #dee2e6;
    align-items: center;
    ::v-deep .v-image__image {
      background-size: 28%;
    }
  }
}
</style>
