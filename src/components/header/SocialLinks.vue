<template>
  <div class="">
    <Button
      v-show="store.isJapanese"
      @click="toggleLang()"
      icon="pi pi-flag"
      label="English"
      class="ml-4 p-button-sm p-button-outlined p-button-success"
      :class="{ 'jello-horizontal': isAnimation }"
    />
    <Button
      v-show="!store.isJapanese"
      @click="toggleLang()"
      icon="pi pi-flag-fill"
      label="日本語"
      class="ml-4 p-button-sm p-button-outlined p-button-success"
      :class="{ 'jello-horizontal': isAnimation }"
    />

    <Button
      @click="openGitHub"
      icon="pi pi-github"
      class="ml-2 p-button-sm p-button-secondary "
    />
    <Button
      @click="openTwitter"
      icon="pi pi-twitter"
      class="ml-2 p-button-sm p-button-secondary "
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "@/store/store.js";

const openGitHub = () => {
  window.open("https://github.com/TraitOtaku/JS-Hiroba");
};

const openTwitter = () => {
  window.open("https://twitter.com/asameshicode");
};

const store = useStore();
const toggleLang = () => {
  store.isJapanese = !store.isJapanese;
};

const isAnimation = ref(false);
const addClass = () => (isAnimation.value = true);
setInterval(() => {
  addClass();
}, 1500);
</script>
