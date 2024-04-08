<template>
  <v-col
    cols="4"
    sm="3"
    md="2"
    class="lay-pic"
    :id="mediaId"
    @click.prevent.stop="
      () => {
        onClick
          ? onClick()
          : !editMode
          ? pushRouter({ name: 'media', params: { seq: mediaId } })
          : null;
      }
    "
      @touchmove="move"
  >
    <v-img
      max-width="100%"
      :aspect-ratio="1"
      :src="onError ? require('@/assets/images/ic-def-box.svg') : src"
      :class="{ 'img-empty': onError }"
      @error="() => (onError = true)"
    />
    <span class="txt-duration" v-if="isVideo">{{ duration }}</span>
    <v-layout class="lay-ic" align-center>
      <img v-if="isFilter" class="ic" src="@/assets/images/ic-filter.svg"/>
      <img v-if="isMemo" class="ic memo" src="@/assets/images/ic-pencil.svg"/>
      <img v-if="isLike" class="ic" src="@/assets/images/ic-heart-w.svg" />
    </v-layout>
    <v-layout align-center justify-center class="lay-check" v-if="editMode">
      <span v-if="select" class="txt-check rounded-circle">
        {{ select }}
      </span>
      <img v-else src="@/assets/images/ic-checkbox-off.svg" />
    </v-layout>
  </v-col>
</template>

<script>
export default {
  components: {},
  props: {
    mediaId: {
      default: null,
    },
    editMode: {
      default: false,
    },
    onClick: {
      default: () => {},
    },
    src: {
      default: null,
    },
    select: {
      default: null,
    },
    isVideo: {
      default: false,
    },
    duration: {
      default: null,
    },
    isLike: {
      default: false,
    },
    isMemo: {
      default: false,
    },
    isFilter: {
      default: false,
    },
  },
  data() {
    return {
      onError: false,
    };
  },
  computed: {},
  watch: {
    src: {
      immediate: true,
      deep: true,
      handler() {
        this.onError = false;
      },
    },
  },
  created() {},
  mounted() {},
  destroyed() {},
  methods: {
    move(e) {
      if (!this.editMode) {
        return
      }
      var ele = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY);
      if(ele.closest(".lay-pic").id != this.nowId) {
        this.nowId = ele.closest(".lay-pic").id
        ele.closest(".lay-pic").click()
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/sass/app.scss";
.lay-pic {
  position: relative;
  .img-empty {
    background: #eeeeee;
    align-items: center;
    ::v-deep .v-image__image {
      background-size: 30%;
    }
  }
  .gray-scale {
    filter: grayscale(100%);
  }
  .txt-cate {
    position: absolute;
    top: pxToRem(10px);
    left: pxToRem(10px);
    background: rgba(0, 0, 0, 0.6);
    border-radius: pxToRem(20px);
    padding: pxToRem(6px);
    font-family: "PP Pangram Sans";
    font-style: normal;
    font-weight: 500;
    font-size: pxToRem(10px);
    line-height: pxToRem(11px);
    letter-spacing: -0.022em;
    color: #ffffff;
  }
  .txt-duration {
    position: absolute;
    bottom: pxToRem(10px);
    left: pxToRem(10px);
    font-family: "PP Pangram Sans";
    font-style: normal;
    font-weight: 500;
    font-size: pxToRem(14px);
    line-height: pxToRem(16px);
    letter-spacing: -0.022em;
    color: #ffffff;
    text-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  }
  .lay-ic {
    position: absolute;
    bottom: pxToRem(10px);
    right: pxToRem(10px);
    .ic {
      width: pxToRem(16px);
      height: pxToRem(16px);
      margin-left: pxToRem(4px);
    }
    .memo {
      width: pxToRem(15px);
      height: pxToRem(15px);
    }
  }
  .lay-check {
    position: absolute;
    top: pxToRem(10px);
    right: pxToRem(10px);
    width: pxToRem(24px);
    height: pxToRem(24px);
    .txt-check {
      width: pxToRem(20px);
      height: pxToRem(20px);
      filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.25));
      font-family: "PP Pangram Sans";
      font-style: normal;
      font-weight: 400;
      font-size: pxToRem(12px);
      line-height: pxToRem(21px);
      text-align: center;
      letter-spacing: -0.022em;
      color: #ffffff;
      background: #000000;
      border: none;
    }
  }
}
</style>
