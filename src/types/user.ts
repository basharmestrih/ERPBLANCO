export interface User {
  id: number
  name: string
  email: string
  email_verified_at?: string | null
  created_at?: string | null
  updated_at?: string | null
  roles?: string[]
}

export interface UserFormInput {
  name: string
  email: string
  password: string
  role: string
}
