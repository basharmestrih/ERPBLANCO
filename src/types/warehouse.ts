export interface Warehouse {
  id: number
  name: string
  location: string
  created_at?: string | null
  updated_at?: string | null
}

export interface WarehouseFormInput {
  name: string
  location: string
}
