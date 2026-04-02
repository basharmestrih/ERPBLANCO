import { defineStore } from "pinia"
import categoryService from "@/services/categoryService"
import type { ProductCategory } from "@/types/product"
import { cloneMock, mockCategories } from "@/data/mockData"

const defaultCategories: ProductCategory[] = [
  ...cloneMock(mockCategories),
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
      } catch (error) {
        this.categories = cloneMock(defaultCategories)
      } finally {
        this.loading = false
      }
    },
  },
})
