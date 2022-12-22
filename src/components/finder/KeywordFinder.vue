<template>
  <DataTable
    :value="keywordData"
    :paginator="true"
    class=""
    :rows="10"
    dataKey="id"
    :rowHover="true"
    v-model:filters="filters"
    filterDisplay="menu"
    :loading="loading"
    paginatorTemplate=" PrevPageLink PageLinks NextPageLink "
    :globalFilterFields="['title', 'keyword']"
    responsiveLayout="scroll"
    stripedRows
  >
    <template #header>
      <div class="flex justify-content-center align-items-center">
        <span class="p-input-icon-left">
          <i class="pi pi-search" />
          <InputText
            v-model="filters['global'].value"
            :placeholder="
              store.isJapanese ? '例：アロー関数' : 'Type Anything...'
            "
            class="search-box"
          />
        </span>
      </div>
    </template>

    <template #empty>{{
      store.isJapanese ? "データがありません。" : "No Data"
    }}</template>
    <template #loading>{{
      store.isJapanese ? "ローディング中..." : "Loading Data..."
    }}</template>

    <Column
      bodyStyle="text-align: center; overflow: visible"
      class="copy-section"
    >
      <template #body="slotProps">
        <Button
          type="button"
          icon="pi pi-copy "
          class="p-button-sm"
          @click="emitCopy(slotProps.data)"
        ></Button>
      </template>
    </Column>

    <Column
      :field="store.isJapanese ? 'title' : 'title_en'"
      :header="store.isJapanese ? 'タイトル' : 'Title'"
      style="min-width: 3rem"
    />
    <!-- <Column
      field="keyword"
      :header="store.isJapanese ? 'キーワード' : 'Keyword'"
      style="min-width: 2rem"
    /> -->
    <Column :header="store.isJapanese ? '難易度' : 'Difficulty'" :sortable="true">
      <template #body="slotProps">
        <span v-show="store.isJapanese">
          {{
            slotProps.data.difficulty == "Easy"
              ? "初級"
              : slotProps.data.difficulty == "Intermidiate"
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
import { FilterMatchMode, FilterOperator } from "primevue/api";
import { slotFlagsText } from "@vue/shared";

// Pinia
const store = useStore();
const keywordData = store.keywordData;

// Input
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
});

// CopyCommand

const emit = defineEmits(["emitCopy"]);

const emitCopy = (data) => {
  emit("emitCopy", data);
};
</script>
