import { storeToRefs } from "pinia"
import { useCustomerStore } from "@/stores/customerStore"

export function useCustomers() {
  const store = useCustomerStore()
  const { customers, customerForm, loading, formLoading } = storeToRefs(store)

  return {
    customers,
    customerForm,
    loading,
    formLoading,
    fetchCustomers: store.fetchCustomers,
    createCustomer: store.createCustomer,
    deleteCustomer: store.deleteCustomer,
    resetForm: store.resetForm,
  }
}
