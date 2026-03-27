import { storeToRefs } from "pinia"
import { useInvoiceStore } from "@/stores/invoiceStore"

export function useInvoices() {
  const store = useInvoiceStore()
  const { invoices, loading, filters } = storeToRefs(store)

  return {
    invoices,
    loading,
    filters,
    fetchInvoices: (query?: Record<string, unknown>) => store.fetchInvoices(query),
  }
}
