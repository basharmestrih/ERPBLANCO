import { storeToRefs } from "pinia"
import { useCategoryStore } from "@/stores/categoryStore"

export function useCategories() {
  const store = useCategoryStore()
  const { categories, loading } = storeToRefs(store)

  return {
    categories,
    loading,
    fetchCategories: store.fetchCategories,
  }
}
