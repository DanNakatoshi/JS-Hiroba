<template>
  <div>
    <input v-model="userInput.input" />
  </div>
  <button @click="consoleDisplay(userInput.input)">実行</button>
  <div>{{ result }}</div>
  <Terminal welcomeMessage="ようそこ！" prompt="あさめし $" />
</template>

<script setup>
import { reactive, ref, onMounted, onBeforeUnmount } from "vue";
import TerminalService from 'primevue/terminalservice';

onMounted(() => {
  TerminalService.on("command", commandHandler);
});

onBeforeUnmount(() => {
  TerminalService.off("command", commandHandler);
});

const commandHandler = (text) => {
  let response;
  let argsIndex = text.indexOf(" ");
  let command = argsIndex !== -1 ? text.substring(0, argsIndex) : text;

  try {
    response = eval(command);
  } catch (e) {
    response = e.message;
  }


  TerminalService.emit("response", response);
};



const userInput = reactive({
  input: null,
});

const result = ref(null);

const consoleDisplay = (input) => {
  try {
    result.value = eval(input);
  } catch (e) {
    result.value = e.message;
  }
};
</script>

