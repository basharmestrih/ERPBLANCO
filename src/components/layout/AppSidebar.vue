<template>
  <div class="d-flex flex-column fill-height">
    <v-list-item
      class="px-4 py-3"
      lines="two"
      :class="{ 'app-sidebar-brand--rtl': isRtl }"
      :prepend-icon="isRtl ? undefined : 'mdi-chart-line'"
      :append-icon="isRtl ? 'mdi-chart-line' : undefined"
    >
      <template #title>
        <span class="text-h6 font-weight-bold">{{ t("app.brand") }}</span>
      </template>
      <template #subtitle>
        <span style="font-size: 0.65rem; opacity: 0.8;">{{ t("app.version") }}</span>
      </template>
    </v-list-item>

    <v-divider></v-divider>

    <div class="flex-grow-1 overflow-y-auto">
      <v-list density="compact" nav>
        <template v-for="(group, index) in groupedMenu" :key="index">
          <v-list-subheader
            v-if="group.header"
            class="text-uppercase font-weight-bold"
            :class="{ 'app-sidebar-subheader--rtl': isRtl }"
            style="font-size: 0.7rem;"
          >
            {{ t(group.header) }}
          </v-list-subheader>

          <AppSidebarItem
            v-for="item in group.items"
            :key="item.value"
            :icon="item.icon"
            :title="t(item.title)"
            :value="item.value"
            :is-logout="item.isLogout"
          />
          
          <v-divider v-if="index < groupedMenu.length - 1" class="my-2"></v-divider>
        </template>
      </v-list>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppSidebarItem from './AppSidebarItem.vue'
import { useLocale } from '@/composables/useLocale'

const { isRtl, t } = useLocale()

// Organizing data into logical "Chunks"
const groupedMenu = [
  {
    header: 'nav.main',
    items: [
      { icon: 'mdi-view-dashboard-outline', title: 'nav.dashboard', value: '' },
    ]
  },
  {
      header: 'nav.inventorySales',
      items: [
        { icon: 'mdi-cart-outline', title: 'nav.orders', value: 'orders' },
        { icon: 'mdi-package-variant-closed', title: 'nav.stockMovement', value: 'stock-movement' },
        { icon: 'mdi-file-document-outline', title: 'nav.invoices', value: 'invoices' },
        { icon: 'mdi-package-variant', title: 'nav.products', value: 'products' },
        { icon: 'mdi-warehouse', title: 'nav.warehouses', value: 'warehouses' },
      ]
    },
  {
    header: 'nav.relationships',
    items: [
      { icon: 'mdi-account-group-outline', title: 'nav.customers', value: 'customers' },
      { icon: 'mdi-account-cog-outline', title: 'nav.users', value: 'users' },
    ]
  },
  {
    header: 'nav.insightsFinance',
    items: [
      { icon: 'mdi-chart-line', title: 'nav.reporting', value: 'reporting' },
      { icon: 'mdi-credit-card-outline', title: 'nav.payments', value: 'payments' },
    ]
  },
  {
    header: 'nav.system',
    items: [
      { icon: 'mdi-cog-outline', title: 'nav.settings', value: 'settings' },
      { icon: 'mdi-help-circle-outline', title: 'nav.support', value: 'support' },
      { icon: 'mdi-logout', title: 'nav.logout', value: 'logout', isLogout: true },
    ]
  }
]
</script>

<style scoped>
.overflow-y-auto {
  overflow-y: auto;
  scrollbar-width: none; 
}
.overflow-y-auto::-webkit-scrollbar {
  display: none;
}
/* Optional: Soften the subheader color */
:deep(.v-list-subheader) {
  color: rgba(var(--v-theme-on-surface), 0.6) !important;
}

.app-sidebar-subheader--rtl {
  direction: rtl;
  text-align: right;
}

.app-sidebar-subheader--rtl :deep(.v-list-subheader__text) {
  text-align: right;
  width: 100%;
}

.app-sidebar-brand--rtl {
  text-align: right;
}

.app-sidebar-brand--rtl :deep(.v-list-item__content) {
  text-align: right;
}
</style>
