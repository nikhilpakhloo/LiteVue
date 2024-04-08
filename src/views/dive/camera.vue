<template>
  <lay-header :tBarColor="'#FFFFFF'" :txtTitle="$t('camera.title')">
    <v-layout column class="lay-body">
      <span class="txt-sub">{{ $t("camera.camera-setting") }}</span>
      <span class="txt-label">{{ $t("camera.resolution") }}</span>
      <v-layout class="lay-btn">
        <c-btn
          :height="38"
          :fontSize="15"
          :py="8"
          :px="8"
          :thema="resolution == 'FULLHD' ? 'default' : 'disable'"
          class="mr-4"
          :onClick="() => (resolution = 'FULLHD')"
          >FullHD</c-btn
        >
        <c-btn
          :height="38"
          :fontSize="15"
          :py="8"
          :px="8"
          :thema="resolution == '4K' ? 'default' : 'disable'"
          :onClick="() => (resolution = '4K')"
          >4K</c-btn
        >
      </v-layout>
      <span class="txt-label mt-6">{{ $t("camera.ratio") }}</span>
      <v-layout class="lay-btn">
        <c-btn
          v-for="(item, index) in ratios"
          :key="index"
          :height="48"
          :fontSize="15"
          :py="8"
          :px="8"
          :thema="ratio == index ? 'default' : 'disable'"
          :class="[index < ratios.length - 1 ? 'mr-1' : '']"
          :onClick="() => (ratio = index)"
        >
          <v-layout class="txt-btn" column
            >{{ item.value }}
            <span v-if="item.sub" class="txt-btn-sub pt-1">{{ item.sub }}</span>
          </v-layout>
        </c-btn>
      </v-layout>
    </v-layout>
    <!-- <v-layout column class="lay-body btm">
      <span class="txt-sub">{{ $t("camera.location-setting") }}</span>
      <v-layout class="lay-label" align-center>
        <span class="txt-label" ref="tooltip">{{
          $t("camera.location-send")
        }}</span>
        <v-tooltip
          top
          color="rgba(0, 0, 0, 0.85)"
          content-class="txt-tooltip"
          max-width="320"
          v-model="showTooltip"
        >
          <template v-slot:activator="{ on, attrs }">
            <img
              class="ic-sub"
              src="@/assets/images/ic-tooltip-g-16.svg"
              v-bind="attrs"
              v-on="on"
            />
          </template>
          <v-layout>
            <span>{{ $t("camera.location-tooltip") }} </span>
            <img
              class="img-arr"
              :style="{ left: `${tooltipWidth}px` }"
              src="@/assets/images/tooltip-angle.svg"
            />
            <img
              class="img-x"
              src="@/assets/images/ic-x-w-16.svg"
              @click.prevent.stop="() => (showTooltip = false)"
            />
          </v-layout>
        </v-tooltip>
        <v-spacer />
        <v-switch
          :ripple="false"
          hide-details
          color="#15D4E0"
          v-model="switchLoc"
          class="mr-n4 btn-switch"
          inset
          flat
          dense
        />
      </v-layout>
      <v-layout class="pt-2">
        <c-input
          :hint="$t('camera.location-hint')"
          style="flex: 1 !important"
          :value.sync="tel"
          :type="'number'"
        />
        <c-btn
          height="40"
          width="72"
          class="ml-2"
          style="width: auto; flex: none"
          :onClick="onClickActionContact"
          >{{ $t("camera.addr") }}</c-btn
        >
      </v-layout>
    </v-layout> -->
  </lay-header>
</template>

