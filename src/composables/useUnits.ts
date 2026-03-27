import { storeToRefs } from "pinia"
import { useUnitStore } from "@/stores/unitStore"

export function useUnits() {
  const store = useUnitStore()
  const { units, loading } = storeToRefs(store)

  return {
    units,
    loading,
    fetchUnits: store.fetchUnits,
  }
}
