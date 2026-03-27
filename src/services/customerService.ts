import { http } from "@/api/http"
import { endpoints } from "@/api/endpoints"
import type { CustomerFormInput } from "@/types/customer"

export default {
  getCustomers() {
    return http.get(endpoints.customers)
  },

  createCustomer(payload: CustomerFormInput) {
    return http.post(endpoints.customers, payload)
  },

  deleteCustomer(customerId: number) {
    return http.delete(`${endpoints.customers}/${customerId}`)
  },
}
