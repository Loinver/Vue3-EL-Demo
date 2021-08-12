<template>
  <div class="container">
    <div id="container"></div>
    <!--宽高自行设定 -->
  </div>
</template>
<script>
import * as monaco from 'monaco-editor';
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    let editor;
    let initEditor = () => {
      editor = monaco.editor.create(document.getElementById('container'), {
        value: `<template>
  <div class="container">
    <div id="container"></div>
    <!--宽高自行设定 -->
  </div>
</template>
<style lang="scss" scoped>
.container {
  flex-grow: 1;
}
#container {
  height: 30vh;
}
</style>`, //编辑器初始显示文字
        language: 'html', //语言支持自行查阅demo
        automaticLayout: true, //自动布局
        theme: 'vs-dark', //官方自带三种主题vs, hc-black, or vs-dark
      });
    };
    const getValue = () => {
      editor.getValue(); //获取编辑器中的文本
    };
    return {
      initEditor,
      getValue,
    };
  },
  mounted() {
    this.initEditor();
  },
});
</script>
<style lang="scss" scoped>
.container {
  flex-grow: 1;
}
#container {
  height: 100vh;
}
</style>
