<template>
  <DataTable
    :value="keywordData"
    :rows="10"
    dataKey="id"
    :rowHover="true"
    :loading="loading"
    :paginator="true"
    paginatorTemplate=" PrevPageLink PageLinks NextPageLink "
    filterDisplay="menu"
    v-model:filters="filters"
    :globalFilterFields="['title', 'keyword', 'title_en']"
    responsiveLayout="scroll"
    stripedRows
    v-model:selection="selectedRow"
    @rowSelect="onRowSelect"
    selectionMode="single"
  >
    <template #header>
      <div
        class="flex flex-wrap gap-2 md:gap-3 justify-content-center align-items-center"
      >
        <span class="p-input-icon-left">
          <i class="pi pi-search" />
          <InputText
            v-model="filters['global'].value"
            :placeholder="
              store.isJapanese ? 'アロー関数...' : 'Type Anything...'
            "
            class="search-box"
          />
        </span>
        <Button
          v-if="isEasy"
          :label="store.isJapanese ? '初級に絞る' : 'Show Easy'"
          type="button"
          class="p-button-sm mx-2 jello-horizontal p-button-success"
          @click="
            filters['difficulty'].value = 'Easy';
            changeBtn('Easy');
          "
        ></Button>
        <Button
          v-if="isInte"
          :label="store.isJapanese ? '中級に絞る' : 'Show Intermediate'"
          type="button"
          class="p-button-sm mx-2 jello-horizontal p-button-warning"
          @click="
            filters['difficulty'].value = 'Intermediate';
            changeBtn('Inte');
          "
        ></Button>
        <Button
          v-if="isDiff"
          :label="store.isJapanese ? '上級に絞る' : 'Show Difficult'"
          type="button"
          class="p-button-sm mx-2 jello-horizontal p-button-danger"
          @click="
            filters['difficulty'].value = 'Difficult';
            changeBtn('Diff');
          "
        ></Button>
        <Button
          v-if="isAll"
          :label="store.isJapanese ? 'すべてを表示' : 'Show All'"
          type="button"
          class="p-button-sm mx-2 jello-horizontal p-button-help"
          @click="
            filters['difficulty'].value = '';
            changeBtn('All');
          "
        ></Button>
      </div>
    </template>
    <template #empty>{{
      store.isJapanese ? "データがありません。" : "No Data"
    }}</template>
    <template #loading>{{
      store.isJapanese ? "ローディング中..." : "Loading Data..."
    }}</template>



    <Column
      :field="store.isJapanese ? 'title' : 'title_en'"
      :header="store.isJapanese ? 'タイトル' : 'Title'"
      style="min-width: 3rem"
    />

    <Column :header="store.isJapanese ? '難易度' : 'Difficulty'">
      <template #body="slotProps">
        <span v-show="store.isJapanese">
          {{
            slotProps.data.difficulty == "Easy"
              ? "初級"
              : slotProps.data.difficulty == "Intermediate"
              ? "中級"
              : slotProps.data.difficulty == "Difficult"
              ? "上級"
              : "全般"
          }}</span
        >
        <span v-show="!store.isJapanese">{{ slotProps.data.difficulty }}</span>
      </template>
    </Column>
  </DataTable>
</template>

<script setup>
import { useStore } from "@/store/store.js";
import { ref } from "vue";
// import { FilterMatchMode, FilterOperator } from "primevue/api";
import { FilterMatchMode, FilterOperator } from "primevue/api";

// Pinia
const store = useStore();
const keywordData = store.keywordData;

// Input
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  difficulty: { value: null, matchMode: FilterMatchMode.EQUALS },
});

// CopyCommand

const emit = defineEmits(["emitCopy"]);


const selectedRow = ref();
const onRowSelect = (event) => {
  emit("emitCopy", event.data)
};
// BtnToggle

const isEasy = ref(true);
const isInte = ref(false);
const isDiff = ref(false);
const isAll = ref(false);

const changeBtn = (btnName) => {
  switch (btnName) {
    case "Easy":
      isEasy.value = false;
      isInte.value = true;
      break;
    case "Inte":
      isInte.value = false;
      isDiff.value = true;
      break;
    case "Diff":
      isDiff.value = false;
      isAll.value = true;
      break;
    case "All":
      isAll.value = false;
      isEasy.value = true;
      break;
  }
};
</script>
