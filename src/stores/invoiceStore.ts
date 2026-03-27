import { defineStore } from "pinia"
import invoiceService from "@/services/invoiceService"
import type { Invoice } from "@/types/invoice"

type InvoiceFilters = Partial<{
  status: string
  date: string
  total: number
}>



export const useInvoiceStore = defineStore("invoice", {
  state: () => ({
    invoices: [] as Invoice[],
    filters: {} as InvoiceFilters,
    loading: false,
  }),

  actions: {
    async fetchInvoices(filters?: InvoiceFilters) {
      const nextFilters = Object.fromEntries(
        Object.entries(filters ?? this.filters).filter(([, value]) => value !== "" && value !== null && value !== undefined),
      ) as InvoiceFilters

      this.loading = true
      this.filters = nextFilters

      try {
        const res = await invoiceService.getInvoices(nextFilters)
        const payload = Array.isArray(res.data.data)
          ? res.data.data
          : Array.isArray(res.data)
            ? res.data
            : []

        this.invoices = payload.length ? payload : []
      } finally {
        this.loading = false
      }
    },
  },
})
