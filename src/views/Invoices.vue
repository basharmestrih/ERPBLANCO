<template>
  <section>
    <LoadingSpinner v-if="loading" message="loading.invoices" />
    <div v-else>
      <EntityTableCard
        :search-label="t('invoices.search')"
        :new-item-label="t('invoices.new')"
        :headers="headers"
        :items="invoices"
      >
        <template #filters>
          <ActionChips :chips="filterChips" />
        </template>

        <template #item.invoice_number="{ item }">
          <span class="font-weight-bold text-primary">{{ item.invoice_number }}</span>
        </template>

        <template #item.total_amount="{ item }">
          <span class="font-weight-medium">
            ${{ Number(item.total_amount).toLocaleString(currentLocale, { minimumFractionDigits: 2 }) }}
          </span>
        </template>

        <template #item.state="{ item }">
          <v-chip
            :color="getStateColor(String(item.state))"
            size="small"
            label
            class="text-uppercase font-weight-bold"
            variant="tonal"
          >
            {{ item.state }}
          </v-chip>
        </template>

        <template #item.payment_status="{ item }">
          <v-chip
            :color="getPaymentStatusColor(String(item.payment_status))"
            size="small"
            label
            class="text-uppercase font-weight-bold"
            variant="tonal"
          >
            {{ item.payment_status }}
          </v-chip>
        </template>

        <template #item.issued_at="{ item }">
          <div class="text-body-2">{{ formatDate(String(item.issued_at)) }}</div>
        </template>

        <template #item.due_date="{ item }">
          <div class="text-body-2">{{ formatDate(String(item.due_date)) }}</div>
        </template>

        <template #item.paid_at="{ item }">
          <div class="text-body-2">
            {{ item.paid_at ? formatDate(String(item.paid_at)) : t("common.notPaid") }}
          </div>
        </template>

      </EntityTableCard>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import EntityTableCard from '@/components/tables/EntityTableCard.vue'
import { useInvoices } from '@/composables/useInvoices'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ActionChips from '@/components/filters/ActionChips.vue'
import { useLocale } from '@/composables/useLocale'

type InvoiceFilters = Partial<{
  status: string
  date: string
  total: number
}>

const {
  invoices,
  fetchInvoices,
  loading,
} = useInvoices()

const { currentLocale, t } = useLocale()
const activeFilter = ref("all")

onMounted(() => {
  fetchInvoices()
})

const applyFilter = async (filterKey: string, filters: InvoiceFilters = {}) => {
  activeFilter.value = filterKey
  await fetchInvoices(filters)
}

const today = new Date().toISOString().split("T")[0]

const filterChips = computed(() => [
  { title: t("invoices.filter.all"), active: activeFilter.value === "all", action: () => applyFilter("all") },
  { title: t("invoices.filter.pending"), active: activeFilter.value === "pending", action: () => applyFilter("pending", { status: "pending" }) },
  { title: t("invoices.filter.paid"), active: activeFilter.value === "paid", action: () => applyFilter("paid", { status: "paid" }) },
  { title: t("invoices.filter.today"), active: activeFilter.value === "today", action: () => applyFilter("today", { date: today }) },
  { title: t("invoices.filter.high"), active: activeFilter.value === "high", action: () => applyFilter("high", { total: 1000 }) },
])

const headers = computed(() => [
  { title: t('invoices.header.invoiceNumber'), key: 'invoice_number', align: 'start' as const },
  { title: t('invoices.header.orderId'), key: 'order_id', align: 'start' as const },
  { title: t('invoices.header.customer'), key: 'customer_id', align: 'start' as const },
  { title: t('invoices.header.paymentStatus'), key: 'payment_status', align: 'center' as const },
  { title: t('invoices.header.state'), key: 'state', align: 'center' as const },
  { title: t('invoices.header.total'), key: 'total_amount', align: 'end' as const },
  { title: t('invoices.header.dueDate'), key: 'due_date', align: 'end' as const },
  { title: t('invoices.header.issuedAt'), key: 'issued_at', align: 'end' as const },
  { title: t('invoices.header.issuedBy'), key: 'issued_by', align: 'start' as const },
])

const getStateColor = (state: string) => {
  switch (state) {
    case 'Draft': return 'grey'
    case 'UNPAID': return 'info'
    case 'Paid': return 'success'
    case 'Overdue': return 'error'
    default: return 'grey'
  }
}

const getPaymentStatusColor = (status: string) => {
  switch (status) {
    case 'paid': return 'success'
    case 'pending': return 'warning'
    case 'unpaid': return 'error'
    default: return 'grey'
  }
}

const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString(currentLocale.value)
</script>
