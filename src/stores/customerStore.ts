import { defineStore } from "pinia"
import customerService from "@/services/customerService"
import type { Customer, CustomerFormInput } from "@/types/customer"

const createEmptyCustomerForm = (): CustomerFormInput => ({
  name: "",
  phone: "",
  password: "",
  email: "",
  address: "",
  company: "",
  status: "active",
  notes: "",
})

export const useCustomerStore = defineStore("customer", {
  state: () => ({
    customers: [] as Customer[],
    customerForm: createEmptyCustomerForm(),
    loading: false,
    formLoading: false,
  }),

  actions: {
    async fetchCustomers() {
      this.loading = true
      try {
        const res = await customerService.getCustomers()
        this.customers = Array.isArray(res.data.data)
          ? res.data.data
          : Array.isArray(res.data)
            ? res.data
            : []
      } finally {
        this.loading = false
      }
    },

    resetForm() {
      this.customerForm = createEmptyCustomerForm()
    },

    async createCustomer() {
      if (!this.customerForm.name || !this.customerForm.phone || !this.customerForm.password) {
        return false
      }

      this.formLoading = true
      try {
        await customerService.createCustomer(this.customerForm)
        await this.fetchCustomers()
        this.resetForm()
        return true
      } catch (error) {
        return false
      } finally {
        this.formLoading = false
      }
    },

    async deleteCustomer(customerId: number) {
      this.loading = true
      try {
        await customerService.deleteCustomer(customerId)
        await this.fetchCustomers()
      } finally {
        this.loading = false
      }
    },
  },
})
