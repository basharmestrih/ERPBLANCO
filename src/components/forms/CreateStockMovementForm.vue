<template>
  <v-form ref="form" :class="{ 'stock-movement-form--rtl': isRtl }">
    <div :class="['d-flex align-center justify-space-between mb-6', { 'stock-movement-form__header--rtl': isRtl }]">
      <div>
        <h3 :class="['text-subtitle-1 font-weight-bold', { 'text-right': isRtl }]">{{ t("stock.form.title") }}</h3>
        <p :class="['text-caption text-grey', { 'text-right': isRtl }]">{{ t("stock.form.subtitle") }}</p>
      </div>
    </div>

    <v-row dense>
      <v-col cols="12" md="6">
        <v-autocomplete
          v-model="stockMovementForm.product_id"
          :items="products"
          item-title="name"
          item-value="id"
          :label="t('stock.form.product')"
          :placeholder="t('stock.form.productPlaceholder')"
          variant="outlined"
          density="compact"
          hide-details
          :loading="productsLoading"
        />
      </v-col>

      <v-col cols="12" md="6">
        <v-select
          v-model="stockMovementForm.warehouse_id"
          :items="warehouses"
          item-title="name"
          item-value="id"
          :label="t('stock.form.warehouse')"
          variant="outlined"
          density="compact"
          hide-details
        />
      </v-col>
    </v-row>

    <v-row dense>
      <v-col cols="12" md="6">
        <v-select
          v-model="stockMovementForm.type"
          :items="movementTypes"
          item-title="label"
          item-value="value"
          :label="t('stock.form.movementType')"
          variant="outlined"
          density="compact"
          hide-details
        />
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          v-model.number="stockMovementForm.quantity"
          type="number"
          :label="t('stock.form.quantity')"
          variant="outlined"
          density="compact"
          hide-details
          min="0"
        />
      </v-col>
    </v-row>

    <v-divider class="my-6" />

    <v-row dense>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="stockMovementForm.reference_type"
          :label="t('stock.form.referenceType')"
          variant="outlined"
          density="compact"
          hide-details
        />
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          v-model.number="stockMovementForm.reference_id"
          type="number"
          :label="t('stock.form.referenceId')"
          variant="outlined"
          density="compact"
          hide-details
        />
      </v-col>
    </v-row>

    <v-row dense>
      <v-col cols="12">
        <v-textarea
          v-model="stockMovementForm.note"
          :label="t('stock.form.note')"
          variant="outlined"
          density="compact"
          rows="3"
          hide-details
        />
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue"
import { useProducts } from "@/composables/useProducts"
import { useStockMovements } from "@/composables/useStockMovements"
import { useWarehouses } from "@/composables/useWarehouses"
import { useLocale } from "@/composables/useLocale"

const { products, fetchProducts, loading: productsLoading } = useProducts()
const { warehouses, fetchWarehouses } = useWarehouses()
const { stockMovementForm } = useStockMovements()
const { isRtl, t } = useLocale()

const movementTypes = computed(() => [
  { label: t("stock.filter.in"), value: "in" },
  { label: t("stock.filter.out"), value: "out" },
  { label: t("stock.filter.adjustment"), value: "adjustment" },
])

onMounted(() => {
  fetchProducts()
  fetchWarehouses()
})
</script>

<style scoped>
.stock-movement-form--rtl {
  direction: rtl;
  text-align: right;
}

.stock-movement-form--rtl :deep(.v-field),
.stock-movement-form--rtl :deep(.v-field__input),
.stock-movement-form--rtl :deep(.v-field__field),
.stock-movement-form--rtl :deep(.v-select),
.stock-movement-form--rtl :deep(.v-autocomplete),
.stock-movement-form--rtl :deep(.v-text-field),
.stock-movement-form--rtl :deep(.v-textarea) {
  text-align: right;
}
</style>
