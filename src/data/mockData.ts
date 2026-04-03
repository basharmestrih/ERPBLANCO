import type { Customer } from "@/types/customer"
import type { Invoice } from "@/types/invoice"
import type { Product, ProductCategory, ProductUnit } from "@/types/product"
import type { User } from "@/types/user"
import type { Warehouse } from "@/types/warehouse"
import type { DashboardData } from "@/stores/dashboardStore"
import type { StockMovement } from "@/stores/stockMovementStore"

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

export const mockCategories: ProductCategory[] = [
  { id: 1, name: "Raw Materials" },
  { id: 2, name: "Finished Goods" },
  { id: 3, name: "Packaging" },
]

export const mockUnits: ProductUnit[] = [
  { id: 1, name: "Pieces" },
  { id: 2, name: "Kilograms" },
  { id: 3, name: "Boxes" },
]

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Premium White Paint",
    price: 42.5,
    total_quantity: 180,
    category_id: 2,
    unit_id: 1,
    created_at: "2026-03-28T09:15:00Z",
    category: mockCategories[1],
    unit: mockUnits[0],
  },
  {
    id: 2,
    name: "Acrylic Binder",
    price: 18.75,
    total_quantity: 64,
    category_id: 1,
    unit_id: 2,
    created_at: "2026-03-26T11:00:00Z",
    category: mockCategories[0],
    unit: mockUnits[1],
  },
  {
    id: 3,
    name: "20L Plastic Bucket",
    price: 6.2,
    total_quantity: 32,
    category_id: 3,
    unit_id: 3,
    created_at: "2026-03-24T13:45:00Z",
    category: mockCategories[2],
    unit: mockUnits[2],
  },
]

export const mockCustomers: Customer[] = [
  {
    id: 1,
    name: "Blanco Trading",
    phone: "+963944100200",
    email: "orders@blancotrading.com",
    company: "Blanco Trading",
    status: "active",
    total_orders: 12,
    total_spent: 4250.5,
    address: "Damascus Industrial Zone",
  },
  {
    id: 2,
    name: "Al Noor Retail",
    phone: "+963955221144",
    email: "procurement@alnoor.sy",
    company: "Al Noor Retail",
    status: "active",
    total_orders: 8,
    total_spent: 2180,
    address: "Homs Main Market",
  },
  {
    id: 3,
    name: "Future Build Co.",
    phone: "+963933887766",
    email: "supply@futurebuild.sy",
    company: "Future Build Co.",
    status: "inactive",
    total_orders: 3,
    total_spent: 940.25,
    address: "Aleppo Logistics Park",
  },
]

export const mockWarehouses: Warehouse[] = [
  { id: 1, name: "Main Warehouse", location: "Damascus" },
  { id: 2, name: "North Hub", location: "Aleppo" },
  { id: 3, name: "South Branch", location: "Daraa" },
]

export const mockWarehouseProducts: Record<number, WarehouseProduct[]> = {
  1: [
    {
      id: 1,
      product_id: 1,
      quantity: 110,
      product: { name: "Premium White Paint", price: 42.5, category: { name: "Finished Goods" } },
    },
    {
      id: 2,
      product_id: 2,
      quantity: 40,
      product: { name: "Acrylic Binder", price: 18.75, category: { name: "Raw Materials" } },
    },
  ],
  2: [
    {
      id: 3,
      product_id: 1,
      quantity: 45,
      product: { name: "Premium White Paint", price: 42.5, category: { name: "Finished Goods" } },
    },
    {
      id: 4,
      product_id: 3,
      quantity: 18,
      product: { name: "20L Plastic Bucket", price: 6.2, category: { name: "Packaging" } },
    },
  ],
  3: [
    {
      id: 5,
      product_id: 2,
      quantity: 24,
      product: { name: "Acrylic Binder", price: 18.75, category: { name: "Raw Materials" } },
    },
  ],
}

export const mockOrders = [
  {
    id: 101,
    customer_id: 1,
    customer: { id: 1, name: "Blanco Trading" },
    state: "Approved",
    total_amount: 1250.75,
    created_at: "2026-04-01T08:30:00Z",
  },
  {
    id: 102,
    customer_id: 2,
    customer: { id: 2, name: "Al Noor Retail" },
    state: "Pending",
    total_amount: 680,
    created_at: "2026-04-01T11:20:00Z",
  },
  {
    id: 103,
    customer_id: 3,
    customer: { id: 3, name: "Future Build Co." },
    state: "Cancelled",
    total_amount: 210.5,
    created_at: "2026-03-30T14:10:00Z",
  },
]

type MockOrderFilters = Partial<{
  status: string
  date: string
  created_by: string | number
  low_quantity: number
  high_quantity: number
}>

