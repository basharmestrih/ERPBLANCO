import { storeToRefs } from "pinia"
import { useProductStore } from "@/stores/productStore"

export function useProducts() {
  const store = useProductStore()
  const { products, loading, productForm, formLoading } = storeToRefs(store)

  return {
    products,
    loading,
    productForm,
    formLoading,
    fetchProducts: store.fetchProducts,
    createProduct: store.createProduct,
    resetForm: store.resetForm,
  }
}
