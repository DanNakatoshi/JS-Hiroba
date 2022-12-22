<template>
  <div class="flex justify-content-center min-w-full">
    <div id="app-container" class="m-4 flex-grow-1">
      <div class="flex flex-wrap card-container justify-content-between my-3">
        <Logo />
        <SocialLinks />
      </div>

      <Message class="my-4" />
      {{ count }}
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
        <pre><code>
          <Textarea
            v-model="consoleValue"
            :autoResize="true"
            rows="8"
            class="min-w-full max-h-18rem scalein animation-duration-1000 language-js"
          />
        </code></pre>
      </div>
      <div class="mt-2 mb-2 flex justify-content-start flex-wrap">
        <Button
          label="実行"
          @click.prevent="consoleHandler"
          icon="pi pi-caret-right"
          class="cursor-pointer mr-2 p-button-success px-3"
          :class="{ 'jello-horizontal': consoleValue }"
          :disabled="!consoleValue"
        />
        <Button
          label="クリア"
          @click.prevent="resetCommand"
          icon="pi pi-eraser"
          class="cursor-pointer p-button-success px-3"
          :disabled="!consoleValue"
        />
      </div>
      <div class="flex z-1">
        <Textarea
          :value="consoleRes"
          :autoResize="true"
          disabled="true"
          rows="5"
          class="min-w-full max-h-18rem scalein animation-duration-1000"
        />
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
import Message from "@/components/header/Message.vue";
import KeywordFinder from "@/components/finder/KeywordFinder.vue";
import ArticleFinder from "@/components/finder/ArticleFinder.vue";
import HistoryFinder from "@/components/finder/HistoryFinder.vue";

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

// Count
const count = ref(0);

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
const consoleRes = ref("Result");

const consoleHandler = () => {
  try {
    consoleRes.value = eval(consoleValue.value);
  } catch (e) {
    consoleRes.value = e.message;
  }
  createHistoryData(consoleValue.value);
  count.value++;
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
  consoleValue.value = command;
  closeDialog();
};

const resetCommand = () => {
  consoleValue.value = null;
  consoleRes.value = "Result";
};

// End コンソール関係
</script>

<style>
#app-container {
  max-width: 960px;
}

/* When Botton is ready*/
.jello-horizontal {
  -webkit-animation: jello-horizontal 0.8s both;
  animation: jello-horizontal 0.8s both;
}

/**
 * ----------------------------------------
 * animation jello-horizontal
 * ----------------------------------------
 */
@-webkit-keyframes jello-horizontal {
  0% {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
  30% {
    -webkit-transform: scale3d(1.25, 0.75, 1);
    transform: scale3d(1.25, 0.75, 1);
  }
  40% {
    -webkit-transform: scale3d(0.75, 1.25, 1);
    transform: scale3d(0.75, 1.25, 1);
  }
  50% {
    -webkit-transform: scale3d(1.15, 0.85, 1);
    transform: scale3d(1.15, 0.85, 1);
  }
  65% {
    -webkit-transform: scale3d(0.95, 1.05, 1);
    transform: scale3d(0.95, 1.05, 1);
  }
  75% {
    -webkit-transform: scale3d(1.05, 0.95, 1);
    transform: scale3d(1.05, 0.95, 1);
  }
  100% {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}
@keyframes jello-horizontal {
  0% {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
  30% {
    -webkit-transform: scale3d(1.25, 0.75, 1);
    transform: scale3d(1.25, 0.75, 1);
  }
  40% {
    -webkit-transform: scale3d(0.75, 1.25, 1);
    transform: scale3d(0.75, 1.25, 1);
  }
  50% {
    -webkit-transform: scale3d(1.15, 0.85, 1);
    transform: scale3d(1.15, 0.85, 1);
  }
  65% {
    -webkit-transform: scale3d(0.95, 1.05, 1);
    transform: scale3d(0.95, 1.05, 1);
  }
  75% {
    -webkit-transform: scale3d(1.05, 0.95, 1);
    transform: scale3d(1.05, 0.95, 1);
  }
  100% {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}
</style>
