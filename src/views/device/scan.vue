<template>
  <lay-header
    :showBack="true"
    :tBarColor="'#FFFFFF'"
    :isGetingItems="isGetingItems"
    :txtRight="step < 3 && routerName ? 'Skip' : null"
    :onRight="
      () => {
        $router.replace(routerName);
      }
    "
  >
    <v-layout column class="lay-body">
      <!-- <span class="txt-step">{{ step }} / 3</span> -->
      <span class="txt-desc mt-2" v-if="step < 3">{{
        $t("scan.check-number")
      }}</span>
      <span class="txt-desc mt-2" v-else>{{ $t("scan.complete") }}</span>
      <template v-if="step < 3">
        <span class="txt-sub mt-3" v-if="step < 3">
          {{
            inputList.serial.value == null
              ? $t("scan.do-scan")
              : $t("scan.check-scan")
          }}
        </span>
        <v-img
          class="flex-grow-0 mt-10 rounded-lg"
          contain
          src="@/assets/images/img-serial-box-3type.png"
          max-width="100%"
          :aspect-ratio="350 / 200"
        />
        <c-btn
          :onClick="getSerialNumber"
          :fontWeight="700"
          :height="54"
          :fontSize="16"
          class="mt-3 btn-scan"
        >
          <img class="img-scan" :src="require('@/assets/images/ic-scan.svg')" />
          {{ $t("scan.btn-scan") }}
        </c-btn>
        <v-text-field
          v-model="inputList.serial.value"
          :placeholder="$t('scan.hint')"
          filled
          rounded
          dense
          class="txt-serial mt-3"
          :height="pxToRem(54)"
        ></v-text-field>
        <v-spacer />
      </template>
      <v-layout
        v-else
        column
        justify-center
        align-center
        class="flex-grow-1 pt-2 pb-16"
      >
        <v-img
          class="img-device flex-grow-0"
          contain
          src="@/assets/images/img-device-b.png"
          max-width="90%"
          min-width="50%"
          :aspect-ratio="278 / 189"
        />
        <span class="txt-device-name">Universal Lite</span>
        <span class="txt-device-servial">{{ inputList.serial.value }}</span>
      </v-layout>
      <c-btn
        :onClick="
          () => {
            step == 3 ? pushRouter('main') : onClickRegDivice();
          }
        "
        :fontWeight="700"
        :height="54"
        :fontSize="16"
        :thema="'default-bg'"
        class="mt-3 btn-scan"
      >
        {{ step == 3 ? $t("scan.btn-gohome") : $t("scan.btn-next") }}
      </c-btn>
    </v-layout>
  </lay-header>
</template>

<script>
export default {
  components: { },
  middleware: "auth",
  data() {
    return {
      //임시 디바이스아이디
      routerName: "main",
      isGetingItems: false,
      inputList: {
        serial: {
          value: null,
          errMsg: "",
          validation: () => {
            return this.checkSerial();
          },
        },
      },
      step: 1,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  destroyed() {},
  methods: {
    async onClickRegDivice() {
      for (let key in this.inputList) {
        if (this.inputList[key].validation) {
          if (!this.inputList[key].validation()) {
            return false;
          }
        }
      }
      if (this.isGetingItems) {
        return;
      }
      this.isGetingItems = true;
      this.api({
        url: "/device/",
        method: "post",
        data: {
          loginId: this.userInfo.loginId,
          serialNumber: this.inputList.serial.value,
        },
        noPop: true,
      })
        .then((data) => {
          this.inputList.serial.value = data.serialNumber;
          this.step = 3;
          this.$store.dispatch("fetchData").then(() => {
            this.isGetingItems = false;
          });
        })
        .catch((err) => {
          this.showToast(err.msg);
          this.isGetingItems = false;
        });
    },
    checkSerial() {
      if (!this.inputList.serial.value) {
        this.showToast(this.$t("scan.hint"));
        return false;
      }
      return true;
    },
    getSerialNumber() {
      this.step = 2;
      window.getSerialNumber_callback = (res) => {
        this.inputList.serial.value = res
        delete window.getSerialNumber_callback;
      };
      this.nativeBridge.getSerialNumber("getSerialNumber_callback");
    },
  },
  beforeRouteEnter(to, from, next) {
    if (from.name == "mypage") {
      next((vm) => {
        vm.routerName = null;
      });
    } else {
      next();
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/sass/app.scss";
.lay-body {
  padding: pxToRem(40px) pxToRem(20px) pxToRem(20px);
  .txt-step {
    font-style: normal;
    font-weight: 400;
    font-size: pxToRem(18px);
    line-height: pxToRem(28px);
    letter-spacing: -0.02em;
    color: #000000;
  }
  .txt-desc {
    font-style: normal;
    font-weight: 700;
    font-size: pxToRem(24px);
    line-height: pxToRem(32px);
    letter-spacing: -0.01em;
    color: #000000;
  }
  .txt-sub {
    font-style: normal;
    font-weight: 400;
    font-size: pxToRem(15px);
    line-height: pxToRem(20px);
    letter-spacing: -0.01em;
    color: #495057;
  }
  .txt-serial {
    border-radius: pxToRem(8px);
    font-style: normal;
    font-weight: 400;
    font-size: pxToRem(24px);
    line-height: pxToRem(32px);
    letter-spacing: -0.01em;
    color: #000000;
    ::v-deep input {
      text-align: center;
    }
  }
  .img-device {
    width: pxToRem(233px);
  }
  .txt-device-name {
    font-family: "PP Pangram Sans";
    font-style: normal;
    font-weight: 400;
    font-size: pxToRem(18px);
    line-height: pxToRem(28px);
    text-align: center;
    color: #000000;
    margin-top: 2px;
  }
  .txt-device-servial {
    font-family: "PP Pangram Sans";
    font-style: normal;
    font-weight: 500;
    font-size: pxToRem(15px);
    line-height: pxToRem(20px);
    text-align: center;
    color: #868e96;
    margin-top: 2px;
  }
  .btn-scan {
    position: relative;
    .img-scan {
      position: absolute;
      left: pxToRem(16px);
      width: pxToRem(32px);
      height: pxToRem(32px);
    }
  }
}
</style>
