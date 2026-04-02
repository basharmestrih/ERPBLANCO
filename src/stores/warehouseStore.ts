import { defineStore } from "pinia"
import warehouseService from "@/services/warehouseService"
import type { Warehouse, WarehouseFormInput } from "@/types/warehouse"
import { cloneMock, mockWarehouseProducts, mockWarehouses } from "@/data/mockData"

const createEmptyWarehouseForm = (): WarehouseFormInput => ({
  name: "",
  location: "",
})

type WarehouseProduct = {
  id?: number
  product_id?: number
  quantity?: number | string | null
  stock_quantity?: number | string | null
  current_stock?: number | string | null
  name?: string | null
  product?: {
    name?: string | null
    price?: number | string | null
    category?: {
      name?: string | null
    } | null
  } | null
}

export const useWarehouseStore = defineStore("warehouse", {
  state: () => ({
    warehouses: [] as Warehouse[],
    warehouseProducts: [] as WarehouseProduct[],
    warehouseForm: createEmptyWarehouseForm(),
    loading: false,
    productsLoading: false,
    formLoading: false,
  }),

  actions: {
    async fetchWarehouses() {
      this.loading = true
      try {
        const res = await warehouseService.getWarehouses()
        const payload = Array.isArray(res.data.data)
          ? res.data.data
          : Array.isArray(res.data)
            ? res.data
            : []
        this.warehouses = payload
      } catch (error) {
        this.warehouses = cloneMock(mockWarehouses)
      } finally {
        this.loading = false
      }
    },

    async fetchWarehouseProducts(warehouseId: number) {
      this.productsLoading = true

      try {
        const res = await warehouseService.getWarehouseProducts(warehouseId)
        const payload = Array.isArray(res.data.data)
          ? res.data.data
          : Array.isArray(res.data)
            ? res.data
            : []

        this.warehouseProducts = payload
      } catch (error) {
        this.warehouseProducts = cloneMock(mockWarehouseProducts[warehouseId] ?? [])
      } finally {
        this.productsLoading = false
      }
    },

    resetForm() {
      this.warehouseForm = createEmptyWarehouseForm()
    },

    async createWarehouse() {
      if (!this.warehouseForm.name || !this.warehouseForm.location) {
        return false
      }

      this.formLoading = true
      try {
        await warehouseService.createWarehouse(this.warehouseForm)
        await this.fetchWarehouses()
        this.resetForm()
        return true
      } catch (error) {
        return false
      } finally {
        this.formLoading = false
      }
    },

    clearWarehouseProducts() {
      this.warehouseProducts = []
    },
  },
})
