export type InvoicePaymentStatus = "pending" | "paid" | "failed" | string
export type InvoiceState = "Draft" | "Issued" | "Paid" | "Overdue" | string

export interface Invoice {
  id?: number
  order_id: number
  customer_id: number
  invoice_number: string
  total_amount: number
  issued_at: string
  due_date: string
  issued_by: number
  payment_intent_id?: string | null
  payment_status: InvoicePaymentStatus
  paid_at?: string | null
  state: InvoiceState
}
