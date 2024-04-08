<template>
  <lay-header :tBarColor="'#ffffff'" :isGetingItems="isGetingItems">
    <v-layout slot="bar-root" class="lay-header px-6 pb-6" column>
      <v-img class="img-bg" src="@/assets/images/bg-mypage.png" />
      <v-img class="img-bg" src="@/assets/images/bg-mypage-a.png" style="opacity: 0.25;"/>
    </v-layout>
    <v-layout column class="lay-body">
      <span class="txt-sub-title">{{ $t("mypage.record") }}</span>
      <v-layout class="flex-grow-0 lay-log">
        <v-layout class="flex-grow-0" column align-center justify-center>
          <span class="txt-cnt">{{ logCnt }}</span>
          <span class="txt-desc">{{ $t("mypage.total-log") }}</span>
        </v-layout>
        <v-layout class="flex-grow-0" column align-center justify-center>
          <span class="txt-cnt">{{ logTime }}</span>
          <span class="txt-desc">{{ $t("mypage.total-time") }}</span>
        </v-layout>
      </v-layout>
    </v-layout>
    <v-layout column class="lay-body">
      <span class="txt-sub-title mb-2">{{ $t("mypage.device.title") }}</span>
      <v-layout
        class="lay-device ml-n2"
        justify-space-between
        align-center
        @click.prevent.stop="() => onShowPopupAction(bPop)"
      >
        <template
          v-if="
            userInfo && userInfo.deviceInfo && userInfo.deviceInfo.serialNumber
          "
        >
          <img class="img-device" src="@/assets/images/img-device.png" />
          <v-layout column class="ml-2">
            <span class="txt-name">Universal Lite</span>
            <span class="txt-serial">{{
              userInfo.deviceInfo.serialNumber
            }}</span>
          </v-layout>
          <img class="ic-arr" src="@/assets/images/ic-arr-r-b.svg" />
        </template>
        <template v-else>
          <v-layout
            v-ripple
            class="lay-no-device py-3 px-6"
            @click.prevent.stop="() => pushRouter('scan')"
          >
            <img src="@/assets/images/ic-no-device.svg" />
            <v-layout column class="ml-6">
              <span class="txt-ask">{{ $t("mypage.device.no-device") }}</span>
              <span class="txt-sug mt-1">{{
                $t("mypage.device.no-device-desc")
              }}</span>
              <span class="txt-reg mt-2">{{
                $t("mypage.device.reg-device")
              }}</span>
            </v-layout>
          </v-layout>
        </template>
      </v-layout>
    </v-layout>
    <v-layout column class="lay-body">
      <span class="txt-sub-title mb-2">{{ $t("mypage.setting") }}</span>
      <c-set-list-item
        :value="'mypage.lang'"
        :onClick="() => onShowPopupAction(lPop)"
        :txtRight="'language'"
      />
      <c-set-list-item
        :value="'mypage.center.title'"
        :onClick="() => pushRouter({ name: 'service' })"
      />
      <c-set-list-item
        :value="'mypage.appinfo.title'"
        :onClick="() => pushRouter({ name: 'appinfo' })"
      />
    </v-layout>
    <v-bottom-sheet scrollable inset v-model="bPop.isShow">
      <p-device :onClose="() => onClosePopupAction(bPop)" />
    </v-bottom-sheet>
    <v-bottom-sheet inset v-model="lPop.isShow">
      <p-lang-change :onClose="() => onClosePopupAction(lPop)" />
    </v-bottom-sheet>
  </lay-header>
</template>

