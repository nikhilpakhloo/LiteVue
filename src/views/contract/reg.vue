<template>
  <lay-header
    :showBack="true"
    :tBarColor="'#FFFFFF'"
    :txtTitle="$t('mypage.center.contact.title')"
    :isGetingItems="isGetingItems"
  >
    <v-layout column class="pt-4 px-5 pb-6 lay-body">
      <span class="txt-desc" v-html="$t('mypage.center.contact.desc')" />
      <span class="txt-sub mt-5">{{
        $t("mypage.center.contact.label-title")
      }}</span>
      <c-input
        :hint="inputList.title.hint"
        :value.sync="inputList.title.value"
      />
      <span class="txt-sub mt-10">{{
        $t("mypage.center.contact.label-cont")
      }}</span>
      <v-textarea
        v-model="inputList.cont.value"
        rows="7"
        row-height="24"
        hide-details
        outlined
        no-resize
        :placeholder="inputList.cont.hint"
        maxlength="5000"
        class="mt-4 flex-grow-0"
        color="rgba(21, 212, 224, 0.3)"
      />
      <span class="align-self-end mt-2 txt-cnt">
        <span>{{ inputList.cont.value ? inputList.cont.value.length : 0 }}</span>/5000</span>
      <v-layout class="flex-grow-0">
        <img
          v-ripple
          src="@/assets/images/ic-attach-24.svg"
          class="ic-attach"
          @click.prevent.stop="onClickActionFile"
        />
        <v-layout row wrap class="lay-attach ml-2 mr-n2">
          <v-img
            v-for="(item, index) in uploadFiles"
            :key="index"
            :src="item.thumb"
            class="img-attach mr-2 mb-2"
            aspect-ratio="1"
            :max-width="pxToRem(64)"
            @click.prevent.stop="() => onClickActionRemove(item)"
          >
            <img src="@/assets/images/ic-circle-x.svg" class="ic-x" />
            <span class="txt-duration" v-if="item.type == 2">{{
              getDurationFormat(item.duration)
            }}</span>
          </v-img>
        </v-layout>
      </v-layout>
      <v-file-input
        v-model="files"
        ref="uploader"
        v-show="false"
        :multiple="true"
        @change="inputFileChange"
      />
      <span class="txt-file-sub mt-3 mb-2">
        {{ $t("mypage.center.contact.file-sub1") }}
        <br />
        {{ $t("mypage.center.contact.file-sub2") }}
      </span>
      <span class="txt-sub mt-6">{{
        $t("mypage.center.contact.label-tel")
      }}</span>
      <c-input :hint="inputList.name.hint" :value.sync="inputList.name.value" />
      <v-layout class="flex-grow-0 mt-2">
        <!-- <c-input
          class="input-loc"
          :hint="inputList.loc.hint"
          :value.sync="inputList.loc.value"
          type="tel"
        /> -->
        <c-input
          class="input-tel"
          :hint="inputList.tel.hint"
          :value.sync="inputList.tel.value"
          type="tel"
        />
      </v-layout>
    </v-layout>
    <c-footer height="86" class="lay-footer px-5 py-4" elevation="0">
      <c-btn :thema="'default-bg'" :onClick="onClickActionSubmit">
        {{ $t("common.submit") }}
      </c-btn>
    </c-footer>
  </lay-header>
</template>

<script>
import CFooter from "@/components/cFooter.vue";
import { api_file } from "@/utils/api_file";

