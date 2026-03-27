<template>
  <section>
    <LoadingSpinner v-if="loading" message="loading.customers" />
    <div v-else>
      <EntityTableCard
        :search-label="t('customers.search')"
        :new-item-label="t('customers.new')"
        :headers="headers"
        :items="customers"
        @create="openCreateDialog"
      >
        <template #item.id="{ item }">
          <span class="font-weight-bold text-primary">#CUS-{{ item.id }}</span>
        </template>

        <template #item.name="{ item }">
          <span class="text-body-2 font-weight-medium">{{ item.name }}</span>
        </template>

        <template #item.phone="{ item }">
          <span class="text-body-2">{{ item.phone || t("common.na") }}</span>
        </template>

        <template #item.email="{ item }">
          <span class="text-body-2">{{ item.email || t("common.na") }}</span>
        </template>

        <template #item.company="{ item }">
          <span class="text-body-2">{{ item.company || t("common.na") }}</span>
        </template>

        <template #item.status="{ item }">
          <v-chip
            :color="getStatusColor(String(item.status || 'inactive'))"
            size="small"
            label
            class="text-uppercase font-weight-bold"
            variant="tonal"
          >
            {{ item.status ? t(`common.status.${String(item.status).toLowerCase()}`) : t("common.status.inactive") }}
          </v-chip>
        </template>

        <template #item.total_orders="{ item }">
          <span class="text-body-2">{{ item.total_orders ?? 0 }}</span>
        </template>

        <template #item.total_spent="{ item }">
          <span class="font-weight-medium">
            ${{ formatMoney(item.total_spent) }}
          </span>
        </template>

        <template #item.actions="{ item }">
          <v-btn
            icon="mdi-delete-outline"
            variant="text"
            size="small"
            color="error"
            @click="openDeleteConfirmation(item)"
          />
        </template>
      </EntityTableCard>

      <FormDialog
        v-model="dialog"
        :title="t('customers.dialogTitle')"
        :submit-label="t('customers.dialogSubmit')"
        :loading="formLoading"
        max-width="900"
        @submit="submitCustomer"
      >
        <CreateCustomerForm />
      </FormDialog>

      <ConfirmationDialog
        v-model="confirmationDialog"
        :title="confirmationTitle"
        :message="confirmationMessage"
        :confirm-label="t('common.delete')"
        confirm-color="error"
        :action="confirmDelete"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import EntityTableCard from '@/components/tables/EntityTableCard.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { useCustomers } from '@/composables/useCustomers'
import FormDialog from '@/components/dialogs/FormDialog.vue'
import ConfirmationDialog from '@/components/dialogs/ConfirmationDialog.vue'
import CreateCustomerForm from '@/components/forms/CreateCustomerForm.vue'
import { useLocale } from '@/composables/useLocale'

type CustomerRow = {
  id: number
  name: string
}

const {
  customers,
  formLoading,
  loading,
  fetchCustomers,
  createCustomer,
  deleteCustomer,
  resetForm,
} = useCustomers()

const { currentLocale, t } = useLocale()
const dialog = ref(false)
const confirmationDialog = ref(false)
const selectedCustomer = ref<CustomerRow | null>(null)

onMounted(() => {
  fetchCustomers()
})

const openCreateDialog = () => {
  dialog.value = true
}

const submitCustomer = async () => {
  const saved = await createCustomer()
  if (saved) {
    dialog.value = false
  }
}

const openDeleteConfirmation = (customer: CustomerRow) => {
  selectedCustomer.value = customer
  confirmationDialog.value = true
}

watch(dialog, (isOpen) => {
  if (!isOpen) {
    resetForm()
  }
})

const confirmationTitle = computed(() => t("customers.confirmDeleteTitle"))

const confirmationMessage = computed(() => {
  if (!selectedCustomer.value) return ""
  return t("customers.confirmDeleteMessage", { name: selectedCustomer.value.name })
})

const confirmDelete = async () => {
  if (!selectedCustomer.value) return

  await deleteCustomer(selectedCustomer.value.id)
  selectedCustomer.value = null
}

const headers = computed(() => [
  { title: t('customers.header.id'), key: 'id', align: 'start' as const },
  { title: t('customers.header.name'), key: 'name' },
  { title: t('customers.header.phone'), key: 'phone' },
  { title: t('customers.header.email'), key: 'email' },
  { title: t('customers.header.company'), key: 'company' },
  { title: t('customers.header.status'), key: 'status', align: 'center' as const },
  { title: t('customers.header.orders'), key: 'total_orders', align: 'end' as const },
  { title: t('customers.header.totalSpent'), key: 'total_spent', align: 'end' as const },
  { title: t('customers.header.actions'), key: 'actions', sortable: false, align: 'end' as const },
])

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'active': return 'success'
    case 'inactive': return 'grey'
    default: return 'warning'
  }
}

const formatMoney = (value?: number | string | null) =>
  Number(value ?? 0).toLocaleString(currentLocale.value, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
</script>
