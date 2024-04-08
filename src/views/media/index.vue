<template>
  <lay-header
    :tBarColor="'rgba(0,0,0,0.7)'"
    :barTrans="isMemoView"
    :isGetingItems="isGetingItems"
    @tbHeight="(val) => (tbHeight = val)"
  >
    <v-layout
      class="lay-bar"
      slot="bar-root"
      align-center
      justify-space-between
    >
      <v-layout style="flex: 1">
        <img
          class="img-back"
          @click.prevent.stop="
            () => (isMemoView ? (isMemoView = false) : $router.go(-1))
          "
          :src="
            isMemoView
              ? require('@/assets/images/ic-x-w-16.svg')
              : require('@/assets/images/ic-back-w.svg')
          "
        />
      </v-layout>
      <v-layout column align-center justify-center>
        <span class="txt-title" v-if="items.length && logId">
          #{{ logId }}
          <span class="ml-2" style="font-weight: 400">
            {{
              items[0].createDate.substring(0, 4) +
              "." +
              items[0].createDate.substring(4, 6) +
              "." +
              items[0].createDate.substring(6, 8)
            }}
          </span>
        </span>
        <span class="txt-title" v-if="items.length && collId">{{
          collInfo.favorite == 1
            ? $t("collection.like")
            : collInfo.collectionName
        }}</span>
      </v-layout>
      <v-layout
        justify-end
        align-center
        style="flex: 1"
        @click.prevent.stop="onClickActionMemo"
      >
        <img
          v-if="!isMemoView"
          src="@/assets/images/ic-memo-pen.svg"
          class="ic-pencil"
        />
        <span class="txt-memo">{{
          isMemoView ? $t("common.save") : $t("gallery.memo")
        }}</span>
      </v-layout>
    </v-layout>
    <v-layout
      column
      class="lay-body"
      :style="{
        height: isMemoView ? 'unset' : '100vh'
        // paddingTop: isMemoView && !isLandscape ? pxToRem(tbHeight) : '',
      }"
      v-if="fileInfo"
    >
      <!-- :class="[isMemoView ? ratio < layoutRatio ? 'justify-center' : 'align-center' : 'justify-center align-center',]" -->
      <pinch-zoom
        :limitPan="true"
        :limitZoom="1000"
        ref="pinch"
        id="pinch"
        disableZoomControl="disable"
        style="width: 100%"
        :disabled="isMemoView"
      >
        <v-layout
          v-touch="{
            left: () =>
              touch || isMemoView || (video && !video.paused)
                ? ''
                : selectIndex < allCount - 1
                ? selectIndex++
                : '',
            right: () =>
              touch || isMemoView || (video && !video.paused)
                ? ''
                : selectIndex > 0
                ? selectIndex--
                : '',
            up: () => (!touch ? (isMemoView = true) : ''),
            down: () => (isMemoView = false),
            move: onClickActionTouchMove,
            start: (e) => (e.touches.length > 1 ? scrollFlag = false : scrollFlag = true),
            end: () => (scrollFlag = false),
          }"
          class="lay-pic"
          id="img-body"
          :class="[isMemoView ? '' : 'absolute']"
          :style="{
            paddingTop: isMemoView && !isLandscape ? pxToRem(tbHeight) : '',
            maxWidth: '100%',
            maxHeight: isMemoView && !isLandscape  ? `calc((100vw / ${layoutRatio}) + ${pxToRem(tbHeight)})` : '100%',
            width: '100%',
            height: isMemoView && !isLandscape ? ratio < layoutRatio ? `calc((100vw / ${layoutRatio}) + ${pxToRem(tbHeight)})` : `calc((100vw / ${this.ratio}) + ${pxToRem(tbHeight)})` : isMemoView && isLandscape ? `calc(50vw / ${ratio})` : '100vh',
          }"
        >
          <v-layout
            v-if="isVideo"
            :style="{
              width: ratio < layoutRatio ? 'auto' : '100%',
              height: ratio < layoutRatio ? '100%' : 'auto',
            }"
          >
            <video
              @click.prevent.stop="onClickActionVideo"
              :poster="fileInfo.thumbName + `?${filterVer}`"
              :style="{
                maxWidth: isMemoView && isLandscape ? '50%' : '100%',
                maxHeight: isMemoView && isLandscape ? `calc(50vw / ${layoutRatio})` : '100%',
                aspectRatio: ratio,
                width: '100%',
                height: '100%',
              }"
              @loadedmetadata="loadedmetadata"
              @timeupdate="timeupdate"
            >
              <source :src="fileInfo.fileName + `?${filterVer}`" />
            </video>
            <v-layout
              v-if="isVideo && isMemoView && isLandscape"
              column
              justify-center
              class="lay-controls pa-5"
              :style="{
                flex: 1,
                marginTop: `${tbHeight}px`,
              }"
            >
              <input
                ref="input-range"
                type="range"
                step="any"
                pseudo="-webkit-media-controls-timeline"
                :max="duration"
                min="0"
                :value="currentTime"
                class="input-range flex-grow-0"
                @change="onChangeRange"
                :style="{
                  background: `linear-gradient(to right, #FFFFFF 0%, #FFFFFF ${timePercent}%, #6E6E6E ${timePercent}%, #6E6E6E 100%)`,
                }"
                v-touch.passive.stop="{
                  left: () => (touch = true),
                  right: () => (touch = true),
                }"
              />
              <v-layout
                justify-space-between
                class="lay-duration-time flex-grow-0"
              >
                <span class="txt-duration-time">{{
                  getDurationFormat(currentTime)
                }}</span>
                <span class="txt-duration-time">{{
                  getDurationFormat(duration)
                }}</span>
              </v-layout>
              <v-layout
                justify-space-between
                class="lay-btn flex-grow-0"
                v-if="video"
              >
                <img
                  :src="
                    video.muted
                      ? require('@/assets/images/ic-mute-off.svg')
                      : require('@/assets/images/ic-mute-on.svg')
                  "
                  @click.prevent.stop="
                    () => {
                      video.muted = !video.muted;
                    }
                  "
                />
                <img
                  :src="
                    video.paused
                      ? require('@/assets/images/ic-video-start.svg')
                      : require('@/assets/images/ic-video-pause.svg')
                  "
                  @click.prevent.stop="onClickActionVideo"
                />
                <span class="px-4"></span>
              </v-layout>
            </v-layout>
          </v-layout>
          <v-layout
            v-else
            column
            align-center
            justify-center
          >
            <v-spacer
              v-if="!isLandscape"
              class="lay-memo-preview"
              :class="[isMemoView ? 'disable' : '']"
              style="width: 0px"
            />
            <img
              ref="img-pic"
              class="img-pic"
              :class="[isLandscape ? 'lands' : '']"
              :src="fileInfo.fileName + `?${filterVer}`"
              @load="onLoadImg"
              :style="{
                aspectRatio: ratio,
                height: imgHeight
              }"
              contain
            />
            <v-spacer
              v-if="!isLandscape"
              :class="[isMemoView? 'disable' : '']"
              :style="{
                opacity: scrollFlag ? '0' : '1'
              }"
              class="lay-memo-preview px-5"
            >
              <div v-if="zoom == 1 && !isMemoView">
                <span v-html="memo.title" />
                <br />
                <span v-html="memo.memo" />
              </div>
            </v-spacer>
          </v-layout>
        </v-layout>
      </pinch-zoom>

      <v-layout
        align-center
        justify-center
        v-if="isVideo && isLandscape && !isMemoView"
        class="lay-controls mx-11 lands px-1"
      >
        <img
          class="img-btn"
          :src="
            video.paused
              ? require('@/assets/images/ic-video-start-h.svg')
              : require('@/assets/images/ic-video-pause-h.svg')
          "
          @click.prevent.stop="onClickActionVideo"
        />
        <span class="txt-duration-time mx-2 mt-1" style="text-align: end">{{
          getDurationFormat(currentTime)
        }}</span>
        <input
          ref="input-range"
          type="range"
          step="any"
          pseudo="-webkit-media-controls-timeline"
          :max="duration"
          min="0"
          :value="currentTime"
          class="input-range"
          @change="onChangeRange"
          :style="{
            background: `linear-gradient(to right, #FFFFFF 0%, #FFFFFF ${timePercent}%, #6E6E6E ${timePercent}%, #6E6E6E 100%)`,
          }"
          v-touch.passive.stop="{
            left: () => (touch = true),
            right: () => (touch = true),
          }"
        />
        <span class="txt-duration-time mx-2">{{
          getDurationFormat(duration)
        }}</span>
        <img
          class="img-btn"
          :src="
            video.muted
              ? require('@/assets/images/ic-mute-off-h.svg')
              : require('@/assets/images/ic-mute-on-h.svg')
          "
          @click.prevent.stop="
            () => {
              video.muted = !video.muted;
            }
          "
        />
      </v-layout>

      <v-layout
        v-else-if="isVideo && !(isMemoView && isLandscape)"
        column
        class="lay-controls pa-5"
        :style="{
          position: !isMemoView ? 'absolute' : 'unset',
          bottom: '160px',
        }"
      >
        <input
          ref="input-range"
          type="range"
          step="any"
          pseudo="-webkit-media-controls-timeline"
          :max="duration"
          min="0"
          :value="currentTime"
          class="input-range"
          @change="onChangeRange"
          :style="{
            background: `linear-gradient(to right, #FFFFFF 0%, #FFFFFF ${timePercent}%, #6E6E6E ${timePercent}%, #6E6E6E 100%)`,
          }"
          v-touch.passive.stop="{
            left: () => (touch = true),
            right: () => (touch = true),
          }"
        />
        <v-layout justify-space-between class="lay-duration-time">
          <span class="txt-duration-time">{{
            getDurationFormat(currentTime)
          }}</span>
          <span class="txt-duration-time">{{
            getDurationFormat(duration)
          }}</span>
        </v-layout>
        <v-layout justify-space-between class="lay-btn" v-if="video">
          <img
            :src="
              video.muted
                ? require('@/assets/images/ic-mute-off.svg')
                : require('@/assets/images/ic-mute-on.svg')
            "
            @click.prevent.stop="
              () => {
                video.muted = !video.muted;
              }
            "
          />
          <img
            :src="
              video.paused
                ? require('@/assets/images/ic-video-start.svg')
                : require('@/assets/images/ic-video-pause.svg')
            "
            @click.prevent.stop="onClickActionVideo"
          />
          <span class="px-4"></span>
        </v-layout>
      </v-layout>
      <v-slide-y-reverse-transition>
        <v-layout column v-show="isMemoView && !scrollFlag" class="lay-memo-root pa-5">
          <input
            class="input-title"
            v-model="inputList.title.value"
            :placeholder="$t('gallery.memo-hint-title')"
          />
          <v-textarea
            ref="textArea"
            v-model="inputList.memo.value"
            rows="2"
            hide-details
            auto-grow
            no-resize
            solo-inverted
            :placeholder="$t('gallery.memo-hint')"
            class="input-memo flex-grow-0 pb-8"
            color="#000"
          />
        </v-layout>
      </v-slide-y-reverse-transition>
      <v-slide-y-reverse-transition>
        <v-layout
          column
          class="lay-list"
          v-show="!isLandscape && !isMemoView && zoom == 1 && !scrollFlag"
        >
          <v-slide-group v-model="selectIndex" center-active>
            <!-- <div :style="{width: `${slideMargin}`}"></div> -->
            <div :style="{ width: `calc(50vw - ${pxToRem(19)})` }"></div>
            <v-slide-item
              v-for="(item, index) in items"
              :key="item.mediaId"
              v-slot="{ active }"
            >
              <v-img
                class="mx-1 my-4 img-thumb"
                :class="[
                  active
                    ? 'lay-select'
                    : Math.abs(index - selectIndex) > 0
                    ? 'lay-disable'
                    : '',
                ]"
                :height="pxToRem(40)"
                :width="pxToRem(30)"
                aspect-ratio="30/40"
                :src="item.thumbName + `?${filterVer}`"
                @click="() => (selectIndex = index)"
              >
              </v-img>
            </v-slide-item>
            <div :style="{ width: `calc(50vw - ${pxToRem(19)})` }"></div>
          </v-slide-group>
          <span class="txt-select mb-4">{{
            `${selectIndex + 1}/${allCount}`
          }}</span>
        </v-layout>
      </v-slide-y-reverse-transition>
    </v-layout>
    <v-slide-y-reverse-transition>
      <c-footer v-if="!isMemoView" height="60" elevation="0" class="lay-footer">
        <v-spacer style="max-width: 40px" />
        <v-layout
          v-ripple
          column
          align-center
          justify-center
          class="lay-footer-menu"
          @click.prevent.stop="onClickActionSave"
        >
          <img src="@/assets/images/ic-download-w-24.svg" />
        </v-layout>
        <v-spacer />
        <v-layout
          v-ripple
          column
          align-center
          justify-center
          class="lay-footer-menu"
          @click.prevent.stop="onClickActionShare"
        >
          <img src="@/assets/images/ic-share-w-24.svg" />
        </v-layout>
        <v-spacer />
        <v-layout
          v-ripple
          column
          align-center
          justify-center
          class="lay-footer-menu"
          @click.prevent.stop="onClickActionLike"
        >
          <img
            :src="
              fileInfo && fileInfo.likeYn == 'Y'
                ? require('@/assets/images/ic-heart-w-on-24.svg')
                : require('@/assets/images/ic-heart-w-off-24.svg')
            "
          />
        </v-layout>
        <v-spacer />
        <v-layout
          v-ripple
          column
          align-center
          justify-center
          class="lay-footer-menu"
          @click.prevent.stop="onClickActionFilter"
        >
          <img src="@/assets/images/ic-filter-w.svg" />
        </v-layout>
        <v-spacer />
        <v-layout
          v-ripple
          column
          align-center
          justify-center
          class="lay-footer-menu"
          @click.prevent.stop="onClickActionDel"
        >
          <img src="@/assets/images/ic-trash-w-24.svg" />
        </v-layout>
        <v-spacer style="max-width: 40px" />
      </c-footer>
    </v-slide-y-reverse-transition>
  </lay-header>
