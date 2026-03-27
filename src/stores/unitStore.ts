import { defineStore } from "pinia"
import unitService from "@/services/unitService"
import type { ProductUnit } from "@/types/product"

const defaultUnits: ProductUnit[] = [
  { id: 1, name: "Pieces" },
  { id: 2, name: "Kilograms" },
  { id: 3, name: "Meters" },
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
      } finally {
        this.loading = false
      }
    },
  },
})
