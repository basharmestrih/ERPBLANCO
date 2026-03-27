import { defineStore } from "pinia"
import categoryService from "@/services/categoryService"
import type { ProductCategory } from "@/types/product"

const defaultCategories: ProductCategory[] = [
  { id: 1, name: "General" },
  { id: 2, name: "Raw Materials" },
  { id: 3, name: "Finished Goods" },
]

export const useCategoryStore = defineStore("category", {
  state: () => ({
    categories: [...defaultCategories] as ProductCategory[],
    loading: false,
  }),

  actions: {
    async fetchCategories() {
      this.loading = true
      try {
        const res = await categoryService.getCategories()
        this.categories = Array.isArray(res.data.data)
          ? res.data.data
          : Array.isArray(res.data)
            ? res.data
            : defaultCategories
      } finally {
        this.loading = false
      }
    },
  },
})
