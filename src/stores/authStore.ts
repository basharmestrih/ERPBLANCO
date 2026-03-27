import { defineStore } from "pinia"
import authService from "@/services/authService"

const TOKEN_KEY = "auth_token"
const USER_ID = "user_id"

interface RoleItem {
  name?: string
}

export interface AuthUser {
  id: number
  name: string
  email: string
  roles?: Array<string | RoleItem>
}

interface LoginResponse {
  user?: AuthUser | null
  token?: string | null
}

const normalizeRoles = (roles?: Array<string | RoleItem>) =>
  Array.isArray(roles)
    ? roles
        .map((role) => typeof role === "string" ? role : role.name)
        .filter((role): role is string => Boolean(role))
    : []

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem(TOKEN_KEY) ?? "",
    user: null as AuthUser | null,
    roles: [] as string[],
    loading: false,
    initialized: false,
  }),

  getters: {
    isAuthenticated: (state) => Boolean(state.token),
    primaryRole: (state) => state.roles[0] ?? "User",
  },

  actions: {
    setToken(token: string) {
      this.token = token

      if (token) {
        localStorage.setItem(TOKEN_KEY, token)
        return
      }

      localStorage.removeItem(TOKEN_KEY)
    },

    setUser(user: AuthUser | null, roles: string[] = []) {
      console.log('user data:', user) 
      if (user) {
        localStorage.setItem(USER_ID, String(user.id))
      } else {
        localStorage.removeItem(USER_ID)
      }
      this.user = user
      this.roles = roles.length ? roles : normalizeRoles(user?.roles)


    },

    async login(email: string, password: string) {
      this.loading = true

      try {
        const response = await authService.login({ email, password })
        const data = response.data as LoginResponse
        const token = data.token ?? ""

        this.setToken(token)
        this.setUser(data.user ?? null)
        this.initialized = true
      } finally {
        this.loading = false
      }
    },

    async fetchCurrentUser() {
      if (!this.token) {
        this.initialized = true
        return
      }

      try {
        const response = await authService.me()
        this.setUser(response.data.user ?? null, response.data.roles ?? [])
      } catch {
        this.logout()
      } finally {
        this.initialized = true
      }
    },

    logout() {
      this.setToken("")
      this.setUser(null, [])
      this.initialized = true
    },
  },
})
