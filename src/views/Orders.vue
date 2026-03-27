<template>
  <section>
    <LoadingSpinner v-if="loading" message="loading.orders" />
    <div v-else>
      <EntityTableCard
        :search-label="t('orders.search')"
        :new-item-label="t('orders.new')"
        :headers="headers"
        :items="orders"
        @create="openCreateDialog"
      >
        <template #filters>
          <ActionChips :chips="filterChips" />
        </template>

        <template #item.id="{ item }">
          <span class="font-weight-bold text-primary">#ORD-{{ item.id }}</span>
        </template>

        <template #item.customer="{ item }">
          {{ item.customer?.name ?? t("orders.unknownCustomer") }}
        </template>

        <template #item.state="{ item }">
          <v-chip
            :color="getStatusColor(item.state)"
            size="small"
            label
            variant="tonal"
          >
            {{ item.state }}
          </v-chip>
        </template>

        <template #item.total_amount="{ item }">
          ${{ Number(item.total_amount).toLocaleString(currentLocale, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
        </template>

        <template #item.created_at="{ item }">
          <div class="text-body-2">{{ formatDate(item.created_at) }}</div>
          <div class="text-caption text-medium-emphasis">
            {{ t("orders.at") }} {{ formatTime(item.created_at) }}
          </div>
        </template>

        <template #item.actions="{ item }">
          <div class="d-flex justify-end ga-2">
            <v-btn
              icon="mdi-check"
              size="small"
              variant="tonal"
              color="success"
              :disabled="isApproved(item.state)"
              @click="openConfirmation('approve', item)"
            />

            <v-btn
              icon="mdi-close"
              size="small"
              variant="tonal"
              color="error"
              @click="openConfirmation('delete', item)"
            />
          </div>
        </template>
      </EntityTableCard>

      <FormDialog
        v-model="dialog"
        :title="t('orders.dialogTitle')"
        :submit-label="t('orders.dialogSubmit')"
        :loading="loading"
        max-width="950"
        @submit="submitOrder"
      >
        <CreateOrderForm />
      </FormDialog>

      <ConfirmationDialog
        v-model="confirmationDialog"
        :title="confirmationTitle"
        :message="confirmationMessage"
        :confirm-label="confirmationLabel"
        :confirm-color="confirmationColor"
        :action="confirmationAction"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import EntityTableCard from "@/components/tables/EntityTableCard.vue"
import FormDialog from "@/components/dialogs/FormDialog.vue"
import ConfirmationDialog from "@/components/dialogs/ConfirmationDialog.vue"
import ActionChips from "@/components/filters/ActionChips.vue"
import CreateOrderForm from "@/components/forms/CreateOrderForm.vue"
import LoadingSpinner from "@/components/LoadingSpinner.vue"
import { useOrders } from "@/composables/useOrders"
import { useLocale } from "@/composables/useLocale"

type OrderAction = "approve" | "delete"
type OrderFilters = Partial<{
  status: string
  date: string
  created_by: string | number
  low_quantity: number
  high_quantity: number
}>
type OrderRow = {
  id: number
  state: string
}

const {
  orders,
  fetchOrders,
  loading,
  createOrder,
  approveOrder,
  deleteOrder,
} = useOrders()

const { currentLocale, t } = useLocale()
const dialog = ref(false)
const confirmationDialog = ref(false)
const selectedOrder = ref<OrderRow | null>(null)
const selectedAction = ref<OrderAction>("approve")
const activeFilter = ref("all")

const submitOrder = async () => {
  await createOrder()
  dialog.value = false
}

const openCreateDialog = () => {
  dialog.value = true
}

const openConfirmation = (action: OrderAction, order: OrderRow) => {
  selectedAction.value = action
  selectedOrder.value = order
  confirmationDialog.value = true
}

const applyFilter = async (filterKey: string, filters: OrderFilters = {}) => {
  activeFilter.value = filterKey
  await fetchOrders(filters)
}

const confirmationTitle = computed(() =>
  selectedAction.value === "approve" ? t("orders.confirmApproveTitle") : t("orders.confirmDeleteTitle"),
)

const confirmationMessage = computed(() => {
  if (!selectedOrder.value) return ""

  const orderReference = `#ORD-${selectedOrder.value.id}`

  return selectedAction.value === "approve"
    ? t("orders.confirmApproveMessage", { orderReference })
    : t("orders.confirmDeleteMessage", { orderReference })
})

const confirmationLabel = computed(() =>
  selectedAction.value === "approve" ? t("common.approve") : t("common.delete"),
)

const confirmationColor = computed(() =>
  selectedAction.value === "approve" ? "success" : "error",
)

const confirmationAction = async () => {
  if (!selectedOrder.value) return

  if (selectedAction.value === "approve") {
    await approveOrder(selectedOrder.value.id)
    return
  }

  await deleteOrder(selectedOrder.value.id)
}

const today = new Date().toISOString().split("T")[0]

const filterChips = computed(() => [
  {
    title: t("orders.filter.all"),
    active: activeFilter.value === "all",
    action: () => applyFilter("all"),
  },
  {
    title: t("orders.filter.pending"),
    active: activeFilter.value === "pending",
    action: () => applyFilter("pending", { status: "pending" }),
  },
  {
    title: t("orders.filter.approved"),
    active: activeFilter.value === "approved",
    action: () => applyFilter("approved", { status: "approved" }),
  },
  {
    title: t("orders.filter.today"),
    active: activeFilter.value === "today",
    action: () => applyFilter("today", { date: today }),
  },
  {
    title: t("orders.filter.bulk"),
    active: activeFilter.value === "bulk",
    action: () => applyFilter("bulk", { low_quantity: 10 }),
  },
])

onMounted(() => {
  fetchOrders()
})

const headers = computed(() => [
  { title: t('orders.header.id'), key: 'id', align: 'start' as const, width: '120px' },
  { title: t('orders.header.customer'), key: 'customer', align: 'start' as const },
  { title: t('orders.header.status'), key: 'state', align: 'center' as const },
  { title: t('orders.header.total'), key: 'total_amount', align: 'end' as const },
  { title: t('orders.header.dateCreated'), key: 'created_at', align: 'end' as const },
  { title: t('orders.header.actions'), key: 'actions', sortable: false, align: 'end' as const },
])

const getStatusColor = (status: string) => {
  if (status === "Approved") return "success"
  if (status === "Pending") return "warning"
  if (status === "Cancelled") return "error"
  return "grey"
}

const isApproved = (status: string) => status === "Approved"

const formatDate = (date: string) => new Date(date).toLocaleDateString(currentLocale.value)
const formatTime = (date: string) =>
  new Date(date).toLocaleTimeString(currentLocale.value, { hour: "2-digit", minute: "2-digit" })
</script>