export default {
  components: { CFooter },
  data() {
    return {
      isGetingItems: false,
      imgFiles: [],
      videoFiles: [],
      files: [],
      uploadFiles: [],
      emailCheck: false,
      inputList: {
        title: {
          value: null,
          hint: this.$t("mypage.center.contact.hint-title"),
          validation: () => {
            if (!this.inputList.title.value) {
              this.showToast(this.inputList.title.hint, false, false);
              return false;
            }
            return true;
          },
        },
        cont: {
          value: null,
          hint: "",
          validation: () => {
            if (!this.inputList.cont.value) {
              this.showToast(
                this.$t("mypage.center.contact.hint-cont"),
                false,
                false
              );
              return false;
            }
            return true;
          },
        },
        name: {
          value: null,
          hint: this.$t("mypage.center.contact.hint-name"),
          validation: () => {
            if (!this.inputList.name.value) {
              this.showToast(
                this.$t("mypage.center.contact.label-tel"),
                false,
                false
              );
              return false;
            }
            return true;
          },
        },
        loc: {
          value: null,
          hint: "+82",
        },
        tel: {
          value: null,
          hint: this.$t("mypage.center.contact.hint-tel"),
          validation: () => {
            if (!this.inputList.tel.value) {
              this.showToast(
                this.$t("mypage.center.contact.label-tel"),
                false,
                false
              );
              return false;
            }
            return true;
          },
        },
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  destroyed() {},
  methods: {
    onClickActionFile() {
      this.$refs.uploader.$refs.input.click();
    },
    getFileUrl(file) {
      return window.URL.createObjectURL(file);
    },
    async inputFileChange(val) {
      for await (const file of val) {
        // if (file.size > 10 * 1024 * 1024) {
        //   this.showToast("첨부파일은 최대 10MB의 용량제한이 있습니다.");
        //   return;
        // }
        var showErrToast = false;
        if (!this.uploadFiles.some((f) => f.oriFileName == file.name)) {
          var type = file.type.toLowerCase().startsWith("image")
            ? 1
            : file.type.toLowerCase().startsWith("video")
            ? 2
            : 3;
          if (type == 2) {
            await this.getDuration(file).then((val) => {
              if (val.duration > 60) {
                showErrToast = true;
              } else {
                let tFile = {
                  oriFileName: file.name,
                  fileSize: file.size,
                  type: type,
                  file: file,
                  duration: val.duration,
                  thumb: this.getFileUrl(val.coverImg),
                };
                this.videoFiles.push(tFile);
              }
            });
          } else {
            let tFile = {
              oriFileName: file.name,
              fileSize: file.size,
              type: type,
              file: file,
              thumb: this.getFileUrl(file),
            };
            this.imgFiles.push(tFile);
          }
        }
      }
      if (this.imgFiles.length > 5) {
        showErrToast = true;
        this.imgFiles.splice(0, this.imgFiles.length - 5);
      }
      if (this.videoFiles.length > 2) {
        showErrToast = true;
        this.videoFiles.splice(0, this.videoFiles.length - 2);
      }
      if (showErrToast) {
        this.showToast(
          this.$t("mypage.center.contact.file-sub2"),
          false,
          false
        );
      }
      this.uploadFiles.splice(0, this.uploadFiles.length);
      if (this.imgFiles.length) {
        this.uploadFiles.push(...this.imgFiles);
      }
      if (this.videoFiles.length) {
        this.uploadFiles.push(...this.videoFiles);
      }
    },
    getDuration(file) {
      return new Promise((resolve, reject) => {
        const videoPlayer = document.createElement("video");
        videoPlayer.setAttribute("crossOrigin", "anonymous");
        videoPlayer.setAttribute("src", this.getFileUrl(file));
        videoPlayer.load();
        videoPlayer.addEventListener("loadedmetadata", () => {
          var duration = videoPlayer.duration;
          setTimeout(() => {
            videoPlayer.currentTime = 0;
          }, 200);
          videoPlayer.addEventListener("seeked", () => {
            const canvas = document.createElement("canvas");
            canvas.width = videoPlayer.videoWidth;
            canvas.height = videoPlayer.videoHeight;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(videoPlayer, 0, 0, canvas.width, canvas.height);
            ctx.canvas.toBlob(
              (blob) => {
                var ret = {
                  duration: duration,
                  coverImg: blob,
                };
                resolve(ret);
              },
              "image/jpeg",
              0.75
            );
          });
        });
      });
    },
    onClickActionSubmit() {
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
      api_file
        .submit({
          url: "/qna/",
          method: "post",
          data: {
            title: this.inputList.title.value,
            content: this.inputList.cont.value,
            username: this.inputList.name.value,
            // tel: this.inputList.loc.value + " " + this.inputList.tel.value,
            tel: this.inputList.tel.value,
          },
          files: this.uploadFiles,
        })
        .then((data) => {
          this.isGetingItems = false;
          if (data && data.id) {
            this.showToast(this.$t("error.comp"), false, false);
            this.$router.go(-1);
          } else {
            this.showToast(data.msg, false, false);
          }
        })
        .catch((err) => {
          this.isGetingItems = false;
          this.showToast(err.msg, false, false);
        });
    },
    onClickActionRemove(item) {
      this.uploadFiles.splice(this.uploadFiles.indexOf(item), 1);
      if (item.type == 2) {
        this.videoFiles.splice(this.videoFiles.indexOf(item), 1);
      } else {
        this.imgFiles.splice(this.imgFiles.indexOf(item), 1);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/sass/app.scss";
.lay-body {
  .txt-desc {
    font-style: normal;
    font-weight: 400;
    font-size: pxToRem(13px);
    line-height: pxToRem(18px);
    letter-spacing: -0.01em;
    color: #15d4e0;
  }
  .txt-sub {
    font-style: normal;
    font-weight: 700;
    font-size: pxToRem(15px);
    line-height: pxToRem(20px);
    letter-spacing: -0.01em;
    color: #000000;
  }

  &::v-deep
    .v-text-field--outlined:not(.v-input--is-focused):not(.v-input--has-state)
    > .v-input__control
    > .v-input__slot
    fieldset {
    border-color: #dadada !important;
  }

  &::v-deep textarea {
    padding: 12px 0 !important;
    margin: 0 !important;
    font-weight: 400 !important;
    font-size: pxToRem(13px) !important;
    color: #212529 !important;
  }
  .txt-cnt {
    font-family: "PP Pangram Sans";
    font-style: normal;
    font-size: pxToRem(12px);
    line-height: pxToRem(16px);
    text-align: right;
    color: #adb5bd;
    font-weight: 500;
    span {
      font-weight: 500;
      font-family: inherit;
      color: #000000;
    }
  }
  .ic-attach {
    width: pxToRem(64px);
    height: pxToRem(64px);
    padding: pxToRem(20px);
    background: #ffffff;
    border: 1px solid #ced4da;
    border-radius: pxToRem(8px);
    margin-top: 2px;
  }
  .lay-attach {
    .img-attach {
      border-radius: pxToRem(8px);
      width: pxToRem(64px);
      height: pxToRem(64px);
      position: relative;
      .ic-x {
        width: pxToRem(20px);
        height: pxToRem(20px);
        position: absolute;
        top: pxToRem(4px);
        right: pxToRem(4px);
      }
      .txt-duration {
        position: absolute;
        left: pxToRem(4px);
        bottom: pxToRem(4px);
        font-family: "PP Pangram Sans";
        font-style: normal;
        font-weight: 400;
        font-size: pxToRem(11px);
        line-height: pxToRem(14px);
        color: #ffffff;
      }
    }
  }
  .txt-file-sub {
    font-style: normal;
    font-weight: 400;
    font-size: pxToRem(12px);
    line-height: pxToRem(16px);
    letter-spacing: -0.01em;
    color: #868e96;
  }
  .input-loc {
    flex-grow: 0 !important;
    flex-shrink: unset;
    margin-right: pxToRem(8px);
    min-width: pxToRem(68px);
    flex: 1;
  }
  .input-tel {
    flex: 1;
    flex-grow: 1 !important;
    flex-shrink: unset;
  }
}
.lay-footer {
  border-top: 1px solid #e9ecef;
}
</style>
