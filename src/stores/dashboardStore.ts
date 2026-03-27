import { defineStore } from "pinia"
import dashboardService from "@/services/dashboardService"

type LowInventory = {
  quantity: number
  product_id: number
  product_name: string
}

export type DashboardData = {
  total_orders: number
  total_orders_cost: string
  pending_invoices: number
  low_inventory: LowInventory
}

interface DashboardState {
  loading: boolean
  refreshing: boolean
  dashboardData: DashboardData | null
}

export const useDashboardStore = defineStore("dashboard", {
  state: (): DashboardState => ({
    loading: false,
    refreshing: false,
    dashboardData: null,
  }),

  actions: {
    async fetchDashboard(isRefresh = false) {
      if (isRefresh) {
        this.refreshing = true
      } else {
        this.loading = true
      }

      try {
        const response = await dashboardService.getDashboard()
        this.dashboardData = response.data.data
      } catch (error) {
        console.error("Failed to load dashboard data", error)
      } finally {
        if (isRefresh) {
          this.refreshing = false
        } else {
          this.loading = false
        }
      }
    },

    refreshDashboard() {
      return this.fetchDashboard(true)
    },
  },
})
