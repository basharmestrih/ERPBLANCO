import { storeToRefs } from "pinia"
import { useOrderStore } from "@/stores/orderStore"

export function useOrders() {
  const store = useOrderStore()

  const { orders, loading, orderForm, filters } = storeToRefs(store)

  return {
    orders,
    loading,
    orderForm,
    filters,
    fetchOrders: (query?: Record<string, unknown>) => store.fetchOrders(query),
    addItem: store.addItem,
    removeItem: store.removeItem,
    createOrder: store.createOrder,
    approveOrder: store.approveOrder,
    deleteOrder: store.deleteOrder,
    resetForm: store.resetForm,
  }
}
