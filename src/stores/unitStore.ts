import { defineStore } from "pinia"
import unitService from "@/services/unitService"
import type { ProductUnit } from "@/types/product"
import { cloneMock, mockUnits } from "@/data/mockData"

const defaultUnits: ProductUnit[] = [
  ...cloneMock(mockUnits),
]

export const useUnitStore = defineStore("unit", {
  state: () => ({
    units: [...defaultUnits] as ProductUnit[],
    loading: false,
  }),

  actions: {
    async fetchUnits() {
      this.loading = true
      try {
        const res = await unitService.getUnits()
        this.units = Array.isArray(res.data.data)
          ? res.data.data
          : Array.isArray(res.data)
            ? res.data
            : defaultUnits
      } catch (error) {
        this.units = cloneMock(defaultUnits)
      } finally {
        this.loading = false
      }
    },
  },
})
