<template>
  <v-form ref="form" :class="{ 'create-order-form--rtl': isRtl }">
    <v-row align="start">
      <v-col cols="12" md="6">
        <v-autocomplete
          v-model="orderForm.customer_id"
          :items="customers"
          item-title="name"
          item-value="id"
          :label="t('orders.form.customerSelection')"
          :prepend-inner-icon="isRtl ? undefined : 'mdi-account-outline'"
          :append-inner-icon="isRtl ? 'mdi-account-outline' : undefined"
          variant="outlined"
          density="compact"
          :loading="customersLoading"
          :placeholder="t('orders.form.customerPlaceholder')"
          hide-details
        />
      </v-col>

      <v-col cols="12" md="6">
        <v-row no-gutters class="fill-height align-center">
          <v-col cols="6" class="px-2">
            <div :class="['text-caption text-grey', { 'text-right': isRtl }]">{{ t("orders.form.contactNumber") }}</div>
            <div :class="['text-body-2 font-weight-medium', { 'text-right': isRtl }]">
              {{ selectedCustomer?.phone || "-" }}
            </div>
          </v-col>

          <v-col cols="6" class="px-2 border-s">
            <div :class="['text-caption text-grey', { 'text-right': isRtl }]">{{ t("orders.form.emailAddress") }}</div>
            <div :class="['text-body-2 font-weight-medium text-truncate', { 'text-right': isRtl }]">
              {{ selectedCustomer?.email || "-" }}
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-divider class="my-8" />

    <div :class="['d-flex align-center mb-6 create-order-form__section-header', { 'create-order-form__section-header--rtl': isRtl }]">
      <div>
        <h3 :class="['text-subtitle-1 font-weight-bold', { 'text-right': isRtl }]">{{ t("orders.form.lineItems") }}</h3>
        <p :class="['text-caption text-grey', { 'text-right': isRtl }]">{{ t("orders.form.lineItemsHint") }}</p>
      </div>

      <v-spacer />

      <v-btn
        :prepend-icon="isRtl ? undefined : 'mdi-plus'"
        :append-icon="isRtl ? 'mdi-plus' : undefined"
        variant="flat"
        color="blue-darken-2"
        size="small"
        @click="addItem"
      >
        {{ t("orders.form.addProduct") }}
      </v-btn>
    </div>

    <v-row
      :class="['d-none d-md-flex px-3 mb-2 text-caption font-weight-bold text-uppercase text-grey-darken-1', { 'create-order-form__columns--rtl': isRtl }]"
    >
      <v-col cols="5" :class="{ 'text-right': isRtl }">{{ t("orders.form.productDescription") }}</v-col>
      <v-col cols="2" :class="{ 'text-right': isRtl }">{{ t("orders.form.unitPrice") }}</v-col>
      <v-col cols="2" :class="{ 'text-right': isRtl }">{{ t("orders.form.quantity") }}</v-col>
      <v-col cols="2" class="text-right">{{ t("orders.form.subtotal") }}</v-col>
      <v-col cols="1"></v-col>
    </v-row>

    <div class="product-list-container">
      <template v-for="(item, index) in orderForm.items" :key="index">
        <v-row align="center" :class="['py-4 mx-0', { 'create-order-form__item-row--rtl': isRtl }]">
          <v-col cols="12" md="5">
            <v-autocomplete
              v-model="item.product_id"
              :items="products"
              item-title="name"
              item-value="id"
              :placeholder="t('orders.form.productPlaceholder')"
              variant="outlined"
              density="compact"
              hide-details
              @update:modelValue="val => setProductPrice(item, val)"
            />
          </v-col>

          <v-col cols="6" md="2">
            <v-text-field
              :value="item.price"
              prefix="$"
              variant="outlined"
              density="compact"
              hide-details
              readonly
            />
          </v-col>

          <v-col cols="6" md="2">
            <v-text-field
              v-model="item.quantity"
              type="number"
              variant="outlined"
              density="compact"
              hide-details
            />
          </v-col>

          <v-col cols="10" md="2" class="text-right font-weight-bold">
            ${{ Number(item.quantity * (item.price || 0)).toLocaleString(currentLocale) }}
          </v-col>

          <v-col cols="2" md="1" class="text-center">
            <v-btn
              icon="mdi-trash-can-outline"
              variant="text"
              color="error"
              size="small"
              @click="removeItem(index)"
            />
          </v-col>
        </v-row>

        <v-divider v-if="index < orderForm.items.length - 1" class="mx-3" />
      </template>
    </div>

    <v-card class="mt-10 rounded-xl" theme="dark" flat>
      <v-card-text class="pa-8">
        <v-row align="center" :class="{ 'create-order-form__summary-row--rtl': isRtl }">
          <v-col cols="12" md="5">
            <div :class="['text-h4 font-weight-bold mb-4', { 'text-right': isRtl }]">{{ t("orders.form.summaryTitle") }}</div>
            <div :class="['text-subtitle-1 opacity-70', { 'text-right': isRtl }]">
              {{ t("orders.form.summaryHint") }}
            </div>
          </v-col>

          <v-col cols="12" md="7">
            <div :class="['d-flex flex-column', isRtl ? 'align-start' : 'align-end']">
              <div class="d-flex justify-space-between w-100 max-width-400 mb-2">
                <span>{{ t("orders.form.subtotal") }}</span>
                <span>${{ calculateTotal.toLocaleString(currentLocale) }}</span>
              </div>

              <v-divider class="w-100 max-width-400 mb-4" />

              <div class="d-flex justify-space-between w-100 max-width-400">
                <span class="text-h6">{{ t("orders.form.grandTotal") }}</span>
                <span class="text-h5 font-weight-bold">
                  ${{ calculateTotal.toLocaleString(currentLocale) }}
                </span>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-form>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue"
import { useOrders } from "@/composables/useOrders"
import { useCustomers } from "@/composables/useCustomers"
import { useProducts } from "@/composables/useProducts"
import { useLocale } from "@/composables/useLocale"

const { orderForm, addItem, removeItem } = useOrders()
const { customers, fetchCustomers, loading: customersLoading } = useCustomers()
const { products, fetchProducts } = useProducts()
const { currentLocale, isRtl, t } = useLocale()

onMounted(() => {
  fetchCustomers()
  fetchProducts()
  if (!orderForm.value.items.length) addItem()
})

const selectedCustomer = computed(() => customers.value.find((c) => c.id === orderForm.value.customer_id))

const calculateTotal = computed(() =>
  orderForm.value.items.reduce((acc, item) => acc + item.quantity * (item.price || 0), 0),
)

const setProductPrice = (item: any, productId: number) => {
  const product = products.value.find((p) => p.id === productId)
  item.price = product ? Number(product.price) : 0
}
</script>

<style scoped>
.create-order-form--rtl {
  direction: rtl;
  text-align: right;
}

.create-order-form--rtl :deep(.v-field),
.create-order-form--rtl :deep(.v-field__input),
.create-order-form--rtl :deep(.v-field__field),
.create-order-form--rtl :deep(.v-autocomplete),
.create-order-form--rtl :deep(.v-text-field) {
  text-align: right;
}

.create-order-form__section-header--rtl,
.create-order-form__columns--rtl,
.create-order-form__item-row--rtl,
.create-order-form__summary-row--rtl {
  direction: rtl;
}

.product-list-container {
  max-height: 350px;
  overflow-y: auto;
}
</style>
