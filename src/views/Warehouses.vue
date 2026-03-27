<template>
  <section>
    <LoadingSpinner v-if="loading" message="loading.warehouses" />
    <div v-else>
      <EntityTableCard
        :search-label="t('warehouses.search')"
        :new-item-label="t('warehouses.new')"
        :headers="headers"
        :items="warehouses"
        @create="openCreateDialog"
      >
        <template #item.id="{ item }">
          <span class="font-weight-bold text-primary">#WH-{{ item.id }}</span>
        </template>

        <template #item.name="{ item }">
          <span class="text-body-2">{{ item.name }}</span>
        </template>

        <template #item.location="{ item }">
          <span class="text-body-2">{{ item.location }}</span>
        </template>

        <template #item.actions="{ item }">
          <v-btn
            variant="text"
            color="primary"
            class="text-none font-weight-bold"
            @click="openProductsDialog(item)"
          >
            {{ t("warehouses.showProducts") }}
          </v-btn>
        </template>
      </EntityTableCard>

      <FormDialog
        v-model="dialog"
        :title="t('warehouses.dialogTitle')"
        :submit-label="t('warehouses.dialogSubmit')"
        :loading="formLoading"
        max-width="800"
        @submit="submitWarehouse"
      >
        <CreateWarehouseForm />
      </FormDialog>

      <WarehouseProductsDialog
        v-model="productsDialog"
        :title="productsDialogTitle"
        :items="warehouseProducts"
        :loading="productsLoading"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import EntityTableCard from '@/components/tables/EntityTableCard.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { useWarehouses } from '@/composables/useWarehouses'
import WarehouseProductsDialog from '@/components/dialogs/WarehouseProductsDialog.vue'
import FormDialog from '@/components/dialogs/FormDialog.vue'
import CreateWarehouseForm from '@/components/forms/CreateWarehouseForm.vue'
import { useLocale } from '@/composables/useLocale'

type WarehouseRow = {
  id: number
  name: string
}

const {
  warehouses,
  warehouseProducts,
  loading,
  productsLoading,
  formLoading,
  fetchWarehouses,
  fetchWarehouseProducts,
  createWarehouse,
  resetForm,
  clearWarehouseProducts,
} = useWarehouses()

const { t } = useLocale()
const dialog = ref(false)
const productsDialog = ref(false)
const selectedWarehouse = ref<WarehouseRow | null>(null)

onMounted(() => {
  fetchWarehouses()
})

const openCreateDialog = () => {
  dialog.value = true
}

const submitWarehouse = async () => {
  const saved = await createWarehouse()
  if (saved) {
    dialog.value = false
  }
}

const openProductsDialog = async (warehouse: WarehouseRow) => {
  selectedWarehouse.value = warehouse
  productsDialog.value = true
  await fetchWarehouseProducts(warehouse.id)
}

watch(productsDialog, (isOpen) => {
  if (!isOpen) {
    selectedWarehouse.value = null
    clearWarehouseProducts()
  }
})

watch(dialog, (isOpen) => {
  if (!isOpen) {
    resetForm()
  }
})

const productsDialogTitle = computed(() =>
  selectedWarehouse.value
    ? t("warehouses.productsTitleNamed", { name: selectedWarehouse.value.name })
    : t("warehouses.productsTitle"),
)

const headers = computed(() => [
  { title: t('warehouses.header.id'), key: 'id', align: 'start' as const },
  { title: t('warehouses.header.name'), key: 'name' },
  { title: t('warehouses.header.location'), key: 'location' },
  { title: t('warehouses.header.actions'), key: 'actions', sortable: false, align: 'end' as const },
])
</script>
