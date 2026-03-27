export interface Customer {
  id: number
  name: string
  phone?: string | null
  password?: string | null
  email?: string | null
  total_spent?: number | string | null
  total_orders?: number | null
  last_purchase_at?: string | null
  address?: string | null
  company?: string | null
  status?: string | null
  notes?: string | null
  created_at?: string | null
  updated_at?: string | null
}

export interface CustomerFormInput {
  name: string
  phone: string
  password: string
  email: string
  address: string
  company: string
  status: string
  notes: string
}