<script>
import CookieUtil from "@/plugins/CookieUtil";
export default {
  props: {
    onClose: {
      default: () => {},
    },
  },
  data() {
    return {
      showTooltip: false,
      rendered: false,
      ratio: null,
      resolution: "FULLHD",
      switchLoc: false,
      ratios: [
        {
          value: "16:10",
          sub: this.$t("camera.full-screen"),
        },
        {
          value: "16:9",
          sub: null,
        },
        {
          value: "4:3",
          sub: this.$t("camera.high-quality"),
        },
      ],
      tel: null,
    };
  },
  computed: {
    tooltipWidth() {
      if (this.rendered) {
        return this.$refs.tooltip ? this.$refs.tooltip.clientWidth - 5 : 52;
      } else {
        return 0;
      }
    },
  },
  watch: {
    ratio() {
      if (this.ratio != null) {
        CookieUtil.set(
          "PREF_CAMERA_SETTING_RATIO",
          this.ratios[this.ratio].value
        );
      }
    },
    resolution() {
      if (this.resolution != null) {
        CookieUtil.set("PREF_CAMERA_SETTING_RESOLUTION", this.resolution);
      }
    },
    switchLoc() {
      CookieUtil.set("PREF_CAMERA_SETTING_LOCATION", this.switchLoc);
    },
    tel() {
      CookieUtil.set("PREF_CAMERA_SETTING_TEL", this.tel);
    },
  },
  created() {
    this.getData();
    window.onGetContact = (value) => {
      this.tel = value;
    };
  },
  mounted() {
    this.$nextTick(async () => {
      if (!this.$refs.tooltip) {
        await this.sleep(100);
      }
      this.rendered = true;
    });
  },
  destroyed() {
    delete window.onGetContact;
  },
  methods: {
    async getData() {
      await CookieUtil.get("PREF_CAMERA_SETTING_RATIO").then((value) => {
        if (!value) {
          this.ratio = 0;
        } else {
          this.ratios.some((element, index) => {
            if (element.value == value) {
              this.ratio = index;
              return true;
            }
          });
        }
      });
      await CookieUtil.get("PREF_CAMERA_SETTING_RESOLUTION").then((value) => {
        if (!value) {
          this.resolution = "FULLHD";
        } else {
          this.resolution = value;
        }
      });
      await CookieUtil.get("PREF_CAMERA_SETTING_LOCATION").then((value) => {
        if (!value) {
          this.switchLoc = false;
        } else {
          this.switchLoc = value;
        }
      });
      this.tel = await CookieUtil.get("PREF_CAMERA_SETTING_TEL");
    },
    onClickActionContact() {
      this.nativeBridge.getContact("onGetContact");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/sass/app.scss";
.txt-tooltip {
  background: rgba(0, 0, 0, 0.85);
  border-radius: pxToRem(8px);
  padding: pxToRem(16px);
  opacity: 1 !important;
  margin: 0 pxToRem(20px);
  .img-arr {
    position: absolute;
    bottom: -10px;
    width: 15px;
    height: 10px;
    left: 30px;
  }
  .img-x {
    width: pxToRem(16px);
    height: pxToRem(16px);
    margin-right: -4px;
    margin-left: 20px;
  }
}
.lay-body {
  padding: pxToRem(2px) pxToRem(20px) pxToRem(50px);
  // border-bottom: 8px solid #f8f9fa;
  flex: none;
  &.btm {
    border-bottom: none;
    padding-top: pxToRem(35px);
  }
  .txt-sub {
    font-style: normal;
    font-weight: 700;
    font-size: pxToRem(18px);
    line-height: pxToRem(28px);
    letter-spacing: -0.02em;
    color: #000000;
    padding: pxToRem(15px) 0;
  }
  .lay-label {
    flex: none;
    .ic-sub {
      width: pxToRem(16px);
      height: pxToRem(16px);
      margin-left: pxToRem(6px);
    }
  }
  .txt-label {
    padding: pxToRem(15px) 0;
    font-style: normal;
    font-weight: 700;
    font-size: pxToRem(15px);
    color: #000000;
  }
  .lay-btn {
    flex: none;
    margin-top: pxToRem(10px);
    > div {
      flex: 1;
      width: auto;
      ::v-deep span {
        font-family: "PP Pangram Sans";
      }
    }
    .txt-btn {
      font-family: "PP Pangram Sans";
      font-style: normal;
      font-weight: 500;
      font-size: pxToRem(15px);
      line-height: pxToRem(17px);
      display: flex;
      align-items: center;
      text-align: center;
      .txt-btn-sub {
        font-family: "PP Pangram Sans";
        font-style: normal;
        font-weight: 500;
        font-size: pxToRem(10px);
        line-height: pxToRem(11px);
        display: flex;
        align-items: center;
        text-align: center;
        color: #858383;
        padding: 0;
      }
    }
  }
}
</style>
