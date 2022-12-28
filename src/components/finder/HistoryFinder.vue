<template>
  <DataTable
    :value="historyData"
    class=""
    :rows="10"
    dataKey="id"
    :rowHover="true"
    v-model:filters="filters"
    filterDisplay="menu"
    :paginator="false"
    :globalFilterFields="['command']"
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
            :placeholder="store.isJapanese ? '例：アロー関数' : 'Type Anything...'"
            class="search-box"
          />
        </span>
      </div>
    </template>

    <template #empty>{{store.isJapanese ? 'データがありません。' : 'No Data'}}</template>
    <template #loading>{{store.isJapanese ? 'ローディング中...' : 'Loading Data...'}}</template>


    <Column field="command" :header="store.isJapanese ? 'コマンド' : 'Command'" style="min-width: 14rem">
    </Column>
  </DataTable>
</template>

<script setup>
import { reactive, ref } from "vue";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import { useStore } from "@/store/store.js";

// Pinia
const store = useStore();
const historyData = store.historyData;

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
});

// CopyCommand

const emit = defineEmits(["emitCopy"]);

const selectedRow = ref();
const onRowSelect = (event) => {
  emit("emitCopy", event.data.command)
};
</script>
