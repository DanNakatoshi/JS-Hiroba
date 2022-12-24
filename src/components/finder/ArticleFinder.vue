<template>
  <DataTable
    :value="articleData"
    :paginator="true"
    :rows="10"
    dataKey="id"
    :rowHover="true"
    v-model:filters="filters"
    filterDisplay="menu"
    :loading="loading"
    paginatorTemplate=" PrevPageLink PageLinks NextPageLink "
    :globalFilterFields="['title']"
    responsiveLayout="scroll"
    stripedRows
    v-model:selection="selectedRow"
    @rowSelect="onRowSelect"
    selectionMode="single"
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
      field="title"
      :header="store.isJapanese ? 'タイトル' : 'Title'"
      style="min-width: 14rem"
    >
    </Column>
  </DataTable>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "@/store/store.js";
import { FilterMatchMode, FilterOperator } from "primevue/api";

// Pinia
const store = useStore();
const articleData = store.articleData;
// Input
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

// Jump to article
const emit = defineEmits(["emitURL"]);

const selectedRow = ref();
const onRowSelect = (event) => {
  emit("emitURL", event.data.url)

};
</script>
