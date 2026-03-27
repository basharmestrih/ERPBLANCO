import { http } from "@/api/http"
import { endpoints } from "@/api/endpoints"
import type { WarehouseFormInput } from "@/types/warehouse"

export default {
  getWarehouses() {
    return http.get(endpoints.warehouses)
  },

  createWarehouse(payload: WarehouseFormInput) {
    return http.post(endpoints.warehouses, payload)
  },

  getWarehouseProducts(warehouseId: number) {
    return http.get(endpoints.productWarehouses(warehouseId), )
  },
}
