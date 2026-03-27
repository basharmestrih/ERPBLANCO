<template>
  <v-form ref="form" :class="{ 'product-form--rtl': isRtl }">
    <div :class="['d-flex align-center justify-space-between mb-6', { 'product-form__header--rtl': isRtl }]">
      <div>
        <h3 :class="['text-subtitle-1 font-weight-bold', { 'text-right': isRtl }]">{{ t("products.form.title") }}</h3>
        <p :class="['text-caption text-grey', { 'text-right': isRtl }]">{{ t("products.form.subtitle") }}</p>
      </div>
    </div>

    <v-row dense>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="productForm.name"
          :label="t('products.form.name')"
          variant="outlined"
          density="compact"
          hide-details
        />
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          v-model.number="productForm.price"
          type="number"
          :label="t('products.form.price')"
          variant="outlined"
          density="compact"
          hide-details
          prefix="$"
          min="0"
        />
      </v-col>
    </v-row>

    <v-row dense>
      <v-col cols="12" md="6">
        <v-text-field
          v-model.number="productForm.total_quantity"
          type="number"
          :label="t('products.form.stockQuantity')"
          variant="outlined"
          density="compact"
          hide-details
          min="0"
        />
      </v-col>

      <v-col cols="12" md="6">
        <v-select
          v-model="productForm.category_id"
          :items="categories"
          item-title="name"
          item-value="id"
          :label="t('products.form.category')"
          variant="outlined"
          density="compact"
          hide-details
          :loading="categoriesLoading"
          :placeholder="t('products.form.categoryPlaceholder')"
        />
      </v-col>
    </v-row>

    <v-row dense>
      <v-col cols="12" md="6">
        <v-select
          v-model="productForm.unit_id"
          :items="units"
          item-title="name"
          item-value="id"
          :label="t('products.form.unit')"
          variant="outlined"
          density="compact"
          hide-details
          :loading="unitsLoading"
          :placeholder="t('products.form.unitPlaceholder')"
        />
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup lang="ts">
import { onMounted } from "vue"
import { useProducts } from "@/composables/useProducts"
import { useCategories } from "@/composables/useCategories"
import { useUnits } from "@/composables/useUnits"
import { useLocale } from "@/composables/useLocale"

const { productForm } = useProducts()
const { categories, fetchCategories, loading: categoriesLoading } = useCategories()
const { units, fetchUnits, loading: unitsLoading } = useUnits()
const { isRtl, t } = useLocale()

onMounted(() => {
  fetchCategories()
  fetchUnits()
})
</script>

<style scoped>
.product-form--rtl {
  direction: rtl;
  text-align: right;
}

.product-form--rtl :deep(.v-field),
.product-form--rtl :deep(.v-field__input),
.product-form--rtl :deep(.v-field__field),
.product-form--rtl :deep(.v-select),
.product-form--rtl :deep(.v-text-field) {
  text-align: right;
}
</style>
