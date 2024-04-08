<template>
  <v-col cols="6" column>
    <v-layout
      column
      class="lay-coll"
      @click.prevent.stop="
        () => {
          onClick
            ? onClick()
            : !isEditMode
            ? pushRouter({ name: 'collList', params: { seq: seq } })
            : null;
        }
      "
    >
      <v-img
        :contain="isError"
        :class="[isError ? 'img-error' : '']"
        class="img-coll"
        :src="isError ? require('@/assets/images/ic-def-box.svg') : src"
        max-width="100%"
        :aspect-ratio="1"
        @error="
          (e) => {
            error = true;
          }
        "
      >
        <slot />
      </v-img>
      <span class="txt-coll">{{ name }}</span>
      <img
        v-if="isEditMode"
        class="ic-x"
        src="@/assets/images/ic-x-circle-b.svg"
        @click.prevent.stop="() => onShowPopupAction(pop)"
      />
    </v-layout>
    <v-dialog persistent v-model="pop.isShow" :width="pxToRem(322)">
      <p-del-coll
        :onCancel="() => onClosePopupAction(pop)"
        :onOk="onClickActionDel"
        :coll="name"
      />
    </v-dialog>
  </v-col>
</template>

<script>
import PDelColl from "@/popup/pDelColl.vue";
export default {
  components: { PDelColl },
  props: {
    seq: {
      default: null
    },
    onClick: {
      default: () => {},
    },
    onDel: {
      default: () => {},
    },
    src: {
      default: null,
    },
    name: {
      default: null,
    },
    select: {
      default: null,
    },
    isEditMode: {
      default: false,
    },
    empty: {
      default: false,
    },
  },
  data() {
    return {
      pop: {
        isCreate: false,
        isShow: false,
      },
      error: false,
    };
  },
  computed: {
    isError() {
      return !this.empty && (!this.src || this.error);
    },
  },
  watch: {},
  created() {},
  mounted() {},
  destroyed() {},
  methods: {
    onClickActionDel() {
      if (this.onDel) {
        this.onDel();
      }
      this.onClosePopupAction(this.pop);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/sass/app.scss";
.lay-coll {
  position: relative;
  .img-coll {
    border-radius: 8px;
    flex: none;
    &.img-error {
      background: #dee2e6;
      align-items: center;
      ::v-deep .v-image__image {
        background-size: 28%;
      }
    }
  }
  .txt-coll {
    flex: none;
    margin-top: pxToRem(12px);
    font-style: normal;
    font-weight: 400;
    font-size: pxToRem(15px);
    line-height: pxToRem(20px);
    letter-spacing: -0.01em;
    color: #000000;
  }
  .ic-x {
    width: pxToRem(24px);
    height: pxToRem(24px);
    position: absolute;
    top: pxToRem(-12px);
    right: pxToRem(-12px);
  }
}
</style>
