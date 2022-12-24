<template>
  <div class="flex justify-content-center min-w-full">
    <div id="app-container" class="m-4 flex-grow-1">
      <div class="flex flex-row flex-wrap justify-content-between">
        <Logo />
        <SocialLinks />
      </div>

      <div :class="store.btnWrapper">
        <Button
          :label="store.isJapanese ? howToBtn.labelJP : howToBtn.labelEN"
          @click="fireHowTo()"
          :class="store.btnClass"
        />
        <Button
          :label="store.isJapanese ? keywordBtn.labelJP : keywordBtn.labelEN"
          :finderTitle="keywordBtn.label"
          :icon="keywordBtn.icon"
          @click="openDialog('Keyword')"
          :class="store.btnClass"
        />
        <Button
          v-show="store.isJapanese"
          :label="store.isJapanese ? articleBtn.labelJP : articleBtn.labelEN"
          :finderTitle="articleBtn.label"
          :icon="articleBtn.icon"
          @click="openDialog('Article')"
          :class="store.btnClass"
        />
        <Button
          :label="store.isJapanese ? historyBtn.labelJP : historyBtn.labelEN"
          :finderTitle="historyBtn.label"
          :icon="historyBtn.icon"
          :disabled="historyData.length == 0"
          @click="openDialog('History')"
          :class="[
            { 'jello-horizontal': historyData.length > 0 },
            store.btnClass,
          ]"
        />
      </div>

      <Dialog
        v-model:visible="isShowDialog"
        id="app-container"
        position="top"
        :style="{ width: '100vw' }"
        :closable="false"
        :showHeader="true"
        :draggable="false"
      >
        <template #header>
          <div
            class="min-w-full flex justify-content-between align-content-center"
          >
            <div v-if="isShowKeyword" class="flex align-items-center">
              {{ store.isJapanese ? keywordBtn.labelJP : keywordBtn.labelEN }}
            </div>
            <div v-if="isShowArticle" class="flex align-items-center">
              {{ store.isJapanese ? articleBtn.labelJP : articleBtn.labelEN }}
            </div>
            <div v-if="isShowHistory" class="flex align-items-center">
              {{ store.isJapanese ? historyBtn.labelJP : historyBtn.labelEN }}
            </div>

            <Button
              icon="pi pi-times"
              @click="closeDialog"
              class="cursor-pointer flex align-items-center p-button-sm p-button-secondary"
            />
          </div>
        </template>

        <KeywordFinder v-if="isShowKeyword" @emitCopy="emitSearchPaste" />

        <ArticleFinder v-if="isShowArticle" @emitURL="emitJumpToURL"/>
        <HistoryFinder v-if="isShowHistory" @emitCopy="emitPaste" />
      </Dialog>

      <div class="min-w-full max-h-18rem pb-2">
        {{ store.isJapanese ? mainMsg.msg : mainMsg.msgEn }}
      </div>

      <div class="flex">
        <!-- User Input  -->
        <Textarea
          id="text-area"
          v-model="consoleValue"
          v-show="!isExecuted"
          :autoResize="true"
          class="min-w-full max-h-18rem"
        />

        <!-- Result with HighlightJS  -->
        <div
          v-show="isExecuted"
          class="min-w-full max-h-18rem highlight-container"
        >
          <pre class="flex" @click="bounceClearBtn()">
            <code class="language-javascript hljs" >{{ consoleValue }}</code>
          </pre>
        </div>
      </div>

      <div :class="store.btnWrapper">
        <Button
          :label="store.isJapanese ? '実行' : 'Run'"
          @click="consoleHandler"
          icon="pi pi-caret-right"
          class="p-button-info"
          :class="[{ 'jello-horizontal': consoleValue }, store.btnClass]"
          :disabled="!consoleValue || isExecuted"
        />
        <Button
          :label="store.isJapanese ? 'クリア' : 'Clear Input'"
          @click.prevent="resetCommand"
          icon="pi pi-eraser"
          class="p-button-warning"
          :class="[
            {
              'jello-horizontal': isExecuted,
            },
            { 'jello-diagonal-1': isClickedInput },
            store.btnClass,
          ]"
          :disabled="!consoleValue"
        />
      </div>

      <div class="flex">
        <pre class="min-w-full console-container flex">
          <code class="language-javascript hljs" :class="{ 'text-focus-in': isExecuted }" v-html="consoleRes"></code>
        </pre>
      </div>
    </div>
  </div>
</template>

<script setup>
// VueAPIs
import { reactive, ref, onMounted } from "vue";
// Pinia
import { useStore } from "@/store/store.js";
// Components
import Logo from "@/components/header/Logo.vue";
import SocialLinks from "@/components/header/SocialLinks.vue";
import KeywordFinder from "@/components/finder/KeywordFinder.vue";
import ArticleFinder from "@/components/finder/ArticleFinder.vue";
import HistoryFinder from "@/components/finder/HistoryFinder.vue";

// import hljs from 'highlight.js';
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
hljs.registerLanguage("javascript", javascript);

