<template>
  <v-card variant="flat" class="border rounded-xl" color="#1f1f22">
    <v-card-title :class="['d-flex align-center py-4 px-6 table-toolbar', { 'table-toolbar--rtl': isRtl }]">
      <v-text-field
        v-model="search"
        :prepend-inner-icon="isRtl ? undefined : 'mdi-magnify'"
        :append-inner-icon="isRtl ? 'mdi-magnify' : undefined"
        :label="searchLabel"
        single-line
        hide-details
        density="compact"
        variant="solo-filled"
        flat
        class="search-field"
      ></v-text-field>

      <v-spacer></v-spacer>

      <div :class="['d-flex align-center ga-3 table-toolbar__actions', { 'table-toolbar__actions--rtl': isRtl }]">
         <slot name="top"></slot>
        <v-btn 
          color="white" 
          prepend-icon="mdi-export-variant" 
          variant="outlined" 
          class="text-none border-opacity-25"
          density="comfortable"
        >
          {{ t("table.export") }}
        </v-btn>
        
        <v-btn 
          color="white" 
          prepend-icon="mdi-filter-variant" 
          variant="tonal" 
          class="text-none"
          density="comfortable"
        >
          {{ t("table.filter") }}
        </v-btn>

        <v-btn 
          v-if="showCreateButton"
          color="red" 
          prepend-icon="mdi-plus" 
          class="text-none text-white font-weight-bold py-4"
           density="comfortable"
           @click="emit('create')"
        >
          {{ newItemLabel }}
        </v-btn>
      </div>
    </v-card-title>

    <div :class="{ 'table-filters--rtl': isRtl }">
      <slot name="filters"></slot>
    </div>

    <v-divider></v-divider>

    <v-data-table
      :headers="normalizedHeaders"
      :items="items"
      :items-per-page="itemsPerPage"
      :search="search"
      hover
      fixed-header
      height="500px"
      density="compact"
      :class="['erp-table bg-transparent', { 'erp-table--rtl': isRtl }]"
    >
      <template
        v-for="header in headers"
        :key="String(header.key)"
        #[`item.${String(header.key)}`]="slotProps"
      >
        <slot :name="`item.${String(header.key)}`" v-bind="slotProps">
          <span class="text-body-2 text-high-emphasis">
            {{ slotProps.item[header.key as keyof typeof slotProps.item] }}
          </span>
        </slot>
      </template>

      <template #loading>
        <v-skeleton-loader type="table-row-divider@5"></v-skeleton-loader>
      </template>
    </v-data-table>
  </v-card>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useLocale } from '@/composables/useLocale'

type TableHeader = {
  title: string
  key: string
  align?: 'start' | 'center' | 'end'
  sortable?: boolean
  width?: string | number
}

const props = withDefaults(
  defineProps<{
    searchLabel: string
    newItemLabel: string
    headers: TableHeader[]
    items: any[]
    itemsPerPage?: number
    showCreateButton?: boolean
  }>(),
  {
    itemsPerPage: 10,
    showCreateButton: true,
  },
)

const emit = defineEmits(["create"])


const search = ref('')
const { isRtl, t } = useLocale()

const normalizedHeaders = computed<TableHeader[]>(() =>
  props.headers.map((header) => ({
    ...header,
    align:
      !isRtl.value || !header.align
        ? header.align
        : header.align === 'start'
          ? 'end'
          : header.align === 'end'
            ? 'start'
            : header.align,
  })),
)
</script>

<style scoped>
.table-toolbar {
  gap: 16px;
}

.table-toolbar--rtl {
  direction: rtl;
}

.table-toolbar--rtl :deep(.v-field) {
  direction: rtl;
  text-align: right;
}

.table-toolbar--rtl :deep(.v-field__input) {
  text-align: right;
}

.table-toolbar__actions--rtl {
  justify-content: flex-end;
}

.table-filters--rtl {
  direction: rtl;
}

.table-filters--rtl :deep(.v-field),
.table-filters--rtl :deep(.v-input),
.table-filters--rtl :deep(.v-select),
.table-filters--rtl :deep(.v-autocomplete) {
  direction: rtl;
  text-align: right;
}

.search-field {
  max-width: 320px;
}

.erp-table {
  position: relative;
}

.erp-table--rtl {
  direction: rtl;
}

.erp-table--rtl :deep(th),
.erp-table--rtl :deep(td) {
  text-align: right !important;
}

.erp-table--rtl :deep(.v-data-table-header__content) {
  justify-content: flex-end;
  text-align: right;
  width: 100%;
}

.erp-table :deep(.v-table__wrapper) {
  overflow: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(18, 18, 20, 0.95) rgba(255, 255, 255, 0.04);
}

.erp-table :deep(.v-table__wrapper::-webkit-scrollbar) {
  width: 12px;
  height: 12px;
}

.erp-table :deep(.v-table__wrapper::-webkit-scrollbar-track) {
  background: linear-gradient(180deg, rgba(12, 12, 14, 0.92), rgba(24, 24, 28, 0.9));
  border-radius: 999px;
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.04),
    inset 0 0 18px rgba(0, 0, 0, 0.45);
}

.erp-table :deep(.v-table__wrapper::-webkit-scrollbar:horizontal) {
  height: 12px;
}

.erp-table :deep(.v-table__wrapper::-webkit-scrollbar-track:horizontal) {
  background: linear-gradient(90deg, rgba(12, 12, 14, 0.92), rgba(24, 24, 28, 0.9));
}

.erp-table :deep(.v-table__wrapper::-webkit-scrollbar-thumb) {
  background:
    linear-gradient(180deg, rgba(6, 6, 8, 0.96), rgba(28, 28, 32, 0.92));
  border: 2px solid rgba(255, 255, 255, 0.05);
  border-radius: 999px;
  box-shadow:
    inset 0 1px 1px rgba(255, 255, 255, 0.08),
    inset 0 -10px 18px rgba(0, 0, 0, 0.38),
    0 0 18px rgba(0, 0, 0, 0.28);
}

.erp-table :deep(.v-table__wrapper::-webkit-scrollbar-thumb:horizontal) {
  background:
    linear-gradient(90deg, rgba(6, 6, 8, 0.96), rgba(28, 28, 32, 0.92));
}

.erp-table :deep(.v-table__wrapper::-webkit-scrollbar-thumb:hover) {
  background:
    linear-gradient(180deg, rgba(14, 14, 16, 0.98), rgba(36, 36, 40, 0.96));
}

.erp-table :deep(.v-table__wrapper::-webkit-scrollbar-thumb:hover:horizontal) {
  background:
    linear-gradient(90deg, rgba(14, 14, 16, 0.98), rgba(36, 36, 40, 0.96));
}

.erp-table :deep(.v-table__wrapper::-webkit-scrollbar-corner) {
  background: rgba(18, 18, 20, 0.92);
}

/* ERP Table UX Refinement */
.erp-table :deep(th) {
  text-transform: uppercase !important;
  font-size: 0.65rem !important;
  font-weight: 800 !important;
  color: rgba(255, 255, 255, 0.5) !important;
  letter-spacing: 0.1em !important;
  background-color: #26262b !important; /* Slightly lighter than card for depth */
  border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
}

.erp-table :deep(td) {
  font-size: 0.875rem !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
  padding-top: 8px !important;
  padding-bottom: 8px !important;
}

/* Softening the hover effect for Dark Mode */
.erp-table :deep(tr:hover) {
  background-color: rgba(255, 255, 255, 0.02) !important;
}
</style>