</template>

<script>
import cFooter from "@/components/cFooter.vue";
import PinchZoom from "vue-pinch-zoom";

import MEDIA_LIST from "@/bridge/media/list";
import MEDIA_LIST_COLL from "@/bridge/media/collections";
import MEDIA_INFO from "@/bridge/media/info";
import MEDIA_LIKE from "@/bridge/media/like";
import MEDIA_MEMO from "@/bridge/media/memo";
import COLL_INFO from "@/bridge/collection/info";

export default {
  components: { cFooter, PinchZoom },
  props: ["seq", "logId", "collId"],
  data() {
    return {
      isGetingItems: false,
      fileInfo: null,
      pageNo: 1,
      allCount: 0,
      items: [],
      selectIndex: -1,
      ratio: null,
      deviceRatio: null,
      inputList: {
        title: {
          value: null,
        },
        memo: {
          value: null,
        },
      },

      isMemoView: false,
      tbHeight: 0,

      currentTime: 0,
      duration: 0,
      video: null,

      collInfo: null,

      touch: false,

      zoom: 1,
      scrollFlag: false, // 편집모드 전환전 스크롤시...
    };
  },
  computed: {
    slideMargin() {
      return `calc(50vw-${this.pxToRem(39)})`;
    },
    timePercent() {
      return (this.currentTime / this.duration) * 100;
    },
    isVideo() {
      return this.fileInfo.fileType == "VIDEO";
    },
    layoutRatio() {
      if (this.isMemoView) {
        if (this.isLandscape) {
          return this.deviceRatio * 0.5;
        } else {
          return this.deviceRatio / 0.45;
        }
      }
      return this.deviceRatio;
    },
    imgHeight() {
      if(this.ratio > this.layoutRatio) {
        // 가로로 긴이미지
        if(this.isMemoView && this.isLandscape) {
          return `100%`;
        } else {
          return `calc(100vw / ${this.ratio})`;
        }
      } else {
        // 세로로 긴이미지
        return '100%';
      }
    },
    memo() {
      return this.fileInfo.memo
        ? JSON.parse(this.fileInfo.memo.replace(/\n/g, "<br/>"))
        : {};
    },
  },
  watch: {
    scrollFlag() {
      if (this.scrollFlag) {
        document.querySelector(".lay-body").style.transition =  `unset`
      } else {
        document.querySelector(".lay-body").style.transition = `all .5s`
      }
      document.querySelector(".lay-body").style.transform = `translateY(0px)`
    },
    isMemoView() {
      if (this.zoom != 1) {
        this.$refs.pinch.toggleZoom();
      }
    },
    selectIndex(val) {
      this.isMemoView = false;
      this.currentTime = 0;
      if (!val) {
        this.selectIndex = 0;
      }
      // this.getData(this.items[val].mediaId);
      this.fileInfo = this.items[this.selectIndex];
      if (this.zoom != 1) {
        this.$refs.pinch.toggleZoom();
      }
    },
    fileInfo: {
      deep: true,
      handler(val) {
        if (val.memo) {
          var memo = JSON.parse(val.memo.replace(/\n/g, "\\n"));
          this.inputList.title.value = memo && memo.title ? memo.title : "";
          this.inputList.memo.value = memo && memo.memo ? memo.memo : "";
        } else {
          this.inputList.title.value = "";
          this.inputList.memo.value = "";
        }
      },
    },
    isLandscape() {
      this.deviceRatio = 1 / this.deviceRatio;
    },
    zoom() {
      if (this.zoom != 1) {
        this.touch = true;
      } else {
        this.touch = false;
      }
    },
  },
  created() {
    if (!this.seq) {
      this.showToast("no data", false, false);
      this.$router.go(-1);
    }
    this.nativeBridge.setStatusBarFontColor(false);
    this.nativeBridge.changeOrientation(4);
  },
  mounted() {
    this.getItems();
    this.$nextTick(async () => {

      await this.sleep(100);

      document.querySelector(".v-main").style.background = 'black'

      const option = {
        attributes: true,
        attributeFilter: ["style"],
      };

      // 미디어 확대/축소 관련
      const pinch = this.$el.querySelector(".pinch-zoom-content");
      const imgBody = this.$el.querySelector("#img-body");
      const observer2 = new MutationObserver((mutationRecords) => {
        this.zoom = this.$refs.pinch.getScale();
      });
      observer2.observe(pinch, option);
      imgBody.addEventListener("touchstart", (e) => {
        if (this.isMemoView) {
          // e.preventDefault();
          e.stopPropagation();
          // e.stopImmediatePropagation()
        }
      });
      imgBody.addEventListener("touchend", (e) => {
        if (this.isMemoView) {
          // e.preventDefault();
          e.stopPropagation();
          // e.stopImmediatePropagation()
        }
      });
      imgBody.addEventListener("touchmove", (e) => {
        if (this.isMemoView) {
          // e.preventDefault();
          e.stopPropagation();
          // e.stopImmediatePropagation()
        }
      });

      // 하단 미리보기 목록 영역
      const imgWidth = this.$el.querySelector(".img-thumb").offsetWidth + 8;
      const div = this.$el.querySelector(".v-slide-group__content");
      const observer = new MutationObserver((mutationRecords) => {
        if (this.isMemoView || this.isLandscape) {
          return;
        }
        var result = mutationRecords[0].target.style.transform.replace(
          /[^0-9\-\.]/g,
          ""
        );
        var index = 0;
        if (result < 0) {
          index = -Math.round(result / imgWidth);
        }
        if (index != this.selectIndex) {
          if (index > this.items.length - 1) {
            index = this.items.length - 1;
          }
          this.selectIndex = index;
        }
        if (mutationRecords[0].target.style.cssText.indexOf("transition") < 0) {
          mutationRecords[0].target.style.transform = index
            ? `translateX(-${imgWidth * index - 2}px)`
            : `translateX(0px)`;
        }
      });
      observer.observe(div, option);
    });
  },
  destroyed() {
    document.querySelector(".v-main").style.background = ''
    this.nativeBridge.setStatusBarFontColor(true);
    this.nativeBridge.changeOrientation(1);
  },
  methods: {
    onLoadImg() {
      this.ratio = this.$refs["img-pic"].naturalWidth / this.$refs["img-pic"].naturalHeight;
      this.deviceRatio = window.innerWidth / window.innerHeight;
    },
    checkNext() {
      if (this.items.length < this.allCount) {
        this.getItems(this.pageNo + 1);
      } else if (!this.fileInfo) {
        this.selectIndex = 0;
      }
    },
    async getData(mid) {
      if (this.isGetingItems) {
        return;
      }
      this.isGetingItems = true;
      await MEDIA_INFO.request(mid ? mid : this.seq)
        .then((data) => {
          this.isGetingItems = false;
          if (data.isSuccess) {
            this.fileInfo = data.data;
            this.items.splice(this.selectIndex, 1, data.data);
          } else {
            this.fileInfo = this.items[this.selectIndex];
          }
        })
        .catch(() => {
          this.isGetingItems = false;
          this.fileInfo = this.items[this.selectIndex];
        });
    },
    async getItems(page = 1) {
      if (this.isGetingItems) {
        return;
      }
      this.isGetingItems = true;
      var eq = [];
      if (this.logId) {
        eq.push({ key: "logId", val: this.logId });
        await MEDIA_LIST.request(page, 20, eq)
          .then((data) => {
            this.pageNo = page;
            if (page == 1) {
              this.items.splice(0, this.items.length);
            }
            this.allCount = data.allCount;
            this.items.push(...data.list);
            this.isGetingItems = false;

            if (!this.allCount) {
              this.$router.go(-1);
              return;
            }

            this.items.forEach((element) => {
              if (
                Number.parseInt(element.mediaId) ==
                Number.parseInt(
                  this.fileInfo ? this.fileInfo.mediaId : this.seq
                )
              ) {
                this.selectIndex = this.items.indexOf(element);
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
      } else if (this.collId) {
        eq.push({ key: "collectionId", val: this.collId });
        var res = await COLL_INFO.request(this.collId);
        if (res.isSuccess) {
          this.collInfo = res.data;
        }
        await MEDIA_LIST_COLL.request(page, 20, eq)
          .then((data) => {
            this.pageNo = page;
            if (page == 1) {
              this.items.splice(0, this.items.length);
            }
            this.allCount = data.allCount;
            this.items.push(...data.list);
            this.isGetingItems = false;

            this.items.forEach((element) => {
              if (
                Number.parseInt(element.mediaId) ==
                Number.parseInt(
                  this.fileInfo ? this.fileInfo.mediaId : this.seq
                )
              ) {
                this.selectIndex = this.items.indexOf(element);
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
      }
    },
    async onClickActionLike() {
      if (this.isGetingItems) {
        return;
      }
      this.isGetingItems = true;
      await MEDIA_LIKE.request(
        this.fileInfo.mediaId,
        this.fileInfo.likeYn == "Y" ? "N" : "Y"
      )
        .then((data) => {
          this.isGetingItems = false;
          if (data.isSuccess) {
            this.fileInfo.likeYn = this.fileInfo.likeYn == "Y" ? "N" : "Y";
          }
        })
        .catch(() => {
          this.isGetingItems = false;
        });
    },
    async onClickActionMemo() {
      if (this.isMemoView) {
        if (this.isGetingItems) {
          return;
        }
        this.isGetingItems = true;
        await MEDIA_MEMO.request(
          this.fileInfo.mediaId,
          this.inputList.title.value,
          this.inputList.memo.value
        );
        this.isGetingItems = false;
        this.getData(this.fileInfo.mediaId);
      }
      this.isMemoView = !this.isMemoView;
    },
    onClickActionSave() {
      if (this.isGetingItems) {
        return;
      }
      this.isGetingItems = true;
      window.callBack_fileDownload = (res) => {
        this.isGetingItems = false;
        if (res == "success") {
          this.showToast(this.$t("error.save-comp"));
        } else {
          this.showToast(this.$t("error.error"), false, false);
        }
        delete window.callBack_fileDownload;
      };
      this.nativeBridge.fileDownload([this.fileInfo], "callBack_fileDownload");
    },
    onClickActionShare() {
      this.nativeBridge.shareImage(this.fileInfo, null);
    },
    onClickActionFilter() {
      window.onFilterComplete = (res) => {
       if( this.isEditMode = false)
        if (res) {
          this.showToast(this.$t("error.filter-comp"), false, false);
          this.$store.commit("filterVer", this.filterVer + 1);
          this.getData(this.fileInfo.mediaId);
        }
        delete window.onFilterComplete;
      };
      this.nativeBridge.showFilterView([this.fileInfo], "onFilterComplete");
    },
    onClickActionDel() {
      this.showPopup({
        title: null,
        msg: this.$t("gallery.edit.delect-desc"),
        okTxt: this.$t("common.delete"),
        cancelTxt: this.$t("common.cancel"),
        okAction: () => {
  window.onDeleteComplete = () => {
    this.isEditMode = false;
    if (this.selectIndex < this.allCount - 1) {
      this.fileInfo = this.items[this.selectIndex + 1];
    } else {
      this.fileInfo = this.items[this.items.length - 1];
    }
    this.getItems();
    this.showToast(this.$t("error.del-comp"), false, false);
    delete window.onDeleteComplete;
    this.$router.go(-2); 
  };
  this.nativeBridge.fileDelete([this.fileInfo], "onDeleteComplete");
},

      });
    },

    // video
    loadedmetadata(e) {
      this.video = e.target;
      this.duration = e.target.duration;
      this.ratio = e.target.videoWidth / e.target.videoHeight;
      this.deviceRatio = window.innerWidth / window.innerHeight;
    },
    timeupdate(e) {
      this.currentTime = e.target.currentTime;
    },
    onChangeRange(e) {
      this.touch = false;
      this.currentTime = e.target.value;
      this.video.currentTime = this.currentTime;
    },
    onClickActionVideo() {
      if (this.video.paused) {
        this.video.play();
      } else {
        this.video.pause();
      }
    },

    onClickActionTouchMove(e) {
      if(e.touches.length > 1 || !this.scrollFlag || this.zoom != 1) {
        this.scrollFlag = false
        return
      }
      document.querySelector(".lay-body").style.transform =  `translateY(${e.touchmoveY - e.touchstartY}px)`
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/sass/app.scss";
.lay-bar {
  height: pxToRem(50px);
  padding: 0 pxToRem(20px);
  .img-back {
    width: pxToRem(24px);
    height: pxToRem(24px);
  }
  .txt-title {
    font-style: normal;
    font-weight: 700;
    font-size: pxToRem(16px);
    text-align: center;
    letter-spacing: -0.02em;
    color: #ffffff;
  }
  .ic-pencil {
    width: pxToRem(14px);
    height: pxToRem(14px);
  }
  .txt-memo {
    margin-left: pxToRem(6px);
    font-family: "PP Pangram Sans";
    font-style: normal;
    font-weight: 600;
    font-size: pxToRem(14px);
    letter-spacing: -0.022em;
    color: #ffffff;
  }
}
.lay-body {
  position: absolute;
  height: 100vh;
  width: 100vw;
  background: black;
  overflow: auto;
  .lay-memo-root {
    max-height: 50%;
    width: 100%;
    .input-title {
      font-family: "PP Pangram Sans";
      font-style: normal;
      font-weight: 400;
      font-size: 20px;
      line-height: 23px;
      letter-spacing: -0.022em;
      color: #ffffff;
    }
    .input-memo {
      font-family: "PP Pangram Sans";
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 26px;
      letter-spacing: -0.022em;
      color: #ffffff;
      margin-top: pxToRem(12px);
      &::v-deep textarea {
        color: #ffffff !important;
      }
    }
    ::v-deep ::placeholder {
      color: #353535 !important;
    }
    ::v-deep .v-input__slot {
      padding: 0 !important;
      background: unset !important;
    }
  }
  .lay-pic {
    flex: none;
    transition: all .5s;
    .img-pic {
      width: 100%;
      height: 100%;
      max-height: 50vh;
      object-fit: contain;
      &.lands {
        max-height: 100vh;
      }
    }
    .lay-memo-preview {
      height: pxToRem(110px);
      width: 100%;
      padding-top: pxToRem(32px);
      transition: all .5s;
      &.disable {
        height: 0;
        transition: all .5s;
        padding: 0;
      }
      span {
        font-family: "PP Pangram Sans";
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 26px;
        word-break: break-all;
        letter-spacing: -0.022em;
        &:first-of-type {
          font-size: 20px;
          line-height: 23px;
          color: rgba(255, 255, 255, 0.5);
        }
      }
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.5) 0%,
        rgba(255, 255, 255, 0.3) 40%,
        rgba(255, 255, 255, 0) 100%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
    }
  }
  .lay-list {
    position: absolute;
    bottom: pxToRem(60px);
    width: 100vw;
    flex: none;
    .txt-select {
      font-family: "PP Pangram Sans";
      font-style: normal;
      font-weight: 500;
      font-size: pxToRem(12px);
      line-height: pxToRem(14px);
      text-align: center;
      letter-spacing: -0.02em;
      color: #ffffff;
    }
    .img-thumb {
      border-radius: 2px;
      background: #e9e9e9;
      &.lay-select {
        border: 2px solid #ffffff;
      }
      &.lay-disable {
        opacity: 0.4;
      }
    }
  }

  // video
  .lay-controls {
    width: 100%;
    flex: none;
    &.lands {
      position: absolute;
      width: unset;
      height: pxToRem(48px);
      bottom: pxToRem(70px);
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(40px);
      border-radius: 8px;
      .input-range {
        flex: 1;
      }
      .img-btn {
        width: pxToRem(42px);
        height: pxToRem(42px);
      }
      .txt-duration-time {
        min-width: pxToRem(36px);
      }
    }
    .input-range {
      -webkit-appearance: none;
      appearance: none;
      height: 4px;
      background: #6e6e6e;
      outline: none;
      border-radius: 2px;
      cursor: pointer;
      transition: background 50ms ease-in;

      &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: #fff;
        cursor: pointer;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      }

      &:focus {
        outline: none;
      }

      &::-moz-range-thumb {
        -webkit-appearance: none;
        width: 10px;
        height: 10px;
        background: #6e6e6e;
        border: 1px solid #fff;
        border-radius: 50%;
        cursor: pointer;
      }
    }
    .lay-duration-time {
      margin-top: pxToRem(10px);
    }
    .txt-duration-time {
      font-family: "PP Pangram Sans";
      font-style: normal;
      font-weight: 500;
      font-size: 10px;
      line-height: 11px;
      letter-spacing: -0.022em;
      color: #ffffff;
      text-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    }
    .lay-btn {
      img {
        width: 42px;
        height: 42px;
        margin: 7px -5px 0;
      }
    }
  }
}
.lay-footer {
  background: rgba(0, 0, 0, 0.7);
  .lay-footer-menu {
    height: 100%;
    img {
      width: pxToRem(24px);
      height: pxToRem(24px);
    }
  }
}
</style>