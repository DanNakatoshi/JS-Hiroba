<template>
  <DataTable
    :value="historyData"
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
    responsiveLayout="stack"
  >
    <template #header>
      <div class="flex justify-content-center align-items-center">
        <span class="p-input-icon-left">
          <i class="pi pi-search" />
          <InputText
            v-model="filters['global'].value"
            placeholder="例：アロー関数"
            class="min-w-full"
          />
        </span>
      </div>
    </template>

    <template #empty>データがありません。</template>
    <template #loading> Loading customers data. Please wait. </template>

    <Column
      bodyStyle="text-align: center; overflow: visible"
      style="min-width: 2rem"
    >
      <template #body="slotProps">
        <Button type="button" icon="pi pi-copy" @click="emitCopy(slotProps.data.command)"></Button>
      </template>
    </Column>

    <Column field="command" header="コマンド" style="min-width: 14rem"> </Column>

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

const emitCopy = (command) => {
  emit("emitCopy", command);
  console.log(command)
};
</script>
