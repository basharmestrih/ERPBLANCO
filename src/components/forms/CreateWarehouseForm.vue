<template>
  <v-form :class="{ 'warehouse-form--rtl': isRtl }">
    <div :class="['d-flex align-center justify-space-between mb-6', { 'warehouse-form__header--rtl': isRtl }]">
      <div>
        <h3 :class="['text-subtitle-1 font-weight-bold', { 'text-right': isRtl }]">{{ t("warehouses.form.title") }}</h3>
        <p :class="['text-caption text-grey', { 'text-right': isRtl }]">{{ t("warehouses.form.subtitle") }}</p>
      </div>
    </div>

    <v-row dense>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="warehouseForm.name"
          :label="t('warehouses.form.name')"
          variant="outlined"
          density="compact"
          hide-details
        />
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          v-model="warehouseForm.location"
          :label="t('warehouses.form.location')"
          variant="outlined"
          density="compact"
          hide-details
        />
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup lang="ts">
import { useLocale } from "@/composables/useLocale"
import { useWarehouses } from "@/composables/useWarehouses"

const { warehouseForm } = useWarehouses()
const { isRtl, t } = useLocale()
</script>

<style scoped>
.warehouse-form--rtl {
  direction: rtl;
  text-align: right;
}

.warehouse-form--rtl :deep(.v-field),
.warehouse-form--rtl :deep(.v-field__input),
.warehouse-form--rtl :deep(.v-field__field),
.warehouse-form--rtl :deep(.v-text-field) {
  text-align: right;
}
</style>
