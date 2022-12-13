<template>
  <Logo />

  <div class="flex flex-wrap justify-content-center gap-2 m-2">
    <Button
      :label="keywordBtn.label"
      :finderTitle="keywordBtn.label"
      :icon="keywordBtn.icon"
      @click="openDialog('Keyword')"
    />
    <Button
      :label="articleBtn.label"
      :finderTitle="articleBtn.label"
      :icon="articleBtn.icon"
      @click="openDialog('Article')"
    />
    <Button
      :label="historyBtn.label"
      :finderTitle="historyBtn.label"
      :icon="historyBtn.icon"
      @click="openDialog('History')"
    />
  </div>

  <Dialog
    v-model:visible="isShowDialog"
    :breakpoints="{ '1080px': '75vw', '750px': '100vw' }"
    :style="{ width: '100vw' }"
    :closable="false"
  >
    <template #header>
      <div class="min-w-full flex justify-content-between">
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
          class="flex align-items-center"
        />
      </div>
    </template>

    <KeywordFinder v-if="isShowKeyword" @emitCopy="emitPaste" />
    <ArticleFinder v-if="isShowArticle" />
    <HistoryFinder v-if="isShowHistory" @emitCopy="emitPaste" />
  </Dialog>

  <Terminal welcomeMessage="JSターミナル" prompt="$" ref="terminal" />
</template>

<script setup>
// VueAPIs
import { reactive, ref, onMounted, onBeforeUnmount } from "vue";
// PrimeVue
import TerminalService from "primevue/terminalservice";
// Pinia
import { useStore } from "@/store/store.js";
// Components
import Logo from "@/components/logo/Logo.vue";
import KeywordFinder from "@/components/finder/KeywordFinder.vue";
import ArticleFinder from "@/components/finder/ArticleFinder.vue";
import HistoryFinder from "@/components/finder/HistoryFinder.vue";

// ButtonProps
const keywordBtn = {
  label: "キーワード検索",
  icon: "pi pi-external-link",
};
const articleBtn = {
  label: "記事をさがす",
  icon: "pi pi-external-link",
};
const historyBtn = {
  label: "履歴からもう一度",
  icon: "pi pi-external-link",
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

const terminal = ref(null);
console.log(terminal);
// terminal.value.commandText = "Hi"

onMounted(() => {
  TerminalService.on("command", commandHandler);
});

onBeforeUnmount(() => {
  TerminalService.off("command", commandHandler);
});

const commandHandler = (command) => {
  let response;
  // Use 'text' argument to test. See BELOW.
  // let argsIndex = text.indexOf(" ");
  // let command = argsIndex !== -1 ? text.substring(0, argsIndex) : text;
  try {
    response = eval(command);
  } catch (e) {
    response = e.message;
  }
  createHistoryData(command);
  TerminalService.emit("response", response);
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
  terminal.value.commandText = command;
  closeDialog();
};
// End コンソール関係
</script>
