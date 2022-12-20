<template>
  <div>
    <Button
      @click="openAsameshi"
      icon="pi pi-external-link"
      class="p-button-sm p-button-secondary"
    />
    <Button
      @click="openGitHub"
      icon="pi pi-github"
      class="ml-2 p-button-sm p-button-secondary"
    />
    <Button
      @click="openTwitter"
      icon="pi pi-twitter"
      class="ml-2 p-button-sm p-button-secondary"
    />
  </div>
</template>

<script setup>
const openAsameshi = () => {
  window.open("https://asameshicode.com/");
};

const openGitHub = () => {
  window.open("https://github.com/TraitOtaku/JS-Hiroba");
};

const openTwitter = () => {
  window.open("https://twitter.com/asameshicode");
};
</script>