<script>
import pDevice from "@/popup/pDevice.vue";
import CSetListItem from "@/components/cSetListItem.vue";
import PLangChange from "@/popup/pLangChange.vue";
import MYPAGE_INFO from "@/bridge/mypage/info";
export default {
  components: { pDevice, CSetListItem, PLangChange },
  middleware: "auth",
  data() {
    return {
      bPop: {
        isShow: false,
        isCreate: false,
      },
      lPop: {
        isShow: false,
        isCreate: false,
      },
      isGetingItems: false,
      logCnt: 0,
      logTime: 0.0,
    };
  },
  watch: {},
  created() {},
  mounted() {
    this.getData();
  },
  activated() {},
  deactivated() {},
  destroyed() {},
  methods: {
    async getData() {
      if (this.isGetingItems) {
        return;
      }
      this.isGetingItems = true;
      await MYPAGE_INFO.request()
        .then((data) => {
          if (data.isSuccess) {
            this.logCnt = data.data.cnt;
            var hour = Math.floor(data.data.sum / 60 / 60);
            var minute = Math.floor((data.data.sum - hour * 60 * 60) / 60);
            this.logTime = `${hour}h ${minute}m`;
          }
          this.isGetingItems = false;
        })
        .catch(() => {
          this.isGetingItems = false;
        });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/sass/app.scss";
.lay-header {
  height: pxToRem(134px);
  .img-bg {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
  }
  .img-setting {
    width: pxToRem(20px);
    height: pxToRem(20px);
  }
  :not(.img-bg) {
    z-index: 1;
  }
  .img-profile {
    border: 2px solid #ffffff;
  }
  .lay-name {
    .txt-name {
      font-size: pxToRem(24px);
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: normal;
      text-align: left;
      color: #fff;
    }
    .txt-edit {
      margin-left: pxToRem(11px);
      font-style: normal;
      font-weight: 400;
      font-size: pxToRem(12px);
      line-height: pxToRem(15px);
      text-decoration-line: underline;
      color: #e6e6e6;
    }
  }
  .txt-info {
    font-style: normal;
    font-weight: 400;
    font-size: pxToRem(12px);
    line-height: pxToRem(14px);
    color: #ffffff;
    margin-top: pxToRem(2px);
  }
  .txt-join {
    font-style: normal;
    font-weight: 400;
    font-size: pxToRem(12px);
    line-height: pxToRem(15px);
    text-align: right;
    text-decoration-line: underline;
    color: #ffffff;
    align-self: end;
    padding: pxToRem(10px) 0;
  }
  .txt-login {
    font-style: normal;
    font-weight: 400;
    font-size: pxToRem(24px);
    line-height: pxToRem(27px);
    color: #ffffff;
    display: flex;
    align-items: center;
    width: fit-content;
    img {
      width: pxToRem(8px);
      height: pxToRem(14px);
      margin-left: pxToRem(10px);
    }
  }
}
.lay-body {
  border-top: pxToRem(8px) solid #ececec;
  padding: pxToRem(24px);
  flex: none;
  .txt-sub-title {
    font-style: normal;
    font-weight: 700;
    font-size: pxToRem(16px);
    line-height: pxToRem(20px);
    letter-spacing: -0.022em;
    color: #000000;
  }
  .lay-device {
    .img-device {
      width: pxToRem(96px);
      height: pxToRem(65px);
    }
    .txt-name {
      font-family: "PP Pangram Sans";
      font-style: normal;
      font-weight: 400;
      font-size: pxToRem(16px);
      line-height: pxToRem(18px);
      color: #000000;
    }
    .txt-serial {
      margin-top: pxToRem(3px);
      font-style: normal;
      font-weight: 400;
      font-size: pxToRem(12px);
      line-height: pxToRem(15px);
      letter-spacing: -0.022em;
      color: #949494;
    }
    .lay-no-device {
      background: rgba(21, 212, 224, 0.1);
      border-radius: pxToRem(8px);
      margin-top: pxToRem(6px);
      img {
        width: pxToRem(39px);
        height: pxToRem(39px);
      }
      .txt-ask {
        font-style: normal;
        font-weight: 700;
        font-size: pxToRem(13px);
        line-height: pxToRem(18px);
        letter-spacing: -0.01em;
        color: #495057;
      }
      .txt-sug {
        font-style: normal;
        font-weight: 400;
        font-size: pxToRem(12px);
        line-height: pxToRem(16px);
        letter-spacing: -0.01em;
        color: #495057;
      }
      .txt-reg {
        font-style: normal;
        font-weight: 400;
        font-size: pxToRem(12px);
        line-height: pxToRem(16px);
        letter-spacing: -0.01em;
        color: #198dfa;
      }
    }
  }
  .lay-log {
    padding-top: pxToRem(22px);
    .flex-grow-0 {
      padding-left: pxToRem(30px);
      &:first-of-type {
        border-right: 1px solid #dddddd;
        padding-right: pxToRem(30px);
        padding-left: 0;
      }
      .txt-cnt {
        font-family: "PP Pangram Sans";
        font-style: normal;
        font-weight: 400;
        font-size: pxToRem(26px);
        line-height: pxToRem(30px);
        text-align: center;
        letter-spacing: -0.022em;
        color: #000000;
      }
      .txt-desc {
        margin-top: pxToRem(5px);
        font-style: normal;
        font-weight: 400;
        font-size: pxToRem(14px);
        line-height: pxToRem(18px);
        text-align: center;
        color: #a4a4a4;
      }
    }
  }
}
</style>
