<template>
  <v-layout column class="py-16 px-4">
    <v-layout column class="flex-grow-0 border">
      <strong>sqlite</strong>
      <span>cmd</span>
      <v-textarea rows="1" auto-grow v-model="txtCmd"></v-textarea>
      <span>query</span>
      <v-textarea rows="1" auto-grow v-model="txtQuery"></v-textarea>
      <c-btn :onClick="onClickAction">전송</c-btn>
      <v-layout style="word-break: break-all;">{{ callback1 }}</v-layout>
    </v-layout>
    <v-layout column class="flex-grow-0 border mt-16">
      <strong>common</strong>
      <span>nativeBridge Key</span>
      <v-textarea rows="1" auto-grow v-model="key"></v-textarea>
      <span>nativeBridge Data</span>
      <v-textarea rows="1" auto-grow v-model="data"></v-textarea>
      <c-btn :onClick="onClickActionComm">전송</c-btn>
      <v-layout style="word-break: break-all;">{{ callback2 }}</v-layout>
    </v-layout>
    <!-- src="file:///data/user/0/com.diveroid.lite/files/mermaid.jpg" -->

    <v-layout column class="flex-grow-0 border mt-16">
      <strong>이미지 테스트</strong>
      <span>이미지 URI 입력(uri 입력시 하단에 이미지 표시됩니다.)</span>
      <v-textarea rows="1" auto-grow v-model="uri"></v-textarea>
      <img :src="uri" width="100%" />
    </v-layout>
  </v-layout>
</template>
<script>
export default {
  data() {
    return {
      txtCmd: "selectQuery",
      txtQuery: null,
      callback1: null,
      callback2: null,

      uri: "file:///data/user/0/com.diveroid.lite/files/mermaid.jpg",
      key: null,
      data: null,
    };
  },
  methods: {
    onClickAction() {
      window.callback = (value) => {
        this.callback1 = value;
        this.showPopup({
          title: "결과",
          msg: value,
          cancelTxt: $t("common.close"),
        });
        delete window.callback;
      };
      this.nativeBridge.sqlite(
        JSON.stringify({ cmd: this.txtCmd, query: this.txtQuery }),
        "callback"
      );
    },
    onClickActionComm() {
      window.callback = (value) => {
        this.callback2 = value;

        this.showPopup({
          title: "결과",
          msg: value,
          cancelTxt: $t("common.close")
        });
        delete window.callback;
      };
      this.nativeBridge.test(this.key, this.data, "callback");
    },
  },
};
</script>
