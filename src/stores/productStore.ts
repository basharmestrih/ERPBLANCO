import { defineStore } from "pinia"
import productService from "@/services/productService"
import type { Product, ProductFormInput } from "@/types/product"
import { cloneMock, mockProducts } from "@/data/mockData"

const createEmptyProductForm = (): ProductFormInput => ({
  name: "",
  price: null,
  total_quantity: null,
  category_id: null,
  unit_id: null,
})

export const useProductStore = defineStore("product", {
  state: () => ({
    products: [] as Product[],
    productForm: createEmptyProductForm(),
    loading: false,
    formLoading: false,
  }),

  actions: {
    async fetchProducts() {
      this.loading = true
      try {
        const res = await productService.getProducts()
        this.products = Array.isArray(res.data) ? res.data : []
      } catch (error) {
        this.products = cloneMock(mockProducts)
      } finally {
        this.loading = false
      }
    },

    resetForm() {
      this.productForm = createEmptyProductForm()
    },

    async createProduct() {
      if (!this.productForm.name || this.productForm.price == null) {
        console.log("Validation failed: Missing required fields")
        return false
      }

      this.formLoading = true
      try {
        await productService.createProduct(this.productForm)
        await this.fetchProducts()
        this.resetForm()
        return true
      } catch (error) {
        return false
      } finally {
        this.formLoading = false
      }
    },
  },
})
