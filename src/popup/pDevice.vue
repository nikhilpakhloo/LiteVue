<template>
  <v-layout column class="pt-8 pb-12 px-6 popup-root">
    <v-layout justify-center align-center class="lay-title mb-4">
      <span class="txt-title">{{ $t("mypage.device.title") }}</span>
      <span class="txt-remove" @click.prevent.stop="onClickActionRemove">{{
        $t("mypage.device.disconnect")
      }}</span>
    </v-layout>
    <v-layout column align-center>
      <v-img
        class="img-device flex-grow-0"
        contain
        src="@/assets/images/img-device.png"
        max-width="90%"
        min-width="50%"
        :aspect-ratio="170 / 115"
      />
      <span class="txt-name">Universal Lite</span>
      <span class="txt-info mt-2"
        >Serial No.:
        <span class="txt-serial">{{
          checkDevice ? userInfo.deviceInfo.serialNumber : ""
        }}</span></span
      >
      <span class="txt-info"
        >{{ $t("mypage.device.period") }} :
        {{
          checkDevice
            ? getDateFormat(userInfo.deviceInfo.warrantyStartTime) +
              " ~ " +
              getDateFormat(userInfo.deviceInfo.warrantyEndTime)
            : ""
        }}</span
      >
      <v-layout class="lay-descs mt-8 pb-6" column>
        <span v-html="replaceLnToBr($t('mypage.device.serial-desc1'))" />
        <span v-html="replaceLnToBr($t('mypage.device.serial-desc2'))" />
        <span v-html="replaceLnToBr($t('mypage.device.serial-desc3'))" />
      </v-layout>
    </v-layout>
    <c-btn
      class="mt-6"
      thema="default-bg"
      height="48"
      fontSize="16"
      :onClick="() => (onClose ? onClose() : null)"
      >{{ $t("common.ok") }}</c-btn
    >
  </v-layout>
</template>

<script>
export default {
  props: {
    onClose: {
      default: () => {},
    },
  },
  data() {
    return {};
  },
  computed: {
    checkDevice() {
      return (
        this.userInfo &&
        this.userInfo.deviceInfo &&
        this.userInfo.deviceInfo.serialNumber
      );
    },
  },
  watch: {},
  created() {},
  mounted() {},
  destroyed() {},
  methods: {
    onClickActionRemove() {
      this.showPopup({
        title: this.$t("mypage.device.delete.title"),
        msg: this.$t("mypage.device.delete.cont"),
        okTxt: this.$t("mypage.device.delete.btn"),
        cancelTxt: this.$t("common.cancel"),
        okAction: () => {
          this.api({
            url: "/device/delete",
            method: "post",
            data: {},
          })
            .then((data) => {
              this.$store.dispatch("fetchData").then(() => {
                this.showToast(this.$t("common.disconnect"), true, false);
                if (this.onClose) {
                  this.onClose();
                }
              });
            })
            .catch((err) => {
              this.showToast(err.msg, false, false);
            });
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/sass/app.scss";

.popup-root {
  border-radius: pxToRem(20px) pxToRem(20px) 0 0;
  box-shadow: 0px pxToRem(6px) pxToRem(20px) rgba(8, 16, 30, 0.14);
  background-color: #fff;
  overflow-y: auto;

  .lay-title {
    position: relative;
    width: 100%;

    .txt-title {
      font-style: normal;
      font-weight: 700;
      font-size: pxToRem(20px);
      line-height: pxToRem(25px);
      text-align: center;
      color: #000000;
    }

    .txt-remove {
      position: absolute;
      font-style: normal;
      font-weight: 400;
      font-size: pxToRem(12px);
      line-height: pxToRem(15px);
      text-align: right;
      text-decoration-line: underline;
      color: #888888;
      right: 0;
    }
  }

  .txt-name {
    font-family: "PP Pangram Sans";
    font-style: normal;
    font-weight: 400;
    font-size: pxToRem(18px);
    line-height: pxToRem(21px);
    text-align: center;
    color: #000000;
  }

  .txt-info {
    font-style: normal;
    font-weight: 400;
    font-size: pxToRem(14px);
    line-height: pxToRem(20px);
    text-align: center;
    letter-spacing: -0.022em;
    color: #949494;

    .txt-serial {
      color: #444444;
    }
  }

  .lay-descs {
    width: 100%;

    span {
      // &::marker {
      // content: '•';
      // margin-right: 6px;
      // }
      margin-left: pxToRem(20px);
      font-style: normal;
      font-weight: 400;
      font-size: pxToRem(13px);
      line-height: pxToRem(20px);
      display: list-item;
      letter-spacing: -0.022em;
      color: #000000;
    }
  }
}
</style>
