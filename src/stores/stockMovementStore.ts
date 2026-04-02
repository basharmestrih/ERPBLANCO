import { defineStore } from "pinia"
import stockMovementService from "@/services/stockMovementService"
import { cloneMock, mockStockMovements } from "@/data/mockData"

type StockMovementType = "in" | "out" | "adjustment"

interface ProductSummary {
  id: number
  name: string
}

interface WarehouseSummary {
  id: number
  name: string
}

interface UserSummary {
  id: number
  name: string
}

export interface StockMovement {
  id: number
  product_id: number
  warehouse_id: number
  type: StockMovementType
  quantity: number
  reference_type?: string | null
  reference_id?: number | null
  note?: string | null
  created_by: number
  created_at?: string
  updated_at?: string | null
  product?: ProductSummary | null
  warehouse?: WarehouseSummary | null
  user?: UserSummary | null
}

export interface StockMovementFormInput {
  product_id: number | null
  warehouse_id: number | null
  type: StockMovementType | null
  quantity: number | null
  reference_type?: string | null
  reference_id?: number | null
  note?: string | null
}

type StockMovementFilters = Partial<{
  type: StockMovementType
  date: string
  quantity: number
}>

const createEmptyStockMovementForm = (): StockMovementFormInput => ({
  product_id: null,
  warehouse_id: null,
  type: null,
  quantity: 1,
  reference_type: null,
  reference_id: null,
  note: null,
})

const normalizeFilters = (filters: StockMovementFilters = {}) =>
  Object.fromEntries(
    Object.entries(filters).filter(([, value]) => value !== "" && value !== null && value !== undefined),
  ) as StockMovementFilters

export const useStockMovementStore = defineStore("stockMovement", {
  state: () => ({
    stockMovements: [] as StockMovement[],
    stockMovementForm: createEmptyStockMovementForm(),
    filters: {} as StockMovementFilters,
    loading: false,
    formLoading: false,
  }),

  actions: {
    async fetchStockMovements(filters?: StockMovementFilters) {
      const nextFilters = normalizeFilters(filters ?? this.filters)

      this.loading = true
      this.filters = nextFilters

      try {
        const res = await stockMovementService.getStockMovements(nextFilters)
        const payload = Array.isArray(res.data.data)
          ? res.data.data
          : Array.isArray(res.data)
            ? res.data
            : []

        this.stockMovements = payload
      } catch (error) {
        this.stockMovements = cloneMock(mockStockMovements)
      } finally {
        this.loading = false
      }
    },

    resetForm() {
      this.stockMovementForm = createEmptyStockMovementForm()
    },

    async createStockMovement() {
      if (
        !this.stockMovementForm.product_id ||
        !this.stockMovementForm.warehouse_id ||
        !this.stockMovementForm.type ||
        this.stockMovementForm.quantity == null
      ) {
        return false
      }

      this.formLoading = true

      try {
        await stockMovementService.createStockMovement(this.stockMovementForm)
        await this.fetchStockMovements()
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
