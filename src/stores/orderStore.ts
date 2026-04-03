import { defineStore } from "pinia"
import orderService from "@/services/orderService"
import { filterOrderCollection, getMockOrders } from "@/data/mockData"

interface OrderItem {
  product_id: number | null
  quantity: number
  price?: number
}

interface OrderForm {
  customer_id: number | null
  items: OrderItem[]
}

type OrderFilters = Partial<{
  status: string
  date: string
  created_by: string | number
  low_quantity: number
  high_quantity: number
}>

const normalizeFilters = (filters: OrderFilters = {}) =>
  Object.fromEntries(
    Object.entries(filters).filter(([, value]) => value !== "" && value !== null && value !== undefined),
  ) as OrderFilters

export const useOrderStore = defineStore("order", {
  state: () => ({
    orders: [] as any[],
    orderForm: {
      customer_id: null,
      items: [] as OrderItem[],
    },
    filters: {} as OrderFilters,
    loading: false,
  }),

  actions: {
    async fetchOrders(filters?: OrderFilters) {
      const nextFilters = normalizeFilters(filters ?? this.filters)

      this.loading = true
      this.filters = nextFilters

      try {
        const res = await orderService.getOrders(nextFilters)
        const payload = Array.isArray(res.data.data)
          ? res.data.data
          : Array.isArray(res.data)
            ? res.data
            : []

        this.orders = payload.length ? filterOrderCollection(payload, nextFilters) : getMockOrders(nextFilters)
      } catch (error) {
        this.orders = getMockOrders(nextFilters)
      } finally {
        this.loading = false
      }
    },

    addItem() {
      this.orderForm.items.push({ product_id: null, quantity: 1 })
    },

    removeItem(index: number) {
      this.orderForm.items.splice(index, 1)
    },

    resetForm() {
      this.orderForm = { customer_id: null, items: [] }
    },

    async createOrder() {
      if (!this.orderForm.items.length) return

      this.loading = true
      try {
        console.log(this.orderForm)
        await orderService.createOrder(this.orderForm)
        await this.fetchOrders()
        this.resetForm()
      } finally {
        this.loading = false
      }
    },

    async approveOrder(orderId: number) {
      this.loading = true
      try {
        //const user_id = localStorage.getItem("user_id")
        await orderService.approveOrder(orderId)
        await this.fetchOrders()
      } finally {
        this.loading = false
      }
    },

    async deleteOrder(orderId: number) {
      this.loading = true
      try {
        await orderService.deleteOrder(orderId)
        await this.fetchOrders()
      } finally {
        this.loading = false
      }
    },
  },
})
