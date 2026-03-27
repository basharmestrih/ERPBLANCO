<template>
  <section>
    <LoadingSpinner v-if="loading" message="loading.reporting" />
    <div v-else>
      <EntityTableCard
        :search-label="t('reporting.search')"
        :new-item-label="t('reporting.new')"
        :headers="headers"
        :items="reportRows"
      >
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

        <template #item.unit_price="{ item }">
          <span class="font-weight-medium">
            ${{ Number(item.unit_price).toLocaleString(currentLocale, { minimumFractionDigits: 2 }) }}
          </span>
        </template>

        <template #item.subtotal="{ item }">
          <span class="font-weight-medium">
            ${{ Number(item.subtotal).toLocaleString(currentLocale, { minimumFractionDigits: 2 }) }}
          </span>
        </template>

        <template #item.invoice_total="{ item }">
          <span class="font-weight-bold">
            ${{ Number(item.invoice_total).toLocaleString(currentLocale, { minimumFractionDigits: 2 }) }}
          </span>
        </template>

        <template #item.actions="{ item }">
          <v-btn icon="mdi-download" variant="text" size="small" color="primary"></v-btn>
        </template>
      </EntityTableCard>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import EntityTableCard from '@/components/tables/EntityTableCard.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { useLocale } from '@/composables/useLocale'

const loading = ref(false)
const { currentLocale, t } = useLocale()

const headers = computed(() => [
  { title: t('reporting.header.invoiceNumber'), key: 'invoice_number', align: 'start' as const },
  { title: t('reporting.header.customer'), key: 'customer' },
  { title: t('reporting.header.invoiceDate'), key: 'invoice_date' },
  { title: t('reporting.header.dueDate'), key: 'due_date' },
  { title: t('reporting.header.state'), key: 'state', align: 'center' as const },
  { title: t('reporting.header.product'), key: 'product' },
  { title: t('reporting.header.quantity'), key: 'quantity', align: 'end' as const },
  { title: t('reporting.header.unitPrice'), key: 'unit_price', align: 'end' as const },
  { title: t('reporting.header.subtotal'), key: 'subtotal', align: 'end' as const },
  { title: t('reporting.header.invoiceTotal'), key: 'invoice_total', align: 'end' as const },
  { title: t('reporting.header.actions'), key: 'actions', sortable: false, align: 'center' as const },
])

const getStateColor = (state: string) => {
  switch (state) {
    case 'Paid': return 'success'
    case 'Issued': return 'info'
    case 'Overdue': return 'error'
    default: return 'grey'
  }
}

const reportRows = ref([
  {
    invoice_number: 'INV-2026-0001',
    customer: 'Maria Millijas',
    invoice_date: '2026-03-01',
    due_date: '2026-03-15',
    state: 'Issued',
    product: 'Wireless Mouse',
    quantity: 2,
    unit_price: 25.0,
    subtotal: 50.0,
    invoice_total: 250.0,
  },
  {
    invoice_number: 'INV-2026-0002',
    customer: 'Pola Svente',
    invoice_date: '2026-03-02',
    due_date: '2026-03-16',
    state: 'Paid',
    product: 'Mechanical Keyboard',
    quantity: 1,
    unit_price: 110.5,
    subtotal: 110.5,
    invoice_total: 430.5,
  },
  {
    invoice_number: 'INV-2026-0003',
    customer: 'Lina Noor',
    invoice_date: '2026-02-20',
    due_date: '2026-03-01',
    state: 'Overdue',
    product: 'Webcam HD',
    quantity: 3,
    unit_price: 40.0,
    subtotal: 120.0,
    invoice_total: 120.0,
  },
])
</script>
