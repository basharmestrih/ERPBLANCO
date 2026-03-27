<template>
  <section>
    <LoadingSpinner v-if="loading" message="loading.stockMovements" />
    <div v-else>
      <EntityTableCard
        :search-label="t('stock.search')"
        :new-item-label="t('stock.new')"
        :headers="headers"
        :items="stockMovements"
        @create="openCreateDialog"
      >
        <template #filters>
          <ActionChips :chips="filterChips" />
        </template>

        <template #item.id="{ item }">
          <span class="font-weight-bold text-primary">#MOV-{{ item.id }}</span>
        </template>

        <template #item.product_id="{ item }">
          <span class="text-body-2">
            {{ item.product?.name ?? `#${item.product_id}` }}
          </span>
        </template>

        <template #item.warehouse_id="{ item }">
          <span class="text-body-2">
            {{ item.warehouse?.name ?? `#${item.warehouse_id}` }}
          </span>
        </template>

        <template #item.type="{ item }">
          <v-chip
            :color="getTypeColor(String(item.type))"
            size="small"
            label
            class="text-uppercase font-weight-bold"
            variant="tonal"
          >
            {{ item.type }}
          </v-chip>
        </template>

        <template #item.quantity="{ item }">
          <span class="font-weight-medium">
            {{ Number(item.quantity).toLocaleString(currentLocale, { minimumFractionDigits: 2 }) }}
          </span>
        </template>

        <template #item.reference="{ item }">
          <span class="text-body-2">
            {{ item.reference_type ? t("stock.reference", { type: item.reference_type, id: item.reference_id ?? "" }) : t("common.na") }}
          </span>
        </template>

        <template #item.created_at="{ item }">
          <div class="text-body-2">{{ formatDate(String(item.created_at)) }}</div>
          <div class="text-caption text-medium-emphasis">{{ t("orders.at") }} {{ formatTime(String(item.created_at)) }}</div>
        </template>

        <template #item.created_by="{ item }">
          <span class="text-body-2">
            {{ item.user?.name ?? `#${item.created_by}` }}
          </span>
        </template>

        <template #item.actions="{ item }">
          <v-btn icon="mdi-dots-vertical" variant="text" size="small" color="grey-darken-1"></v-btn>
        </template>
      </EntityTableCard>

      <FormDialog
        v-model="dialog"
        :title="t('stock.dialogTitle')"
        :submit-label="t('stock.dialogSubmit')"
        :loading="formLoading"
        max-width="900"
        @submit="submitMovement"
      >
        <CreateStockMovementForm />
      </FormDialog>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import EntityTableCard from '@/components/tables/EntityTableCard.vue'
import { useStockMovements } from '@/composables/useStockMovements'
import FormDialog from '@/components/dialogs/FormDialog.vue'
import CreateStockMovementForm from '@/components/forms/CreateStockMovementForm.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ActionChips from '@/components/filters/ActionChips.vue'
import { useLocale } from '@/composables/useLocale'

type StockMovementFilters = Partial<{
  type: "in" | "out" | "adjustment"
  date: string
  quantity: number
}>

const {
  stockMovements,
  fetchStockMovements,
  loading,
  formLoading,
  createStockMovement,
  resetForm,
} = useStockMovements()

const { currentLocale, t } = useLocale()
const dialog = ref(false)
const activeFilter = ref("all")

onMounted(() => {
  fetchStockMovements()
})

const openCreateDialog = () => {
  dialog.value = true
}

const submitMovement = async () => {
  const saved = await createStockMovement()
  if (saved) {
    dialog.value = false
  }
}

const applyFilter = async (filterKey: string, filters: StockMovementFilters = {}) => {
  activeFilter.value = filterKey
  await fetchStockMovements(filters)
}

watch(dialog, (isOpen) => {
  if (!isOpen) resetForm()
})

const today = new Date().toISOString().split("T")[0]

const filterChips = computed(() => [
  { title: t("stock.filter.all"), active: activeFilter.value === "all", action: () => applyFilter("all") },
  { title: t("stock.filter.in"), active: activeFilter.value === "in", action: () => applyFilter("in", { type: "in" }) },
  { title: t("stock.filter.out"), active: activeFilter.value === "out", action: () => applyFilter("out", { type: "out" }) },
  { title: t("stock.filter.adjustment"), active: activeFilter.value === "adjustment", action: () => applyFilter("adjustment", { type: "adjustment" }) },
  { title: t("stock.filter.today"), active: activeFilter.value === "today", action: () => applyFilter("today", { date: today }) },
  { title: t("stock.filter.large"), active: activeFilter.value === "large", action: () => applyFilter("large", { quantity: 200 }) },
])

const headers = computed(() => [
  { title: t('stock.header.date'), key: 'created_at', align: 'start' as const },
  { title: t('stock.header.id'), key: 'id', align: 'start' as const },
  { title: t('stock.header.product'), key: 'product_id', align: 'start' as const },
  { title: t('stock.header.warehouse'), key: 'warehouse_id', align: 'start' as const },
  { title: t('stock.header.type'), key: 'type', align: 'center' as const },
  { title: t('stock.header.quantity'), key: 'quantity', align: 'end' as const },
  { title: t('stock.header.actions'), key: 'actions', sortable: false, align: 'end' as const },
])

const getTypeColor = (type: string) => {
  switch (type) {
    case 'in': return 'success'
    case 'out': return 'error'
    case 'adjustment': return 'warning'
    default: return 'grey'
  }
}

const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString(currentLocale.value)
const formatTime = (dateStr: string) =>
  new Date(dateStr).toLocaleTimeString(currentLocale.value, { hour: '2-digit', minute: '2-digit' })
</script>
