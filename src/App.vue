<template>
  <div class="flex justify-content-center">
    <div class="m-4">
      <div class="flex justify-content-between my-3">
        <Logo />
        <SocialLinks />
      </div>
      <Message class="my-4" />
     
      <div class="flex flex-wrap ustify-content-start gap-2 mb-4 mt-2">
        <Button
          :label="keywordBtn.label"
          :finderTitle="keywordBtn.label"
          :icon="keywordBtn.icon"
          @click="openDialog('Keyword')"
          class="flex align-items-center justify-content-center"
        />
        <Button
          :label="articleBtn.label"
          :finderTitle="articleBtn.label"
          :icon="articleBtn.icon"
          @click="openDialog('Article')"
          class="flex align-items-center justify-content-center"
        />
        <Button
          :label="historyBtn.label"
          :finderTitle="historyBtn.label"
          :icon="historyBtn.icon"
          @click="openDialog('History')"
          class="flex align-items-center justify-content-center"
        />
      </div>

      <Dialog
        v-model:visible="isShowDialog"
        :breakpoints="{ '1080px': '75vw', '750px': '100vw' }"
        :style="{ width: '100vw' }"
        :closable="false"
        class="max-w-60rem"
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

      <Terminal
        welcomeMessage="JSターミナル"
        prompt="$"
        ref="terminal"
        class="border-round-sm"
      />
    </div>
  </div>
</template>

<script setup>
// VueAPIs
import { reactive, ref, onMounted, onBeforeUnmount } from "vue";
// PrimeVue
import TerminalService from "primevue/terminalservice";
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
  const isHistory = ref(historyData.length)
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

<style></style>
