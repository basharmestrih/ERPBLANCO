import { storeToRefs } from "pinia"
import { useWarehouseStore } from "@/stores/warehouseStore"

export function useWarehouses() {
  const store = useWarehouseStore()
  const { warehouses, warehouseProducts, warehouseForm, loading, productsLoading, formLoading } = storeToRefs(store)

  return {
    warehouses,
    warehouseProducts,
    warehouseForm,
    loading,
    productsLoading,
    formLoading,
    fetchWarehouses: store.fetchWarehouses,
    fetchWarehouseProducts: store.fetchWarehouseProducts,
    createWarehouse: store.createWarehouse,
    resetForm: store.resetForm,
    clearWarehouseProducts: store.clearWarehouseProducts,
  }
}
