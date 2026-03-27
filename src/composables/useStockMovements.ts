import { storeToRefs } from "pinia"
import { useStockMovementStore } from "@/stores/stockMovementStore"

export function useStockMovements() {
  const store = useStockMovementStore()
  const { stockMovements, loading, formLoading, stockMovementForm, filters } = storeToRefs(store)

  return {
    stockMovements,
    loading,
    formLoading,
    stockMovementForm,
    filters,
    fetchStockMovements: (query?: Record<string, unknown>) => store.fetchStockMovements(query),
    createStockMovement: store.createStockMovement,
    resetForm: store.resetForm,
  }
}
