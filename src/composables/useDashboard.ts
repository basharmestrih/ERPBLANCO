import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useLocale } from '@/composables/useLocale'
import { useDashboardStore } from '@/stores/dashboardStore'

const formatCurrency = (amount?: string) => {
  if (amount == null || amount === '') {
    return '—'
  }

  const parsed = Number(amount)
  if (Number.isNaN(parsed)) {
    return amount
  }

  return parsed.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

const formatCount = (value?: number | string) => {
  if (value === undefined || value === null) {
    return '—'
  }

  return String(value)
}

export function useDashboard() {
  const store = useDashboardStore()
  const { dashboardData, loading, refreshing } = storeToRefs(store)
  const { t } = useLocale()

  const dashboardStats = computed(() => {
    const data = dashboardData.value
    const lowInventory = data?.low_inventory

    return [
      {
        title: t('dashboard.ordersToday'),
        value: formatCount(data?.total_orders),
        icon: 'mdi-cart-outline',
      },
      {
        title: t('dashboard.revenue'),
        value: data ? formatCurrency(data.total_orders_cost) : '—',
        icon: 'mdi-cash-multiple',
      },
      {
        title: t('dashboard.pendingPayments'),
        value: formatCount(data?.pending_invoices),
        icon: 'mdi-timer-sand',
      },
      {
        title: t('dashboard.lowInventory'),
        value: formatCount(lowInventory?.quantity),
        icon: 'mdi-alert-outline',
        subtitle: lowInventory?.product_name ?? '',
      },
    ]
  })

  onMounted(() => {
    store.fetchDashboard()
  })

  return {
    dashboardData,
    dashboardStats,
    loading,
    refreshing,
    refreshDashboard: store.refreshDashboard,
    t,
  }
}
