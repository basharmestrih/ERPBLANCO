<template>
  <section>
    <LoadingSpinner v-if="loading" message="loading.products" />
    <div v-else>
      <EntityTableCard
        :search-label="t('products.search')"
        :new-item-label="t('products.new')"
        :headers="headers"
        :items="products"
        @create="openCreateDialog"
      >
        <template #item.name="{ item }">
          <span class="font-weight-bold text-primary">{{ item.name }}</span>
        </template>

        <template #item.price="{ item }">
          <span class="text-body-medium">
            ${{ formatPrice(item.price) }}
          </span>
        </template>

        <template #item.total_quantity="{ item }">
          <span>{{ item.total_quantity }}</span>
        </template>

        <template #item.created_at="{ item }">
          <div class="text-body-2">{{ formatDate(item.created_at) }}</div>
        </template>

        <template #item.actions="{ item }">
          <v-btn icon="mdi-dots-vertical" variant="text" size="small" color="grey-darken-1"></v-btn>
        </template>
      </EntityTableCard>

      <FormDialog
        v-model="dialog"
        :title="t('products.dialogTitle')"
        :submit-label="t('products.dialogSubmit')"
        :loading="formLoading"
        max-width="900"
        @submit="submitProduct"
      >
        <CreateProductForm />
      </FormDialog>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue"
import EntityTableCard from "@/components/tables/EntityTableCard.vue"
import FormDialog from "@/components/dialogs/FormDialog.vue"
import CreateProductForm from "@/components/forms/CreateProductForm.vue"
import { useProducts } from "@/composables/useProducts"
import LoadingSpinner from "@/components/LoadingSpinner.vue"
import { useLocale } from "@/composables/useLocale"

const {
  products,
  fetchProducts,
  loading,
  formLoading,
  createProduct,
  resetForm,
} = useProducts()

const { currentLocale, t } = useLocale()
const dialog = ref(false)

onMounted(() => {
  fetchProducts()
})

const openCreateDialog = () => {
  dialog.value = true
}

const submitProduct = async () => {
  const saved = await createProduct()
  if (saved) {
    dialog.value = false
  }
}

watch(dialog, (isOpen) => {
  if (!isOpen) {
    resetForm()
  }
})

const headers = computed(() => [
  { title: t("products.header.product"), key: "name", align: "start" as const },
  { title: t("products.header.price"), key: "price", align: "end" as const },
  { title: t("products.header.totalStock"), key: "total_quantity", align: "center" as const },
  { title: t("products.header.createdAt"), key: "created_at" },
  { title: t("products.header.actions"), key: "actions", sortable: false, align: "end" as const },
])

const formatPrice = (value?: string | number) =>
  Number(value ?? 0).toLocaleString(currentLocale.value, { minimumFractionDigits: 2 })

const formatDate = (value?: string) =>
  value ? new Date(value).toLocaleDateString(currentLocale.value) : "—"
</script>
