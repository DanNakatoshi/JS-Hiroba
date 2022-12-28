<template>
  <p v-show="store.isJapanese">JavaScriptを使って学べるアプリ</p>
  <p v-show="!store.isJapanese">Let's learn JavaScript by using it!</p>
</template>


<script setup>
import { useStore } from "@/store/store.js";
const store = useStore();

</script>

