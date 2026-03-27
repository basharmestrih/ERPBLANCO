import { http } from "@/api/http"
import { endpoints } from '@/api/endpoints'

export default {
  getOrders(params: Record<string, unknown> = {}) {
    return http.get(endpoints.orders, { params })
  },

  createOrder(payload: any) {
    return http.post(endpoints.orders, payload)
  },

  approveOrder(id: number) {
    return http.post(endpoints.approveOrder(id))
  },

  deleteOrder(id: number) {
    return http.delete(endpoints.deleteOrder(id))
  },
}
