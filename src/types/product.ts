export interface ProductCategory {
  id: number
  name: string
}

export interface ProductUnit {
  id: number
  name: string
}

export interface Product {
  id: number
  name: string
  price?: string | number
  total_quantity?: number
  category_id?: number | null
  unit_id?: number | null
  created_at?: string
  updated_at?: string
  category?: ProductCategory | null
  unit?: ProductUnit | null
}

export interface ProductFormInput {
  name: string
  price: number | null
  total_quantity: number | null
  category_id: number | null
  unit_id: number | null
}
