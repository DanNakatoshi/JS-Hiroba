<template>
  <div class="flex justify-content-center min-w-full">
    <div id="app-container" class="m-4 flex-grow-1">
      <div class="flex flex-row flex-wrap justify-content-between">
        <Logo />
        <SocialLinks />
      </div>

      <div
        v-if="!store.keywordData"
        class="flex flex-column justify-content-center mt-4"
      >
        <ProgressSpinner
          class="flex align-items-center justify-content-center"
        />
        <span class="mt-4 flex align-items-center justify-content-center">
          <p v-if="store.isJapanese">データを取得しています。</p>
          <p v-else>Fetching the data</p>
        </span>
      </div>

      <span v-else>
        <div :class="appData.btnWrapper">
          <Button
            :label="
              store.isJapanese ? appData.howToBtn.jp : appData.howToBtn.en
            "
            @click="fireHowTo()"
            :class="appData.btnClass"
          />
          <Button
            :label="
              store.isJapanese ? appData.keywordBtn.jp : appData.keywordBtn.en
            "
            :icon="appData.keywordBtn.icon"
            @click="openDialog('Keyword')"
            :class="appData.btnClass"
          />
          <Button
            v-show="store.isJapanese"
            :label="
              store.isJapanese ? appData.articleBtn.jp : appData.articleBtn.en
            "
            :icon="appData.articleBtn.icon"
            @click="openDialog('Article')"
            :class="appData.btnClass"
          />
          <Button
            :label="
              store.isJapanese ? appData.historyBtn.jp : appData.historyBtn.en
            "
            :icon="appData.historyBtn.icon"
            :disabled="historyData.length == 0"
            @click="openDialog('History')"
            :class="[
              { 'jello-horizontal': historyData.length > 0 },
              appData.btnClass,
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
                {{
                  store.isJapanese
                    ? appData.keywordBtn.jp
                    : appData.keywordBtn.en
                }}
              </div>
              <div v-if="isShowArticle" class="flex align-items-center">
                {{
                  store.isJapanese
                    ? appData.articleBtn.jp
                    : appData.articleBtn.en
                }}
              </div>
              <div v-if="isShowHistory" class="flex align-items-center">
                {{
                  store.isJapanese
                    ? appData.historyBtn.jp
                    : appData.historyBtn.en
                }}
              </div>

              <Button
                icon="pi pi-times"
                @click="closeDialog"
                class="cursor-pointer flex align-items-center p-button-sm p-button-secondary"
              />
            </div>
          </template>

          <KeywordFinder v-if="isShowKeyword" @emitCopy="emitSearchPaste" />

          <ArticleFinder v-if="isShowArticle" @emitURL="emitJumpToURL" />
          <HistoryFinder v-if="isShowHistory" @emitCopy="emitHisotryPaste" />
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
            <!-- {{ computedConsole }} -->
          </div>
        </div>

        <div :class="appData.btnWrapper">
          <Button
            :label="store.isJapanese ? '実行' : 'Run'"
            @click="consoleHandler"
            icon="pi pi-caret-right"
            class="p-button-info"
            :class="[{ 'jello-horizontal': consoleValue }, appData.btnClass]"
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
              appData.btnClass,
            ]"
            :disabled="!consoleValue"
          />
        </div>

        <div class="flex">
          <pre class="min-w-full console-container flex">
            <code class="language-javascript hljs" :class="{ 'text-focus-in': isExecuted }" v-html="consoleRes"></code>
          </pre>
        </div>
      </span>
    </div>
  </div>
</template>

<script setup>
// router
import { useRouter, useRoute } from "vue-router";

// VueAPIs
import { reactive, ref, onMounted, computed } from "vue";
// Pinia
import { useStore } from "@/store/store.js";
// Components
import Logo from "@/components/header/Logo.vue";
import SocialLinks from "@/components/header/SocialLinks.vue";
import KeywordFinder from "@/components/finder/KeywordFinder.vue";
import ArticleFinder from "@/components/finder/ArticleFinder.vue";
import HistoryFinder from "@/components/finder/HistoryFinder.vue";
import appData from "@/components/appData.js";

// import hljs from 'highlight.js';
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
hljs.registerLanguage("javascript", javascript);

// Router
const router = useRouter();
const route = useRoute();

// WelcomeMsg
const mainMsg = reactive({
  msg: "console.log()を使ってみよう！",
  msgEn: "Try using the console.log()",
});

// Pinia
const store = useStore();
// const keywordData = store.keywordData;
// const articleData = store.articleData;
const historyData = store.historyData;
const currentURLid = ref(null);

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

const emitHisotryPaste = (command) => {
  resetCommand();
  consoleValue.value = command;
  closeDialog();
  mainMsg.msg = "履歴からもう一度試しましょう";
  mainMsg.msgEn = "Pasted from the history";
};

const emitSearchPaste = (data) => {
  resetCommand();
  router.push({ name: "command", params: { id: data.id } });
  // consoleValue.value = data.command;
  currentURLid.value = route.params.id;
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

// Update console value with URL param
const updateConsole = (commandId) => {
  let currentCommand = store.keywordData.find((el) => el.id == commandId);
  return (consoleValue.value = currentCommand.command);
};

const computedConsole = computed(() => {
  if (store.keywordData && route.params.id) {
    return updateConsole(route.params.id);
  }
});

// End Console

// Animation
const isClickedInput = ref(false);
const bounceClearBtn = () => {
  isClickedInput.value = true;
};

// How to
const setConsole = () => {
  consoleValue.value = appData.howToMsgJP;
};

const setConsoleEn = () => {
  consoleValue.value = appData.howToMsgEN;
};

const fireHowTo = () => {
  resetCommand();
  store.isJapanese ? setConsole() : setConsoleEn();
};
</script>
