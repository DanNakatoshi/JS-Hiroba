<template>
  <DataTable
    :value="articleData"
    :paginator="true"
    class=""
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
  >
    <template #header>
      <div class="flex justify-content-center align-items-center">
        <span class="p-input-icon-left">
          <i class="pi pi-search" />
          <InputText
            v-model="filters['global'].value"
            placeholder="例：アロー関数"
            class="search-box"
          />
        </span>
      </div>
    </template>

    <template #empty>データがありません。</template>
    <template #loading> Loading customers data. Please wait. </template>

    <Column
      bodyStyle="text-align: center; overflow: visible"
      class="copy-section"
    >
      <template #body="slotProps">
        <Button
          type="button"
          icon="pi pi-copy "
          class="p-button-sm"
          @click="jumpToURL(slotProps.data.url)"
        ></Button>
      </template>
    </Column>

    <Column field="title" header="タイトル" style="min-width: 14rem"> </Column>
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
  name: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
});

const jumpToURL = (url) => {
  window.open(url);
};
</script>
