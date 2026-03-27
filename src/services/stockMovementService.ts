import { http } from "@/api/http"
import { endpoints } from "@/api/endpoints"

export default {
  getStockMovements(params: Record<string, unknown> = {}) {
    return http.get(endpoints.stockMovements, { params })
  },

  createStockMovement(payload: any) {
    return http.post(endpoints.stockMovements, payload)
  },
}
