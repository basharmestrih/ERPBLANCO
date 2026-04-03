import { defineStore } from "pinia"
import invoiceService from "@/services/invoiceService"
import type { Invoice } from "@/types/invoice"
import { cloneMock, mockInvoices } from "@/data/mockData"

type InvoiceFilters = Partial<{
  status: string
  date: string
  total: number
}>

const isSameDay = (value: string | undefined, expectedDate: string) => {
  if (!value) return false

  return new Date(value).toISOString().slice(0, 10) === expectedDate
}

const applyInvoiceFilters = (invoices: Invoice[], filters: InvoiceFilters = {}) =>
  invoices.filter((invoice) => {
    if (filters.status && String(invoice.payment_status).toLowerCase() !== String(filters.status).toLowerCase()) {
      return false
    }

    if (filters.date && !isSameDay(invoice.issued_at, filters.date)) {
      return false
    }

    if (filters.total != null && Number(invoice.total_amount ?? 0) < Number(filters.total)) {
      return false
    }

    return true
  })



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

        this.invoices = applyInvoiceFilters(payload, nextFilters)
      } catch (error) {
        this.invoices = applyInvoiceFilters(cloneMock(mockInvoices), nextFilters)
      } finally {
        this.loading = false
      }
    },
  },
})
