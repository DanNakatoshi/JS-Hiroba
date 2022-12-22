<template>
  <div class="flex justify-content-center min-w-full" >
    <div id="app-container" class="m-4 flex-grow-1">
      <div class="flex flex-wrap card-container justify-content-between my-3">
        <Logo />
        <SocialLinks />
      </div>

      <Message class="my-4" />
      <div
        class="flex flex-wrap card-container ustify-content-start gap-2 mb-2 mt-2"
      >
        <Button
          :label="keywordBtn.label"
          :finderTitle="keywordBtn.label"
          :icon="keywordBtn.icon"
          @click="openDialog('Keyword')"
          class="cursor-pointer px-3"
        />
        <Button
          :label="articleBtn.label"
          :finderTitle="articleBtn.label"
          :icon="articleBtn.icon"
          @click="openDialog('Article')"
          class="cursor-pointer px-3"
        />
        <Button
          :label="historyBtn.label"
          :finderTitle="historyBtn.label"
          :icon="historyBtn.icon"
          :disabled="historyData.length == 0"
          @click="openDialog('History')"
          :class="{ 'jello-horizontal': historyData.length > 0 }"
          class="cursor-pointer px-3"
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
              {{ keywordBtn.label }}
            </div>
            <div v-if="isShowArticle" class="flex align-items-center">
              {{ articleBtn.label }}
            </div>
            <div v-if="isShowHistory" class="flex align-items-center">
              {{ historyBtn.label }}
            </div>

            <Button
              icon="pi pi-times"
              @click="closeDialog"
              class="cursor-pointer flex align-items-center p-button-sm p-button-secondary"
            />
          </div>
        </template>

        <KeywordFinder v-if="isShowKeyword" @emitCopy="emitPaste" />

        <ArticleFinder v-if="isShowArticle" />
        <HistoryFinder v-if="isShowHistory" @emitCopy="emitPaste" />
      </Dialog>

      <div class="flex">
        <Textarea
          id="text-area"
          v-model="consoleValue"
          v-show="!isExecuted"
          :autoResize="true"
          class="min-w-full max-h-18rem"
        />
        <pre
          v-show="isExecuted"
          class="min-w-full max-h-18rem highlight-container"
          @click="bounceClearBtn()"
        >
          <code class="language-javascript hljs">{{ consoleValue }}</code>
        </pre>
      </div>
      <div class="mt-2 mb-2 flex justify-content-start flex-wrap">
        <Button
          label="実行"
          @click.prevent="consoleHandler"
          icon="pi pi-caret-right"
          class="cursor-pointer mr-2 p-button-info px-3"
          :class="{ 'jello-horizontal': consoleValue }"
          :disabled="!consoleValue || isExecuted"
        />
        <Button
          label="クリア"
          @click.prevent="resetCommand"
          icon="pi pi-eraser"
          class="cursor-pointer p-button-warning px-3"
          :class="[
            {
              'jello-horizontal': isExecuted,
            },
            { 'jello-diagonal-1': isClickedInput },
          ]"
          :disabled="!consoleValue"
        />
      </div>
      <div class="flex z-1">
        <pre class="min-w-full max-h-18rem highlight-container">
          <code class="language-javascript hljs" :class="{ 'text-focus-in': isExecuted }">{{ consoleRes }}</code>
        </pre>
      </div>
    </div>
  </div>
</template>

<script setup>
// VueAPIs
import { reactive, ref, watch, onMounted } from "vue";
// Pinia
import { useStore } from "@/store/store.js";
// Components
import Logo from "@/components/header/Logo.vue";
import SocialLinks from "@/components/header/SocialLinks.vue";
import Message from "@/components/header/Message.vue";
import KeywordFinder from "@/components/finder/KeywordFinder.vue";
import ArticleFinder from "@/components/finder/ArticleFinder.vue";
import HistoryFinder from "@/components/finder/HistoryFinder.vue";

// import hljs from 'highlight.js';
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
hljs.registerLanguage("javascript", javascript);

// ButtonProps
const keywordBtn = {
  label: "キーワード検索",
  icon: "pi pi-search",
};
const articleBtn = {
  label: "記事を探す",
  icon: "pi pi-book",
};
const historyBtn = {
  label: "コマンド履歴",
  icon: "pi pi-database",
};

// Pinia
const store = useStore();
const keywordData = store.keywordData;
const articleData = store.articleData;
const historyData = store.historyData;
// END Pinia

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
const consoleRes = ref("Result");

const consoleHandler = () => {
  try {
    consoleRes.value = eval(consoleValue.value);
  } catch (e) {
    consoleRes.value = e.message;
  }
  createHistoryData(consoleValue.value);
  isExecuted.value = true;
  hljs.highlightAll();
  // console.log(hljs.highlightAll())
};

const createHistoryData = (command) => {
  let obj = {
    id: historyData.length + 1,
    command: command,
  };
  historyData.unshift(obj);
  historyData.length >= 10 ? historyData.pop() : "";
};

const emitPaste = (command) => {
  resetCommand();
  consoleValue.value = command;
  closeDialog();
};

const resetCommand = () => {
  consoleValue.value = null;
  isExecuted.value = false;
  isClickedInput.value = false;
  consoleRes.value = "Result";
};

// End コンソール関係

// Animation
const isClickedInput = ref(false);
const bounceClearBtn = () => {
  isClickedInput.value = true;
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
</style>
