import { http } from "@/api/http"
import { endpoints } from "@/api/endpoints"

export default {
  getInvoices(params: Record<string, unknown> = {}) {
    return http.get(endpoints.invoices, { params })
  },
}