const isSameMockDay = (value: string | undefined, expectedDate: string) => {
  if (!value) return false

  return new Date(value).toISOString().slice(0, 10) === expectedDate
}

export const filterOrderCollection = <T extends typeof mockOrders[number]>(orders: T[], filters: MockOrderFilters = {}) =>
  orders.filter((order) => {
    if (filters.status && String(order.state).toLowerCase() !== String(filters.status).toLowerCase()) {
      return false
    }

    if (filters.date && !isSameMockDay(order.created_at, filters.date)) {
      return false
    }

    if (filters.low_quantity != null && Number(order.total_amount ?? 0) < Number(filters.low_quantity)) {
      return false
    }

    if (filters.high_quantity != null && Number(order.total_amount ?? 0) > Number(filters.high_quantity)) {
      return false
    }

    return true
  })

export const getMockOrders = (filters: MockOrderFilters = {}) =>
  filterOrderCollection(cloneMock(mockOrders), filters)

export const mockInvoices: Invoice[] = [
  {
    id: 1,
    order_id: 101,
    customer_id: 1,
    invoice_number: "INV-2026-001",
    total_amount: 1250.75,
    issued_at: "2026-04-01T09:00:00Z",
    due_date: "2026-04-08T09:00:00Z",
    issued_by: 1,
    payment_status: "paid",
    paid_at: "2026-04-01T12:00:00Z",
    state: "Paid",
  },
  {
    id: 2,
    order_id: 102,
    customer_id: 2,
    invoice_number: "INV-2026-002",
    total_amount: 680,
    issued_at: "2026-04-01T12:00:00Z",
    due_date: "2026-04-10T12:00:00Z",
    issued_by: 2,
    payment_status: "pending",
    state: "Draft",
  },
  {
    id: 3,
    order_id: 99,
    customer_id: 3,
    invoice_number: "INV-2026-003",
    total_amount: 430.5,
    issued_at: "2026-03-28T10:30:00Z",
    due_date: "2026-04-02T10:30:00Z",
    issued_by: 1,
    payment_status: "unpaid",
    state: "Overdue",
  },
]

export const mockStockMovements: StockMovement[] = [
  {
    id: 1,
    product_id: 1,
    warehouse_id: 1,
    type: "in",
    quantity: 50,
    reference_type: "purchase",
    reference_id: 501,
    created_by: 1,
    created_at: "2026-04-01T07:45:00Z",
    product: { id: 1, name: "Premium White Paint" },
    warehouse: { id: 1, name: "Main Warehouse" },
    user: { id: 1, name: "Admin User" },
  },
  {
    id: 2,
    product_id: 2,
    warehouse_id: 2,
    type: "out",
    quantity: 12,
    reference_type: "order",
    reference_id: 102,
    created_by: 2,
    created_at: "2026-04-01T13:10:00Z",
    product: { id: 2, name: "Acrylic Binder" },
    warehouse: { id: 2, name: "North Hub" },
    user: { id: 2, name: "Stock Clerk" },
  },
  {
    id: 3,
    product_id: 3,
    warehouse_id: 1,
    type: "adjustment",
    quantity: 5,
    reference_type: "audit",
    reference_id: 77,
    created_by: 1,
    created_at: "2026-03-31T15:20:00Z",
    product: { id: 3, name: "20L Plastic Bucket" },
    warehouse: { id: 1, name: "Main Warehouse" },
    user: { id: 1, name: "Admin User" },
  },
]

export const mockUsers: User[] = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@erpblanco.local",
    email_verified_at: "2026-03-20T08:00:00Z",
    created_at: "2026-03-18T08:00:00Z",
    roles: ["Admin"],
  },
  {
    id: 2,
    name: "Stock Clerk",
    email: "stock@erpblanco.local",
    email_verified_at: "2026-03-21T09:00:00Z",
    created_at: "2026-03-19T09:00:00Z",
    roles: ["Inventory"],
  },
  {
    id: 3,
    name: "Sales Lead",
    email: "sales@erpblanco.local",
    created_at: "2026-03-22T10:00:00Z",
    roles: ["Sales"],
  },
]

export const mockRoles = ["Admin", "Inventory", "Sales"]

export const mockDashboardData: DashboardData = {
  total_orders: 27,
  total_orders_cost: "6941.25",
  pending_invoices: 4,
  low_inventory: {
    quantity: 18,
    product_id: 3,
    product_name: "20L Plastic Bucket",
  },
}

export const mockGuestUser = {
  id: 999,
  name: "Guest User",
  email: "guest@erpblanco.local",
  roles: ["Guest"],
}

export const cloneMock = <T>(value: T): T => JSON.parse(JSON.stringify(value))