// WelcomeMsg
const mainMsg = reactive({
  msg: "console.log()を使ってみよう！",
  msgEn: "Try using the console.log()",
});

// Pinia
const store = useStore();
const keywordData = store.keywordData;
const articleData = store.articleData;
const historyData = store.historyData;

// ButtonProps
const howToBtn = {
  labelJP: "使い方",
  labelEN: "How to",
};
const keywordBtn = {
  labelJP: "検索",
  labelEN: "Search",
  icon: "pi pi-search",
};
const articleBtn = {
  labelJP: "記事",
  labelEN: "Articles",
  icon: "pi pi-book",
};
const historyBtn = {
  labelJP: "履歴",
  labelEN: "History",
  icon: "pi pi-database",
};

// END Pinia

// Btn Class

// Modal Related
const isShowKeyword = ref(false);
const isShowArticle = ref(false);
const isShowHistory = ref(false);

const isShowDialog = ref(false);

const openDialog = (finder) => {
  isShowKeyword.value = false;
  isShowArticle.value = false;
  isShowHistory.value = false;
  switch (finder) {
    case "Keyword":
      isShowKeyword.value = true;
      break;
    case "Article":
      isShowArticle.value = true;
      break;
    case "History":
      isShowHistory.value = true;
      break;
  }
  isShowDialog.value = true;
};

const closeDialog = () => {
  isShowKeyword.value = false;
  isShowArticle.value = false;
  isShowHistory.value = false;
  isShowDialog.value = false;
};
// END Modal Related

// コンソール関係

const consoleValue = ref(null);
const isExecuted = ref(false);
const consoleRes = ref("");

onMounted(() => {
  if (!console) {
    console = {};
  }
  var old = console.log;
});

const consoleHandler = () => {
  try {
    // consoleRes.value = eval(consoleValue.value);
    eval(consoleValue.value);
    // Any console.log value will return in the consoleRes.value
  } catch (e) {
    consoleRes.value = e.message;
  }
  createHistoryData(consoleValue.value);
  isExecuted.value = true;
  hljs.highlightAll();
};

(function () {
  console.log = function (message) {
    if (typeof message == "object") {
      consoleRes.value +=
        (JSON && JSON.stringify ? JSON.stringify(message) : String(message)) +
        "<br />";
    } else {
      consoleRes.value += message + "<br />";
    }
  };
})(consoleRes.value);

const createHistoryData = (command) => {
  let obj = {
    id: historyData.length + 1,
    command: command,
  };
  historyData.unshift(obj);
  historyData.length >= 11 ? historyData.pop() : "";
};

const emitPaste = (command) => {
  resetCommand();
  consoleValue.value = command;
  closeDialog();
  mainMsg.msg = "履歴からもう一度試しましょう";
  mainMsg.msgEn = "Pasted from the history";
};

const emitSearchPaste = (data) => {
  resetCommand();
  consoleValue.value = data.command;
  mainMsg.msg = data.title;
  mainMsg.msgEn = data.title_en;
  closeDialog();
};

const emitJumpToURL = (url) => {
  closeDialog();
  window.open(url);
};

const resetCommand = () => {
  consoleValue.value = null;
  isExecuted.value = false;
  isClickedInput.value = false;
  consoleRes.value = "";
  mainMsg.msg = "もっと挑戦してみよう!";
  mainMsg.msgEn = "Let's try!";
};

// End コンソール関係

// Animation
const isClickedInput = ref(false);
const bounceClearBtn = () => {
  isClickedInput.value = true;
};

// How to
const setConsole = () => {
  consoleValue.value = `
  //コードを実行したあとにconsole.log()の結果が表示されます。
  console.log('My first code');
  console.log(13 + 4);

  let app = "JS hiroba";
  console.log("ようこそ、" + app + "へ!");

  //↓実行ボタンを押してください。
  `;
};

const setConsoleEn = () => {
  consoleValue.value = `
  //You can see the console.log() response after executing the code
  console.log('My first code');
  console.log(13 + 4);

  let app = "JS hiroba";
  console.log("Welcome to " + app + "!!");

  //↓Click RUN button to execute
  `;
};

const fireHowTo = () => {
  resetCommand();
  store.isJapanese ? setConsole() : setConsoleEn();
};
</script>

<style>
#app-container {
  max-width: 960px;
}

#text-area {
  font-family: "M PLUS Rounded 1c", sans-serif;
  min-height: 200px;
}

.highlight-container {
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  /* background-color: #20262e; */
  background-color: #121212;
  border: 1px solid #3f4b5b;
  transition: background-color 0.15s, border-color 0.15s, box-shadow 0.15s;
  appearance: none;
  border-radius: 4px;
  min-height: 200px;
}

.console-container {
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  /* background-color: #20262e; */
  background-color: #121212;
  border: 1px solid #3f4b5b;
  transition: background-color 0.15s, border-color 0.15s, box-shadow 0.15s;
  appearance: none;
  border-radius: 4px;
  min-height: 120px;
}
</style>
