import { defineStore } from "pinia"
import { AxiosError } from "axios"
import userService from "@/services/userService"
import type { User, UserFormInput } from "@/types/user"

const createEmptyUserForm = (): UserFormInput => ({
  name: "",
  email: "",
  password: "",
  role: "",
})

const normalizeRoleNames = (value: unknown): string[] => {
  if (!Array.isArray(value)) return []

  return value
    .map((role) => {
      if (typeof role === "string") return role
      if (role && typeof role === "object" && "name" in role) {
        return String((role as { name?: unknown }).name ?? "")
      }

      return ""
    })
    .filter((role): role is string => Boolean(role))
}

const getResponseCollection = (data: unknown) => {
  if (Array.isArray(data)) return data
  if (data && typeof data === "object" && "data" in data) {
    const nested = (data as { data?: unknown }).data
    return Array.isArray(nested) ? nested : []
  }

  return []
}

export const useUserStore = defineStore("user", {
  state: () => ({
    users: [] as User[],
    userForm: createEmptyUserForm(),
    roles: [] as string[],
    loading: false,
    rolesLoading: false,
    formLoading: false,
    formError: "",
  }),

  actions: {
    async fetchUsers() {
      this.loading = true
      try {
        const res = await userService.getUsers()
        this.users = getResponseCollection(res.data) as User[]
      } finally {
        this.loading = false
      }
    },

    async fetchRoles() {
      this.rolesLoading = true
      try {
        const res = await userService.getRoles()
        this.roles = normalizeRoleNames(getResponseCollection(res.data))
      } finally {
        this.rolesLoading = false
      }
    },

    resetForm() {
      this.userForm = createEmptyUserForm()
      this.formError = ""
    },

    async createUser() {
      this.formError = ""

      if (!this.userForm.name || !this.userForm.email || !this.userForm.password || !this.userForm.role) {
        this.formError = "users.form.required"
        return false
      }

      this.formLoading = true

      try {
        await userService.createUser(this.userForm)
        await this.fetchUsers()
        this.resetForm()
        return true
      } catch (error) {
        const axiosError = error as AxiosError<{ message?: string; errors?: Record<string, string[]> }>
        this.formError =
          axiosError.response?.data?.message ??
          Object.values(axiosError.response?.data?.errors ?? {}).flat()[0] ??
          "users.form.failed"
        return false
      } finally {
        this.formLoading = false
      }
    },
  },
})
