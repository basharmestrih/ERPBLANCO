<template>
  <v-dialog v-model="model" max-width="900" persistent>
    <v-card :class="{ 'warehouse-products-dialog--rtl': isRtl }" border elevation="4">
      <v-toolbar :class="{ 'warehouse-products-dialog__toolbar--rtl': isRtl }" color="surface" elevation="1">
        <v-toolbar-title :class="['text-h6 font-weight-bold', { 'text-right': isRtl }]">
          {{ title }}
        </v-toolbar-title>

        <v-spacer />

        <v-btn
          icon="mdi-close"
          variant="text"
          @click="close"
        />
      </v-toolbar>

      <v-card-text :class="['pa-0', { 'text-right': isRtl }]">
        <div v-if="loading" class="pa-6">
          <v-skeleton-loader type="table-heading, table-tbody@5" />
        </div>

        <div v-else-if="items.length" class="pa-6">
          <v-table :class="['warehouse-products-table', { 'warehouse-products-table--rtl': isRtl }]" density="comfortable">
            <thead>
              <tr>
                <th :class="{ 'text-right': isRtl }">{{ t("dialog.warehouseProducts.product") }}</th>
                <th :class="isRtl ? 'text-left' : 'text-right'">{{ t("dialog.warehouseProducts.quantity") }}</th>
                <th :class="isRtl ? 'text-left' : 'text-right'">{{ t("dialog.warehouseProducts.price") }}</th>
                <th :class="{ 'text-right': isRtl }">{{ t("dialog.warehouseProducts.category") }}</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(item, index) in items" :key="item.id ?? item.product_id ?? item.name ?? index">
                <td :class="['text-body-2 text-high-emphasis', { 'text-right': isRtl }]">
                  {{ item.product?.name ?? item.name ?? `#${item.product_id ?? 'N/A'}` }}
                </td>
                <td :class="['text-body-2 font-weight-medium', isRtl ? 'text-left' : 'text-right']">
                  {{ formatQuantity(item.quantity ?? item.stock_quantity ?? item.current_stock) }}
                </td>
                <td :class="['text-body-2', isRtl ? 'text-left' : 'text-right']">
                  ${{ formatPrice(item.product?.price) }}
                </td>
                <td :class="['text-body-2 text-medium-emphasis', { 'text-right': isRtl }]">
                  {{ item.product?.category?.name ?? 'N/A' }}
                </td>
              </tr>
            </tbody>
          </v-table>
        </div>

        <div v-else class="pa-6 text-body-2 text-medium-emphasis">
          {{ t("dialog.warehouseProducts.empty") }}
        </div>
      </v-card-text>

      <v-card-actions :class="['pa-6', { 'warehouse-products-dialog__actions--rtl': isRtl }]">
        <v-spacer />

        <v-btn
          variant="tonal"
          color="primary"
          class="px-6"
          @click="close"
        >
          {{ t("common.close") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useLocale } from "@/composables/useLocale"

type WarehouseProductRow = {
  id?: number
  product_id?: number
  quantity?: number | string | null
  stock_quantity?: number | string | null
  current_stock?: number | string | null
  name?: string | null
  product?: {
    name?: string | null
    price?: number | string | null
    category?: {
      name?: string | null
    } | null
  } | null
}

const props = defineProps<{
  modelValue: boolean
  title: string
  items: WarehouseProductRow[]
  loading: boolean
}>()

const emit = defineEmits(["update:modelValue"])

const model = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit("update:modelValue", value),
})

const close = () => {
  emit("update:modelValue", false)
}

const { currentLocale, isRtl, t } = useLocale()

const formatQuantity = (value?: number | string | null) => Number(value ?? 0).toLocaleString(currentLocale.value)

const formatPrice = (value?: number | string | null) =>
  Number(value ?? 0).toLocaleString(currentLocale.value, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
</script>

<style scoped>
.warehouse-products-dialog--rtl,
.warehouse-products-dialog__toolbar--rtl,
.warehouse-products-dialog__actions--rtl,
.warehouse-products-table--rtl {
  direction: rtl;
}

.warehouse-products-table :deep(th) {
  text-transform: uppercase;
  font-size: 0.7rem;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.55);
  letter-spacing: 0.08em;
}

.warehouse-products-table--rtl :deep(th),
.warehouse-products-table--rtl :deep(td) {
  text-align: right;
}

.warehouse-products-table--rtl :deep(thead tr),
.warehouse-products-table--rtl :deep(tbody tr) {
  direction: rtl;
}
</style>
